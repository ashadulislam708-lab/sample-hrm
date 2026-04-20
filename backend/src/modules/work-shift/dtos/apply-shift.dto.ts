import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const ALLOWED_DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export class ApplyShiftDto {
  @ApiProperty({
    description: 'Days requested for work shift change (Fri-Sun)',
    example: ['friday', 'saturday'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsIn(ALLOWED_DAYS, { each: true })
  requestedDays: string[];

  @ApiProperty({
    description: 'Reason for shift change',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;

  @ApiPropertyOptional({
    description: 'Effective from date (ISO 8601)',
    example: '2026-05-01',
  })
  @IsOptional()
  @IsDateString()
  effectiveFrom?: string;
}
