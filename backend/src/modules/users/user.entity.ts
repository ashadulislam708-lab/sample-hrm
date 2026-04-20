import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { RoleEnum } from '../../common/enums/role.enum';
import { UserStatusEnum } from '../../common/enums/user-status.enum';

@Entity('users')
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  @Index()
  department: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  position: string | null;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.EMPLOYEE })
  @Index()
  role: RoleEnum;

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.ACTIVE })
  @Index()
  status: UserStatusEnum;

  @Column({ name: 'joining_date', type: 'date', nullable: true })
  joiningDate: Date | null;

  @Column({ name: 'team_leader_id', type: 'uuid', nullable: true })
  @Index()
  teamLeaderId: string | null;

  @ManyToOne(() => User, (user) => user.teamMembers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'team_leader_id' })
  teamLeader: User | null;

  @OneToMany(() => User, (user) => user.teamLeader)
  teamMembers: User[];

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  salary: number;

  @Column({ name: 'bank_details', type: 'jsonb', nullable: true })
  bankDetails: Record<string, unknown> | null;

  @Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatarUrl: string | null;

  @Column({
    name: 'gather_town_email',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  gatherTownEmail: string | null;

  @Column({
    name: 'notion_user_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  notionUserId: string | null;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt: Date | null;
}
