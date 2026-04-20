import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

const PASSWORD_RULE =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~]{8,}$/;

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_RULE, {
    message:
      'Password must be at least 8 characters and contain uppercase, lowercase, number and special character',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
