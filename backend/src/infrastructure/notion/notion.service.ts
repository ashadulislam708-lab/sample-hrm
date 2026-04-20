import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios, { AxiosInstance } from 'axios';

export interface NotionFetchedNote {
  notionPageId: string;
  notionUserId?: string | null;
  authorEmail?: string | null;
  noteDate: string;
  title?: string | null;
  summary?: string | null;
  tasksCompleted?: number;
  blockersReported?: string[];
}

export interface NotionTestResult {
  success: boolean;
  message: string;
  timestamp: string;
}

export const NOTION_DAILY_NOTE_HANDLER = 'NOTION_DAILY_NOTE_HANDLER';

export interface NotionDailyNoteHandler {
  upsertFromNotion(note: NotionFetchedNote): Promise<unknown>;
}

@Injectable()
export class NotionService {
  private readonly logger = new Logger(NotionService.name);
  private readonly http: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    @Optional()
    @Inject(NOTION_DAILY_NOTE_HANDLER)
    private readonly handler: NotionDailyNoteHandler | null,
  ) {
    this.http = axios.create({
      baseURL: 'https://api.notion.com/v1',
      timeout: 15_000,
    });
  }

  private getToken(): string {
    return this.configService.get<string>('notion.apiToken') ?? '';
  }

  private getDatabaseId(): string {
    return this.configService.get<string>('notion.databaseId') ?? '';
  }

  private headers() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };
  }

  async fetchDailyNotes(since: Date): Promise<NotionFetchedNote[]> {
    const token = this.getToken();
    const databaseId = this.getDatabaseId();
    if (!token || !databaseId) {
      this.logger.warn(
        'NOTION_API_TOKEN / NOTION_DATABASE_ID missing; skipping Notion fetch',
      );
      return [];
    }
    try {
      const { data } = await this.http.post<{
        results: Array<Record<string, unknown>>;
      }>(
        `/databases/${encodeURIComponent(databaseId)}/query`,
        {
          filter: {
            timestamp: 'last_edited_time',
            last_edited_time: { on_or_after: since.toISOString() },
          },
          page_size: 100,
        },
        { headers: this.headers() },
      );
      const results = data?.results ?? [];
      return results.map((row) => this.mapRow(row));
    } catch (err) {
      this.logger.error(
        `Notion fetch failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      return [];
    }
  }

  private mapRow(row: Record<string, unknown>): NotionFetchedNote {
    const pageId = typeof row['id'] === 'string' ? (row['id'] as string) : '';
    const properties = (row['properties'] ?? {}) as Record<string, unknown>;

    const readRichText = (key: string): string | null => {
      const prop = properties[key] as
        | { rich_text?: Array<{ plain_text?: string }> }
        | undefined;
      const items = prop?.rich_text;
      if (!items || items.length === 0) return null;
      return items.map((i) => i.plain_text ?? '').join('');
    };

    const readTitle = (key: string): string | null => {
      const prop = properties[key] as
        | { title?: Array<{ plain_text?: string }> }
        | undefined;
      const items = prop?.title;
      if (!items || items.length === 0) return null;
      return items.map((i) => i.plain_text ?? '').join('');
    };

    const readDate = (key: string): string => {
      const prop = properties[key] as
        | { date?: { start?: string } }
        | undefined;
      return prop?.date?.start ?? new Date().toISOString().slice(0, 10);
    };

    const readNumber = (key: string): number | undefined => {
      const prop = properties[key] as { number?: number | null } | undefined;
      return typeof prop?.number === 'number' ? prop.number : undefined;
    };

    const readEmail = (key: string): string | null => {
      const prop = properties[key] as { email?: string | null } | undefined;
      return prop?.email ?? null;
    };

    const readPerson = (key: string): string | null => {
      const prop = properties[key] as
        | { people?: Array<{ id?: string }> }
        | undefined;
      const first = prop?.people?.[0];
      return first?.id ?? null;
    };

    const readMultiSelect = (key: string): string[] => {
      const prop = properties[key] as
        | { multi_select?: Array<{ name?: string }> }
        | undefined;
      return (prop?.multi_select ?? [])
        .map((x) => x.name)
        .filter((x): x is string => typeof x === 'string');
    };

    return {
      notionPageId: pageId,
      notionUserId: readPerson('Author'),
      authorEmail: readEmail('Email'),
      noteDate: readDate('Date'),
      title: readTitle('Name') ?? readRichText('Title'),
      summary: readRichText('Summary'),
      tasksCompleted: readNumber('Tasks Completed'),
      blockersReported: readMultiSelect('Blockers'),
    };
  }

  @Cron('0 */15 * * * *', { name: 'notion-daily-notes-sync' })
  async syncDailyNotes(): Promise<{ processed: number; failed: number }> {
    if ((process.env.NODE_ENV ?? 'development') === 'test') {
      return { processed: 0, failed: 0 };
    }
    const minutes =
      this.configService.get<number>('notion.syncIntervalMinutes') ?? 15;
    const since = new Date(Date.now() - minutes * 60 * 1000);
    const notes = await this.fetchDailyNotes(since);
    if (notes.length === 0 || !this.handler) {
      return { processed: 0, failed: 0 };
    }
    let processed = 0;
    let failed = 0;
    for (const note of notes) {
      try {
        await this.handler.upsertFromNotion(note);
        processed += 1;
      } catch (err) {
        failed += 1;
        this.logger.warn(
          `Notion upsert failed for page ${note.notionPageId}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    }
    return { processed, failed };
  }

  async testConnection(): Promise<NotionTestResult> {
    const token = this.getToken();
    const databaseId = this.getDatabaseId();
    const timestamp = new Date().toISOString();
    if (!token || !databaseId) {
      return {
        success: false,
        message: 'NOTION_API_TOKEN / NOTION_DATABASE_ID is not configured',
        timestamp,
      };
    }
    try {
      await this.http.get(`/databases/${encodeURIComponent(databaseId)}`, {
        headers: this.headers(),
      });
      return { success: true, message: 'Notion database reachable', timestamp };
    } catch (err) {
      return {
        success: false,
        message:
          err instanceof Error ? err.message : 'Unknown Notion transport error',
        timestamp,
      };
    }
  }
}
