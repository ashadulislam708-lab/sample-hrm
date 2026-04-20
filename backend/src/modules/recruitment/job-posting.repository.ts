import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { JobPosting } from './job-posting.entity';
import { JobPostingStatusEnum } from '../../common/enums/job-posting-status.enum';

@Injectable()
export class JobPostingRepository extends BaseRepository<JobPosting> {
  constructor(
    @InjectRepository(JobPosting)
    repository: Repository<JobPosting>,
  ) {
    super(repository);
  }

  async listActive(): Promise<JobPosting[]> {
    return this.repository.find({
      where: { status: JobPostingStatusEnum.ACTIVE },
      order: { postedAt: 'DESC' },
    });
  }

  async listWithApplicationCount(): Promise<
    Array<JobPosting & { applicationCount: number }>
  > {
    const rows = await this.repository
      .createQueryBuilder('posting')
      .loadRelationCountAndMap('posting.applicationCount', 'posting.candidates')
      .orderBy('posting.created_at', 'DESC')
      .getMany();
    return rows as Array<JobPosting & { applicationCount: number }>;
  }
}
