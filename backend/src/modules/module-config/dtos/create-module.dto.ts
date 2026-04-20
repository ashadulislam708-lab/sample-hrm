import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ModuleStatusEnum } from '../../../common/enums/module-status.enum';

export class CreateModuleDto {
  @ApiProperty({ example: 'Support Ticket Volume' })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'dashboard' })
  @IsOptional()
  @IsString()
  menuPlacement?: string;

  @ApiPropertyOptional({ example: 'https://api.example.com/metrics' })
  @IsOptional()
  @IsUrl({ require_tld: false })
  dataSourceUrl?: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { endpoint: '/metrics', field: 'count' },
  })
  @IsOptional()
  @IsObject()
  metricsConfig?: Record<string, unknown>;

  @ApiPropertyOptional({ minimum: 0, maximum: 10, example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  weighting?: number;

  @ApiPropertyOptional({ enum: ModuleStatusEnum })
  @IsOptional()
  @IsEnum(ModuleStatusEnum)
  status?: ModuleStatusEnum;
}
