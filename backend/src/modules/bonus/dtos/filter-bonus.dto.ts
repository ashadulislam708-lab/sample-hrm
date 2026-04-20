import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../core/dto/pagination-query.dto';
import { BonusTypeEnum } from '../../../common/enums/bonus-type.enum';

export class FilterBonusDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by user id', format: 'uuid' })
  @IsOptional()
  @IsUUID('4')
  userId?: string;

  @ApiPropertyOptional({ enum: BonusTypeEnum })
  @IsOptional()
  @IsEnum(BonusTypeEnum)
  type?: BonusTypeEnum;

  @ApiPropertyOptional({ description: 'From date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'To date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  to?: string;
}
