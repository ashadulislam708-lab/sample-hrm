import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'employee@sample-hrm.test' })
  @IsEmail()
  email: string;
}
