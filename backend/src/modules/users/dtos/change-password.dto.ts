import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

const PASSWORD_RULE =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~]{8,}$/;

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_RULE, {
    message:
      'New password must be at least 8 characters and contain uppercase, lowercase, number and special character',
  })
  newPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
