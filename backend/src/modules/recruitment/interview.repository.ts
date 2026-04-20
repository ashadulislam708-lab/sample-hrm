import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Interview } from './interview.entity';

@Injectable()
export class InterviewRepository extends BaseRepository<Interview> {
  constructor(
    @InjectRepository(Interview)
    repository: Repository<Interview>,
  ) {
    super(repository);
  }

  async findByCandidate(candidateId: string): Promise<Interview[]> {
    return this.repository.find({
      where: { candidateId },
      order: { scheduledAt: 'DESC' },
    });
  }

  async findUpcoming(): Promise<Interview[]> {
    return this.repository.find({
      where: { scheduledAt: MoreThanOrEqual(new Date()) },
      order: { scheduledAt: 'ASC' },
      relations: ['candidate'],
    });
  }
}
