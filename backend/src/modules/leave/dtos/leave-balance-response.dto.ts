import { ApiProperty } from '@nestjs/swagger';

export class LeaveBalanceResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  userId: string;

  @ApiProperty({ example: 2026 })
  year: number;

  @ApiProperty({ example: 12 })
  casualAllocated: number;

  @ApiProperty({ example: 2 })
  casualUsed: number;

  @ApiProperty({ example: 10 })
  casualRemaining: number;

  @ApiProperty({ example: 8 })
  sickAllocated: number;

  @ApiProperty({ example: 1 })
  sickUsed: number;

  @ApiProperty({ example: 7 })
  sickRemaining: number;
}
