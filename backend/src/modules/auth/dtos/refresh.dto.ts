import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * Refresh token is normally provided via the httpOnly `refresh_token` cookie.
 * This DTO exists as an optional fallback for API clients that cannot use cookies.
 */
export class RefreshDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
