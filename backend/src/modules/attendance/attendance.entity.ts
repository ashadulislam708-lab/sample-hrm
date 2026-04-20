import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { AttendanceSourceEnum } from '../../common/enums/attendance-source.enum';
import { AttendanceStatusEnum } from '../../common/enums/attendance-status.enum';

@Entity('attendance')
@Unique('UQ_attendance_user_date', ['userId', 'date'])
export class Attendance extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'date' })
  @Index()
  date: Date;

  @Column({ name: 'clock_in_time', type: 'timestamp', nullable: true })
  clockInTime: Date | null;

  @Column({ name: 'clock_out_time', type: 'timestamp', nullable: true })
  clockOutTime: Date | null;

  @Column({
    type: 'enum',
    enum: AttendanceSourceEnum,
    default: AttendanceSourceEnum.MANUAL,
  })
  source: AttendanceSourceEnum;

  @Column({
    type: 'enum',
    enum: AttendanceStatusEnum,
    default: AttendanceStatusEnum.ON_TIME,
  })
  @Index()
  status: AttendanceStatusEnum;

  @Column({ name: 'late_minutes', type: 'int', default: 0 })
  lateMinutes: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
