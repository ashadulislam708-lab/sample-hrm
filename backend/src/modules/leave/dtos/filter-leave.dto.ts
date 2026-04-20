import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../core/dto/pagination-query.dto';
import { LeaveStatusEnum } from '../../../common/enums/leave-status.enum';
import { LeaveTypeEnum } from '../../../common/enums/leave-type.enum';

export class FilterLeaveDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by user id', format: 'uuid' })
  @IsOptional()
  @IsUUID('4')
  userId?: string;

  @ApiPropertyOptional({ enum: LeaveTypeEnum })
  @IsOptional()
  @IsEnum(LeaveTypeEnum)
  leaveType?: LeaveTypeEnum;

  @ApiPropertyOptional({ enum: LeaveStatusEnum })
  @IsOptional()
  @IsEnum(LeaveStatusEnum)
  status?: LeaveStatusEnum;

  @ApiPropertyOptional({ description: 'From date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'To date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  to?: string;
}
