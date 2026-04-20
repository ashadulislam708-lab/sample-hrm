import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { LeaveRequest } from './leave-request.entity';
import { LeaveBalance } from './leave-balance.entity';
import { LeaveRepository, LeaveFilters } from './leave.repository';
import { LeaveBalanceRepository } from './leave-balance.repository';
import { LeaveStatusEnum } from '../../common/enums/leave-status.enum';
import { LeaveTypeEnum } from '../../common/enums/leave-type.enum';
import { LeaveDurationEnum } from '../../common/enums/leave-duration.enum';
import { RoleEnum } from '../../common/enums/role.enum';
import { ApplyLeaveDto } from './dtos/apply-leave.dto';

// TODO: Replace with OfficeConfigService.getLeavePolicy() once available.
// Default allocations per PRD: casual 12 days/yr, sick 8 days/yr.
const DEFAULT_CASUAL_ALLOCATION = 12;
const DEFAULT_SICK_ALLOCATION = 8;

// Optional notifications service — another agent owns notifications. We declare the
// minimal interface and inject by string token so compile doesn't depend on the module.
export const NOTIFICATIONS_SERVICE = 'NOTIFICATIONS_SERVICE';
export interface INotificationsService {
  notifyLeaveApplied?(
    recipientId: string,
    leaveRequest: LeaveRequest,
  ): Promise<void> | void;
  notifyLeaveDecision?(
    recipientId: string,
    leaveRequest: LeaveRequest,
  ): Promise<void> | void;
}

@Injectable()
export class LeaveService extends BaseService<LeaveRequest> {
  protected defaultRelations: string[] = ['user', 'approvedBy'];

  constructor(
    protected readonly repository: LeaveRepository,
    private readonly balanceRepository: LeaveBalanceRepository,
    @Optional()
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notifications?: INotificationsService,
  ) {
    super(repository, 'LeaveRequest');
  }

