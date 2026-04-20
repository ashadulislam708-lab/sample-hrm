/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { DataSource, IsNull } from 'typeorm';
import { User } from '../../modules/users/user.entity';
import { RoleEnum } from '../../common/enums/role.enum';
import { UserStatusEnum } from '../../common/enums/user-status.enum';

interface FixtureUser {
  email: string;
  password: string;
  role: string;
  full_name: string;
  department?: string;
  position?: string;
  team_leader_email?: string;
  joining_date?: string;
  gather_email?: string;
  notion_user_id?: string;
  basic_salary?: number;
}

const BCRYPT_ROUNDS = 10;

/**
 * Minimal YAML parser for our known _fixtures.yaml shape.
 * Supports:
 *   - top-level sections (users:, departments:, ...)
 *   - list entries starting with `-`
 *   - simple `key: value` pairs (strings without quotes, numbers, and "quoted" strings)
 * Does NOT support: anchors, multi-line strings, complex inline structures.
 * Good enough for our single source-of-truth fixture file — keeps zero extra deps.
 */
function parseFixturesYaml(content: string): { users: FixtureUser[] } {
  const lines = content.split(/\r?\n/);
  const users: FixtureUser[] = [];
  let inUsers = false;
  let current: Partial<FixtureUser> | null = null;

  const stripComment = (raw: string): string => {
    const hashIdx = raw.indexOf('#');
    if (hashIdx < 0) return raw;
    // Allow # inside quoted strings only if line doesn't start with quote logic; we keep it simple
    return raw.slice(0, hashIdx);
  };

  const coerce = (raw: string): string | number => {
    let v = raw.trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (/^-?\d+(\.\d+)?$/.test(v)) {
      return Number(v);
    }
    return v;
  };

  for (const rawLine of lines) {
    const line = stripComment(rawLine).replace(/\s+$/, '');
    if (line.trim() === '') continue;

    // Top-level section markers (no indentation, ends with ":")
    if (/^[A-Za-z_][\w-]*:\s*$/.test(line)) {
      if (current) {
        users.push(current as FixtureUser);
        current = null;
      }
      inUsers = line.startsWith('users:');
      continue;
    }

    if (!inUsers) continue;

    // New list item
    const listStart = line.match(/^\s*-\s+([A-Za-z_][\w-]*):\s*(.*)$/);
    if (listStart) {
      if (current) {
        users.push(current as FixtureUser);
      }
      current = {};
      const key = listStart[1];
      const value = listStart[2];
      if (value !== '') {
        (current as Record<string, unknown>)[key] = coerce(value);
      }
      continue;
    }

    // Continuation key
    const kv = line.match(/^\s+([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv && current) {
      const key = kv[1];
      const value = kv[2];
      (current as Record<string, unknown>)[key] = coerce(value);
      continue;
    }
  }
  if (current) users.push(current as FixtureUser);
  return { users };
}

function mapRole(raw: string): RoleEnum {
  switch (raw) {
    case 'employee':
      return RoleEnum.EMPLOYEE;
    case 'team_leader':
      return RoleEnum.TEAM_LEADER;
    case 'hr_admin':
      return RoleEnum.HR_ADMIN;
    default:
      throw new Error(`Unknown role in fixtures: ${raw}`);
  }
}

/**
 * Locate _fixtures.yaml. Walks upward from backend root to find
 * .claude-project/user_stories/_fixtures.yaml.
 */
function findFixturesPath(): string {
  const candidates: string[] = [];
  let cursor = path.resolve(__dirname, '..', '..', '..'); // backend/
  for (let i = 0; i < 6; i++) {
    candidates.push(
      path.join(cursor, '.claude-project', 'user_stories', '_fixtures.yaml'),
    );
    const parent = path.dirname(cursor);
    if (parent === cursor) break;
    cursor = parent;
  }
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    `Could not locate _fixtures.yaml. Checked:\n${candidates.join('\n')}`,
  );
}

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const fixturesPath = findFixturesPath();
  const content = fs.readFileSync(fixturesPath, 'utf-8');
  const parsed = parseFixturesYaml(content);
  const fixtureUsers = parsed.users;
  if (fixtureUsers.length === 0) {
    console.warn('[seed:users] No users found in _fixtures.yaml');
    return;
  }

  const repo = dataSource.getRepository(User);

  // Phase 1: upsert users without team_leader link (team leaders + hr_admin + employees that have no leader).
  const seededByEmail = new Map<string, User>();
  for (const fx of fixtureUsers) {
    const role = mapRole(fx.role);
    const email = fx.email.toLowerCase();
    const existing = await repo.findOne({
      where: { email },
      withDeleted: true,
    });
    const hashedPassword = await bcrypt.hash(fx.password, BCRYPT_ROUNDS);
    const payload: Partial<User> = {
      email,
      password: hashedPassword,
      fullName: fx.full_name,
      department: fx.department ?? null,
      position: fx.position ?? null,
      role,
      status: UserStatusEnum.ACTIVE,
      joiningDate: fx.joining_date ? new Date(fx.joining_date) : null,
      salary: typeof fx.basic_salary === 'number' ? fx.basic_salary : 0,
      gatherTownEmail: fx.gather_email ?? null,
      notionUserId: fx.notion_user_id ?? null,
    };

    let entity: User;
    if (existing) {
      // Keep id, update mutable fields (idempotent refresh). Clear soft-delete.
      Object.assign(existing, payload);
      existing.deletedAt = null;
      entity = await repo.save(existing);
      console.log(`[seed:users] updated ${email} (${role})`);
    } else {
      entity = await repo.save(repo.create(payload));
      console.log(`[seed:users] created ${email} (${role})`);
    }
    seededByEmail.set(email, entity);
  }

  // Phase 2: resolve team_leader links.
  for (const fx of fixtureUsers) {
    if (!fx.team_leader_email) continue;
    const leaderEmail = fx.team_leader_email.toLowerCase();
    const leader = seededByEmail.get(leaderEmail);
    const member = seededByEmail.get(fx.email.toLowerCase());
    if (!leader) {
      console.warn(
        `[seed:users] team_leader ${leaderEmail} not found for ${fx.email}`,
      );
      continue;
    }
    if (!member) continue;
    if (member.teamLeaderId === leader.id) continue;
    member.teamLeaderId = leader.id;
    await repo.save(member);
    console.log(
      `[seed:users] linked ${member.email} -> leader ${leader.email}`,
    );
  }

  const total = await repo.count({ where: { deletedAt: IsNull() } });
  console.log(`[seed:users] done. total active users: ${total}`);
}
