import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './leave-request.entity';
import { LeaveBalance } from './leave-balance.entity';
import { LeaveRepository } from './leave.repository';
import { LeaveBalanceRepository } from './leave-balance.repository';
import { LeaveService } from './leave.service';
import { EmergencyLeaveService } from './emergency-leave.service';
import { LeaveController } from './leave.controller';
import { EmergencyLeaveController } from './emergency-leave.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, LeaveBalance])],
  controllers: [LeaveController, EmergencyLeaveController],
  providers: [
    LeaveRepository,
    LeaveBalanceRepository,
    LeaveService,
    EmergencyLeaveService,
  ],
  exports: [LeaveService, EmergencyLeaveService],
})
export class LeaveModule {}
