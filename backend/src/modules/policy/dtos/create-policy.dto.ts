import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { PolicyStatusEnum } from '../../../common/enums/policy-status.enum';

export class CreatePolicyDto {
  @ApiProperty({ example: 'Code of Conduct' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'code-of-conduct' })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug must be lowercase, digits and hyphens only',
  })
  slug: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 'HR' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: PolicyStatusEnum })
  @IsOptional()
  @IsEnum(PolicyStatusEnum)
  status?: PolicyStatusEnum;
}
