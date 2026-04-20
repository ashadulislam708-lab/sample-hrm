import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProjectBonusDto {
  @ApiProperty({ description: 'Recipient user id', format: 'uuid' })
  @IsUUID('4')
  userId: string;

  @ApiProperty({
    description: 'Bonus amount (decimal string)',
    example: '5000.00',
  })
  @IsNumberString()
  amount: string;

  @ApiProperty({
    description: 'Project reference (code, name, or description)',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  projectReference: string;

  @ApiPropertyOptional({
    description: 'Reason or context for the bonus',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
