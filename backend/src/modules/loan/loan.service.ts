import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { LoanApplication } from './loan-application.entity';
import { LoanRepayment } from './loan-repayment.entity';
import { LoanRepository, LoanFilters } from './loan.repository';
import { LoanRepaymentRepository } from './loan-repayment.repository';
import { LoanStatusEnum } from '../../common/enums/loan-status.enum';
import { RoleEnum } from '../../common/enums/role.enum';
import { ApplyLoanDto } from './dtos/apply-loan.dto';

// TODO: Replace with OfficeConfigService.getLoanPolicy() when available.
// Default max loan amount (derived from PRD) pending office-config integration.
const DEFAULT_MAX_LOAN_AMOUNT = 100_000;

@Injectable()
export class LoanService extends BaseService<LoanApplication> {
  protected defaultRelations: string[] = ['user', 'approvedBy'];

  constructor(
    protected readonly repository: LoanRepository,
    private readonly repaymentRepository: LoanRepaymentRepository,
  ) {
    super(repository, 'LoanApplication');
  }

  private round2(n: number): number {
    return Math.round(n * 100) / 100;
  }

  async applyLoan(
    userId: string,
    dto: ApplyLoanDto,
  ): Promise<LoanApplication> {
    const amount = Number(dto.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }
    if (amount > DEFAULT_MAX_LOAN_AMOUNT) {
      throw new BadRequestException(
        `Loan amount exceeds maximum ${DEFAULT_MAX_LOAN_AMOUNT}`,
      );
    }

    const active = await this.repository.findActiveByUser(userId);
    if (active) {
      throw new BadRequestException(
        'An active loan exists; repay it before applying for a new one',
      );
    }

    const monthlyInstallment = this.round2(amount / dto.tenureMonths);

    return this.repository.create({
      userId,
      amount,
      reason: dto.reason,
      tenureMonths: dto.tenureMonths,
      monthlyInstallment,
      status: LoanStatusEnum.PENDING,
      outstandingBalance: amount,
    });
  }

  async approveLoan(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
    overrides?: { tenureMonths?: number; decisionNote?: string },
  ): Promise<LoanApplication> {
    if (approverRole !== RoleEnum.HR_ADMIN) {
      throw new ForbiddenException('Only HR admins can approve loans');
    }
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Loan application not found');
    if (existing.status !== LoanStatusEnum.PENDING) {
      throw new BadRequestException('Only pending loans can be approved');
    }

    const tenure = overrides?.tenureMonths ?? existing.tenureMonths;
    if (tenure < 1 || tenure > 24) {
      throw new BadRequestException('Tenure months must be between 1 and 24');
    }
    const monthlyInstallment = this.round2(Number(existing.amount) / tenure);

    const updated = await this.repository.update(id, {
      status: LoanStatusEnum.APPROVED,
      approvedById: approverId,
      approvedAt: new Date(),
      tenureMonths: tenure,
      monthlyInstallment,
      outstandingBalance: Number(existing.amount),
    });
    if (!updated) throw new NotFoundException('Loan application not found');

    // Auto-disburse: generate the repayment schedule and mark active.
    return this.disburse(updated);
  }

  async rejectLoan(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
  ): Promise<LoanApplication> {
    if (approverRole !== RoleEnum.HR_ADMIN) {
      throw new ForbiddenException('Only HR admins can reject loans');
    }
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Loan application not found');
    if (existing.status !== LoanStatusEnum.PENDING) {
      throw new BadRequestException('Only pending loans can be rejected');
    }
    const updated = await this.repository.update(id, {
      status: LoanStatusEnum.REJECTED,
      approvedById: approverId,
      approvedAt: new Date(),
    });
    if (!updated) throw new NotFoundException('Loan application not found');
    return updated;
  }

  async disburse(loan: LoanApplication): Promise<LoanApplication> {
    const schedule: Array<Partial<LoanRepayment>> = [];
    const now = new Date();
    let remaining = Number(loan.amount);

    for (let i = 1; i <= loan.tenureMonths; i++) {
      const dueDate = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1),
      );
      const instalment =
        i === loan.tenureMonths
          ? this.round2(remaining)
          : Number(loan.monthlyInstallment);
      remaining = this.round2(remaining - instalment);
      schedule.push({
        loanId: loan.id,
        amount: instalment,
        dueDate,
        remainingBalance: Math.max(0, remaining),
      });
    }

    for (const row of schedule) {
      await this.repaymentRepository.create(row);
    }

    const updated = await this.repository.update(loan.id, {
      status: LoanStatusEnum.ACTIVE,
      disbursedAt: new Date(),
      outstandingBalance: Number(loan.amount),
    });
    if (!updated) throw new NotFoundException('Loan application not found');
    return updated;
  }

  async recordRepayment(
    loanId: string,
    payrollId: string | null,
    amount: number,
  ): Promise<LoanRepayment> {
    const next = await this.repaymentRepository.findNextPendingForLoan(loanId);
    if (!next) {
      throw new BadRequestException('No pending repayments for this loan');
    }
    const loan = await this.repository.findById(loanId);
    if (!loan) throw new NotFoundException('Loan not found');

    const newOutstanding = this.round2(
      Math.max(0, Number(loan.outstandingBalance) - amount),
    );

    const updatedRepayment = await this.repaymentRepository.update(next.id, {
      paidAt: new Date(),
      payrollId,
      remainingBalance: newOutstanding,
    });
    if (!updatedRepayment) {
      throw new NotFoundException('Repayment not found');
    }

    const closing = newOutstanding <= 0;
    await this.repository.update(loanId, {
      outstandingBalance: newOutstanding,
      ...(closing
        ? { status: LoanStatusEnum.COMPLETED, completedAt: new Date() }
        : {}),
    });

    return updatedRepayment;
  }

  async listOwn(userId: string, page = 1, limit = 20) {
    return this.repository.listWithFilters({ userId }, page, limit);
  }

  async listAdmin(filters: LoanFilters, page = 1, limit = 20) {
    return this.repository.listWithFilters(filters, page, limit);
  }

  async listRepaymentsForLoan(loanId: string): Promise<LoanRepayment[]> {
    return this.repaymentRepository.findForLoan(loanId);
  }

  async getLoanDetail(id: string): Promise<LoanApplication> {
    const loan = await this.repository.findWithRepayments(id);
    if (!loan) throw new NotFoundException('Loan application not found');
    return loan;
  }

  async findActiveByUser(userId: string): Promise<LoanApplication | null> {
    return this.repository.findActiveByUser(userId);
  }
}
