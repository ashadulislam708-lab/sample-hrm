import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ClockInManualDto {
  @ApiPropertyOptional({
    description: 'Reason for manual clock-in (optional)',
    example: 'Gather Town connection issue',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
