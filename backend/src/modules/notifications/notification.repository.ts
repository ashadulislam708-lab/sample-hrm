import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  constructor(
    @InjectRepository(Notification)
    repository: Repository<Notification>,
  ) {
    super(repository);
  }

  async findUnreadByUser(userId: string): Promise<Notification[]> {
    return this.repository.find({
      where: { userId, readAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async countUnreadByUser(userId: string): Promise<number> {
    return this.repository.count({
      where: { userId, readAt: IsNull() },
    });
  }

  async findByUser(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ items: Notification[]; total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await this.repository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { items, total };
  }

  async markAllReadForUser(userId: string, readAt: Date): Promise<void> {
    await this.repository.update(
      { userId, readAt: IsNull() },
      { readAt },
    );
  }
}
