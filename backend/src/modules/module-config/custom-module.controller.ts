import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { CustomModuleService } from './custom-module.service';
import { CreateModuleDto } from './dtos/create-module.dto';
import { UpdateModuleDto } from './dtos/update-module.dto';
import { ToggleModuleDto } from './dtos/toggle-module.dto';

@ApiTags('Module Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('modules')
export class CustomModuleController {
  constructor(private readonly service: CustomModuleService) {}

  @Post()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create custom module' })
  @ApiResponse({ status: 201, description: 'Module created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() dto: CreateModuleDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createModule(dto, user.id);
  }

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List modules' })
  @ApiResponse({ status: 200, description: 'Modules' })
  async list() {
    return this.service.findAll();
  }

  @Patch(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update module' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateModuleDto,
  ) {
    return this.service.updateModule(id, dto);
  }

  @Patch(':id/toggle')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Enable/disable module' })
  @ApiResponse({ status: 200, description: 'Toggled' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async toggle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: ToggleModuleDto,
  ) {
    return this.service.toggle(id, dto.status);
  }

  @Delete(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete module' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.service.remove(id);
  }

  @Get(':id/metrics/user/:userId')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Execute custom metric for user' })
  @ApiResponse({ status: 200, description: 'Metric result' })
  @ApiResponse({ status: 404, description: 'Module not found' })
  async metric(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    return this.service.executeCustomMetric(id, userId);
  }
}
