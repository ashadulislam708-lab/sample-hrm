import { ApiProperty } from '@nestjs/swagger';

export class ResponsePayloadDto<T = unknown> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'OK' })
  message: string | string[];

  @ApiProperty({ required: false, nullable: true })
  data: T | null;

  @ApiProperty({ example: '2026-04-20T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/users' })
  path: string;

  @ApiProperty({ required: false })
  error?: string;
}
