import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveLateRequestDto {
  @ApiPropertyOptional({
    description: 'Decision note attached to approval/rejection',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  decisionNote?: string;
}
