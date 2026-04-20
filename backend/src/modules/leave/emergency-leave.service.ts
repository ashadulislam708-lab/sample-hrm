import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { LeaveRepository } from './leave.repository';
import { LeaveRequest } from './leave-request.entity';
import { LeaveTypeEnum } from '../../common/enums/leave-type.enum';
import { LeaveStatusEnum } from '../../common/enums/leave-status.enum';
import { LeaveDurationEnum } from '../../common/enums/leave-duration.enum';
import { ApplyEmergencyLeaveDto } from './dtos/apply-emergency.dto';

// External Slack service (owned by another agent). Inject by string token,
// define the minimal interface here so compile does not block if missing.
export const SLACK_SERVICE = 'SLACK_SERVICE';
export interface ISlackService {
  postEmergencyLeave?(payload: {
    userId: string;
    reason: string;
    estimatedReturnTime?: string;
    contactAvailability?: string;
  }): Promise<{ threadTs?: string }>;
  updateEmergencyLeaveThread?(payload: {
    threadTs: string;
    userId: string;
    message: string;
  }): Promise<void>;
}

@Injectable()
export class EmergencyLeaveService {
  constructor(
    private readonly repository: LeaveRepository,
    @Optional()
    @Inject(SLACK_SERVICE)
    private readonly slack?: ISlackService,
  ) {}

  async applyEmergency(
    userId: string,
    dto: ApplyEmergencyLeaveDto,
  ): Promise<LeaveRequest> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Emergency leave is a single day (today); a same-day overlap would be a duplicate.
    const overlap = await this.repository.findOverlapping(userId, today, today);
    const duplicate = overlap.find(
      (l) => l.leaveType === LeaveTypeEnum.EMERGENCY,
    );
    if (duplicate) {
      throw new BadRequestException(
        'You already have an active emergency leave for today',
      );
    }

    let threadTs: string | null = null;
    if (this.slack?.postEmergencyLeave) {
      try {
        const result = await this.slack.postEmergencyLeave({
          userId,
          reason: dto.reason,
          estimatedReturnTime: dto.estimatedReturnTime,
          contactAvailability: dto.contactAvailability,
        });
        threadTs = result?.threadTs ?? null;
      } catch {
        // non-blocking: emergency leave must proceed even if Slack fails
      }
    }

    return this.repository.create({
      userId,
      leaveType: LeaveTypeEnum.EMERGENCY,
      duration: LeaveDurationEnum.FULL_DAY,
      startDate: today,
      endDate: today,
      reason: dto.reason,
      estimatedReturnTime: dto.estimatedReturnTime
        ? new Date(dto.estimatedReturnTime)
        : null,
      contactAvailability: dto.contactAvailability ?? null,
      status: LeaveStatusEnum.PENDING,
      slackThreadTs: threadTs,
    });
  }

  async markReturn(
    leaveId: string,
    userId: string,
    note?: string,
  ): Promise<LeaveRequest> {
    const existing = await this.repository.findById(leaveId);
    if (!existing) throw new NotFoundException('Emergency leave not found');
    if (existing.userId !== userId) {
      throw new ForbiddenException('Cannot mark return for another user');
    }
    if (existing.leaveType !== LeaveTypeEnum.EMERGENCY) {
      throw new BadRequestException(
        'Leave must be of type emergency to mark return',
      );
    }
    if (existing.returnedAt) {
      throw new BadRequestException('Emergency leave already marked as returned');
    }

    const updated = await this.repository.update(leaveId, {
      status: LeaveStatusEnum.APPROVED,
      returnedAt: new Date(),
      decisionNote: note ?? existing.decisionNote,
    });
    if (!updated) throw new NotFoundException('Emergency leave not found');

    if (existing.slackThreadTs && this.slack?.updateEmergencyLeaveThread) {
      try {
        await this.slack.updateEmergencyLeaveThread({
          threadTs: existing.slackThreadTs,
          userId,
          message: note ?? 'User is now Available',
        });
      } catch {
        /* non-blocking */
      }
    }

    return updated;
  }

  async listActiveEmergency(): Promise<LeaveRequest[]> {
    return this.repository.findActiveEmergency();
  }
}
