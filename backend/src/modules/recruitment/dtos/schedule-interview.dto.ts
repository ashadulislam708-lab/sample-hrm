import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class ScheduleInterviewDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  candidateId: string;

  @ApiProperty({ example: '2026-05-03T15:00:00Z' })
  @IsDateString()
  scheduledAt: string;

  @ApiPropertyOptional({ type: [String], format: 'uuid' })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  interviewerIds?: string[];
}
