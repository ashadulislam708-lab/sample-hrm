import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { LoanApplication } from './loan-application.entity';
import { PayrollRun } from '../payroll/payroll-run.entity';

@Entity('loan_repayments')
export class LoanRepayment extends BaseEntity {
  @Column({ name: 'loan_id', type: 'uuid' })
  @Index()
  loanId: string;

  @ManyToOne(() => LoanApplication, (loan) => loan.repayments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'loan_id' })
  loan: LoanApplication;

  @Column({ name: 'payroll_id', type: 'uuid', nullable: true })
  @Index()
  payrollId: string | null;

  @ManyToOne(() => PayrollRun, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'payroll_id' })
  payroll: PayrollRun | null;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;

  @Column({
    name: 'remaining_balance',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  remainingBalance: number;
}
