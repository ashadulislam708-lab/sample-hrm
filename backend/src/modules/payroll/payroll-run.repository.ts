import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { PayrollRun } from './payroll-run.entity';

@Injectable()
export class PayrollRunRepository extends BaseRepository<PayrollRun> {
  constructor(
    @InjectRepository(PayrollRun)
    repository: Repository<PayrollRun>,
  ) {
    super(repository);
  }

  async findByMonthYear(
    month: number,
    year: number,
  ): Promise<PayrollRun | null> {
    return this.repository.findOne({ where: { month, year } });
  }

  async listRecent(limit = 12): Promise<PayrollRun[]> {
    return this.repository.find({
      order: { year: 'DESC', month: 'DESC' },
      take: limit,
    });
  }

  async findWithPayslips(id: string): Promise<PayrollRun | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['payslips', 'payslips.user', 'createdBy', 'approvedBy'],
    });
  }
}
