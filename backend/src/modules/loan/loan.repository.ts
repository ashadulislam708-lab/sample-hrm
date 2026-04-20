import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { LoanApplication } from './loan-application.entity';
import { LoanStatusEnum } from '../../common/enums/loan-status.enum';

export interface LoanFilters {
  userId?: string;
  status?: LoanStatusEnum;
}

@Injectable()
export class LoanRepository extends BaseRepository<LoanApplication> {
  constructor(
    @InjectRepository(LoanApplication)
    repository: Repository<LoanApplication>,
  ) {
    super(repository);
  }

  async findActiveByUser(userId: string): Promise<LoanApplication | null> {
    return this.repository.findOne({
      where: { userId, status: LoanStatusEnum.ACTIVE },
      relations: ['repayments'],
    });
  }

  async findPending(): Promise<LoanApplication[]> {
    return this.repository.find({
      where: { status: LoanStatusEnum.PENDING },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findWithRepayments(id: string): Promise<LoanApplication | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'approvedBy', 'repayments'],
    });
  }

  async listWithFilters(
    filters: LoanFilters,
    page = 1,
    limit = 20,
  ): Promise<{ items: LoanApplication[]; total: number }> {
    const qb = this.repository
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.user', 'user');

    if (filters.userId) {
      qb.andWhere('loan.user_id = :userId', { userId: filters.userId });
    }
    if (filters.status) {
      qb.andWhere('loan.status = :status', { status: filters.status });
    }
    qb.orderBy('loan.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
