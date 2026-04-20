import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApplicationStatusEnum } from '../../../common/enums/application-status.enum';

export class UpdateCandidateStatusDto {
  @ApiProperty({ enum: ApplicationStatusEnum })
  @IsEnum(ApplicationStatusEnum)
  status: ApplicationStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currentStage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
