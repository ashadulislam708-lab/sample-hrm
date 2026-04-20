import { ApiProperty } from '@nestjs/swagger';
import { PolicyStatusEnum } from '../../../common/enums/policy-status.enum';

export class PolicyResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ required: false, nullable: true })
  category: string | null;

  @ApiProperty({ enum: PolicyStatusEnum })
  status: PolicyStatusEnum;

  @ApiProperty()
  version: number;

  @ApiProperty({ required: false, nullable: true })
  publishedAt: Date | null;
}

export class PolicyAckStatusDto {
  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  acknowledgedCount: number;

  @ApiProperty()
  pendingCount: number;
}
