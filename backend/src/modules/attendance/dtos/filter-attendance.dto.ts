import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from '../../../core/dto/pagination-query.dto';
import { AttendanceSourceEnum } from '../../../common/enums/attendance-source.enum';
import { AttendanceStatusEnum } from '../../../common/enums/attendance-status.enum';

export class FilterAttendanceDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by user id', format: 'uuid' })
  @IsOptional()
  @IsUUID('4')
  userId?: string;

  @ApiPropertyOptional({
    description: 'Attendance source filter',
    enum: AttendanceSourceEnum,
  })
  @IsOptional()
  @IsEnum(AttendanceSourceEnum)
  source?: AttendanceSourceEnum;

  @ApiPropertyOptional({
    description: 'Attendance status filter',
    enum: AttendanceStatusEnum,
  })
  @IsOptional()
  @IsEnum(AttendanceStatusEnum)
  status?: AttendanceStatusEnum;

  @ApiPropertyOptional({ description: 'Month filter (1-12)' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @ApiPropertyOptional({ description: 'Year filter (YYYY)' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(2000)
  @Max(3000)
  year?: number;

  @ApiPropertyOptional({ description: 'Start date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'End date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({ description: 'Filter by department' })
  @IsOptional()
  @IsString()
  department?: string;
}
