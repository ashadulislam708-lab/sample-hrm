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

@Injectable()
export class RemoveTokenInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      tap(() => {
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

        const options = {
          httpOnly: true,
          secure,
          sameSite,
          path: '/',
        };
        response.clearCookie(accessName, options);
        response.clearCookie(refreshName, options);
      }),
    );
  }
}
