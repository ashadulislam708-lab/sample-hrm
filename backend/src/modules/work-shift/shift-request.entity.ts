import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { ShiftStatusEnum } from '../../common/enums/shift-status.enum';

@Entity('shift_requests')
export class ShiftRequest extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'requested_days', type: 'jsonb' })
  requestedDays: string[];

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'enum',
    enum: ShiftStatusEnum,
    default: ShiftStatusEnum.PENDING,
  })
  @Index()
  status: ShiftStatusEnum;

  @Column({ name: 'approved_by_id', type: 'uuid', nullable: true })
  approvedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approved_by_id' })
  approvedBy: User | null;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'effective_from', type: 'date', nullable: true })
  effectiveFrom: Date | null;
}
