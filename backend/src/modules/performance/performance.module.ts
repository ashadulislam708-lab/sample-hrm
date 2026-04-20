import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { DailyNote } from './daily-note.entity';
import { ProjectEvaluation } from './project-evaluation.entity';
import { ReviewCycle } from './review-cycle.entity';
import { PerformanceReview } from './performance-review.entity';
import { UsersModule } from '../users/user.module';
import { GoalRepository } from './goal.repository';
import { DailyNoteRepository } from './daily-note.repository';
import { ProjectEvaluationRepository } from './project-evaluation.repository';
import { ReviewCycleRepository } from './review-cycle.repository';
import { PerformanceReviewRepository } from './performance-review.repository';
import { GoalService } from './goal.service';
import { DailyNoteService } from './daily-note.service';
import { ProjectEvaluationService } from './project-evaluation.service';
import { ReviewCycleService } from './review-cycle.service';
import { PerformanceReviewService } from './performance-review.service';
import { GoalController } from './goal.controller';
import { DailyNoteController } from './daily-note.controller';
import { ProjectEvaluationController } from './project-evaluation.controller';
import { ReviewCycleController } from './review-cycle.controller';
import { PerformanceReviewController } from './performance-review.controller';
import { NOTION_DAILY_NOTE_HANDLER } from '../../infrastructure/notion/notion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Goal,
      DailyNote,
      ProjectEvaluation,
      ReviewCycle,
      PerformanceReview,
    ]),
    UsersModule,
  ],
  controllers: [
    GoalController,
    DailyNoteController,
    ProjectEvaluationController,
    ReviewCycleController,
    PerformanceReviewController,
  ],
  providers: [
    GoalRepository,
    DailyNoteRepository,
    ProjectEvaluationRepository,
    ReviewCycleRepository,
    PerformanceReviewRepository,
    GoalService,
    DailyNoteService,
    ProjectEvaluationService,
    ReviewCycleService,
    PerformanceReviewService,
    {
      provide: NOTION_DAILY_NOTE_HANDLER,
      useExisting: DailyNoteService,
    },
  ],
  exports: [
    GoalService,
    DailyNoteService,
    ProjectEvaluationService,
    ReviewCycleService,
    PerformanceReviewService,
  ],
})
export class PerformanceModule {}
