import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { Attendance } from '../attendance/attendance.entity';
import { LeaveRequest } from '../leave/leave-request.entity';
import { Payslip } from '../payroll/payslip.entity';
import { LoanApplication } from '../loan/loan-application.entity';
import { PerformanceReview } from '../performance/performance-review.entity';
import { DailyNote } from '../performance/daily-note.entity';
import { User } from '../users/user.entity';
import { LeaveTypeEnum } from '../../common/enums/leave-type.enum';

export interface ReportColumn {
  key: string;
  header: string;
}

export interface ReportResult<T = Record<string, unknown>> {
  rows: T[];
  columns: ReportColumn[];
}

export interface ReportRangeFilters {
  from?: Date;
  to?: Date;
  department?: string;
  userId?: string;
  cycleId?: string;
  month?: number;
  year?: number;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(LeaveRequest)
    private readonly leaveRepo: Repository<LeaveRequest>,
    @InjectRepository(Payslip)
    private readonly payslipRepo: Repository<Payslip>,
    @InjectRepository(LoanApplication)
    private readonly loanRepo: Repository<LoanApplication>,
    @InjectRepository(PerformanceReview)
    private readonly reviewRepo: Repository<PerformanceReview>,
    @InjectRepository(DailyNote)
    private readonly dailyNoteRepo: Repository<DailyNote>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  private applyDateRange<T>(
    where: FindOptionsWhere<T>,
    field: keyof T,
    filters: ReportRangeFilters,
  ): FindOptionsWhere<T> {
    if (filters.from && filters.to) {
      (where as Record<string, unknown>)[field as string] = Between(
        filters.from,
        filters.to,
      );
    }
    return where;
  }

  async attendanceReport(filters: ReportRangeFilters): Promise<ReportResult> {
    const where: FindOptionsWhere<Attendance> = {};
    if (filters.userId) where.userId = filters.userId;
    this.applyDateRange(where, 'date', filters);
    const records = await this.attendanceRepo.find({
      where,
      relations: ['user'],
      order: { date: 'DESC' },
    });
    const rows = records
      .filter((r) => !filters.department || r.user?.department === filters.department)
      .map((r) => ({
        date: r.date,
        userId: r.userId,
        fullName: r.user?.fullName ?? '',
        department: r.user?.department ?? '',
        status: r.status,
        source: r.source,
        clockInTime: r.clockInTime,
        clockOutTime: r.clockOutTime,
        lateMinutes: r.lateMinutes,
      }));
    return {
      rows,
      columns: [
        { key: 'date', header: 'Date' },
        { key: 'fullName', header: 'Employee' },
        { key: 'department', header: 'Department' },
        { key: 'status', header: 'Status' },
        { key: 'source', header: 'Source' },
        { key: 'clockInTime', header: 'Clock In' },
        { key: 'clockOutTime', header: 'Clock Out' },
        { key: 'lateMinutes', header: 'Late Min' },
      ],
    };
  }

  async leaveReport(filters: ReportRangeFilters): Promise<ReportResult> {
    const where: FindOptionsWhere<LeaveRequest> = {};
    if (filters.userId) where.userId = filters.userId;
    this.applyDateRange(where, 'startDate', filters);
    const records = await this.leaveRepo.find({
      where,
      relations: ['user'],
      order: { startDate: 'DESC' },
    });
    const rows = records
      .filter((r) => !filters.department || r.user?.department === filters.department)
      .map((r) => ({
        userId: r.userId,
        fullName: r.user?.fullName ?? '',
        department: r.user?.department ?? '',
        leaveType: r.leaveType,
        duration: r.duration,
        startDate: r.startDate,
        endDate: r.endDate,
        status: r.status,
        reason: r.reason,
      }));
    return {
      rows,
      columns: [
        { key: 'fullName', header: 'Employee' },
        { key: 'department', header: 'Department' },
        { key: 'leaveType', header: 'Type' },
        { key: 'duration', header: 'Duration' },
        { key: 'startDate', header: 'Start' },
        { key: 'endDate', header: 'End' },
        { key: 'status', header: 'Status' },
        { key: 'reason', header: 'Reason' },
      ],
    };
  }

