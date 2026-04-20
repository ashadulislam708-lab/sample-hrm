import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { NotificationTypeEnum } from '../../../common/enums/notification-type.enum';

export class CreateNotificationDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: NotificationTypeEnum })
  @IsEnum(NotificationTypeEnum)
  type: NotificationTypeEnum;

  @ApiProperty({ example: 'Leave request approved' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Your leave request for Apr 22 has been approved.' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({ example: { leaveRequestId: '...' } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
