import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { DeepPartial } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

@ApiTags('Base')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export abstract class BaseController<
  T extends BaseEntity,
  CreateDto = DeepPartial<T>,
  UpdateDto = DeepPartial<T>,
> {
  constructor(protected readonly service: BaseService<T>) {}

  @Post()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create entity' })
  @ApiResponse({ status: 201, description: 'Entity created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() dto: CreateDto): Promise<T> {
    return this.service.create(dto as unknown as DeepPartial<T>);
  }

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List entities with pagination' })
  @ApiResponse({ status: 200, description: 'Paginated list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(undefined, {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
  }

  @Get(':id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Find entity by id' })
  @ApiResponse({ status: 200, description: 'Entity found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<T> {
    return this.service.findByIdOrFail(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update entity by id' })
  @ApiResponse({ status: 200, description: 'Entity updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateDto,
  ): Promise<T> {
    return this.service.update(id, dto as unknown as DeepPartial<T>);
  }

  @Delete(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete entity by id' })
  @ApiResponse({ status: 204, description: 'Entity deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.service.remove(id);
  }
}
