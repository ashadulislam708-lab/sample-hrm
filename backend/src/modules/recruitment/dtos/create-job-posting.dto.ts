import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { JobPostingStatusEnum } from '../../../common/enums/job-posting-status.enum';

export class CreateJobPostingDto {
  @ApiProperty({ example: 'Senior Backend Engineer' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Engineering' })
  @IsString()
  department: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  requirements: string;

  @ApiPropertyOptional({ enum: JobPostingStatusEnum })
  @IsOptional()
  @IsEnum(JobPostingStatusEnum)
  status?: JobPostingStatusEnum;
}
