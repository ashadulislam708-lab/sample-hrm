import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class GatherWebhookDto {
  @ApiProperty({
    description: 'Gather Town email address of the user',
    example: 'user@gather.town',
  })
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    description: 'Event type from Gather Town',
    example: 'playerJoined',
    enum: ['playerJoined', 'playerLeft'],
  })
  @IsString()
  @IsIn(['playerJoined', 'playerLeft'])
  eventType: string;

  @ApiProperty({
    description: 'ISO 8601 timestamp of the event',
    example: '2026-04-20T08:05:00Z',
  })
  @IsDateString()
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Additional Gather metadata (space id, etc.)',
    example: 'hrm-office',
  })
  @IsOptional()
  @IsString()
  spaceId?: string;
}