  async payrollReport(month: number, year: number): Promise<ReportResult> {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59));
    const payslips = await this.payslipRepo.find({
      where: { paidAt: Between(start, end) },
      relations: ['user'],
      order: { paidAt: 'DESC' },
    });
    const rows = payslips.map((p) => ({
      fullName: p.user?.fullName ?? '',
      department: p.user?.department ?? '',
      basicSalary: Number(p.basicSalary),
      allowances: Object.values(p.allowances ?? {}).reduce(
        (a: number, b: number) => a + Number(b),
        0,
      ),
      deductions: Object.values(p.deductions ?? {}).reduce(
        (a: number, b: number) => a + Number(b),
        0,
      ),
      bonuses: Object.values(p.bonuses ?? {}).reduce(
        (a: number, b: number) => a + Number(b),
        0,
      ),
      loanDeduction: Number(p.loanDeduction ?? 0),
      netSalary: Number(p.netSalary),
      paidAt: p.paidAt,
    }));
    return {
      rows,
      columns: [
        { key: 'fullName', header: 'Employee' },
        { key: 'department', header: 'Department' },
        { key: 'basicSalary', header: 'Basic' },
        { key: 'allowances', header: 'Allowances' },
        { key: 'bonuses', header: 'Bonuses' },
        { key: 'deductions', header: 'Deductions' },
        { key: 'loanDeduction', header: 'Loan Deduction' },
        { key: 'netSalary', header: 'Net Salary' },
        { key: 'paidAt', header: 'Paid At' },
      ],
    };
  }

  async loanReport(): Promise<ReportResult> {
    const loans = await this.loanRepo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    const rows = loans.map((l) => ({
      fullName: l.user?.fullName ?? '',
      department: l.user?.department ?? '',
      amount: Number(l.amount),
      tenureMonths: l.tenureMonths,
      monthlyInstallment: Number(l.monthlyInstallment),
      status: l.status,
      outstandingBalance: Number(l.outstandingBalance ?? 0),
      approvedAt: l.approvedAt,
      disbursedAt: l.disbursedAt,
    }));
    return {
      rows,
      columns: [
        { key: 'fullName', header: 'Employee' },
        { key: 'department', header: 'Department' },
        { key: 'amount', header: 'Amount' },
        { key: 'tenureMonths', header: 'Tenure (mo)' },
        { key: 'monthlyInstallment', header: 'Monthly EMI' },
        { key: 'status', header: 'Status' },
        { key: 'outstandingBalance', header: 'Outstanding' },
        { key: 'approvedAt', header: 'Approved' },
        { key: 'disbursedAt', header: 'Disbursed' },
      ],
    };
  }

  async performanceReport(cycleId?: string): Promise<ReportResult> {
    const where: FindOptionsWhere<PerformanceReview> = {};
    if (cycleId) where.cycleId = cycleId;
    const reviews = await this.reviewRepo.find({
      where,
      relations: ['user', 'reviewer', 'cycle'],
      order: { createdAt: 'DESC' },
    });
    const rows = reviews.map((r) => ({
      fullName: r.user?.fullName ?? '',
      department: r.user?.department ?? '',
      cycle: r.cycle?.title ?? '',
      reviewer: r.reviewer?.fullName ?? '',
      rating: r.rating,
      submittedAt: r.submittedAt,
    }));
    return {
      rows,
      columns: [
        { key: 'fullName', header: 'Employee' },
        { key: 'department', header: 'Department' },
        { key: 'cycle', header: 'Cycle' },
        { key: 'reviewer', header: 'Reviewer' },
        { key: 'rating', header: 'Rating' },
        { key: 'submittedAt', header: 'Submitted' },
      ],
    };
  }

  async headcountReport(): Promise<ReportResult> {
    const raw = await this.userRepo
      .createQueryBuilder('u')
      .select('u.department', 'department')
      .addSelect('COUNT(u.id)', 'count')
      .where('u.department IS NOT NULL')
      .groupBy('u.department')
      .orderBy('u.department', 'ASC')
      .getRawMany<{ department: string; count: string }>();
    const rows = raw.map((r) => ({
      department: r.department,
      count: Number(r.count),
    }));
    return {
      rows,
      columns: [
        { key: 'department', header: 'Department' },
        { key: 'count', header: 'Headcount' },
      ],
    };
  }

  async dailyNotesReport(filters: ReportRangeFilters): Promise<ReportResult> {
    const where: FindOptionsWhere<DailyNote> = {};
    this.applyDateRange(where, 'noteDate', filters);
    const notes = await this.dailyNoteRepo.find({
      where,
      relations: ['user'],
    });
    const counter = new Map<string, { fullName: string; department: string; count: number }>();
    for (const n of notes) {
      if (!n.user) continue;
      const entry = counter.get(n.userId) ?? {
        fullName: n.user.fullName,
        department: n.user.department ?? '',
        count: 0,
      };
      entry.count += 1;
      counter.set(n.userId, entry);
    }
    const rows = Array.from(counter.values()).sort((a, b) => b.count - a.count);
    return {
      rows,
      columns: [
        { key: 'fullName', header: 'Employee' },
        { key: 'department', header: 'Department' },
        { key: 'count', header: 'Notes Count' },
      ],
    };
  }

  async emergencyLeaveReport(filters: ReportRangeFilters): Promise<ReportResult> {
    const where: FindOptionsWhere<LeaveRequest> = {
      leaveType: LeaveTypeEnum.EMERGENCY,
    };
    this.applyDateRange(where, 'startDate', filters);
    const leaves = await this.leaveRepo.find({
      where,
      relations: ['user'],
      order: { startDate: 'DESC' },
    });
    const rows = leaves.map((l) => ({
      fullName: l.user?.fullName ?? '',
      department: l.user?.department ?? '',
      startDate: l.startDate,
      estimatedReturnTime: l.estimatedReturnTime,
      returnedAt: l.returnedAt,
      slackPosted: Boolean(l.slackThreadTs),
      slackThreadTs: l.slackThreadTs,
      status: l.status,
    }));
    return {
      rows,
      columns: [
        { key: 'fullName', header: 'Employee' },
        { key: 'department', header: 'Department' },
        { key: 'startDate', header: 'Start' },
        { key: 'estimatedReturnTime', header: 'Est. Return' },
        { key: 'returnedAt', header: 'Returned At' },
        { key: 'slackPosted', header: 'Slack Posted' },
        { key: 'status', header: 'Status' },
      ],
    };
  }

  async toExcel(
    rows: Record<string, unknown>[],
    columns: ReportColumn[],
  ): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Report');
    sheet.columns = columns.map((c) => ({ header: c.header, key: c.key, width: 24 }));
    for (const row of rows) {
      sheet.addRow(row);
    }
    sheet.getRow(1).font = { bold: true };
    const buf = await workbook.xlsx.writeBuffer();
    return Buffer.from(buf);
  }

  toPdf(rows: Record<string, unknown>[], columns: ReportColumn[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(14).text('HRM Report', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(9);
      const headerLine = columns.map((c) => c.header).join(' | ');
      doc.text(headerLine);
      doc.moveDown(0.25);
      doc.text('-'.repeat(headerLine.length));
      for (const row of rows) {
        const line = columns
          .map((c) => {
            const v = row[c.key];
            if (v instanceof Date) return v.toISOString().slice(0, 19);
            if (v === null || v === undefined) return '';
            return String(v);
          })
          .join(' | ');
        doc.text(line);
      }
      doc.end();
    });
  }
}
