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
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dtos/create-candidate.dto';
import { UpdateCandidateStatusDto } from './dtos/update-candidate-status.dto';

@ApiTags('Recruitment - Candidates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('recruitment/candidates')
export class CandidateController {
  constructor(private readonly service: CandidateService) {}

  @Post()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create candidate (application)' })
  @ApiResponse({ status: 201, description: 'Candidate created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() dto: CreateCandidateDto) {
    return this.service.createCandidate(dto);
  }

  @Get()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List candidates' })
  @ApiResponse({ status: 200, description: 'Candidates list' })
  async list() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Candidate detail' })
  @ApiResponse({ status: 200, description: 'Candidate' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findByIdOrFail(id);
  }

  @Patch(':id/status')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update candidate status' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCandidateStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }

  @Post(':id/onboard')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({
    summary: 'Build onboarding payload from candidate (HR then creates user)',
  })
  @ApiResponse({ status: 201, description: 'Onboarding payload returned' })
  @ApiResponse({ status: 404, description: 'Candidate not found' })
  async onboard(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.onboardToEmployee(id);
  }
}
