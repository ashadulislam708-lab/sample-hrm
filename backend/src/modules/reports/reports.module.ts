import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '../attendance/attendance.entity';
import { LeaveRequest } from '../leave/leave-request.entity';
import { Payslip } from '../payroll/payslip.entity';
import { LoanApplication } from '../loan/loan-application.entity';
import { PerformanceReview } from '../performance/performance-review.entity';
import { DailyNote } from '../performance/daily-note.entity';
import { User } from '../users/user.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance,
      LeaveRequest,
      Payslip,
      LoanApplication,
      PerformanceReview,
      DailyNote,
      User,
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
