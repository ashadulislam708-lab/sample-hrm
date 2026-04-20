import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SelfAssessmentDto {
  @ApiProperty({ example: 'I improved process X and delivered Y...' })
  @IsString()
  @IsNotEmpty()
  selfAssessment: string;
}
