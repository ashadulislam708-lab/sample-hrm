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
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dtos/create-policy.dto';
import { UpdatePolicyDto } from './dtos/update-policy.dto';

@ApiTags('Policies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('policies')
export class PolicyController {
  constructor(private readonly service: PolicyService) {}

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List active policies' })
  @ApiResponse({ status: 200, description: 'Active policy list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listActive() {
    return this.service.listForEmployee();
  }

  @Get(':slug')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Get policy by slug' })
  @ApiResponse({ status: 200, description: 'Policy detail' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlugOrFail(slug);
  }

  @Post(':id/acknowledge')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Acknowledge policy (current user)' })
  @ApiResponse({ status: 201, description: 'Acknowledgement recorded' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  async acknowledge(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.acknowledge(user.id, id);
  }

  @Post()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create policy' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 409, description: 'Slug already in use' })
  async create(
    @Body() dto: CreatePolicyDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createPolicy(dto, user.id);
  }

  @Patch(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update policy' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 409, description: 'Slug conflict' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePolicyDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updatePolicy(id, dto, user.id);
  }

  @Delete(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete policy' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.service.remove(id);
  }

  @Get(':id/acknowledgements')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Acknowledgement status per user' })
  @ApiResponse({ status: 200, description: 'Ack summary' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async ackSummary(@Param('id', new ParseUUIDPipe()) id: string) {
    const [status, list] = await Promise.all([
      this.service.ackStatus(id),
      this.service.listAcknowledgements(id),
    ]);
    return { summary: status, acknowledgements: list };
  }
}
