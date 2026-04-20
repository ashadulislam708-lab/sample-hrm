import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { CustomModule } from './custom-module.entity';
import { ModuleStatusEnum } from '../../common/enums/module-status.enum';

@Injectable()
export class CustomModuleRepository extends BaseRepository<CustomModule> {
  constructor(
    @InjectRepository(CustomModule)
    repository: Repository<CustomModule>,
  ) {
    super(repository);
  }

  async listActive(): Promise<CustomModule[]> {
    return this.repository.find({
      where: { status: ModuleStatusEnum.ENABLED },
      order: { name: 'ASC' },
    });
  }
}
