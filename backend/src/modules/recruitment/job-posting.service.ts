import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { JobPosting } from './job-posting.entity';
import { JobPostingRepository } from './job-posting.repository';
import { CreateJobPostingDto } from './dtos/create-job-posting.dto';
import { UpdateJobPostingDto } from './dtos/update-job-posting.dto';
import { JobPostingStatusEnum } from '../../common/enums/job-posting-status.enum';

@Injectable()
export class JobPostingService extends BaseService<JobPosting> {
  constructor(protected readonly repository: JobPostingRepository) {
    super(repository, 'JobPosting');
  }

  async createPosting(
    dto: CreateJobPostingDto,
    postedById: string,
  ): Promise<JobPosting> {
    const status = dto.status ?? JobPostingStatusEnum.DRAFT;
    const payload: DeepPartial<JobPosting> = {
      ...dto,
      status,
      postedById,
      postedAt: status === JobPostingStatusEnum.ACTIVE ? new Date() : null,
    };
    return this.repository.create(payload);
  }

  async updatePosting(
    id: string,
    dto: UpdateJobPostingDto,
  ): Promise<JobPosting> {
    const existing = await this.findByIdOrFail(id);
    const payload: DeepPartial<JobPosting> = { ...dto };
    if (
      dto.status === JobPostingStatusEnum.ACTIVE &&
      existing.status !== JobPostingStatusEnum.ACTIVE
    ) {
      payload.postedAt = new Date();
    }
    if (
      dto.status === JobPostingStatusEnum.CLOSED &&
      existing.status !== JobPostingStatusEnum.CLOSED
    ) {
      payload.closedAt = new Date();
    }
    return this.update(id, payload);
  }

  async publish(id: string): Promise<JobPosting> {
    return this.update(id, {
      status: JobPostingStatusEnum.ACTIVE,
      postedAt: new Date(),
    });
  }

  async close(id: string): Promise<JobPosting> {
    return this.update(id, {
      status: JobPostingStatusEnum.CLOSED,
      closedAt: new Date(),
    });
  }

  async listAll(): Promise<JobPosting[]> {
    return this.repository.listWithApplicationCount();
  }
}
