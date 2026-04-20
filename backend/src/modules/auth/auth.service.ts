import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from '../users/user.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { MailService } from '../../infrastructure/mail/mail.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { UserResponseDto } from '../users/dtos/user-response.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

interface ResetTokenEntry {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  /**
   * In-memory password reset store. Entity schema is frozen (Phase 4), so
   * reset tokens live in process memory keyed by email. Acceptable for a
   * single-instance dev/demo deployment; see README for clustered production
   * alternative (Redis / dedicated `password_reset` table).
   */
  private readonly resetTokens = new Map<string, ResetTokenEntry>();
  private readonly RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(
    email: string,
    password: string,
    ip: string | null,
  ): Promise<AuthResponseDto> {
    const user = await this.userService.validateCredentials(email, password);
    const accessToken = this.tokenService.signAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const refreshToken = this.tokenService.signRefreshToken(user.id);

    const refreshExpiresMs = this.tokenService.expiresInToMs(
      this.tokenService.getRefreshExpiresIn(),
    );
    const expiresAt = new Date(Date.now() + refreshExpiresMs);

    await this.refreshTokenRepository.create({
      token: refreshToken,
      userId: user.id,
      expiresAt,
      createdByIp: ip,
    });

    await this.userService.recordLogin(user.id);

    return {
      user: UserResponseDto.fromEntity(user),
      accessToken,
      refreshToken,
    };
  }

  async refresh(
    refreshToken: string | undefined,
    ip: string | null,
  ): Promise<AuthResponseDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    let payload: { id?: string; sub?: string };
    try {
      payload = this.tokenService.verifyRefresh(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const userId = payload.id ?? payload.sub;
    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token payload');
    }

    const existing = await this.refreshTokenRepository.findByToken(refreshToken);
    if (!existing || existing.revokedAt) {
      throw new UnauthorizedException('Refresh token not recognized');
    }
    if (existing.expiresAt.getTime() < Date.now()) {
      await this.refreshTokenRepository.deleteByToken(refreshToken);
      throw new UnauthorizedException('Refresh token expired');
    }

    // Rotate: delete old, issue new
    await this.refreshTokenRepository.deleteByToken(refreshToken);

    const user = await this.userService.findByIdOrFail(userId);

    const newAccessToken = this.tokenService.signAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const newRefreshToken = this.tokenService.signRefreshToken(user.id);
    const refreshExpiresMs = this.tokenService.expiresInToMs(
      this.tokenService.getRefreshExpiresIn(),
    );
    await this.refreshTokenRepository.create({
      token: newRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + refreshExpiresMs),
      createdByIp: ip,
    });

    return {
      user: UserResponseDto.fromEntity(user),
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) return;
    await this.refreshTokenRepository.deleteByToken(refreshToken);
  }

  async forgotPassword(email: string): Promise<void> {
    // Always respond identically regardless of whether the email exists.
    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.log(
        `Password-reset requested for unknown email ${email} — no-op.`,
      );
      return;
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    this.resetTokens.set(user.email.toLowerCase(), {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + this.RESET_TOKEN_TTL_MS),
    });

    await this.mailService.sendPasswordReset(user.email, rawToken);
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Password confirmation does not match');
    }
    const tokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    let matchedEmail: string | null = null;
    for (const [email, entry] of this.resetTokens.entries()) {
      if (entry.tokenHash === tokenHash) {
        if (entry.expiresAt.getTime() < Date.now()) {
          this.resetTokens.delete(email);
          throw new BadRequestException('Reset token expired');
        }
        matchedEmail = email;
        break;
      }
    }
    if (!matchedEmail) {
      throw new BadRequestException('Invalid or expired reset token');
    }
    const entry = this.resetTokens.get(matchedEmail);
    if (!entry) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    await this.userService.resetPassword(entry.userId, newPassword);
    this.resetTokens.delete(matchedEmail);
    // Revoke all refresh tokens for this user after reset.
    await this.refreshTokenRepository.deleteByUser(entry.userId);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    await this.userService.changePassword(
      userId,
      currentPassword,
      newPassword,
      confirmPassword,
    );
    // After changing password, revoke other refresh tokens for safety.
    await this.refreshTokenRepository.deleteByUser(userId);
  }
}
