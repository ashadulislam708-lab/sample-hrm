import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleEnum } from '../../../common/enums/role.enum';

export interface JwtValidatedUser {
  id: string;
  email: string;
  role: RoleEnum;
}

interface JwtPayloadShape {
  sub?: string;
  id?: string;
  email?: string;
  role?: RoleEnum;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('jwt.accessSecret');
    if (!secret) {
      throw new Error('JWT_SECRET is required');
    }
    const cookieName =
      configService.get<string>('cookie.accessName') ?? 'access_token';

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const cookies = (req?.cookies ?? {}) as Record<string, string>;
          return cookies[cookieName] ?? null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayloadShape): JwtValidatedUser {
    const id = payload.id ?? payload.sub;
    if (!id || !payload.email || !payload.role) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return {
      id,
      email: payload.email,
      role: payload.role,
    };
  }
}
