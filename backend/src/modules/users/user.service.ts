import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UserService extends BaseService<User> {
  protected defaultRelations: string[] = ['teamLeader'];

  constructor(protected readonly repository: UserRepository) {
    super(repository, 'User');
  }

  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, BCRYPT_SALT_ROUNDS);
  }

  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async findByEmail(email: string, includePassword = false): Promise<User | null> {
    return this.repository.findByEmail(email, includePassword);
  }

  async findByEmailOrFail(email: string): Promise<User> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findTeam(teamLeaderId: string): Promise<User[]> {
    return this.repository.findByTeamLeader(teamLeaderId);
  }

  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.repository.findByEmail(email, true);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await this.comparePassword(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const hashed = await this.hashPassword(dto.password);
    const payload: DeepPartial<User> = {
      email: dto.email.toLowerCase(),
      password: hashed,
      fullName: dto.fullName,
      phone: dto.phone ?? null,
      department: dto.department ?? null,
      position: dto.position ?? null,
      role: dto.role,
      status: dto.status,
      joiningDate: dto.joiningDate ? new Date(dto.joiningDate) : null,
      teamLeaderId: dto.teamLeaderId ?? null,
      salary: dto.salary ?? 0,
      gatherTownEmail: dto.gatherTownEmail ?? null,
      notionUserId: dto.notionUserId ?? null,
    };
    return this.repository.create(payload);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<User> {
    await this.findByIdOrFail(userId);
    const payload: DeepPartial<User> = {
      fullName: dto.fullName,
      phone: dto.phone ?? null,
      avatarUrl: dto.avatarUrl ?? null,
      gatherTownEmail: dto.gatherTownEmail ?? null,
      notionUserId: dto.notionUserId ?? null,
    };
    const updated = await this.repository.update(userId, payload);
    if (!updated) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return updated;
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
    await this.findByIdOrFail(userId);
    const payload: DeepPartial<User> = { ...dto } as DeepPartial<User>;
    if (dto.joiningDate) {
      payload.joiningDate = new Date(dto.joiningDate);
    }
    const updated = await this.repository.update(userId, payload);
    if (!updated) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return updated;
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('New password and confirmation do not match');
    }
    const user = await this.repository.findByIdWithPassword(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const ok = await this.comparePassword(currentPassword, user.password);
    if (!ok) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    const hashed = await this.hashPassword(newPassword);
    await this.repository.updatePassword(userId, hashed);
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const hashed = await this.hashPassword(newPassword);
    await this.repository.updatePassword(userId, hashed);
  }

  async recordLogin(userId: string): Promise<void> {
    await this.repository.updateLastLogin(userId, new Date());
  }
}
