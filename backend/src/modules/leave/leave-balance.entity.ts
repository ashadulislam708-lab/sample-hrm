import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';

@Entity('leave_balances')
@Unique('UQ_leave_balance_user_year', ['userId', 'year'])
export class LeaveBalance extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int' })
  @Index()
  year: number;

  @Column({ name: 'casual_allocated', type: 'decimal', precision: 5, scale: 2, default: 0 })
  casualAllocated: number;

  @Column({ name: 'casual_used', type: 'decimal', precision: 5, scale: 2, default: 0 })
  casualUsed: number;

  @Column({ name: 'casual_remaining', type: 'decimal', precision: 5, scale: 2, default: 0 })
  casualRemaining: number;

  @Column({ name: 'sick_allocated', type: 'decimal', precision: 5, scale: 2, default: 0 })
  sickAllocated: number;

  @Column({ name: 'sick_used', type: 'decimal', precision: 5, scale: 2, default: 0 })
  sickUsed: number;

  @Column({ name: 'sick_remaining', type: 'decimal', precision: 5, scale: 2, default: 0 })
  sickRemaining: number;
}
