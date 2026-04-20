import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { LeaveBalance } from './leave-balance.entity';

@Injectable()
export class LeaveBalanceRepository extends BaseRepository<LeaveBalance> {
  constructor(
    @InjectRepository(LeaveBalance)
    repository: Repository<LeaveBalance>,
  ) {
    super(repository);
  }

  async findByUserAndYear(
    userId: string,
    year: number,
  ): Promise<LeaveBalance | null> {
    return this.repository.findOne({
      where: { userId, year },
    });
  }
}
