import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import { PayrollService } from './payroll.service';
import { GeneratePayrollDto } from './dtos/generate-payroll.dto';
import { FilterPayrollDto } from './dtos/filter-payroll.dto';

@ApiTags('Payroll')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('payroll/generate')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Generate payroll run for month/year' })
  @ApiResponse({ status: 201, description: 'Payroll run created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 409, description: 'Payroll run already exists' })
  async generate(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: GeneratePayrollDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.payrollService.generateRun(dto.month, dto.year, user.id);
  }

  @Get('payroll/runs')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List recent payroll runs' })
  @ApiResponse({ status: 200, description: 'Payroll run list' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async listRuns(@Query() query: FilterPayrollDto) {
    const limit = query.limit ?? 12;
    return this.payrollService.listRuns(limit);
  }

  @Get('payroll/runs/:id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Payroll run detail' })
  @ApiResponse({ status: 200, description: 'Payroll run detail' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async runDetail(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.payrollService.getRunDetail(id);
  }

  @Patch('payroll/runs/:id/approve')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Approve payroll run (records loan repayments)' })
  @ApiResponse({ status: 200, description: 'Payroll run approved' })
  @ApiResponse({ status: 400, description: 'Invalid state' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async approve(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.payrollService.approveRun(id, user.id, user.role as RoleEnum);
  }

  @Patch('payroll/runs/:id/disburse')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Mark payroll run as disbursed' })
  @ApiResponse({ status: 200, description: 'Payroll run disbursed' })
  @ApiResponse({ status: 400, description: 'Invalid state' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async disburse(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.payrollService.markDisbursed(id, user.role as RoleEnum);
  }

  @Get('payslips/own')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List own payslips' })
  @ApiResponse({ status: 200, description: 'Own payslip list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listOwnPayslips(@CurrentUser() user: AuthenticatedUser) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.payrollService.listPayslipsForUser(user.id);
  }

  @Get('payslips/:id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Payslip detail' })
  @ApiResponse({ status: 200, description: 'Payslip detail' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async payslipDetail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const slip = await this.payrollService.getPayslip(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      slip.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user payslip');
    }
    return slip;
  }

  @Get('payslips/:id/download')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Download payslip (HTML stub placeholder)' })
  @ApiProduces('text/html')
  @ApiResponse({ status: 200, description: 'Payslip HTML' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async downloadPayslip(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const slip = await this.payrollService.getPayslip(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      slip.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user payslip');
    }

    // Stub HTML payslip. Replace with PDF renderer in a later phase.
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Payslip ${slip.id}</title></head>
<body>
<h1>Payslip</h1>
<p>Basic salary: ${slip.basicSalary}</p>
<p>Loan deduction: ${slip.loanDeduction}</p>
<p>Net salary: ${slip.netSalary}</p>
</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="payslip-${slip.id}.html"`,
    );
    return new StreamableFile(Buffer.from(html, 'utf-8'));
  }

  @Get('payroll/runs/:id/bank-file')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Download bank file CSV for payroll run' })
  @ApiProduces('text/csv')
  @ApiResponse({ status: 200, description: 'Bank file CSV' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Header('Content-Type', 'text/csv')
  async bankFile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { filename, content } = await this.payrollService.exportBankFile(id);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`,
    );
    return new StreamableFile(Buffer.from(content, 'utf-8'));
  }
}
