import { Injectable, Logger } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { CustomModule } from './custom-module.entity';
import { CustomModuleRepository } from './custom-module.repository';
import { CreateModuleDto } from './dtos/create-module.dto';
import { UpdateModuleDto } from './dtos/update-module.dto';
import { ModuleStatusEnum } from '../../common/enums/module-status.enum';

export interface CustomMetricResult {
  value: number;
  computedAt: Date;
  sourceUrl: string | null;
}

@Injectable()
export class CustomModuleService extends BaseService<CustomModule> {
  private readonly logger = new Logger(CustomModuleService.name);

  constructor(protected readonly repository: CustomModuleRepository) {
    super(repository, 'CustomModule');
  }

  async createModule(
    dto: CreateModuleDto,
    createdById: string,
  ): Promise<CustomModule> {
    const payload: DeepPartial<CustomModule> = {
      ...dto,
      metricsConfig: dto.metricsConfig ?? {},
      weighting: dto.weighting ?? 1,
      status: dto.status ?? ModuleStatusEnum.ENABLED,
      createdById,
    };
    return this.repository.create(payload);
  }

  async updateModule(id: string, dto: UpdateModuleDto): Promise<CustomModule> {
    return this.update(id, { ...dto });
  }

  async toggle(id: string, status: ModuleStatusEnum): Promise<CustomModule> {
    return this.update(id, { status });
  }

  async listActive(): Promise<CustomModule[]> {
    return this.repository.listActive();
  }

  async executeCustomMetric(
    moduleId: string,
    userId: string,
  ): Promise<CustomMetricResult> {
    const mod = await this.findByIdOrFail(moduleId);
    // Placeholder: real implementation would call mod.dataSourceUrl with userId
    this.logger.debug(
      `executeCustomMetric moduleId=${moduleId} userId=${userId} dataSource=${mod.dataSourceUrl ?? 'none'}`,
    );
    return {
      value: 0,
      computedAt: new Date(),
      sourceUrl: mod.dataSourceUrl,
    };
  }
}
