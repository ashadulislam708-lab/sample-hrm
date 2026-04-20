import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { LateRequest } from './late-request.entity';
import { LateRequestStatusEnum } from '../../common/enums/late-request-status.enum';

@Injectable()
export class LateRequestRepository extends BaseRepository<LateRequest> {
  constructor(
    @InjectRepository(LateRequest)
    repository: Repository<LateRequest>,
  ) {
    super(repository);
  }

  async findPending(): Promise<LateRequest[]> {
    return this.repository.find({
      where: { status: LateRequestStatusEnum.PENDING },
      relations: ['user', 'attendance'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<LateRequest[]> {
    return this.repository.find({
      where: { userId },
      relations: ['attendance'],
      order: { createdAt: 'DESC' },
    });
  }

  async findPendingForReviewer(reviewerTeamMemberIds: string[]): Promise<LateRequest[]> {
    if (reviewerTeamMemberIds.length === 0) {
      return [];
    }
    return this.repository
      .createQueryBuilder('lr')
      .leftJoinAndSelect('lr.user', 'user')
      .leftJoinAndSelect('lr.attendance', 'attendance')
      .where('lr.status = :status', { status: LateRequestStatusEnum.PENDING })
      .andWhere('lr.user_id IN (:...ids)', { ids: reviewerTeamMemberIds })
      .orderBy('lr.created_at', 'DESC')
      .getMany();
  }

  async findWithRelationsById(id: string): Promise<LateRequest | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'attendance', 'reviewedBy'],
    });
  }
}
