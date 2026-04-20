import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { PayrollRun } from './payroll-run.entity';
import { Payslip } from './payslip.entity';
import { PayrollRunRepository } from './payroll-run.repository';
import { PayslipRepository } from './payslip.repository';
import { PayrollStatusEnum } from '../../common/enums/payroll-status.enum';
import { UserStatusEnum } from '../../common/enums/user-status.enum';
import { RoleEnum } from '../../common/enums/role.enum';
import { User } from '../users/user.entity';
import { LoanService } from '../loan/loan.service';
import { BonusService } from '../bonus/bonus.service';

@Injectable()
export class PayrollService extends BaseService<PayrollRun> {
  protected defaultRelations: string[] = ['createdBy', 'approvedBy'];

  constructor(
    protected readonly repository: PayrollRunRepository,
    private readonly payslipRepository: PayslipRepository,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly loanService: LoanService,
    private readonly bonusService: BonusService,
  ) {
    super(repository, 'PayrollRun');
  }

  private round2(n: number): number {
    return Math.round(n * 100) / 100;
  }

  async generateRun(
    month: number,
    year: number,
    createdById: string,
  ): Promise<PayrollRun> {
    const existing = await this.repository.findByMonthYear(month, year);
    if (existing) {
      throw new ConflictException(
        `Payroll run for ${month}/${year} already exists`,
      );
    }

    const run = await this.repository.create({
      month,
      year,
      status: PayrollStatusEnum.DRAFT,
      createdById,
      totalAmount: 0,
    });

    const activeUsers = await this.usersRepository.find({
      where: { status: UserStatusEnum.ACTIVE },
    });

    let totalAmount = 0;

    for (const user of activeUsers) {
      const basicSalary = Number(user.salary) || 0;

      // Loan deduction (if active).
      const activeLoan = await this.loanService.findActiveByUser(user.id);
      const loanDeduction = activeLoan
        ? Math.min(
            Number(activeLoan.monthlyInstallment),
            Number(activeLoan.outstandingBalance),
          )
        : 0;

      // Pending bonuses scoped to this month.
      const pendingBonuses = await this.bonusService.findPendingForUser(
        user.id,
        month,
        year,
      );
      const bonusesMap: Record<string, number> = {};
      let totalBonus = 0;
      for (const b of pendingBonuses) {
        const amt = Number(b.amount);
        bonusesMap[b.id] = amt;
        totalBonus += amt;
      }

      const netSalary = this.round2(
        basicSalary - loanDeduction + totalBonus,
      );

      await this.payslipRepository.create({
        userId: user.id,
        payrollRunId: run.id,
        basicSalary,
        allowances: {},
        deductions: loanDeduction ? { loan: loanDeduction } : {},
        bonuses: bonusesMap,
        loanDeduction,
        netSalary,
      });

      // Attach pending bonuses to this run so they are not double-counted.
      for (const b of pendingBonuses) {
        await this.bonusService.attachToPayroll(b.id, run.id);
      }

      totalAmount = this.round2(totalAmount + netSalary);
    }

    const updated = await this.repository.update(run.id, { totalAmount });
    if (!updated) throw new NotFoundException('Payroll run not found');
    return updated;
  }

  async reviewRun(id: string): Promise<PayrollRun> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Payroll run not found');
    if (existing.status !== PayrollStatusEnum.DRAFT) {
      throw new BadRequestException(
        'Only draft payroll runs can move to review',
      );
    }
    const updated = await this.repository.update(id, {
      status: PayrollStatusEnum.REVIEW,
    });
    if (!updated) throw new NotFoundException('Payroll run not found');
    return updated;
  }

  async approveRun(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
  ): Promise<PayrollRun> {
    if (approverRole !== RoleEnum.HR_ADMIN) {
      throw new ForbiddenException('Only HR admins can approve payroll');
    }
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Payroll run not found');
    if (
      existing.status !== PayrollStatusEnum.DRAFT &&
      existing.status !== PayrollStatusEnum.REVIEW
    ) {
      throw new BadRequestException(
        'Only draft or review payroll runs can be approved',
      );
    }

    const payslips = await this.payslipRepository.findByRun(id);
    for (const slip of payslips) {
      const amount = Number(slip.loanDeduction);
      if (amount > 0) {
        const activeLoan = await this.loanService.findActiveByUser(slip.userId);
        if (activeLoan) {
          await this.loanService.recordRepayment(activeLoan.id, id, amount);
        }
      }
    }

    const updated = await this.repository.update(id, {
      status: PayrollStatusEnum.APPROVED,
      approvedById: approverId,
      approvedAt: new Date(),
    });
    if (!updated) throw new NotFoundException('Payroll run not found');
    return updated;
  }

  async markDisbursed(
    id: string,
    approverRole: RoleEnum,
  ): Promise<PayrollRun> {
    if (approverRole !== RoleEnum.HR_ADMIN) {
      throw new ForbiddenException('Only HR admins can mark payroll as disbursed');
    }
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Payroll run not found');
    if (existing.status !== PayrollStatusEnum.APPROVED) {
      throw new BadRequestException(
        'Only approved payroll runs can be marked disbursed',
      );
    }
    const disbursedAt = new Date();

    // Stamp all payslips as paid.
    const payslips = await this.payslipRepository.findByRun(id);
    for (const slip of payslips) {
      await this.payslipRepository.update(slip.id, { paidAt: disbursedAt });
    }

    const updated = await this.repository.update(id, {
      status: PayrollStatusEnum.DISBURSED,
      disbursedAt,
    });
    if (!updated) throw new NotFoundException('Payroll run not found');
    return updated;
  }

  async listPayslipsForUser(userId: string): Promise<Payslip[]> {
    return this.payslipRepository.listByUser(userId);
  }

  async getPayslip(id: string): Promise<Payslip> {
    const slip = await this.payslipRepository.findById(id, [
      'user',
      'payrollRun',
    ]);
    if (!slip) throw new NotFoundException('Payslip not found');
    return slip;
  }

  async getRunDetail(id: string): Promise<PayrollRun> {
    const run = await this.repository.findWithPayslips(id);
    if (!run) throw new NotFoundException('Payroll run not found');
    return run;
  }

  async listRuns(limit = 12): Promise<PayrollRun[]> {
    return this.repository.listRecent(limit);
  }

  /**
   * Returns CSV bank-file contents for a payroll run.
   * Columns: employeeName, bankAccount, amount.
   */
  async exportBankFile(runId: string): Promise<{ filename: string; content: string }> {
    const run = await this.repository.findById(runId);
    if (!run) throw new NotFoundException('Payroll run not found');
    const payslips = await this.payslipRepository.findByRun(runId);

    const header = 'employeeName,bankAccount,amount';
    const lines: string[] = [header];
    for (const slip of payslips) {
      const user = slip.user;
      const name = (user?.fullName ?? '').replace(/"/g, '""');
      const bank = (user?.bankDetails as Record<string, unknown> | null) ?? {};
      const account =
        typeof bank['accountNumber'] === 'string'
          ? (bank['accountNumber'] as string)
          : '';
      const amount = Number(slip.netSalary).toFixed(2);
      lines.push(`"${name}","${account}",${amount}`);
    }

    return {
      filename: `payroll-${run.year}-${String(run.month).padStart(2, '0')}.csv`,
      content: lines.join('\n'),
    };
  }
}
