import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { Attendance } from './attendance.entity';
import {
  AttendanceFilters,
  AttendanceRepository,
  AttendanceSummary,
} from './attendance.repository';
import { User } from '../users/user.entity';
import { AttendanceSourceEnum } from '../../common/enums/attendance-source.enum';
import { AttendanceStatusEnum } from '../../common/enums/attendance-status.enum';

/**
 * Office-config defaults (TODO: pull from OfficeConfigService once owned by another agent).
 * These constants centralize the scheduling rules used to compute attendance status.
 */
interface OfficeScheduleConfig {
  officeStartHour: number;
  officeStartMinute: number;
  graceMinutes: number;
  coreStartHour: number;
  coreEndHour: number;
}

@Injectable()
export class AttendanceService extends BaseService<Attendance> {
  protected defaultRelations: string[] = ['user'];

  constructor(
    protected readonly repository: AttendanceRepository,
    // NOTE: Users repository is needed for gather-webhook lookup by gatherTownEmail.
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(repository, 'Attendance');
  }

  /**
   * TODO: Replace with call to OfficeConfigService.getScheduleConfig() when available.
   * Defaults per PRD: 08:00 office start, 10-minute grace window, 08:00-13:00 core hours.
   */
  private getOfficeSchedule(): OfficeScheduleConfig {
    return {
      officeStartHour: 8,
      officeStartMinute: 0,
      graceMinutes: 10,
      coreStartHour: 8,
      coreEndHour: 13,
    };
  }

  private computeStatusAndLateness(clockInTime: Date): {
    status: AttendanceStatusEnum;
    lateMinutes: number;
  } {
    const cfg = this.getOfficeSchedule();
    const officeStart = new Date(clockInTime);
    officeStart.setHours(cfg.officeStartHour, cfg.officeStartMinute, 0, 0);

    const diffMs = clockInTime.getTime() - officeStart.getTime();
    const lateMinutes = Math.max(0, Math.floor(diffMs / 60_000));

    if (lateMinutes <= 0) {
      return { status: AttendanceStatusEnum.ON_TIME, lateMinutes: 0 };
    }
    if (lateMinutes <= cfg.graceMinutes) {
      return { status: AttendanceStatusEnum.LATE_GRACE, lateMinutes };
    }
    return { status: AttendanceStatusEnum.LATE, lateMinutes };
  }

  private toDateOnly(d: Date): Date {
    const copy = new Date(d);
    copy.setUTCHours(0, 0, 0, 0);
    return copy;
  }

  async manualClockIn(userId: string, reason?: string): Promise<Attendance> {
    const now = new Date();
    const dateOnly = this.toDateOnly(now);

    const existing = await this.repository.findByUserAndDate(userId, dateOnly);
    if (existing && existing.clockInTime) {
      throw new ConflictException('You have already clocked in today');
    }

    const { status, lateMinutes } = this.computeStatusAndLateness(now);

    if (existing) {
      const updated = await this.repository.update(existing.id, {
        clockInTime: now,
        source: AttendanceSourceEnum.MANUAL,
        status,
        lateMinutes,
        notes: reason ?? existing.notes,
      });
      if (!updated) {
        throw new NotFoundException('Attendance record not found after update');
      }
      return updated;
    }

    return this.repository.create({
      userId,
      date: dateOnly,
      clockInTime: now,
      source: AttendanceSourceEnum.MANUAL,
      status,
      lateMinutes,
      notes: reason ?? null,
    });
  }

  async gatherClockIn(
    userEmail: string,
    timestamp: string | Date,
  ): Promise<Attendance> {
    const ts = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (Number.isNaN(ts.getTime())) {
      throw new BadRequestException('Invalid timestamp');
    }

    const user = await this.usersRepository.findOne({
      where: { gatherTownEmail: userEmail },
    });
    if (!user) {
      throw new NotFoundException(
        `No user found with Gather email ${userEmail}`,
      );
    }

    const dateOnly = this.toDateOnly(ts);
    const existing = await this.repository.findByUserAndDate(user.id, dateOnly);

    // First Gather join of the day becomes clock-in. Later events are ignored.
    if (existing && existing.clockInTime) {
      return existing;
    }

    const { status, lateMinutes } = this.computeStatusAndLateness(ts);

    if (existing) {
      const updated = await this.repository.update(existing.id, {
        clockInTime: ts,
        source: AttendanceSourceEnum.GATHER,
        status,
        lateMinutes,
      });
      if (!updated) {
        throw new NotFoundException(
          'Attendance record not found after Gather update',
        );
      }
      return updated;
    }

    return this.repository.create({
      userId: user.id,
      date: dateOnly,
      clockInTime: ts,
      source: AttendanceSourceEnum.GATHER,
      status,
      lateMinutes,
    });
  }

  async getTodayStatus(userId: string): Promise<Attendance | null> {
    return this.repository.findByUserAndDate(userId, this.toDateOnly(new Date()));
  }

  async getHistory(
    userId: string,
    filters: { month?: number; year?: number; source?: AttendanceSourceEnum; status?: AttendanceStatusEnum; from?: string; to?: string },
    page = 1,
    limit = 20,
  ) {
    const af: AttendanceFilters = {
      userId,
      source: filters.source,
      status: filters.status,
      month: filters.month,
      year: filters.year,
      from: filters.from ? new Date(filters.from) : undefined,
      to: filters.to ? new Date(filters.to) : undefined,
    };
    return this.repository.listWithFilters(af, page, limit);
  }

  async getMonthSummary(
    userId: string,
    month: number,
    year: number,
  ): Promise<AttendanceSummary> {
    return this.repository.summaryForMonth(userId, month, year);
  }

  async adminList(filters: AttendanceFilters, page = 1, limit = 20) {
    return this.repository.listWithFilters(filters, page, limit);
  }
}
