import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export interface SlackTestResult {
  success: boolean;
  message: string;
  timestamp: string;
}

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly http: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.http = axios.create({ timeout: 10_000 });
  }

  private getWebhookUrl(): string {
    return this.configService.get<string>('slack.webhookUrl') ?? '';
  }

  private getChannel(): string {
    return (
      this.configService.get<string>('slack.emergencyChannel') ??
      '#emergency-leaves'
    );
  }

  async sendEmergencyLeaveNotification(
    employeeName: string,
    reason: string,
    estimatedReturn: Date | null,
  ): Promise<string> {
    const webhook = this.getWebhookUrl();
    const returnText = estimatedReturn
      ? ` (est. return ${estimatedReturn.toISOString()})`
      : '';
    const text = `Emergency leave: *${employeeName}* — ${reason}${returnText}`;
    if (!webhook) {
      this.logger.warn(
        `SLACK_WEBHOOK_URL not set; mock emergency-leave notification for ${employeeName}`,
      );
      return `mock-${Date.now()}`;
    }
    try {
      await this.http.post(webhook, {
        channel: this.getChannel(),
        text,
      });
      return `${Date.now()}.emergency`;
    } catch (err) {
      this.logger.error(
        `Slack emergency-leave send failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      return `mock-${Date.now()}`;
    }
  }

  async updateEmergencyLeaveThread(
    threadTs: string,
    employeeName: string,
  ): Promise<void> {
    const webhook = this.getWebhookUrl();
    const text = `*${employeeName}* has returned to work.`;
    if (!webhook) {
      this.logger.warn(
        `SLACK_WEBHOOK_URL not set; mock thread update for ${employeeName} (ts=${threadTs})`,
      );
      return;
    }
    try {
      await this.http.post(webhook, {
        channel: this.getChannel(),
        text,
        thread_ts: threadTs,
      });
    } catch (err) {
      this.logger.error(
        `Slack thread update failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  async testConnection(): Promise<SlackTestResult> {
    const webhook = this.getWebhookUrl();
    const timestamp = new Date().toISOString();
    if (!webhook) {
      return {
        success: false,
        message: 'SLACK_WEBHOOK_URL is not configured',
        timestamp,
      };
    }
    try {
      await this.http.post(webhook, {
        channel: this.getChannel(),
        text: 'Sample HRM: Slack connectivity test',
      });
      return { success: true, message: 'Test message delivered', timestamp };
    } catch (err) {
      return {
        success: false,
        message:
          err instanceof Error ? err.message : 'Unknown Slack transport error',
        timestamp,
      };
    }
  }
}
