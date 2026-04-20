import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { Candidate } from './candidate.entity';
import { CandidateRepository } from './candidate.repository';
import { CreateCandidateDto } from './dtos/create-candidate.dto';
import { UpdateCandidateStatusDto } from './dtos/update-candidate-status.dto';
import { ApplicationStatusEnum } from '../../common/enums/application-status.enum';

export interface OnboardingPayload {
  email: string;
  fullName: string;
  phone: string | null;
  resumeUrl: string | null;
  candidateId: string;
  jobPostingId: string;
}

@Injectable()
export class CandidateService extends BaseService<Candidate> {
  constructor(protected readonly repository: CandidateRepository) {
    super(repository, 'Candidate');
  }

  async createCandidate(dto: CreateCandidateDto): Promise<Candidate> {
    const payload: DeepPartial<Candidate> = {
      jobPostingId: dto.jobPostingId,
      fullName: dto.fullName,
      email: dto.email.toLowerCase(),
      phone: dto.phone ?? null,
      resumeUrl: dto.resumeUrl ?? null,
      notes: dto.notes ?? null,
      status: ApplicationStatusEnum.NEW,
    };
    return this.repository.create(payload);
  }

  async updateStatus(
    id: string,
    dto: UpdateCandidateStatusDto,
  ): Promise<Candidate> {
    const payload: DeepPartial<Candidate> = { status: dto.status };
    if (dto.currentStage !== undefined) payload.currentStage = dto.currentStage;
    if (dto.notes !== undefined) payload.notes = dto.notes;
    return this.update(id, payload);
  }

  async listByPosting(jobPostingId: string): Promise<Candidate[]> {
    return this.repository.findByJobPosting(jobPostingId);
  }

  async onboardToEmployee(id: string): Promise<OnboardingPayload> {
    const candidate = await this.findByIdOrFail(id);
    await this.update(id, { status: ApplicationStatusEnum.HIRED });
    return {
      email: candidate.email,
      fullName: candidate.fullName,
      phone: candidate.phone,
      resumeUrl: candidate.resumeUrl,
      candidateId: candidate.id,
      jobPostingId: candidate.jobPostingId,
    };
  }
}
