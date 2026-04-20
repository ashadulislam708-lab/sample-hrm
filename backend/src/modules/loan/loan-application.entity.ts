import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { LoanStatusEnum } from '../../common/enums/loan-status.enum';
import { LoanRepayment } from './loan-repayment.entity';

@Entity('loan_applications')
export class LoanApplication extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'text' })
  reason: string;

  @Column({ name: 'tenure_months', type: 'int' })
  tenureMonths: number;

  @Column({ name: 'monthly_installment', type: 'decimal', precision: 12, scale: 2 })
  monthlyInstallment: number;

  @Column({
    type: 'enum',
    enum: LoanStatusEnum,
    default: LoanStatusEnum.PENDING,
  })
  @Index()
  status: LoanStatusEnum;

  @Column({ name: 'approved_by_id', type: 'uuid', nullable: true })
  approvedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approved_by_id' })
  approvedBy: User | null;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date | null;

  @Column({ name: 'disbursed_at', type: 'timestamp', nullable: true })
  disbursedAt: Date | null;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @Column({
    name: 'outstanding_balance',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  outstandingBalance: number;

  @OneToMany(() => LoanRepayment, (repayment) => repayment.loan)
  repayments: LoanRepayment[];
}
