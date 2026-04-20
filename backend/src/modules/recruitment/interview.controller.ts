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
import { InterviewService } from './interview.service';
import { ScheduleInterviewDto } from './dtos/schedule-interview.dto';
import { InterviewFeedbackDto } from './dtos/interview-feedback.dto';

@ApiTags('Recruitment - Interviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('recruitment/interviews')
export class InterviewController {
  constructor(private readonly service: InterviewService) {}

  @Post()
  @Roles(RoleEnum.HR_ADMIN, RoleEnum.TEAM_LEADER)
  @ApiOperation({ summary: 'Schedule interview' })
  @ApiResponse({ status: 201, description: 'Interview scheduled' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async schedule(@Body() dto: ScheduleInterviewDto) {
    return this.service.schedule(dto);
  }

  @Get()
  @Roles(RoleEnum.HR_ADMIN, RoleEnum.TEAM_LEADER)
  @ApiOperation({ summary: 'Upcoming interviews' })
  @ApiResponse({ status: 200, description: 'Interviews list' })
  async listUpcoming() {
    return this.service.listUpcoming();
  }

  @Patch(':id/feedback')
  @Roles(RoleEnum.HR_ADMIN, RoleEnum.TEAM_LEADER)
  @ApiOperation({ summary: 'Submit interview feedback' })
  @ApiResponse({ status: 200, description: 'Feedback saved' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async feedback(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: InterviewFeedbackDto,
  ) {
    return this.service.addFeedback(id, dto);
  }
}
