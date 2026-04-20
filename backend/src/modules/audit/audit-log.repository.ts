import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { AuditLog } from './audit-log.entity';

export interface AuditFilter {
  entityType?: string;
  entityId?: string;
  action?: string;
  userId?: string;
  from?: Date;
  to?: Date;
}

@Injectable()
export class AuditLogRepository extends BaseRepository<AuditLog> {
  constructor(
    @InjectRepository(AuditLog)
    repository: Repository<AuditLog>,
  ) {
    super(repository);
  }

  async findByUser(userId: string): Promise<AuditLog[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    return this.repository.find({
      where: { entityType, entityId },
      order: { createdAt: 'DESC' },
    });
  }

  buildWhere(filter: AuditFilter): FindOptionsWhere<AuditLog> {
    const where: FindOptionsWhere<AuditLog> = {};
    if (filter.entityType) where.entityType = filter.entityType;
    if (filter.entityId) where.entityId = filter.entityId;
    if (filter.action) where.action = filter.action;
    if (filter.userId) where.userId = filter.userId;
    if (filter.from && filter.to) {
      where.createdAt = Between(filter.from, filter.to);
    }
    return where;
  }
}
