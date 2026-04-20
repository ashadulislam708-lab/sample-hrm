import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Goal } from './goal.entity';

@Injectable()
export class GoalRepository extends BaseRepository<Goal> {
  constructor(
    @InjectRepository(Goal)
    repository: Repository<Goal>,
  ) {
    super(repository);
  }

  async findByUser(userId: string): Promise<Goal[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByTeam(userIds: string[]): Promise<Goal[]> {
    if (userIds.length === 0) return [];
    return this.repository.find({
      where: { userId: In(userIds) },
      order: { createdAt: 'DESC' },
    });
  }
}
