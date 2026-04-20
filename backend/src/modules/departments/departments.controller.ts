import { Controller, Get, UseGuards } from '@nestjs/common';
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
import { DepartmentsService } from './departments.service';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List distinct departments' })
  @ApiResponse({ status: 200, description: 'Department list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list() {
    return this.service.listDistinct();
  }

  @Get('headcount')
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Headcount per department' })
  @ApiResponse({ status: 200, description: 'Headcount list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async headcount() {
    return this.service.countPerDepartment();
  }
}
