import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { DailyNote } from './daily-note.entity';
import { DailyNoteRepository } from './daily-note.repository';
import { UserRepository } from '../users/user.repository';
import {
  NotionSyncNoteDto,
  NotionSyncWebhookDto,
} from './dtos/notion-sync-webhook.dto';

@Injectable()
export class DailyNoteService extends BaseService<DailyNote> {
  private readonly logger = new Logger(DailyNoteService.name);

  constructor(
    protected readonly repository: DailyNoteRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(repository, 'DailyNote');
  }

  async upsertFromNotion(payload: NotionSyncNoteDto): Promise<DailyNote> {
    let userId: string | null = null;

    if (payload.notionUserId) {
      const user = await this.userRepository.findOne({
        where: { notionUserId: payload.notionUserId },
      });
      if (user) userId = user.id;
    }
    if (!userId && payload.authorEmail) {
      const user = await this.userRepository.findOne({
        where: { email: payload.authorEmail.toLowerCase() },
      });
      if (user) userId = user.id;
    }

    if (!userId) {
      this.logger.warn(
        `Notion sync: could not resolve user for page ${payload.notionPageId}`,
      );
      throw new NotFoundException(
        `Could not resolve user for Notion page ${payload.notionPageId}`,
      );
    }

    const noteDate = new Date(payload.noteDate);

    let existing: DailyNote | null = null;
    if (payload.notionPageId) {
      existing = await this.repository.findByNotionPageId(payload.notionPageId);
    }
    if (!existing) {
      existing = await this.repository.findByUserAndDate(userId, noteDate);
    }

    const data: DeepPartial<DailyNote> = {
      userId,
      noteDate,
      notionPageId: payload.notionPageId ?? null,
      title: payload.title ?? null,
      summary: payload.summary ?? null,
      tasksCompleted: payload.tasksCompleted ?? 0,
      blockersReported: payload.blockersReported ?? [],
    };

    if (existing) {
      const updated = await this.repository.update(existing.id, data);
      return updated ?? existing;
    }
    return this.repository.create(data);
  }

  async syncBatch(
    payload: NotionSyncWebhookDto,
  ): Promise<{ processed: number; failed: number }> {
    let processed = 0;
    let failed = 0;
    for (const note of payload.notes) {
      try {
        await this.upsertFromNotion(note);
        processed += 1;
      } catch (err) {
        failed += 1;
        this.logger.warn(
          `Notion sync failed for page ${note.notionPageId}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    }
    return { processed, failed };
  }

  async listOwn(userId: string, from?: Date, to?: Date): Promise<DailyNote[]> {
    const start = from ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = to ?? new Date();
    return this.repository.findByUserAndDateRange(userId, start, end);
  }

  async listForUser(
    targetUserId: string,
    from?: Date,
    to?: Date,
  ): Promise<DailyNote[]> {
    const start = from ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = to ?? new Date();
    return this.repository.findByUserAndDateRange(targetUserId, start, end);
  }

  async listForTeam(
    teamLeaderId: string,
    from?: Date,
    to?: Date,
  ): Promise<DailyNote[]> {
    const start = from ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = to ?? new Date();
    const members = await this.userRepository.findByTeamLeader(teamLeaderId);
    return this.repository.findByTeam(members.map((m) => m.id), start, end);
  }

  async getStreak(userId: string): Promise<number> {
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    return this.repository.streakForUser(userId, since);
  }
}
