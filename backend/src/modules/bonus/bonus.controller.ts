import {
  Body,
  Controller,
  ForbiddenException,
  Get,
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
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import { BonusService } from './bonus.service';
import { CreateProjectBonusDto } from './dtos/create-project-bonus.dto';
import { CreateFestivalBonusDto } from './dtos/create-festival-bonus.dto';
import { FilterBonusDto } from './dtos/filter-bonus.dto';

@ApiTags('Bonuses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bonuses')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Post('project')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create a project bonus for a single employee' })
  @ApiResponse({ status: 201, description: 'Bonus created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createProject(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateProjectBonusDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.bonusService.createProjectBonus(
      dto.userId,
      Number(dto.amount),
      dto.projectReference,
      user.id,
      user.role as RoleEnum,
      dto.reason,
    );
  }

  @Post('festival')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create a festival bonus for multiple employees' })
  @ApiResponse({ status: 201, description: 'Bonuses created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createFestival(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateFestivalBonusDto,
  ) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.bonusService.createFestivalBonus(
      dto.userIds,
      Number(dto.amount),
      dto.festivalName,
      user.id,
      user.role as RoleEnum,
      dto.reason,
    );
  }

  @Get('own')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List own bonus history' })
  @ApiResponse({ status: 200, description: 'Own bonus list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listOwn(@CurrentUser() user: AuthenticatedUser) {
    if (!user) throw new ForbiddenException('Authentication required');
    return this.bonusService.listOwn(user.id);
  }

  @Get()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List bonuses (admin)' })
  @ApiResponse({ status: 200, description: 'Paginated bonus list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async listAdmin(@Query() filters: FilterBonusDto) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const { items, total } = await this.bonusService.listAll(
      {
        userId: filters.userId,
        type: filters.type,
        from: filters.from ? new Date(filters.from) : undefined,
        to: filters.to ? new Date(filters.to) : undefined,
      },
      page,
      limit,
    );
    return { items, total, page, limit };
  }

  @Get(':id')
  @Roles(RoleEnum.HR_ADMIN, RoleEnum.TEAM_LEADER, RoleEnum.EMPLOYEE)
  @ApiOperation({ summary: 'Bonus detail' })
  @ApiResponse({ status: 200, description: 'Bonus detail' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const bonus = await this.bonusService.findByIdOrFail(id);
    if (
      user &&
      user.role === RoleEnum.EMPLOYEE &&
      bonus.userId !== user.id
    ) {
      throw new ForbiddenException('Cannot access another user bonus');
    }
    return bonus;
  }
}
