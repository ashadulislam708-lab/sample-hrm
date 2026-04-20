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
import { ReviewCycleService } from './review-cycle.service';
import { CreateReviewCycleDto } from './dtos/create-review-cycle.dto';
import { UpdateReviewCycleDto } from './dtos/update-review-cycle.dto';

@ApiTags('Performance - Review Cycles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('performance/cycles')
export class ReviewCycleController {
  constructor(private readonly service: ReviewCycleService) {}

  @Post()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create review cycle' })
  @ApiResponse({ status: 201, description: 'Cycle created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() dto: CreateReviewCycleDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createCycle(dto, user.id);
  }

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List review cycles' })
  @ApiResponse({ status: 200, description: 'Cycles list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list() {
    return this.service.findAll();
  }

  @Patch(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update review cycle' })
  @ApiResponse({ status: 200, description: 'Cycle updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateReviewCycleDto,
  ) {
    return this.service.updateCycle(id, dto);
  }
}
