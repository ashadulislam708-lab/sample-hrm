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
import { PerformanceReviewService } from './performance-review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { SelfAssessmentDto } from './dtos/self-assessment.dto';

@ApiTags('Performance - Reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('performance/reviews')
export class PerformanceReviewController {
  constructor(private readonly service: PerformanceReviewService) {}

  @Post()
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create performance review (reviewer)' })
  @ApiResponse({ status: 201, description: 'Review created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() dto: CreateReviewDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createReview(dto, user.id);
  }

  @Get('own')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Own reviews' })
  @ApiResponse({ status: 200, description: 'Reviews list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listOwn(@CurrentUser() user: AuthenticatedUser) {
    return this.service.listOwn(user.id);
  }

  @Post(':id/self-assessment')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Submit self-assessment' })
  @ApiResponse({ status: 200, description: 'Self-assessment submitted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async submitSelfAssessment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: SelfAssessmentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.submitSelfAssessment(id, user.id, dto.selfAssessment);
  }

  @Get('user/:id')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Reviews for user' })
  @ApiResponse({ status: 200, description: 'Reviews list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async listForUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.listForUser(id);
  }
}
