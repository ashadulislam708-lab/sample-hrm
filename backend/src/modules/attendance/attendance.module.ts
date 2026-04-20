import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { LateRequest } from './late-request.entity';
import { User } from '../users/user.entity';
import { AttendanceRepository } from './attendance.repository';
import { LateRequestRepository } from './late-request.repository';
import { AttendanceService } from './attendance.service';
import { LateRequestService } from './late-request.service';
import { AttendanceController } from './attendance.controller';
import { LateRequestController } from './late-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, LateRequest, User])],
  controllers: [AttendanceController, LateRequestController],
  providers: [
    AttendanceRepository,
    LateRequestRepository,
    AttendanceService,
    LateRequestService,
  ],
  exports: [AttendanceService, LateRequestService],
})
export class AttendanceModule {}
