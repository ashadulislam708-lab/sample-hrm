import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { RoleEnum } from '../../../common/enums/role.enum';
import { UserStatusEnum } from '../../../common/enums/user-status.enum';

const PASSWORD_RULE =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>/?`~]{8,}$/;

export class CreateUserDto {
  @ApiProperty({ example: 'employee@sample-hrm.test' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Employee123!',
    description:
      'Min 8 chars, at least one upper, one lower, one digit, one special',
  })
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_RULE, {
    message:
      'Password must be at least 8 characters and contain uppercase, lowercase, number and special character',
  })
  password: string;

  @ApiProperty({ example: 'Test Employee' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({ example: '+1-555-0100' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Engineering' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ enum: RoleEnum, default: RoleEnum.EMPLOYEE })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiPropertyOptional({ enum: UserStatusEnum, default: UserStatusEnum.ACTIVE })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  joiningDate?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  teamLeaderId?: string;

  @ApiPropertyOptional({ example: 60000 })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gatherTownEmail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notionUserId?: string;
}
