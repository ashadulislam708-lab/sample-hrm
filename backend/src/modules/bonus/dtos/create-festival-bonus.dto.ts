import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateFestivalBonusDto {
  @ApiProperty({
    description: 'Recipient user ids',
    type: [String],
    format: 'uuid',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  userIds: string[];

  @ApiProperty({
    description: 'Bonus amount per recipient (decimal string)',
    example: '10000.00',
  })
  @IsNumberString()
  amount: string;

  @ApiProperty({
    description: 'Festival name',
    example: 'Eid-ul-Fitr',
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  festivalName: string;

  @ApiPropertyOptional({
    description: 'Reason or context',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
