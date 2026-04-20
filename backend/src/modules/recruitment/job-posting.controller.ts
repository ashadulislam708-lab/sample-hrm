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
import { JobPostingService } from './job-posting.service';
import { CandidateService } from './candidate.service';
import { CreateJobPostingDto } from './dtos/create-job-posting.dto';
import { UpdateJobPostingDto } from './dtos/update-job-posting.dto';

@ApiTags('Recruitment - Job Postings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('recruitment/jobs')
export class JobPostingController {
  constructor(
    private readonly service: JobPostingService,
    private readonly candidateService: CandidateService,
  ) {}

  @Post()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create job posting' })
  @ApiResponse({ status: 201, description: 'Job posting created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() dto: CreateJobPostingDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createPosting(dto, user.id);
  }

  @Get()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List job postings' })
  @ApiResponse({ status: 200, description: 'Postings list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list() {
    return this.service.listAll();
  }

  @Get(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Get job posting detail' })
  @ApiResponse({ status: 200, description: 'Job posting' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findByIdOrFail(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update job posting' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateJobPostingDto,
  ) {
    return this.service.updatePosting(id, dto);
  }

  @Delete(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete job posting' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.service.remove(id);
  }

  @Get(':id/applications')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List applications for a job posting' })
  @ApiResponse({ status: 200, description: 'Applications' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Posting not found' })
  async applications(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.service.findByIdOrFail(id);
    return this.candidateService.listByPosting(id);
  }
}
