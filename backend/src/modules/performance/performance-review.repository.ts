import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { PerformanceReview } from './performance-review.entity';

@Injectable()
export class PerformanceReviewRepository extends BaseRepository<PerformanceReview> {
  constructor(
    @InjectRepository(PerformanceReview)
    repository: Repository<PerformanceReview>,
  ) {
    super(repository);
  }

  async findByUser(userId: string): Promise<PerformanceReview[]> {
    return this.repository.find({
      where: { userId },
      relations: ['cycle', 'reviewer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCycle(cycleId: string): Promise<PerformanceReview[]> {
    return this.repository.find({
      where: { cycleId },
      relations: ['user', 'reviewer'],
      order: { createdAt: 'DESC' },
    });
  }
}
