import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ApplyEmergencyLeaveDto {
  @ApiProperty({
    description: 'Reason for emergency leave',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;

  @ApiPropertyOptional({
    description: 'Estimated return time (ISO 8601)',
    example: '2026-04-20T16:30:00Z',
  })
  @IsOptional()
  @IsDateString()
  estimatedReturnTime?: string;

  @ApiPropertyOptional({
    description: 'Contact availability during leave',
    example: 'Phone +8801X-XXXXXXX',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  contactAvailability?: string;
}
