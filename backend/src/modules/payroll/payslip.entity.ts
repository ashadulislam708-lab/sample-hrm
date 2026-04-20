import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { PayrollRun } from './payroll-run.entity';

@Entity('payslips')
export class Payslip extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'payroll_run_id', type: 'uuid' })
  @Index()
  payrollRunId: string;

  @ManyToOne(() => PayrollRun, (run) => run.payslips, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payroll_run_id' })
  payrollRun: PayrollRun;

  @Column({ name: 'basic_salary', type: 'decimal', precision: 12, scale: 2 })
  basicSalary: number;

  @Column({ type: 'jsonb', default: {} })
  allowances: Record<string, number>;

  @Column({ type: 'jsonb', default: {} })
  deductions: Record<string, number>;

  @Column({ type: 'jsonb', default: {} })
  bonuses: Record<string, number>;

  @Column({
    name: 'loan_deduction',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  loanDeduction: number;

  @Column({ name: 'net_salary', type: 'decimal', precision: 12, scale: 2 })
  netSalary: number;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;

  @Column({
    name: 'bank_file_reference',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  bankFileReference: string | null;
}
