import {
  Body,
  Controller,
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
import { RoleEnum } from '../../common/enums/role.enum';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { UpdateGoalDto } from './dtos/update-goal.dto';
import { UpdateGoalProgressDto } from './dtos/update-goal-progress.dto';

@ApiTags('Performance - Goals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('performance/goals')
export class GoalController {
  constructor(private readonly service: GoalService) {}

  @Post()
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Assign goal to team member' })
  @ApiResponse({ status: 201, description: 'Goal created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() dto: CreateGoalDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createGoal(dto, user.id);
  }

  @Get('own')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List own goals' })
  @ApiResponse({ status: 200, description: 'Goal list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listOwn(@CurrentUser() user: AuthenticatedUser) {
    return this.service.listOwn(user.id);
  }

  @Get('team')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List goals for my team' })
  @ApiResponse({ status: 200, description: 'Team goal list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async listTeam(@CurrentUser() user: AuthenticatedUser) {
    return this.service.listForTeam(user.id);
  }

  @Patch(':id/progress')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Self-update goal progress' })
  @ApiResponse({ status: 200, description: 'Goal updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async updateProgress(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateGoalProgressDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updateOwnProgress(id, user.id, dto.progress);
  }

  @Patch(':id')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update goal (team leader)' })
  @ApiResponse({ status: 200, description: 'Goal updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateGoalDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updateByLeader(id, user.id, dto);
  }
}
