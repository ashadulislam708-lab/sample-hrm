import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dtos/user-response.dto';

export class AuthResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  /**
   * The access / refresh tokens are stripped by SetTokenInterceptor and delivered
   * as httpOnly cookies. They only appear internally in the service-level object
   * before the interceptor runs.
   */
  accessToken?: string;
  refreshToken?: string;
}

export class MessageResponseDto {
  @ApiProperty({ example: 'OK' })
  message: string;
}
