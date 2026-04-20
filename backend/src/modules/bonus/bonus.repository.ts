import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Bonus } from './bonus.entity';
import { BonusTypeEnum } from '../../common/enums/bonus-type.enum';

export interface BonusFilters {
  userId?: string;
  type?: BonusTypeEnum;
  from?: Date;
  to?: Date;
}

@Injectable()
export class BonusRepository extends BaseRepository<Bonus> {
  constructor(
    @InjectRepository(Bonus)
    repository: Repository<Bonus>,
  ) {
    super(repository);
  }

  async listByType(type: BonusTypeEnum): Promise<Bonus[]> {
    return this.repository.find({
      where: { type },
      relations: ['user'],
      order: { awardedAt: 'DESC' },
    });
  }

  async listByUser(userId: string): Promise<Bonus[]> {
    return this.repository.find({
      where: { userId },
      order: { awardedAt: 'DESC' },
    });
  }

  async findPendingForPayroll(
    month: number,
    year: number,
  ): Promise<Bonus[]> {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59));
    return this.repository.find({
      where: {
        awardedAt: Between(start, end),
        payrollRunId: IsNull(),
      },
      relations: ['user'],
    });
  }

  async findPendingForUserAndMonth(
    userId: string,
    month: number,
    year: number,
  ): Promise<Bonus[]> {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59));
    return this.repository.find({
      where: {
        userId,
        awardedAt: Between(start, end),
        payrollRunId: IsNull(),
      },
    });
  }

  async listWithFilters(
    filters: BonusFilters,
    page = 1,
    limit = 20,
  ): Promise<{ items: Bonus[]; total: number }> {
    const qb = this.repository
      .createQueryBuilder('bonus')
      .leftJoinAndSelect('bonus.user', 'user');

    if (filters.userId) {
      qb.andWhere('bonus.user_id = :userId', { userId: filters.userId });
    }
    if (filters.type) {
      qb.andWhere('bonus.type = :type', { type: filters.type });
    }
    if (filters.from && filters.to) {
      qb.andWhere('bonus.awarded_at BETWEEN :from AND :to', {
        from: filters.from,
        to: filters.to,
      });
    }
    qb.orderBy('bonus.awarded_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
