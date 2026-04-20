import {
  BadRequestException,
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
  ApiParam,
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
import { IntegrationConfigService } from './integration-config.service';
import { IntegrationProviderEnum } from '../../common/enums/integration-provider.enum';
import { UpdateIntegrationDto } from './dtos/update-integration.dto';

@ApiTags('Integrations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('integrations')
export class IntegrationConfigController {
  constructor(private readonly service: IntegrationConfigService) {}

  @Get()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List all integration configs' })
  @ApiResponse({ status: 200, description: 'Integration list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async list() {
    return this.service.listAll();
  }

  @Get(':provider')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiParam({ name: 'provider', enum: IntegrationProviderEnum })
  @ApiOperation({ summary: 'Get integration config' })
  @ApiResponse({ status: 200, description: 'Integration' })
  @ApiResponse({ status: 400, description: 'Invalid provider' })
  async get(@Param('provider') provider: string) {
    const providerEnum = this.parseProvider(provider);
    return this.service.getByProvider(providerEnum);
  }

  @Patch(':provider')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiParam({ name: 'provider', enum: IntegrationProviderEnum })
  @ApiOperation({ summary: 'Update integration config' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 400, description: 'Invalid provider' })
  async update(
    @Param('provider') provider: string,
    @Body() dto: UpdateIntegrationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const providerEnum = this.parseProvider(provider);
    return this.service.upsertByProvider(providerEnum, dto, user.id);
  }

  @Post(':provider/test')
  @Roles(RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'provider', enum: IntegrationProviderEnum })
  @ApiOperation({ summary: 'Test integration connectivity' })
  @ApiResponse({ status: 200, description: 'Connection test result' })
  @ApiResponse({ status: 400, description: 'Invalid provider' })
  async test(@Param('provider') provider: string) {
    const providerEnum = this.parseProvider(provider);
    return this.service.testConnection(providerEnum);
  }

  private parseProvider(raw: string): IntegrationProviderEnum {
    const value = Object.values(IntegrationProviderEnum).find((p) => p === raw);
    if (!value) {
      throw new BadRequestException(`Unknown integration provider: ${raw}`);
    }
    return value;
  }
}
