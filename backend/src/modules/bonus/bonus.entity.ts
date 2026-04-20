import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { PayrollRun } from '../payroll/payroll-run.entity';
import { BonusTypeEnum } from '../../common/enums/bonus-type.enum';

@Entity('bonuses')
export class Bonus extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: BonusTypeEnum })
  @Index()
  type: BonusTypeEnum;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    name: 'project_reference',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  projectReference: string | null;

  @Column({
    name: 'festival_name',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  festivalName: string | null;

  @Column({ name: 'awarded_by_id', type: 'uuid', nullable: true })
  awardedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'awarded_by_id' })
  awardedBy: User | null;

  @Column({ name: 'awarded_at', type: 'timestamp' })
  awardedAt: Date;

  @Column({ name: 'payroll_run_id', type: 'uuid', nullable: true })
  @Index()
  payrollRunId: string | null;

  @ManyToOne(() => PayrollRun, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'payroll_run_id' })
  payrollRun: PayrollRun | null;
}
