import { ApiProperty } from '@nestjs/swagger';
import { NotificationTypeEnum } from '../../../common/enums/notification-type.enum';
import { Notification } from '../notification.entity';

export class NotificationResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  userId: string;

  @ApiProperty({ enum: NotificationTypeEnum })
  type: NotificationTypeEnum;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  metadata: Record<string, unknown>;

  @ApiProperty({ required: false, nullable: true })
  readAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  static fromEntity(entity: Notification): NotificationResponseDto {
    const dto = new NotificationResponseDto();
    dto.id = entity.id;
    dto.userId = entity.userId;
    dto.type = entity.type;
    dto.title = entity.title;
    dto.message = entity.message;
    dto.metadata = entity.metadata ?? {};
    dto.readAt = entity.readAt;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
