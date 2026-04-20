import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanApplication } from './loan-application.entity';
import { LoanRepayment } from './loan-repayment.entity';
import { LoanRepository } from './loan.repository';
import { LoanRepaymentRepository } from './loan-repayment.repository';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoanApplication, LoanRepayment])],
  controllers: [LoanController],
  providers: [LoanRepository, LoanRepaymentRepository, LoanService],
  exports: [LoanService],
})
export class LoanModule {}
