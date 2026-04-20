import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeConfig } from './office-config.entity';
import { OfficeConfigRepository } from './office-config.repository';
import { OfficeConfigService } from './office-config.service';
import { OfficeConfigController } from './office-config.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OfficeConfig])],
  controllers: [OfficeConfigController],
  providers: [OfficeConfigRepository, OfficeConfigService],
  exports: [OfficeConfigService],
})
export class OfficeConfigModule {}
