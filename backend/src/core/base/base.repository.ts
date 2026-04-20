import {
  Repository,
  FindManyOptions,
  FindOneOptions,
  DeepPartial,
  FindOptionsWhere,
} from 'typeorm';
import { BaseEntity } from './base.entity';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc' | 'ASC' | 'DESC';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async findById(id: string, relations: string[] = []): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations,
    });
  }

  async findAll(
    options?: FindManyOptions<T>,
    pagination?: PaginationOptions,
  ): Promise<PaginatedResult<T>> {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<T> = {
      ...(options ?? {}),
      skip,
      take: limit,
    };

    if (pagination?.sortBy) {
      const order: Record<string, 'ASC' | 'DESC'> = {};
      const direction =
        (pagination.sortOrder ?? 'desc').toString().toUpperCase() === 'ASC'
          ? 'ASC'
          : 'DESC';
      order[pagination.sortBy] = direction;
      findOptions.order = order as FindManyOptions<T>['order'];
    } else if (!findOptions.order) {
      findOptions.order = {
        createdAt: 'DESC',
      } as FindManyOptions<T>['order'];
    }

    const [items, total] = await this.repository.findAndCount(findOptions);
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;

    return { items, total, page, limit, totalPages };
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(
      id,
      data as unknown as Parameters<Repository<T>['update']>[1],
    );
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  getRepository(): Repository<T> {
    return this.repository;
  }
}
