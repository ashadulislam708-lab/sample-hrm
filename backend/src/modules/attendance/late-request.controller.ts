import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
import { LateRequestService } from './late-request.service';
import { CreateLateRequestDto } from './dtos/late-request.dto';
import { ApproveLateRequestDto } from './dtos/approve-late-request.dto';

@ApiTags('Attendance - Late Requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance/late-requests')
export class LateRequestController {
  constructor(private readonly lateRequestService: LateRequestService) {}

  @Post()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create a late attendance approval request' })
  @ApiResponse({ status: 201, description: 'Late request created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Attendance not found' })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateLateRequestDto,
  ) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    return this.lateRequestService.createForUser(
      user.id,
      dto.attendanceId,
      dto.reason,
    );
  }

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({
    summary: 'List late requests (own for employees, pending for team leader/admin)',
  })
  @ApiResponse({ status: 200, description: 'List of late requests' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@CurrentUser() user: AuthenticatedUser) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    if (user.role === RoleEnum.EMPLOYEE) {
      return this.lateRequestService.listForUser(user.id);
    }
    return this.lateRequestService.listPending();
  }

  @Get(':id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Late request detail' })
  @ApiResponse({ status: 200, description: 'Late request detail' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const req = await this.lateRequestService.findByIdOrFail(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      req.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user late request');
    }
    return req;
  }

  @Patch(':id/approve')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Approve a late attendance request' })
  @ApiResponse({ status: 200, description: 'Approved late request' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async approve(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ApproveLateRequestDto,
  ) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    return this.lateRequestService.approve(
      id,
      user.id,
      user.role as RoleEnum,
      dto.decisionNote,
    );
  }

  @Patch(':id/reject')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Reject a late attendance request' })
  @ApiResponse({ status: 200, description: 'Rejected late request' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async reject(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ApproveLateRequestDto,
  ) {
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    return this.lateRequestService.reject(
      id,
      user.id,
      user.role as RoleEnum,
      dto.decisionNote,
    );
  }
}
