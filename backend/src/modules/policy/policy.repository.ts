import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Policy } from './policy.entity';
import { PolicyStatusEnum } from '../../common/enums/policy-status.enum';

@Injectable()
export class PolicyRepository extends BaseRepository<Policy> {
  constructor(
    @InjectRepository(Policy)
    repository: Repository<Policy>,
  ) {
    super(repository);
  }

  async listActive(): Promise<Policy[]> {
    return this.repository.find({
      where: { status: PolicyStatusEnum.ACTIVE },
      order: { publishedAt: 'DESC' },
    });
  }

  async findBySlug(slug: string): Promise<Policy | null> {
    return this.repository.findOne({ where: { slug } });
  }
}
