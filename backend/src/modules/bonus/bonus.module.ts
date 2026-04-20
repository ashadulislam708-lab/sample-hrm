import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonus } from './bonus.entity';
import { BonusRepository } from './bonus.repository';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bonus])],
  controllers: [BonusController],
  providers: [BonusRepository, BonusService],
  exports: [BonusService],
})
export class BonusModule {}
