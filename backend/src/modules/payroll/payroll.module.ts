import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollRun } from './payroll-run.entity';
import { Payslip } from './payslip.entity';
import { User } from '../users/user.entity';
import { PayrollRunRepository } from './payroll-run.repository';
import { PayslipRepository } from './payslip.repository';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { LoanModule } from '../loan/loan.module';
import { BonusModule } from '../bonus/bonus.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayrollRun, Payslip, User]),
    LoanModule,
    BonusModule,
  ],
  controllers: [PayrollController],
  providers: [PayrollRunRepository, PayslipRepository, PayrollService],
  exports: [PayrollService],
})
export class PayrollModule {}
