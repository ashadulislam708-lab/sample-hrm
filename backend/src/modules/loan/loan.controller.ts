import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
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
import { LoanService } from './loan.service';
import { ApplyLoanDto } from './dtos/apply-loan.dto';
import { ApproveLoanDto } from './dtos/approve-loan.dto';
import { FilterLoanDto } from './dtos/filter-loan.dto';

@ApiTags('Loans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('apply')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Apply for a salary loan' })
  @ApiResponse({ status: 201, description: 'Loan application created' })
  @ApiResponse({ status: 400, description: 'Validation error or active loan exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async apply(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ApplyLoanDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.loanService.applyLoan(user.id, dto);
  }

  @Get('own')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Own loan history' })
  @ApiResponse({ status: 200, description: 'Paginated loan list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listOwn(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: FilterLoanDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const { items, total } = await this.loanService.listOwn(
      user.id,
      page,
      limit,
    );
    return { items, total, page, limit };
  }

  @Get()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List loan applications (admin)' })
  @ApiResponse({ status: 200, description: 'Paginated loan list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async listAdmin(@Query() filters: FilterLoanDto) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const { items, total } = await this.loanService.listAdmin(
      { userId: filters.userId, status: filters.status },
      page,
      limit,
    );
    return { items, total, page, limit };
  }

  @Get(':id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Loan detail' })
  @ApiResponse({ status: 200, description: 'Loan detail' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const loan = await this.loanService.getLoanDetail(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      loan.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user loan');
    }
    return loan;
  }

  @Patch(':id/approve')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Approve loan application (auto-disburses)' })
  @ApiResponse({ status: 200, description: 'Approved and disbursed' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async approve(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ApproveLoanDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.loanService.approveLoan(id, user.id, user.role as RoleEnum, {
      tenureMonths: dto.tenureMonths,
      decisionNote: dto.decisionNote,
    });
  }

  @Patch(':id/reject')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Reject loan application' })
  @ApiResponse({ status: 200, description: 'Rejected' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async reject(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.loanService.rejectLoan(id, user.id, user.role as RoleEnum);
  }

  @Get(':id/repayments')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Repayment schedule for a loan' })
  @ApiResponse({ status: 200, description: 'Repayment list' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async repayments(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const loan = await this.loanService.getLoanDetail(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      loan.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user loan');
    }
    return this.loanService.listRepaymentsForLoan(id);
  }
}
