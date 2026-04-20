import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { IntegrationConfig } from './integration-config.entity';
import { IntegrationConfigRepository } from './integration-config.repository';
import { IntegrationProviderEnum } from '../../common/enums/integration-provider.enum';
import { UpdateIntegrationDto } from './dtos/update-integration.dto';
import { SlackService } from '../../infrastructure/slack/slack.service';
import { GatherService } from '../../infrastructure/gather-town/gather.service';
import { NotionService } from '../../infrastructure/notion/notion.service';

export interface ConnectionTestResult {
  provider: IntegrationProviderEnum;
  success: boolean;
  message: string;
  timestamp: string;
}

@Injectable()
export class IntegrationConfigService {
  constructor(
    private readonly repository: IntegrationConfigRepository,
    private readonly slackService: SlackService,
    private readonly gatherService: GatherService,
    private readonly notionService: NotionService,
  ) {}

  async listAll(): Promise<IntegrationConfig[]> {
    return this.repository.findAllOrdered();
  }

  async getByProvider(
    provider: IntegrationProviderEnum,
  ): Promise<IntegrationConfig | null> {
    return this.repository.findByProvider(provider);
  }

  async upsertByProvider(
    provider: IntegrationProviderEnum,
    dto: UpdateIntegrationDto,
    updatedById: string,
  ): Promise<IntegrationConfig> {
    const existing = await this.repository.findByProvider(provider);
    if (existing) {
      const payload: DeepPartial<IntegrationConfig> = {
        configJson: dto.configJson,
        connected: dto.connected ?? existing.connected,
        updatedById,
      };
      const updated = await this.repository.update(existing.id, payload);
      return updated ?? existing;
    }
    return this.repository.create({
      provider,
      configJson: dto.configJson,
      connected: dto.connected ?? false,
      updatedById,
    });
  }

  async testConnection(
    provider: IntegrationProviderEnum,
  ): Promise<ConnectionTestResult> {
    switch (provider) {
      case IntegrationProviderEnum.SLACK: {
        const r = await this.slackService.testConnection();
        await this.markConnected(provider, r.success);
        return { provider, ...r };
      }
      case IntegrationProviderEnum.GATHER: {
        const r = await this.gatherService.testConnection();
        await this.markConnected(provider, r.success);
        return { provider, ...r };
      }
      case IntegrationProviderEnum.NOTION: {
        const r = await this.notionService.testConnection();
        await this.markConnected(provider, r.success);
        return { provider, ...r };
      }
      default:
        return {
          provider,
          success: false,
          message: `No connection test implemented for ${provider}`,
          timestamp: new Date().toISOString(),
        };
    }
  }

  private async markConnected(
    provider: IntegrationProviderEnum,
    connected: boolean,
  ): Promise<void> {
    const existing = await this.repository.findByProvider(provider);
    if (!existing) return;
    await this.repository.update(existing.id, {
      connected,
      lastSyncAt: connected ? new Date() : existing.lastSyncAt,
    });
  }
}
