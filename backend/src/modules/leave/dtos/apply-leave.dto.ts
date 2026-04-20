import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { LeaveTypeEnum } from '../../../common/enums/leave-type.enum';
import { LeaveDurationEnum } from '../../../common/enums/leave-duration.enum';

export class ApplyLeaveDto {
  @ApiProperty({
    description: 'Leave type',
    enum: LeaveTypeEnum,
    example: LeaveTypeEnum.CASUAL,
  })
  @IsEnum(LeaveTypeEnum)
  leaveType: LeaveTypeEnum;

  @ApiPropertyOptional({
    description: 'Duration of the leave',
    enum: LeaveDurationEnum,
    default: LeaveDurationEnum.FULL_DAY,
  })
  @IsOptional()
  @IsEnum(LeaveDurationEnum)
  duration?: LeaveDurationEnum;

  @ApiProperty({
    description: 'Start date (ISO 8601, date)',
    example: '2026-04-20',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date (ISO 8601, date)',
    example: '2026-04-22',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Reason for leave',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;
}
