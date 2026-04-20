import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { LoanRepayment } from './loan-repayment.entity';

@Injectable()
export class LoanRepaymentRepository extends BaseRepository<LoanRepayment> {
  constructor(
    @InjectRepository(LoanRepayment)
    repository: Repository<LoanRepayment>,
  ) {
    super(repository);
  }

  async findForLoan(loanId: string): Promise<LoanRepayment[]> {
    return this.repository.find({
      where: { loanId },
      order: { dueDate: 'ASC' },
    });
  }

  async findNextPendingForLoan(loanId: string): Promise<LoanRepayment | null> {
    return this.repository.findOne({
      where: { loanId, paidAt: IsNull() },
      order: { dueDate: 'ASC' },
    });
  }

  async findDueInMonth(
    month: number,
    year: number,
  ): Promise<LoanRepayment[]> {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59));
    return this.repository.find({
      where: {
        dueDate: Between(start, end),
        paidAt: IsNull(),
      },
      relations: ['loan'],
    });
  }
}
