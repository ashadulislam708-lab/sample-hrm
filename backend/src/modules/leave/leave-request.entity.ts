import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { LeaveTypeEnum } from '../../common/enums/leave-type.enum';
import { LeaveStatusEnum } from '../../common/enums/leave-status.enum';
import { LeaveDurationEnum } from '../../common/enums/leave-duration.enum';

@Entity('leave_requests')
export class LeaveRequest extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'leave_type', type: 'enum', enum: LeaveTypeEnum })
  @Index()
  leaveType: LeaveTypeEnum;

  @Column({
    type: 'enum',
    enum: LeaveDurationEnum,
    default: LeaveDurationEnum.FULL_DAY,
  })
  duration: LeaveDurationEnum;

  @Column({ name: 'start_date', type: 'date' })
  @Index()
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'enum',
    enum: LeaveStatusEnum,
    default: LeaveStatusEnum.PENDING,
  })
  @Index()
  status: LeaveStatusEnum;

  @Column({ name: 'estimated_return_time', type: 'timestamp', nullable: true })
  estimatedReturnTime: Date | null;

  @Column({
    name: 'contact_availability',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  contactAvailability: string | null;

  @Column({ name: 'approved_by_id', type: 'uuid', nullable: true })
  approvedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approved_by_id' })
  approvedBy: User | null;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'decision_note', type: 'text', nullable: true })
  decisionNote: string | null;

  @Column({
    name: 'slack_thread_ts',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  slackThreadTs: string | null;

  @Column({ name: 'returned_at', type: 'timestamp', nullable: true })
  returnedAt: Date | null;
}
