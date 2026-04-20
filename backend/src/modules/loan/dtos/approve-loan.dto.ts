import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class ApproveLoanDto {
  @ApiPropertyOptional({
    description: 'Override tenure months at approval (optional)',
    example: 12,
    minimum: 1,
    maximum: 24,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(24)
  tenureMonths?: number;

  @ApiPropertyOptional({
    description: 'Decision note on approval',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  decisionNote?: string;
}

export class RejectLoanDto {
  @ApiPropertyOptional({
    description: 'Decision note on rejection',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  decisionNote?: string;
}
