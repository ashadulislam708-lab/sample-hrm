import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { PayrollStatusEnum } from '../../common/enums/payroll-status.enum';
import { Payslip } from './payslip.entity';

@Entity('payroll_runs')
@Unique('UQ_payroll_month_year', ['month', 'year'])
export class PayrollRun extends BaseEntity {
  @Column({ type: 'int' })
  @Index()
  month: number;

  @Column({ type: 'int' })
  @Index()
  year: number;

  @Column({
    type: 'enum',
    enum: PayrollStatusEnum,
    default: PayrollStatusEnum.DRAFT,
  })
  @Index()
  status: PayrollStatusEnum;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
  })
  totalAmount: number;

  @Column({ name: 'created_by_id', type: 'uuid', nullable: true })
  createdById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User | null;

  @Column({ name: 'approved_by_id', type: 'uuid', nullable: true })
  approvedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approved_by_id' })
  approvedBy: User | null;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'disbursed_at', type: 'timestamp', nullable: true })
  disbursedAt: Date | null;

  @OneToMany(() => Payslip, (payslip) => payslip.payrollRun)
  payslips: Payslip[];
}
