import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationConfig } from './integration-config.entity';
import { IntegrationConfigRepository } from './integration-config.repository';
import { IntegrationConfigService } from './integration-config.service';
import { IntegrationConfigController } from './integration-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IntegrationConfig])],
  controllers: [IntegrationConfigController],
  providers: [IntegrationConfigRepository, IntegrationConfigService],
  exports: [IntegrationConfigService],
})
export class IntegrationsModule {}
