import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { LeaveRequest } from './leave-request.entity';
import { LeaveStatusEnum } from '../../common/enums/leave-status.enum';
import { LeaveTypeEnum } from '../../common/enums/leave-type.enum';

export interface LeaveFilters {
  userId?: string;
  leaveType?: LeaveTypeEnum;
  status?: LeaveStatusEnum;
  from?: Date;
  to?: Date;
}

@Injectable()
export class LeaveRepository extends BaseRepository<LeaveRequest> {
  constructor(
    @InjectRepository(LeaveRequest)
    repository: Repository<LeaveRequest>,
  ) {
    super(repository);
  }

  async findOverlapping(
    userId: string,
    startDate: Date,
    endDate: Date,
    excludeId?: string,
  ): Promise<LeaveRequest[]> {
    const qb = this.repository
      .createQueryBuilder('lr')
      .where('lr.user_id = :userId', { userId })
      .andWhere('lr.status IN (:...statuses)', {
        statuses: [LeaveStatusEnum.PENDING, LeaveStatusEnum.APPROVED],
      })
      .andWhere('lr.start_date <= :endDate AND lr.end_date >= :startDate', {
        startDate,
        endDate,
      });
    if (excludeId) {
      qb.andWhere('lr.id != :excludeId', { excludeId });
    }
    return qb.getMany();
  }

  async findForReviewer(reviewerTeamMemberIds: string[]): Promise<LeaveRequest[]> {
    if (reviewerTeamMemberIds.length === 0) return [];
    return this.repository
      .createQueryBuilder('lr')
      .leftJoinAndSelect('lr.user', 'user')
      .where('lr.status = :status', { status: LeaveStatusEnum.PENDING })
      .andWhere('lr.user_id IN (:...ids)', { ids: reviewerTeamMemberIds })
      .orderBy('lr.created_at', 'DESC')
      .getMany();
  }

  async listWithFilters(
    filters: LeaveFilters,
    page = 1,
    limit = 20,
  ): Promise<{ items: LeaveRequest[]; total: number }> {
    const qb = this.repository
      .createQueryBuilder('lr')
      .leftJoinAndSelect('lr.user', 'user');

    if (filters.userId) {
      qb.andWhere('lr.user_id = :userId', { userId: filters.userId });
    }
    if (filters.leaveType) {
      qb.andWhere('lr.leave_type = :lt', { lt: filters.leaveType });
    }
    if (filters.status) {
      qb.andWhere('lr.status = :st', { st: filters.status });
    }
    if (filters.from && filters.to) {
      qb.andWhere(
        'lr.start_date <= :to AND lr.end_date >= :from',
        { from: filters.from, to: filters.to },
      );
    }

    qb.orderBy('lr.start_date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async findActiveEmergency(): Promise<LeaveRequest[]> {
    return this.repository
      .createQueryBuilder('lr')
      .leftJoinAndSelect('lr.user', 'user')
      .where('lr.leave_type = :type', { type: LeaveTypeEnum.EMERGENCY })
      .andWhere('lr.returned_at IS NULL')
      .andWhere('lr.status IN (:...sts)', {
        sts: [LeaveStatusEnum.PENDING, LeaveStatusEnum.APPROVED],
      })
      .orderBy('lr.created_at', 'DESC')
      .getMany();
  }
}
