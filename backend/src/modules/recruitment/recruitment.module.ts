import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './job-posting.entity';
import { Candidate } from './candidate.entity';
import { Interview } from './interview.entity';
import { JobPostingRepository } from './job-posting.repository';
import { CandidateRepository } from './candidate.repository';
import { InterviewRepository } from './interview.repository';
import { JobPostingService } from './job-posting.service';
import { CandidateService } from './candidate.service';
import { InterviewService } from './interview.service';
import { JobPostingController } from './job-posting.controller';
import { CandidateController } from './candidate.controller';
import { InterviewController } from './interview.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting, Candidate, Interview])],
  controllers: [JobPostingController, CandidateController, InterviewController],
  providers: [
    JobPostingRepository,
    CandidateRepository,
    InterviewRepository,
    JobPostingService,
    CandidateService,
    InterviewService,
  ],
  exports: [JobPostingService, CandidateService, InterviewService],
})
export class RecruitmentModule {}
