import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomModule } from './custom-module.entity';
import { CustomModuleRepository } from './custom-module.repository';
import { CustomModuleService } from './custom-module.service';
import { CustomModuleController } from './custom-module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomModule])],
  controllers: [CustomModuleController],
  providers: [CustomModuleRepository, CustomModuleService],
  exports: [CustomModuleService],
})
export class ModuleConfigModule {}
