import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios, { AxiosInstance } from 'axios';

export interface GatherPlayer {
  id: string;
  name: string;
  email?: string | null;
  isActive: boolean;
  lastSeen?: string | null;
}

export interface GatherTestResult {
  success: boolean;
  message: string;
  timestamp: string;
}

export const GATHER_ATTENDANCE_HANDLER = 'GATHER_ATTENDANCE_HANDLER';

/**
 * Implemented by the attendance module. Allows gather-town infrastructure
 * to notify the domain layer about presence changes without a compile-time
 * dependency on attendance internals.
 */
export interface GatherAttendanceHandler {
  gatherClockIn(payload: {
    email: string;
    clockInTime: Date;
  }): Promise<void>;
}

@Injectable()
export class GatherService {
  private readonly logger = new Logger(GatherService.name);
  private readonly http: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    @Optional()
    @Inject(GATHER_ATTENDANCE_HANDLER)
    private readonly attendanceHandler: GatherAttendanceHandler | null,
  ) {
    this.http = axios.create({
      baseURL: 'https://api.gather.town/api/v2',
      timeout: 10_000,
    });
  }

  private getApiKey(): string {
    return this.configService.get<string>('gather.apiKey') ?? '';
  }

  private getSpaceId(): string {
    return this.configService.get<string>('gather.spaceId') ?? '';
  }

  async fetchPresenceForSpace(): Promise<GatherPlayer[]> {
    const apiKey = this.getApiKey();
    const spaceId = this.getSpaceId();
    if (!apiKey || !spaceId) {
      this.logger.warn('GATHER_API_KEY/GATHER_SPACE_ID not set; skipping presence fetch');
      return [];
    }
    try {
      const { data } = await this.http.get<{ players: GatherPlayer[] }>(
        `/spaces/${encodeURIComponent(spaceId)}/players`,
        { headers: { Authorization: `Bearer ${apiKey}` } },
      );
      return data?.players ?? [];
    } catch (err) {
      this.logger.error(
        `Gather presence fetch failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      return [];
    }
  }

  @Cron('0 */5 * * * *', { name: 'gather-presence-sync' })
  async syncAttendance(): Promise<void> {
    if ((process.env.NODE_ENV ?? 'development') === 'test') {
      return;
    }
    const players = await this.fetchPresenceForSpace();
    if (players.length === 0) return;
    if (!this.attendanceHandler) {
      this.logger.debug(
        'GatherAttendanceHandler not registered; presence sync skipped',
      );
      return;
    }
    const clockInTime = new Date();
    for (const player of players) {
      if (!player.isActive || !player.email) continue;
      try {
        await this.attendanceHandler.gatherClockIn({
          email: player.email,
          clockInTime,
        });
      } catch (err) {
        this.logger.warn(
          `gatherClockIn failed for ${player.email}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    }
  }

  async testConnection(): Promise<GatherTestResult> {
    const apiKey = this.getApiKey();
    const spaceId = this.getSpaceId();
    const timestamp = new Date().toISOString();
    if (!apiKey || !spaceId) {
      return {
        success: false,
        message: 'GATHER_API_KEY / GATHER_SPACE_ID is not configured',
        timestamp,
      };
    }
    try {
      await this.http.get(`/spaces/${encodeURIComponent(spaceId)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      return { success: true, message: 'Gather API reachable', timestamp };
    } catch (err) {
      return {
        success: false,
        message:
          err instanceof Error ? err.message : 'Unknown Gather transport error',
        timestamp,
      };
    }
  }
}
