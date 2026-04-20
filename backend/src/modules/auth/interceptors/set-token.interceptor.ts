import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '../../../infrastructure/token/token.service';

interface TokenBearingData {
  accessToken?: string;
  refreshToken?: string;
}

@Injectable()
export class SetTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      tap((data: unknown) => {
        const payload = (data ?? {}) as TokenBearingData;
        if (!payload?.accessToken) return;

        const response = context.switchToHttp().getResponse<Response>();
        const accessName =
          this.configService.get<string>('cookie.accessName') ?? 'access_token';
        const refreshName =
          this.configService.get<string>('cookie.refreshName') ??
          'refresh_token';
        const secure =
          this.configService.get<boolean>('cookie.secure') ?? false;
        const sameSite =
          this.configService.get<'strict' | 'lax' | 'none'>(
            'cookie.sameSite',
          ) ?? 'strict';

        response.cookie(accessName, payload.accessToken, {
          httpOnly: true,
          secure,
          sameSite,
          path: '/',
          maxAge: this.tokenService.expiresInToMs(
            this.tokenService.getAccessExpiresIn(),
          ),
        });

        if (payload.refreshToken) {
          response.cookie(refreshName, payload.refreshToken, {
            httpOnly: true,
            secure,
            sameSite,
            path: '/',
            maxAge: this.tokenService.expiresInToMs(
              this.tokenService.getRefreshExpiresIn(),
            ),
          });
        }

        // Strip raw tokens from response body so they are delivered via cookies only.
        delete payload.accessToken;
        delete payload.refreshToken;
      }),
    );
  }
}
