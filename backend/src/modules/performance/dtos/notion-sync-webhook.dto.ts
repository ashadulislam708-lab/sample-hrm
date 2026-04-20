import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class NotionSyncNoteDto {
  @ApiProperty()
  @IsString()
  notionPageId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notionUserId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  authorEmail?: string;

  @ApiProperty({ example: '2026-04-20' })
  @IsDateString()
  noteDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  tasksCompleted?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  blockersReported?: string[];
}

export class NotionSyncWebhookDto {
  @ApiProperty({ type: [NotionSyncNoteDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotionSyncNoteDto)
  notes: NotionSyncNoteDto[];
}
