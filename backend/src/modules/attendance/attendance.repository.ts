import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Attendance } from './attendance.entity';
import { AttendanceSourceEnum } from '../../common/enums/attendance-source.enum';
import { AttendanceStatusEnum } from '../../common/enums/attendance-status.enum';

export interface AttendanceFilters {
  userId?: string;
  source?: AttendanceSourceEnum;
  status?: AttendanceStatusEnum;
  month?: number;
  year?: number;
  from?: Date;
  to?: Date;
  department?: string;
}

export interface AttendanceSummary {
  present: number;
  late: number;
  absent: number;
  onTime: number;
}

@Injectable()
export class AttendanceRepository extends BaseRepository<Attendance> {
  constructor(
    @InjectRepository(Attendance)
    repository: Repository<Attendance>,
  ) {
    super(repository);
  }

  async findByUserAndDate(
    userId: string,
    date: Date,
  ): Promise<Attendance | null> {
    return this.repository.findOne({
      where: {
        userId,
        date,
      } as FindOptionsWhere<Attendance>,
    });
  }

  async findByUserInRange(
    userId: string,
    from: Date,
    to: Date,
  ): Promise<Attendance[]> {
    return this.repository.find({
      where: {
        userId,
        date: Between(from, to),
      } as FindOptionsWhere<Attendance>,
      order: { date: 'DESC' },
    });
  }

  async summaryForMonth(
    userId: string,
    month: number,
    year: number,
  ): Promise<AttendanceSummary> {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59));

    const records = await this.repository.find({
      where: {
        userId,
        date: Between(start, end),
      } as FindOptionsWhere<Attendance>,
    });

    const summary: AttendanceSummary = {
      present: 0,
      late: 0,
      absent: 0,
      onTime: 0,
    };

    for (const record of records) {
      switch (record.status) {
        case AttendanceStatusEnum.ON_TIME:
          summary.onTime += 1;
          summary.present += 1;
          break;
        case AttendanceStatusEnum.LATE_GRACE:
        case AttendanceStatusEnum.LATE:
          summary.late += 1;
          summary.present += 1;
          break;
        case AttendanceStatusEnum.ABSENT:
          summary.absent += 1;
          break;
        default:
          break;
      }
    }

    return summary;
  }

  async listWithFilters(
    filters: AttendanceFilters,
    page = 1,
    limit = 20,
  ): Promise<{ items: Attendance[]; total: number }> {
    const qb = this.repository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.user', 'user');

    if (filters.userId) {
      qb.andWhere('attendance.user_id = :userId', { userId: filters.userId });
    }
    if (filters.source) {
      qb.andWhere('attendance.source = :source', { source: filters.source });
    }
    if (filters.status) {
      qb.andWhere('attendance.status = :status', { status: filters.status });
    }
    if (filters.from && filters.to) {
      qb.andWhere('attendance.date BETWEEN :from AND :to', {
        from: filters.from,
        to: filters.to,
      });
    } else if (filters.month && filters.year) {
      const start = new Date(Date.UTC(filters.year, filters.month - 1, 1));
      const end = new Date(Date.UTC(filters.year, filters.month, 0, 23, 59, 59));
      qb.andWhere('attendance.date BETWEEN :start AND :end', { start, end });
    }
    if (filters.department) {
      qb.andWhere('user.department = :department', {
        department: filters.department,
      });
    }

    qb.orderBy('attendance.date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
