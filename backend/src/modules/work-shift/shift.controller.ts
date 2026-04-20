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
import { ShiftService } from './shift.service';
import { ApplyShiftDto } from './dtos/apply-shift.dto';

@ApiTags('Work Shift')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post('apply')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Apply for a Work Day Shift (Fri-Sun)' })
  @ApiResponse({ status: 201, description: 'Shift request created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async apply(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ApplyShiftDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.shiftService.applyShift(user.id, dto);
  }

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List shift requests (own or all for leader/admin)' })
  @ApiResponse({ status: 200, description: 'List of shift requests' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@CurrentUser() user: AuthenticatedUser) {
    if (!user) throw new ForbiddenException('Authentication required');
    if (user.role === RoleEnum.EMPLOYEE) {
      return this.shiftService.listOwn(user.id);
    }
    return this.shiftService.listPending();
  }

  @Get(':id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Shift request detail' })
  @ApiResponse({ status: 200, description: 'Shift request detail' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const shift = await this.shiftService.findByIdOrFail(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      shift.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user shift request');
    }
    return shift;
  }

  @Patch(':id/approve')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Approve shift request' })
  @ApiResponse({ status: 200, description: 'Approved' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async approve(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.shiftService.approveShift(id, user.id, user.role as RoleEnum);
  }

  @Patch(':id/reject')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Reject shift request' })
  @ApiResponse({ status: 200, description: 'Rejected' })
  @ApiResponse({ status: 400, description: 'Not pending' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async reject(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.shiftService.rejectShift(id, user.id, user.role as RoleEnum);
  }
}
