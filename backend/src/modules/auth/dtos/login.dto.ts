import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'employee@sample-hrm.test' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Employee123!' })
  @IsString()
  @MinLength(8)
  password: string;
}
