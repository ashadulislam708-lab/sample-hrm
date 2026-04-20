import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { ReviewCycle } from './review-cycle.entity';
import { ReviewCycleRepository } from './review-cycle.repository';
import { CreateReviewCycleDto } from './dtos/create-review-cycle.dto';
import { UpdateReviewCycleDto } from './dtos/update-review-cycle.dto';
import { ReviewCycleStatusEnum } from '../../common/enums/review-cycle-status.enum';

@Injectable()
export class ReviewCycleService extends BaseService<ReviewCycle> {
  constructor(protected readonly repository: ReviewCycleRepository) {
    super(repository, 'ReviewCycle');
  }

  async createCycle(
    dto: CreateReviewCycleDto,
    createdById: string,
  ): Promise<ReviewCycle> {
    const payload: DeepPartial<ReviewCycle> = {
      title: dto.title,
      periodStart: new Date(dto.periodStart),
      periodEnd: new Date(dto.periodEnd),
      status: dto.status ?? ReviewCycleStatusEnum.DRAFT,
      createdById,
    };
    return this.repository.create(payload);
  }

  async updateCycle(
    id: string,
    dto: UpdateReviewCycleDto,
  ): Promise<ReviewCycle> {
    const payload: DeepPartial<ReviewCycle> = { ...dto } as DeepPartial<ReviewCycle>;
    if (dto.periodStart) payload.periodStart = new Date(dto.periodStart);
    if (dto.periodEnd) payload.periodEnd = new Date(dto.periodEnd);
    return this.update(id, payload);
  }

  async listActive(): Promise<ReviewCycle[]> {
    return this.repository.findActive();
  }
}
