import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { OfficeConfigService } from './office-config.service';
import { UpdateOfficeConfigDto } from './dtos/update-office-config.dto';

@ApiTags('Office Configuration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('office-config')
export class OfficeConfigController {
  constructor(private readonly service: OfficeConfigService) {}

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Get all office config values' })
  @ApiResponse({ status: 200, description: 'Config record' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAll() {
    return this.service.getAllAsRecord();
  }

  @Get(':key')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Get a single config key' })
  @ApiResponse({ status: 200, description: 'Value' })
  @ApiResponse({ status: 404, description: 'Key not found' })
  async getOne(@Param('key') key: string) {
    return { key, value: await this.service.get(key) };
  }

  @Patch()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Bulk update office config values' })
  @ApiResponse({ status: 200, description: 'Updated config' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async bulkUpdate(
    @Body() dto: UpdateOfficeConfigDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.bulkUpdate(dto.values, user.id);
  }

  @Post('reset')
  @Roles(RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset all config to defaults' })
  @ApiResponse({ status: 200, description: 'Reset defaults' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async reset() {
    return this.service.resetAll();
  }
}