  private parseDate(value: string | Date): Date {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) {
      throw new BadRequestException('Invalid date value');
    }
    return d;
  }

  private countDays(
    startDate: Date,
    endDate: Date,
    duration: LeaveDurationEnum,
  ): number {
    if (duration !== LeaveDurationEnum.FULL_DAY) {
      return 0.5;
    }
    const ms = endDate.getTime() - startDate.getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, days);
  }

  private async ensureBalance(
    userId: string,
    year: number,
  ): Promise<LeaveBalance> {
    const existing = await this.balanceRepository.findByUserAndYear(userId, year);
    if (existing) return existing;
    return this.balanceRepository.create({
      userId,
      year,
      casualAllocated: DEFAULT_CASUAL_ALLOCATION,
      casualUsed: 0,
      casualRemaining: DEFAULT_CASUAL_ALLOCATION,
      sickAllocated: DEFAULT_SICK_ALLOCATION,
      sickUsed: 0,
      sickRemaining: DEFAULT_SICK_ALLOCATION,
    });
  }

  async applyLeave(
    userId: string,
    dto: ApplyLeaveDto,
  ): Promise<LeaveRequest> {
    if (dto.leaveType === LeaveTypeEnum.EMERGENCY) {
      throw new BadRequestException(
        'Use the emergency-leave endpoint for emergency leave',
      );
    }

    const startDate = this.parseDate(dto.startDate);
    const endDate = this.parseDate(dto.endDate);
    if (endDate < startDate) {
      throw new BadRequestException('endDate must be on or after startDate');
    }

    const duration = dto.duration ?? LeaveDurationEnum.FULL_DAY;

    // Half-day duration requires start == end day.
    if (
      duration !== LeaveDurationEnum.FULL_DAY &&
      startDate.toISOString().slice(0, 10) !==
        endDate.toISOString().slice(0, 10)
    ) {
      throw new BadRequestException(
        'Half-day leave must start and end on the same date',
      );
    }

    const overlapping = await this.repository.findOverlapping(
      userId,
      startDate,
      endDate,
    );
    if (overlapping.length > 0) {
      throw new ConflictException(
        'Overlapping leave request exists for this date range',
      );
    }

    const days = this.countDays(startDate, endDate, duration);

    // Balance validation for casual/sick.
    if (
      dto.leaveType === LeaveTypeEnum.CASUAL ||
      dto.leaveType === LeaveTypeEnum.SICK
    ) {
      const year = startDate.getUTCFullYear();
      const balance = await this.ensureBalance(userId, year);
      const remaining =
        dto.leaveType === LeaveTypeEnum.CASUAL
          ? Number(balance.casualRemaining)
          : Number(balance.sickRemaining);
      if (remaining < days) {
        throw new BadRequestException(
          `Insufficient ${dto.leaveType} balance: ${remaining} day(s) remaining`,
        );
      }
    }

    const created = await this.repository.create({
      userId,
      leaveType: dto.leaveType,
      duration,
      startDate,
      endDate,
      reason: dto.reason,
      status: LeaveStatusEnum.PENDING,
    });

    // Non-blocking notification.
    if (this.notifications?.notifyLeaveApplied) {
      try {
        await this.notifications.notifyLeaveApplied(userId, created);
      } catch {
        // swallow — notifications must not block the flow
      }
    }

    return created;
  }

  private async applyBalanceDecrement(
    leave: LeaveRequest,
    increment: boolean,
  ): Promise<void> {
    if (
      leave.leaveType !== LeaveTypeEnum.CASUAL &&
      leave.leaveType !== LeaveTypeEnum.SICK
    ) {
      return;
    }
    const year = new Date(leave.startDate).getUTCFullYear();
    const balance = await this.ensureBalance(leave.userId, year);
    const days = this.countDays(
      new Date(leave.startDate),
      new Date(leave.endDate),
      leave.duration,
    );
    const sign = increment ? 1 : -1;

    if (leave.leaveType === LeaveTypeEnum.CASUAL) {
      const used = Number(balance.casualUsed) + sign * days;
      const remaining = Number(balance.casualAllocated) - used;
      await this.balanceRepository.update(balance.id, {
        casualUsed: used,
        casualRemaining: remaining,
      });
    } else {
      const used = Number(balance.sickUsed) + sign * days;
      const remaining = Number(balance.sickAllocated) - used;
      await this.balanceRepository.update(balance.id, {
        sickUsed: used,
        sickRemaining: remaining,
      });
    }
  }

  async approveLeave(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
    decisionNote?: string,
  ): Promise<LeaveRequest> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Leave request not found');
    if (existing.status !== LeaveStatusEnum.PENDING) {
      throw new BadRequestException('Only pending leave requests can be approved');
    }
    if (approverRole === RoleEnum.EMPLOYEE) {
      throw new ForbiddenException('Employees cannot approve leave');
    }

    const updated = await this.repository.update(id, {
      status: LeaveStatusEnum.APPROVED,
      approvedById: approverId,
      approvedAt: new Date(),
      decisionNote: decisionNote ?? null,
    });
    if (!updated) throw new NotFoundException('Leave request not found');

    await this.applyBalanceDecrement(updated, true);

    if (this.notifications?.notifyLeaveDecision) {
      try {
        await this.notifications.notifyLeaveDecision(updated.userId, updated);
      } catch {
        /* non-blocking */
      }
    }
    return updated;
  }

  async rejectLeave(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
    decisionNote?: string,
  ): Promise<LeaveRequest> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Leave request not found');
    if (existing.status !== LeaveStatusEnum.PENDING) {
      throw new BadRequestException('Only pending leave requests can be rejected');
    }
    if (approverRole === RoleEnum.EMPLOYEE) {
      throw new ForbiddenException('Employees cannot reject leave');
    }
    const updated = await this.repository.update(id, {
      status: LeaveStatusEnum.REJECTED,
      approvedById: approverId,
      approvedAt: new Date(),
      decisionNote: decisionNote ?? null,
    });
    if (!updated) throw new NotFoundException('Leave request not found');

    if (this.notifications?.notifyLeaveDecision) {
      try {
        await this.notifications.notifyLeaveDecision(updated.userId, updated);
      } catch {
        /* non-blocking */
      }
    }
    return updated;
  }

  async cancelLeave(id: string, userId: string): Promise<LeaveRequest> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Leave request not found');
    if (existing.userId !== userId) {
      throw new ForbiddenException('Cannot cancel another user leave');
    }
    if (
      existing.status !== LeaveStatusEnum.PENDING &&
      existing.status !== LeaveStatusEnum.APPROVED
    ) {
      throw new BadRequestException(
        'Only pending or approved leave can be cancelled',
      );
    }

    const wasApproved = existing.status === LeaveStatusEnum.APPROVED;
    const updated = await this.repository.update(id, {
      status: LeaveStatusEnum.CANCELLED,
    });
    if (!updated) throw new NotFoundException('Leave request not found');

    if (wasApproved) {
      // restore balance
      await this.applyBalanceDecrement(updated, false);
    }
    return updated;
  }

  async getBalance(userId: string, year?: number): Promise<LeaveBalance> {
    const y = year ?? new Date().getUTCFullYear();
    return this.ensureBalance(userId, y);
  }

  async listOwn(userId: string, page = 1, limit = 20) {
    return this.repository.listWithFilters({ userId }, page, limit);
  }

  async listAll(filters: LeaveFilters, page = 1, limit = 20) {
    return this.repository.listWithFilters(filters, page, limit);
  }

  async listForTeamLeader(
    teamMemberIds: string[],
  ): Promise<LeaveRequest[]> {
    return this.repository.findForReviewer(teamMemberIds);
  }
}
