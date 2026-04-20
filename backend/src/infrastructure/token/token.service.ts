import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from '../../common/enums/role.enum';

export interface AccessTokenPayload {
  sub: string;
  id: string;
  email: string;
  role: RoleEnum;
}

export interface RefreshTokenPayload {
  sub: string;
  id: string;
  tokenId?: string;
}

@Injectable()
export class TokenService {
  private readonly accessSecret: string;
  private readonly accessExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const access = this.configService.get<string>('jwt.accessSecret');
    const refresh = this.configService.get<string>('jwt.refreshSecret');
    if (!access) {
      throw new Error('JWT_SECRET is required');
    }
    if (!refresh) {
      throw new Error('REFRESH_TOKEN_SECRET is required');
    }
    this.accessSecret = access;
    this.refreshSecret = refresh;
    this.accessExpiresIn =
      this.configService.get<string>('jwt.accessExpiresIn') ?? '1h';
    this.refreshExpiresIn =
      this.configService.get<string>('jwt.refreshExpiresIn') ?? '7d';
  }

  signAccessToken(userId: string, email: string, role: RoleEnum): string {
    const payload: AccessTokenPayload = {
      sub: userId,
      id: userId,
      email,
      role,
    };
    return this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn,
    });
  }

  signRefreshToken(userId: string, tokenId?: string): string {
    const payload: RefreshTokenPayload = {
      sub: userId,
      id: userId,
      tokenId,
    };
    return this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn,
    });
  }

  verifyAccess(token: string): AccessTokenPayload {
    return this.jwtService.verify<AccessTokenPayload>(token, {
      secret: this.accessSecret,
    });
  }

  verifyRefresh(token: string): RefreshTokenPayload {
    return this.jwtService.verify<RefreshTokenPayload>(token, {
      secret: this.refreshSecret,
    });
  }

  /**
   * Convert expiration string (1h, 7d, 15m, 30s) to milliseconds.
   */
  expiresInToMs(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) return 60 * 60 * 1000;
    const value = Number.parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return 60 * 60 * 1000;
    }
  }

  getAccessExpiresIn(): string {
    return this.accessExpiresIn;
  }

  getRefreshExpiresIn(): string {
    return this.refreshExpiresIn;
  }
}
