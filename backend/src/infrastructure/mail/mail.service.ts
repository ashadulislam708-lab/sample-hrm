import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;
  private readonly from: string;
  private readonly frontendBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('mail.host') ?? '';
    const port = this.configService.get<number>('mail.port') ?? 1025;
    const user = this.configService.get<string>('mail.user') ?? '';
    const password = this.configService.get<string>('mail.password') ?? '';
    this.from =
      this.configService.get<string>('mail.from') ?? 'no-reply@sample-hrm.com';
    this.frontendBaseUrl =
      this.configService.get<string>('frontendBaseUrl') ??
      'http://localhost:5173';

    if (!host) {
      this.transporter = null;
      this.logger.warn(
        'MAIL_HOST not configured. Mail will be logged to console.',
      );
    } else {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth:
          user && password
            ? {
                user,
                pass: password,
              }
            : undefined,
      });
    }
  }

  async sendPasswordReset(to: string, token: string): Promise<void> {
    const resetUrl = `${this.frontendBaseUrl}/reset-password?token=${encodeURIComponent(token)}`;
    const subject = 'Password reset instructions';
    const text = `You requested to reset your password. Click the following link (valid for 1 hour):\n\n${resetUrl}\n\nIf you did not request this, ignore this email.`;
    const html = `<p>You requested to reset your password.</p><p><a href="${resetUrl}">Click here to reset (valid for 1 hour)</a></p><p>If you did not request this, ignore this email.</p>`;
    await this.send(to, subject, text, html);
  }

  async sendLoginNotification(to: string, ip: string): Promise<void> {
    const subject = 'New login to your Sample HRM account';
    const text = `A new login was detected from IP ${ip} at ${new Date().toISOString()}. If this wasn't you, reset your password immediately.`;
    const html = `<p>A new login was detected from IP <strong>${ip}</strong> at ${new Date().toISOString()}.</p><p>If this wasn't you, reset your password immediately.</p>`;
    await this.send(to, subject, text, html);
  }

  private async send(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    if (!this.transporter) {
      this.logger.log(
        `[MAIL STUB] to=${to} subject="${subject}" text="${text}"`,
      );
      return;
    }
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        text,
        html,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown mail error';
      this.logger.error(`Failed to send mail to ${to}: ${message}`);
    }
  }
}
