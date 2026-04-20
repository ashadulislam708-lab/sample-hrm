import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class ApplyLoanDto {
  @ApiProperty({
    description: 'Loan amount requested (decimal string for precision)',
    example: '50000.00',
  })
  @IsNumberString()
  amount: string;

  @ApiProperty({
    description: 'Reason for the loan',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;

  @ApiProperty({
    description: 'Repayment tenure in months (1-24)',
    example: 6,
    minimum: 1,
    maximum: 24,
  })
  @IsInt()
  @Min(1)
  @Max(24)
  tenureMonths: number;
}
