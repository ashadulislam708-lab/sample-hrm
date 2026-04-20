import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { Interview } from './interview.entity';
import { InterviewRepository } from './interview.repository';
import { ScheduleInterviewDto } from './dtos/schedule-interview.dto';
import { InterviewFeedbackDto } from './dtos/interview-feedback.dto';

@Injectable()
export class InterviewService extends BaseService<Interview> {
  constructor(protected readonly repository: InterviewRepository) {
    super(repository, 'Interview');
  }

  async schedule(dto: ScheduleInterviewDto): Promise<Interview> {
    const payload: DeepPartial<Interview> = {
      candidateId: dto.candidateId,
      scheduledAt: new Date(dto.scheduledAt),
      interviewerIds: dto.interviewerIds ?? [],
    };
    return this.repository.create(payload);
  }

  async addFeedback(
    id: string,
    dto: InterviewFeedbackDto,
  ): Promise<Interview> {
    return this.update(id, {
      feedback: dto.feedback,
      rating: dto.rating ?? null,
    });
  }

  async listUpcoming(): Promise<Interview[]> {
    return this.repository.findUpcoming();
  }

  async listByCandidate(candidateId: string): Promise<Interview[]> {
    return this.repository.findByCandidate(candidateId);
  }
}
