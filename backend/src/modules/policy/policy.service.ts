import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { Policy } from './policy.entity';
import { PolicyRepository } from './policy.repository';
import { PolicyAcknowledgement } from './policy-acknowledgement.entity';
import { PolicyAcknowledgementRepository } from './policy-acknowledgement.repository';
import { UserRepository } from '../users/user.repository';
import { CreatePolicyDto } from './dtos/create-policy.dto';
import { UpdatePolicyDto } from './dtos/update-policy.dto';
import { PolicyStatusEnum } from '../../common/enums/policy-status.enum';
import { PolicyAckStatusDto } from './dtos/policy-response.dto';
import { UserStatusEnum } from '../../common/enums/user-status.enum';

@Injectable()
export class PolicyService extends BaseService<Policy> {
  constructor(
    protected readonly repository: PolicyRepository,
    private readonly ackRepository: PolicyAcknowledgementRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(repository, 'Policy');
  }

  async createPolicy(dto: CreatePolicyDto, publishedById: string): Promise<Policy> {
    const existing = await this.repository.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictException(`Policy slug '${dto.slug}' already in use`);
    }
    const status = dto.status ?? PolicyStatusEnum.DRAFT;
    const payload: DeepPartial<Policy> = {
      title: dto.title,
      slug: dto.slug,
      content: dto.content,
      category: dto.category ?? null,
      status,
      version: 1,
      publishedById: status === PolicyStatusEnum.ACTIVE ? publishedById : null,
      publishedAt: status === PolicyStatusEnum.ACTIVE ? new Date() : null,
    };
    return this.repository.create(payload);
  }

  async updatePolicy(
    id: string,
    dto: UpdatePolicyDto,
    publishedById: string,
  ): Promise<Policy> {
    const existing = await this.findByIdOrFail(id);
    if (dto.slug && dto.slug !== existing.slug) {
      const collision = await this.repository.findBySlug(dto.slug);
      if (collision) {
        throw new ConflictException(`Policy slug '${dto.slug}' already in use`);
      }
    }
    const becamePublished =
      dto.status === PolicyStatusEnum.ACTIVE &&
      existing.status !== PolicyStatusEnum.ACTIVE;
    const payload: DeepPartial<Policy> = {
      ...(dto as DeepPartial<Policy>),
    };
    if (becamePublished) {
      payload.version = existing.version + 1;
      payload.publishedById = publishedById;
      payload.publishedAt = new Date();
    }
    return this.update(id, payload);
  }

  async findBySlugOrFail(slug: string): Promise<Policy> {
    const policy = await this.repository.findBySlug(slug);
    if (!policy) {
      throw new NotFoundException(`Policy with slug ${slug} not found`);
    }
    return policy;
  }

  async listForEmployee(): Promise<Policy[]> {
    return this.repository.listActive();
  }

  async acknowledge(
    userId: string,
    policyId: string,
  ): Promise<PolicyAcknowledgement> {
    await this.findByIdOrFail(policyId);
    const existing = await this.ackRepository.findByUserAndPolicy(userId, policyId);
    if (existing) {
      return existing;
    }
    return this.ackRepository.create({
      userId,
      policyId,
      acknowledgedAt: new Date(),
    });
  }

  async ackStatus(policyId: string): Promise<PolicyAckStatusDto> {
    await this.findByIdOrFail(policyId);
    const acknowledgedCount = await this.ackRepository.countByPolicy(policyId);
    const totalUsers = await this.userRepository.count({
      where: { status: UserStatusEnum.ACTIVE },
    });
    return {
      totalUsers,
      acknowledgedCount,
      pendingCount: Math.max(totalUsers - acknowledgedCount, 0),
    };
  }

  async listAcknowledgements(
    policyId: string,
  ): Promise<PolicyAcknowledgement[]> {
    await this.findByIdOrFail(policyId);
    return this.ackRepository.listByPolicy(policyId);
  }
}
