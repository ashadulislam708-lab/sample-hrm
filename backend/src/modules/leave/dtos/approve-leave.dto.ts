import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveLeaveDto {
  @ApiPropertyOptional({
    description: 'Decision note for approval or rejection',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  decisionNote?: string;
}
