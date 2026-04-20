import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { OfficeConfig } from './office-config.entity';

@Injectable()
export class OfficeConfigRepository extends BaseRepository<OfficeConfig> {
  constructor(
    @InjectRepository(OfficeConfig)
    repository: Repository<OfficeConfig>,
  ) {
    super(repository);
  }

  async findByKey(key: string): Promise<OfficeConfig | null> {
    return this.repository.findOne({ where: { key } });
  }

  async findAllOrdered(): Promise<OfficeConfig[]> {
    return this.repository.find({ order: { key: 'ASC' } });
  }

  async deleteAll(): Promise<void> {
    await this.repository.clear();
  }
}
