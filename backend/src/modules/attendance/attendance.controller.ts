import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
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
import { Public } from '../../core/decorators/public.decorator';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import { AttendanceService } from './attendance.service';
import { ClockInManualDto } from './dtos/clock-in-manual.dto';
import { GatherWebhookDto } from './dtos/gather-webhook.dto';
import { FilterAttendanceDto } from './dtos/filter-attendance.dto';

@ApiTags('Attendance')
@ApiBearerAuth()
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('clock-in-manual')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Manual clock-in for current user' })
  @ApiResponse({ status: 201, description: 'Clock-in recorded' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 409, description: 'Already clocked in today' })
  async clockInManual(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ClockInManualDto,
  ) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    return this.attendanceService.manualClockIn(user.id, dto.reason);
  }

  @Get('today')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: "Current user's today attendance record" })
  @ApiResponse({ status: 200, description: 'Today record or null' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async today(@CurrentUser() user: AuthenticatedUser) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    return this.attendanceService.getTodayStatus(user.id);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: "Current user's attendance history" })
  @ApiResponse({ status: 200, description: 'Paginated history' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async history(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: FilterAttendanceDto,
  ) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    const { items, total } = await this.attendanceService.getHistory(
      user.id,
      {
        month: filters.month,
        year: filters.year,
        source: filters.source,
        status: filters.status,
        from: filters.from,
        to: filters.to,
      },
      filters.page ?? 1,
      filters.limit ?? 20,
    );
    return {
      items,
      total,
      page: filters.page ?? 1,
      limit: filters.limit ?? 20,
    };
  }

  @Get('summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Current month attendance summary for user' })
  @ApiResponse({ status: 200, description: 'Summary totals' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async summary(@CurrentUser() user: AuthenticatedUser) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    const now = new Date();
    return this.attendanceService.getMonthSummary(
      user.id,
      now.getMonth() + 1,
      now.getFullYear(),
    );
  }

  @Post('gather-webhook')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Gather Town ingress webhook (protected by shared secret)',
  })
  @ApiResponse({ status: 201, description: 'Event processed' })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiResponse({ status: 403, description: 'Invalid webhook secret' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async gatherWebhook(
    @Headers('x-gather-secret') secret: string | undefined,
    @Body() dto: GatherWebhookDto,
  ) {
    const expected = process.env.GATHER_WEBHOOK_SECRET;
    if (!expected) {
      throw new BadRequestException(
        'Gather webhook secret is not configured on the server',
      );
    }
    if (!secret || secret !== expected) {
      throw new ForbiddenException('Invalid Gather webhook secret');
    }
    if (dto.eventType !== 'playerJoined') {
      // Only process join events for clock-in. Others are acknowledged and ignored.
      return { processed: false, eventType: dto.eventType };
    }
    const attendance = await this.attendanceService.gatherClockIn(
      dto.userEmail,
      dto.timestamp,
    );
    return { processed: true, attendanceId: attendance.id };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List all attendance records (admin/team lead)' })
  @ApiResponse({ status: 200, description: 'Paginated attendance list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async list(@Query() filters: FilterAttendanceDto) {
    const { items, total } = await this.attendanceService.adminList(
      {
        userId: filters.userId,
        source: filters.source,
        status: filters.status,
        month: filters.month,
        year: filters.year,
        from: filters.from ? new Date(filters.from) : undefined,
        to: filters.to ? new Date(filters.to) : undefined,
        department: filters.department,
      },
      filters.page ?? 1,
      filters.limit ?? 20,
    );
    return {
      items,
      total,
      page: filters.page ?? 1,
      limit: filters.limit ?? 20,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Attendance record detail' })
  @ApiResponse({ status: 200, description: 'Attendance record' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const record = await this.attendanceService.findByIdOrFail(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      record.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user record');
    }
    return record;
  }
}
