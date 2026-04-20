import {
  Body,
  Controller,
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
import { RoleEnum } from '../../common/enums/role.enum';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { ProjectEvaluationService } from './project-evaluation.service';
import { CreateEvaluationDto } from './dtos/create-evaluation.dto';

@ApiTags('Performance - Evaluations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('performance/evaluations')
export class ProjectEvaluationController {
  constructor(private readonly service: ProjectEvaluationService) {}

  @Post()
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create project evaluation' })
  @ApiResponse({ status: 201, description: 'Evaluation created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() dto: CreateEvaluationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createEvaluation(dto, user.id);
  }

  @Get('own')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Own evaluations' })
  @ApiResponse({ status: 200, description: 'Evaluations list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listOwn(@CurrentUser() user: AuthenticatedUser) {
    return this.service.listOwn(user.id);
  }

  @Get('user/:id')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Evaluations for user' })
  @ApiResponse({ status: 200, description: 'Evaluations list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async listForUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.listForUser(id);
  }

  @Get('team/averages')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Average rating per team member' })
  @ApiResponse({ status: 200, description: 'Aggregates' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async teamAverages(@CurrentUser() user: AuthenticatedUser) {
    return this.service.getTeamAverages(user.id);
  }
}
