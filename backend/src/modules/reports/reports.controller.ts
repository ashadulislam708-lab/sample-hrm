import { BadRequestException, Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import {
  ReportsService,
  ReportColumn,
  ReportRangeFilters,
} from './reports.service';
import { ReportFilterDto, ReportFormat } from './dtos/report-filter.dto';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.HR_ADMIN)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  private parseFilters(query: ReportFilterDto): ReportRangeFilters {
    return {
      from: query.from ? new Date(query.from) : undefined,
      to: query.to ? new Date(query.to) : undefined,
      department: query.department,
      userId: query.userId,
      cycleId: query.cycleId,
      month: query.month,
      year: query.year,
    };
  }

  private async deliver(
    res: Response,
    name: string,
    rows: Record<string, unknown>[],
    columns: ReportColumn[],
    format: ReportFormat,
  ) {
    if (format === ReportFormat.EXCEL) {
      const buffer = await this.service.toExcel(rows, columns);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', `attachment; filename="${name}.xlsx"`);
      res.end(buffer);
      return;
    }
    if (format === ReportFormat.PDF) {
      const buffer = await this.service.toPdf(rows, columns);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${name}.pdf"`);
      res.end(buffer);
      return;
    }
    res.json({ rows, columns });
  }

  @Get('attendance')
  @ApiOperation({ summary: 'Attendance report' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  async attendance(@Query() query: ReportFilterDto, @Res() res: Response) {
    const result = await this.service.attendanceReport(this.parseFilters(query));
    await this.deliver(res, 'attendance-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }

  @Get('leave')
  @ApiOperation({ summary: 'Leave report' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  async leave(@Query() query: ReportFilterDto, @Res() res: Response) {
    const result = await this.service.leaveReport(this.parseFilters(query));
    await this.deliver(res, 'leave-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }

  @Get('payroll')
  @ApiOperation({ summary: 'Payroll report (requires month+year)' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  @ApiResponse({ status: 400, description: 'month and year required' })
  async payroll(@Query() query: ReportFilterDto, @Res() res: Response) {
    if (!query.month || !query.year) {
      throw new BadRequestException('month and year are required');
    }
    const result = await this.service.payrollReport(query.month, query.year);
    await this.deliver(res, 'payroll-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }

  @Get('loan')
  @ApiOperation({ summary: 'Loan report' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  async loan(@Query() query: ReportFilterDto, @Res() res: Response) {
    const result = await this.service.loanReport();
    await this.deliver(res, 'loan-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }

  @Get('performance')
  @ApiOperation({ summary: 'Performance report (optional cycleId)' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  async performance(@Query() query: ReportFilterDto, @Res() res: Response) {
    const result = await this.service.performanceReport(query.cycleId);
    await this.deliver(res, 'performance-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }

  @Get('headcount')
  @ApiOperation({ summary: 'Headcount by department' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  async headcount(@Query() query: ReportFilterDto, @Res() res: Response) {
    const result = await this.service.headcountReport();
    await this.deliver(res, 'headcount-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }

  @Get('daily-notes')
  @ApiOperation({ summary: 'Daily note submission frequency' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  async dailyNotes(@Query() query: ReportFilterDto, @Res() res: Response) {
    const result = await this.service.dailyNotesReport(this.parseFilters(query));
    await this.deliver(res, 'daily-notes-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }

  @Get('emergency-leave')
  @ApiOperation({ summary: 'Emergency leave with Slack thread status' })
  @ApiResponse({ status: 200, description: 'Report body or file' })
  async emergencyLeave(@Query() query: ReportFilterDto, @Res() res: Response) {
    const result = await this.service.emergencyLeaveReport(this.parseFilters(query));
    await this.deliver(res, 'emergency-leave-report', result.rows, result.columns, query.format ?? ReportFormat.JSON);
  }
}
