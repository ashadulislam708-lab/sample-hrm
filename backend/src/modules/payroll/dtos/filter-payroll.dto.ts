import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '../../../core/dto/pagination-query.dto';
import { PayrollStatusEnum } from '../../../common/enums/payroll-status.enum';

export class FilterPayrollDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Month filter (1-12)' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @ApiPropertyOptional({ description: 'Year filter (YYYY)' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(2000)
  @Max(3000)
  year?: number;

  @ApiPropertyOptional({ enum: PayrollStatusEnum })
  @IsOptional()
  @IsEnum(PayrollStatusEnum)
  status?: PayrollStatusEnum;
}
