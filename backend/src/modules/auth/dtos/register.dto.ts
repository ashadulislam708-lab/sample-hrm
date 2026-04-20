import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

const PASSWORD_RULE =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~]{8,}$/;

/**
 * Placeholder registration DTO. Self-registration is not exposed as a public
 * endpoint in this HRM app (HR admin onboards users via /users).
 */
export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_RULE)
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;
}
