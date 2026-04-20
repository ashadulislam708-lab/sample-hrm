import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
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
import { EmergencyLeaveService } from './emergency-leave.service';
import { ApplyEmergencyLeaveDto } from './dtos/apply-emergency.dto';
import { ReturnEmergencyLeaveDto } from './dtos/return-emergency.dto';

@ApiTags('Emergency Leave')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leave/emergency')
export class EmergencyLeaveController {
  constructor(
    private readonly emergencyLeaveService: EmergencyLeaveService,
  ) {}

  @Post()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Apply for emergency leave (same-day)' })
  @ApiResponse({ status: 201, description: 'Emergency leave created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async apply(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ApplyEmergencyLeaveDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.emergencyLeaveService.applyEmergency(user.id, dto);
  }

  @Post(':id/return')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Mark Available on return from emergency leave' })
  @ApiResponse({ status: 200, description: 'Return recorded' })
  @ApiResponse({ status: 400, description: 'Invalid state' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async markReturn(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ReturnEmergencyLeaveDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.emergencyLeaveService.markReturn(id, user.id, dto.note);
  }

  @Get('active')
  @Roles(RoleEnum.HR_ADMIN, RoleEnum.TEAM_LEADER)
  @ApiOperation({ summary: 'List currently active emergency leaves' })
  @ApiResponse({ status: 200, description: 'Active emergency leave list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async listActive() {
    return this.emergencyLeaveService.listActiveEmergency();
  }
}
