import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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
import { Public } from '../../core/decorators/public.decorator';
import { RoleEnum } from '../../common/enums/role.enum';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../core/decorators/current-user.decorator';
import { DailyNoteService } from './daily-note.service';
import { NotionSyncWebhookDto } from './dtos/notion-sync-webhook.dto';

@ApiTags('Performance - Daily Notes')
@Controller('performance/daily-notes')
export class DailyNoteController {
  constructor(private readonly service: DailyNoteService) {}

  @Post('sync')
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'Notion webhook: upsert daily notes' })
  @ApiResponse({ status: 200, description: 'Sync processed' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async sync(@Body() dto: NotionSyncWebhookDto) {
    return this.service.syncBatch(dto);
  }

  @Get('own')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.EMPLOYEE, RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Own daily notes (last 30 days)' })
  @ApiResponse({ status: 200, description: 'List' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listOwn(@CurrentUser() user: AuthenticatedUser) {
    const notes = await this.service.listOwn(user.id);
    const streak = await this.service.getStreak(user.id);
    return { notes, streak };
  }

  @Get('user/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.TEAM_LEADER, RoleEnum.HR_ADMIN)
  @ApiOperation({ summary: 'Daily notes for user (team leader / admin)' })
  @ApiResponse({ status: 200, description: 'List' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async listForUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.listForUser(id);
  }
}
