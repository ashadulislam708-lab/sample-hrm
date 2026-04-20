import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './policy.entity';
import { PolicyAcknowledgement } from './policy-acknowledgement.entity';
import { UsersModule } from '../users/user.module';
import { PolicyRepository } from './policy.repository';
import { PolicyAcknowledgementRepository } from './policy-acknowledgement.repository';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Policy, PolicyAcknowledgement]),
    UsersModule,
  ],
  controllers: [PolicyController],
  providers: [
    PolicyRepository,
    PolicyAcknowledgementRepository,
    PolicyService,
  ],
  exports: [PolicyService],
})
export class PolicyModule {}
