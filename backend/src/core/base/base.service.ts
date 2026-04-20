import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  BaseRepository,
  PaginatedResult,
  PaginationOptions,
} from './base.repository';

export abstract class BaseService<T extends BaseEntity> {
  protected defaultRelations: string[] = [];

  constructor(
    protected repository: BaseRepository<T>,
    protected entityName: string,
  ) {}

  async findAll(
    options?: FindManyOptions<T>,
    pagination?: PaginationOptions,
  ): Promise<PaginatedResult<T>> {
    const mergedOptions: FindManyOptions<T> = {
      ...(options ?? {}),
      relations: options?.relations ?? this.defaultRelations,
    };
    return this.repository.findAll(mergedOptions, pagination);
  }

  async findByIdOrFail(
    id: string,
    relations: string[] = this.defaultRelations,
  ): Promise<T> {
    const entity = await this.repository.findById(id, relations);
    if (!entity) {
      throw new NotFoundException(`${this.entityName} with id ${id} not found`);
    }
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    await this.findByIdOrFail(id);
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException(`${this.entityName} with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.repository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}
