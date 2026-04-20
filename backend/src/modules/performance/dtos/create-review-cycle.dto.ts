import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ReviewCycleStatusEnum } from '../../../common/enums/review-cycle-status.enum';

export class CreateReviewCycleDto {
  @ApiProperty({ example: 'Q2 2026 Review' })
  @IsString()
  title: string;

  @ApiProperty({ example: '2026-04-01' })
  @IsDateString()
  periodStart: string;

  @ApiProperty({ example: '2026-06-30' })
  @IsDateString()
  periodEnd: string;

  @ApiPropertyOptional({ enum: ReviewCycleStatusEnum })
  @IsOptional()
  @IsEnum(ReviewCycleStatusEnum)
  status?: ReviewCycleStatusEnum;
}
