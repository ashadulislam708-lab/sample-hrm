import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { PolicyAcknowledgement } from './policy-acknowledgement.entity';

@Injectable()
export class PolicyAcknowledgementRepository extends BaseRepository<PolicyAcknowledgement> {
  constructor(
    @InjectRepository(PolicyAcknowledgement)
    repository: Repository<PolicyAcknowledgement>,
  ) {
    super(repository);
  }

  async findByUserAndPolicy(
    userId: string,
    policyId: string,
  ): Promise<PolicyAcknowledgement | null> {
    return this.repository.findOne({ where: { userId, policyId } });
  }

  async listByPolicy(policyId: string): Promise<PolicyAcknowledgement[]> {
    return this.repository.find({
      where: { policyId },
      relations: ['user'],
      order: { acknowledgedAt: 'DESC' },
    });
  }

  async listByUser(userId: string): Promise<PolicyAcknowledgement[]> {
    return this.repository.find({
      where: { userId },
      relations: ['policy'],
      order: { acknowledgedAt: 'DESC' },
    });
  }

  async countByPolicy(policyId: string): Promise<number> {
    return this.repository.count({ where: { policyId } });
  }
}
