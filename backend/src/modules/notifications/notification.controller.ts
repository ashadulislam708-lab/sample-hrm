import {
  Controller,
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
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import { PaginationQueryDto } from '../../core/dto/pagination-query.dto';
import { NotificationService } from './notification.service';
import { NotificationResponseDto } from './dtos/notification-response.dto';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('me')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Current user notifications (paginated)' })
  @ApiResponse({ status: 200, description: 'Paginated notification list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listMy(
    @CurrentUser() current: AuthenticatedUser,
    @Query() query: PaginationQueryDto,
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const result = await this.notificationService.listForUser(
      current.id,
      page,
      limit,
    );
    return {
      ...result,
      items: result.items.map((n) => NotificationResponseDto.fromEntity(n)),
      unreadCount: await this.notificationService.countUnread(current.id),
    };
  }

  @Patch(':id/read')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Marked as read', type: NotificationResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async markRead(
    @CurrentUser() current: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<NotificationResponseDto> {
    const updated = await this.notificationService.markRead(current.id, id);
    return NotificationResponseDto.fromEntity(updated);
  }

  @Post('read-all')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all own notifications as read' })
  @ApiResponse({ status: 200, description: 'All read' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async markAllRead(
    @CurrentUser() current: AuthenticatedUser,
  ): Promise<{ message: string }> {
    await this.notificationService.markAllRead(current.id);
    return { message: 'All notifications marked as read' };
  }

  @Delete(':id')
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a notification (own only)' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async deleteNotification(
    @CurrentUser() current: AuthenticatedUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.notificationService.deleteOwn(current.id, id);
  }
}
