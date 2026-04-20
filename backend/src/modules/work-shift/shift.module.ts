import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftRequest } from './shift-request.entity';
import { ShiftRepository } from './shift.repository';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftRequest])],
  controllers: [ShiftController],
  providers: [ShiftRepository, ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
