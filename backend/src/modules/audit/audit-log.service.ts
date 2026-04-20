import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { AuditLog } from './audit-log.entity';
import { AuditFilter, AuditLogRepository } from './audit-log.repository';
import { PaginationOptions } from '../../core/base/base.repository';

export interface AuditActor {
  id: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

// TODO: Add an AuditInterceptor under src/core/interceptors/ so every
// controller write automatically logs via AuditLogService.log().
@Injectable()
export class AuditLogService extends BaseService<AuditLog> {
  constructor(protected readonly repository: AuditLogRepository) {
    super(repository, 'AuditLog');
  }

  async log(
    actor: AuditActor,
    entityType: string,
    entityId: string,
    action: string,
    oldValue?: Record<string, unknown> | null,
    newValue?: Record<string, unknown> | null,
  ): Promise<AuditLog> {
    const payload: DeepPartial<AuditLog> = {
      userId: actor.id,
      entityType,
      entityId,
      action,
      oldValue: oldValue ?? null,
      newValue: newValue ?? null,
      ipAddress: actor.ipAddress ?? null,
      userAgent: actor.userAgent ?? null,
    };
    return this.repository.create(payload);
  }

  async list(filter: AuditFilter, pagination?: PaginationOptions) {
    const where = this.repository.buildWhere(filter);
    return this.repository.findAll({ where }, pagination);
  }
}
