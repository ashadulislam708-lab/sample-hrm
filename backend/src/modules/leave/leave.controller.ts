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
import { LeaveService } from './leave.service';
import { ApplyLeaveDto } from './dtos/apply-leave.dto';
import { ApproveLeaveDto } from './dtos/approve-leave.dto';
import { FilterLeaveDto } from './dtos/filter-leave.dto';

@ApiTags('Leave')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Apply for casual/sick/half-day leave' })
  @ApiResponse({ status: 201, description: 'Leave request created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 409, description: 'Overlapping leave exists' })
  async apply(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ApplyLeaveDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.leaveService.applyLeave(user.id, dto);
  }

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({
    summary: 'List leave requests (own for employees, filtered for leader/admin)',
  })
  @ApiResponse({ status: 200, description: 'Paginated leave list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: FilterLeaveDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;

    if (user.role === RoleEnum.EMPLOYEE) {
      const { items, total } = await this.leaveService.listOwn(
        user.id,
        page,
        limit,
      );
      return { items, total, page, limit };
    }

    const { items, total } = await this.leaveService.listAll(
      {
        userId: filters.userId,
        leaveType: filters.leaveType,
        status: filters.status,
        from: filters.from ? new Date(filters.from) : undefined,
        to: filters.to ? new Date(filters.to) : undefined,
      },
      page,
      limit,
    );
    return { items, total, page, limit };
  }

  @Get('balance')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: "Current user's leave balance (current year)" })
  @ApiResponse({ status: 200, description: 'Leave balance' })
  async ownBalance(@CurrentUser() user: AuthenticatedUser) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.leaveService.getBalance(user.id);
  }

  @Get('balance/:userId')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: "Get a user's leave balance" })
  @ApiResponse({ status: 200, description: 'Leave balance' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async userBalance(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    return this.leaveService.getBalance(userId);
  }

  @Get(':id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Leave request detail' })
  @ApiResponse({ status: 200, description: 'Leave request detail' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const leave = await this.leaveService.findByIdOrFail(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      leave.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user leave');
    }
    return leave;
  }

  @Patch(':id/approve')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Approve leave request' })
  @ApiResponse({ status: 200, description: 'Approved' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async approve(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ApproveLeaveDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.leaveService.approveLeave(
      id,
      user.id,
      user.role as RoleEnum,
      dto.decisionNote,
    );
  }

  @Patch(':id/reject')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Reject leave request' })
  @ApiResponse({ status: 200, description: 'Rejected' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async reject(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ApproveLeaveDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.leaveService.rejectLeave(
      id,
      user.id,
      user.role as RoleEnum,
      dto.decisionNote,
    );
  }

  @Post(':id/cancel')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Cancel own leave request (pending or approved)' })
  @ApiResponse({ status: 200, description: 'Cancelled' })
  @ApiResponse({ status: 400, description: 'Cannot cancel' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async cancel(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.leaveService.cancelLeave(id, user.id);
  }
}
