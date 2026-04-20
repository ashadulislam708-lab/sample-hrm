import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { ReviewCycle } from './review-cycle.entity';
import { ReviewCycleStatusEnum } from '../../common/enums/review-cycle-status.enum';

@Injectable()
export class ReviewCycleRepository extends BaseRepository<ReviewCycle> {
  constructor(
    @InjectRepository(ReviewCycle)
    repository: Repository<ReviewCycle>,
  ) {
    super(repository);
  }

  async findActive(): Promise<ReviewCycle[]> {
    return this.repository.find({
      where: { status: ReviewCycleStatusEnum.ACTIVE },
      order: { periodStart: 'DESC' },
    });
  }
}
