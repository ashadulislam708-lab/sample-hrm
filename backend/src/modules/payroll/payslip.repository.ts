import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Payslip } from './payslip.entity';

@Injectable()
export class PayslipRepository extends BaseRepository<Payslip> {
  constructor(
    @InjectRepository(Payslip)
    repository: Repository<Payslip>,
  ) {
    super(repository);
  }

  async findByUserAndRun(
    userId: string,
    payrollRunId: string,
  ): Promise<Payslip | null> {
    return this.repository.findOne({
      where: { userId, payrollRunId },
    });
  }

  async findByRun(payrollRunId: string): Promise<Payslip[]> {
    return this.repository.find({
      where: { payrollRunId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }

  async listByUser(userId: string): Promise<Payslip[]> {
    return this.repository.find({
      where: { userId },
      relations: ['payrollRun'],
      order: { createdAt: 'DESC' },
    });
  }
}
