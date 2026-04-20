import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { IntegrationConfig } from './integration-config.entity';
import { IntegrationProviderEnum } from '../../common/enums/integration-provider.enum';

@Injectable()
export class IntegrationConfigRepository extends BaseRepository<IntegrationConfig> {
  constructor(
    @InjectRepository(IntegrationConfig)
    repository: Repository<IntegrationConfig>,
  ) {
    super(repository);
  }

  async findByProvider(
    provider: IntegrationProviderEnum,
  ): Promise<IntegrationConfig | null> {
    return this.repository.findOne({ where: { provider } });
  }

  async findAllOrdered(): Promise<IntegrationConfig[]> {
    return this.repository.find({ order: { provider: 'ASC' } });
  }
}
