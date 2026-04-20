import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import { PaginationQueryDto } from '../../core/dto/pagination-query.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { User } from './user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Own profile', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(
    @CurrentUser() current: AuthenticatedUser,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findByIdOrFail(current.id);
    return UserResponseDto.fromEntity(user);
  }

  @Patch('me')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateMe(
    @CurrentUser() current: AuthenticatedUser,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    const updated = await this.userService.updateProfile(current.id, dto);
    return UserResponseDto.fromEntity(updated);
  }

  @Get('team/:teamLeaderId')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List members reporting to a team leader' })
  @ApiResponse({ status: 200, description: 'Team members', type: [UserResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getTeam(
    @CurrentUser() current: AuthenticatedUser,
    @Param('teamLeaderId', new ParseUUIDPipe()) teamLeaderId: string,
  ): Promise<UserResponseDto[]> {
    if (
      current.role === RoleEnum.TEAM_LEADER &&
      current.id !== teamLeaderId
    ) {
      throw new ForbiddenException('Team leaders can only view their own team');
    }
    const members = await this.userService.findTeam(teamLeaderId);
    return members.map((m) => UserResponseDto.fromEntity(m));
  }

  @Get()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'List all employees (HR admin)' })
  @ApiResponse({ status: 200, description: 'Paginated user list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll(@Query() query: PaginationQueryDto) {
    const result = await this.userService.findAll(undefined, {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
    return {
      ...result,
      items: result.items.map((u: User) => UserResponseDto.fromEntity(u)),
    };
  }

  @Post()
  @Roles(RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Create employee (HR admin)' })
  @ApiResponse({ status: 201, description: 'Employee created', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const created = await this.userService.createUser(dto);
    return UserResponseDto.fromEntity(created);
  }

  @Get(':id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Get employee detail (self / team leader / HR admin)' })
  @ApiResponse({ status: 200, description: 'Employee detail', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(
    @CurrentUser() current: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponseDto> {
    const target = await this.userService.findByIdOrFail(id);

    if (current.role === RoleEnum.HR_ADMIN) {
      return UserResponseDto.fromEntity(target);
    }
    if (current.id === target.id) {
      return UserResponseDto.fromEntity(target);
    }
    if (
      current.role === RoleEnum.TEAM_LEADER &&
      target.teamLeaderId === current.id
    ) {
      return UserResponseDto.fromEntity(target);
    }
    throw new ForbiddenException('Not permitted to view this user');
  }

  @Patch(':id')
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Update employee (team leader for team member / HR admin)' })
  @ApiResponse({ status: 200, description: 'Employee updated', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @CurrentUser() current: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const target = await this.userService.findByIdOrFail(id);
    if (
      current.role === RoleEnum.TEAM_LEADER &&
      target.teamLeaderId !== current.id
    ) {
      throw new ForbiddenException(
        'Team leaders can only update their own team members',
      );
    }
    const updated = await this.userService.updateUser(id, dto);
    return UserResponseDto.fromEntity(updated);
  }

  @Delete(':id')
  @Roles(RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete employee (HR admin)' })
  @ApiResponse({ status: 204, description: 'Employee deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.userService.remove(id);
  }
}
