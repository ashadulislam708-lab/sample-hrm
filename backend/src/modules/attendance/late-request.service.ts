import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { LateRequest } from './late-request.entity';
import { LateRequestRepository } from './late-request.repository';
import { AttendanceRepository } from './attendance.repository';
import { LateRequestStatusEnum } from '../../common/enums/late-request-status.enum';
import { AttendanceStatusEnum } from '../../common/enums/attendance-status.enum';
import { RoleEnum } from '../../common/enums/role.enum';

@Injectable()
export class LateRequestService extends BaseService<LateRequest> {
  protected defaultRelations: string[] = ['user', 'attendance', 'reviewedBy'];

  constructor(
    protected readonly repository: LateRequestRepository,
    private readonly attendanceRepository: AttendanceRepository,
  ) {
    super(repository, 'LateRequest');
  }

  async createForUser(
    userId: string,
    attendanceId: string,
    reason: string,
  ): Promise<LateRequest> {
    const attendance = await this.attendanceRepository.findById(attendanceId);
    if (!attendance) {
      throw new NotFoundException('Attendance record not found');
    }
    if (attendance.userId !== userId) {
      throw new ForbiddenException(
        'Cannot create a late request for another user',
      );
    }
    if (
      attendance.status !== AttendanceStatusEnum.LATE &&
      attendance.status !== AttendanceStatusEnum.LATE_GRACE
    ) {
      throw new BadRequestException(
        'Late request only allowed for late attendance records',
      );
    }

    return this.repository.create({
      userId,
      attendanceId,
      reason,
      status: LateRequestStatusEnum.PENDING,
    });
  }

  async listPending(): Promise<LateRequest[]> {
    return this.repository.findPending();
  }

  async listForUser(userId: string): Promise<LateRequest[]> {
    return this.repository.findByUser(userId);
  }

  private async assertCanReview(
    request: LateRequest,
    reviewerId: string,
    reviewerRole: RoleEnum,
  ): Promise<void> {
    if (request.status !== LateRequestStatusEnum.PENDING) {
      throw new BadRequestException('Only pending requests can be reviewed');
    }
    if (reviewerRole === RoleEnum.EMPLOYEE) {
      throw new ForbiddenException('Employees cannot approve late requests');
    }
    if (request.userId === reviewerId) {
      throw new ForbiddenException('Cannot review your own late request');
    }
  }

  async approve(
    id: string,
    reviewerId: string,
    reviewerRole: RoleEnum,
    decisionNote?: string,
  ): Promise<LateRequest> {
    const existing = await this.repository.findWithRelationsById(id);
    if (!existing) {
      throw new NotFoundException('Late request not found');
    }
    await this.assertCanReview(existing, reviewerId, reviewerRole);

    const updated = await this.repository.update(id, {
      status: LateRequestStatusEnum.APPROVED,
      reviewedById: reviewerId,
      reviewedAt: new Date(),
      decisionNote: decisionNote ?? null,
    });
    if (!updated) {
      throw new NotFoundException('Late request not found after update');
    }

    // On approval, flip attendance back to ON_TIME (excused lateness).
    await this.attendanceRepository.update(existing.attendanceId, {
      status: AttendanceStatusEnum.ON_TIME,
    });

    return updated;
  }

  async reject(
    id: string,
    reviewerId: string,
    reviewerRole: RoleEnum,
    decisionNote?: string,
  ): Promise<LateRequest> {
    const existing = await this.repository.findWithRelationsById(id);
    if (!existing) {
      throw new NotFoundException('Late request not found');
    }
    await this.assertCanReview(existing, reviewerId, reviewerRole);

    const updated = await this.repository.update(id, {
      status: LateRequestStatusEnum.REJECTED,
      reviewedById: reviewerId,
      reviewedAt: new Date(),
      decisionNote: decisionNote ?? null,
    });
    if (!updated) {
      throw new NotFoundException('Late request not found after update');
    }

    // Rejection leaves attendance status as LATE.
    return updated;
  }
}
