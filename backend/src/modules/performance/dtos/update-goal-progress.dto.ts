import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class UpdateGoalProgressDto {
  @ApiProperty({ minimum: 0, maximum: 100, example: 65 })
  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;
}
