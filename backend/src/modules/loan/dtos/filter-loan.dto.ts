import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../core/dto/pagination-query.dto';
import { LoanStatusEnum } from '../../../common/enums/loan-status.enum';

export class FilterLoanDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by user id', format: 'uuid' })
  @IsOptional()
  @IsUUID('4')
  userId?: string;

  @ApiPropertyOptional({ enum: LoanStatusEnum })
  @IsOptional()
  @IsEnum(LoanStatusEnum)
  status?: LoanStatusEnum;
}
