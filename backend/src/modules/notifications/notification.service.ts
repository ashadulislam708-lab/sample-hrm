import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Notification } from './notification.entity';
import { NotificationRepository } from './notification.repository';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(protected readonly repository: NotificationRepository) {
    super(repository, 'Notification');
  }

  async createForUser(dto: CreateNotificationDto): Promise<Notification> {
    return this.repository.create({
      userId: dto.userId,
      type: dto.type,
      title: dto.title,
      message: dto.message,
      metadata: dto.metadata ?? {},
    });
  }

  async listForUser(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ items: Notification[]; total: number; page: number; limit: number; totalPages: number }> {
    const { items, total } = await this.repository.findByUser(userId, page, limit);
    return {
      items,
      total,
      page,
      limit,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
    };
  }

  async countUnread(userId: string): Promise<number> {
    return this.repository.countUnreadByUser(userId);
  }

  async markRead(userId: string, notificationId: string): Promise<Notification> {
    const notif = await this.findByIdOrFail(notificationId);
    if (notif.userId !== userId) {
      throw new ForbiddenException('Cannot mark another user\'s notification as read');
    }
    if (notif.readAt) {
      return notif;
    }
    const updated = await this.repository.update(notificationId, {
      readAt: new Date(),
    });
    if (!updated) {
      throw new NotFoundException(`Notification with id ${notificationId} not found`);
    }
    return updated;
  }

  async markAllRead(userId: string): Promise<void> {
    await this.repository.markAllReadForUser(userId, new Date());
  }

  async deleteOwn(userId: string, notificationId: string): Promise<void> {
    const notif = await this.findByIdOrFail(notificationId);
    if (notif.userId !== userId) {
      throw new ForbiddenException('Cannot delete another user\'s notification');
    }
    await this.repository.softDelete(notificationId);
  }
}
