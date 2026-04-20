import { ForbiddenException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { PerformanceReview } from './performance-review.entity';
import { PerformanceReviewRepository } from './performance-review.repository';
import { CreateReviewDto } from './dtos/create-review.dto';

@Injectable()
export class PerformanceReviewService extends BaseService<PerformanceReview> {
  protected defaultRelations: string[] = ['cycle', 'user', 'reviewer'];

  constructor(protected readonly repository: PerformanceReviewRepository) {
    super(repository, 'PerformanceReview');
  }

  async createReview(
    dto: CreateReviewDto,
    reviewerId: string,
  ): Promise<PerformanceReview> {
    const payload: DeepPartial<PerformanceReview> = {
      userId: dto.userId,
      cycleId: dto.cycleId,
      reviewerId,
      rating: dto.rating,
      strengths: dto.strengths ?? null,
      improvements: dto.improvements ?? null,
      feedback: dto.feedback ?? null,
      submittedAt: new Date(),
    };
    return this.repository.create(payload);
  }

  async submitSelfAssessment(
    reviewId: string,
    userId: string,
    content: string,
  ): Promise<PerformanceReview> {
    const review = await this.findByIdOrFail(reviewId);
    if (review.userId !== userId) {
      throw new ForbiddenException('Cannot submit self-assessment for others');
    }
    return this.update(reviewId, { selfAssessment: content });
  }

  async listOwn(userId: string): Promise<PerformanceReview[]> {
    return this.repository.findByUser(userId);
  }

  async listForUser(targetId: string): Promise<PerformanceReview[]> {
    return this.repository.findByUser(targetId);
  }
}
