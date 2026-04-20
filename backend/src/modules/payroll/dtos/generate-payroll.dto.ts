import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class GeneratePayrollDto {
  @ApiProperty({ description: 'Month (1-12)', example: 4 })
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ description: 'Year (YYYY)', example: 2026 })
  @IsInt()
  @Min(2000)
  @Max(3000)
  year: number;
}
