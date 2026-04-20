import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Candidate } from './candidate.entity';
import { ApplicationStatusEnum } from '../../common/enums/application-status.enum';

@Injectable()
export class CandidateRepository extends BaseRepository<Candidate> {
  constructor(
    @InjectRepository(Candidate)
    repository: Repository<Candidate>,
  ) {
    super(repository);
  }

  async findByJobPosting(jobPostingId: string): Promise<Candidate[]> {
    return this.repository.find({
      where: { jobPostingId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(status: ApplicationStatusEnum): Promise<Candidate[]> {
    return this.repository.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
  }
}
