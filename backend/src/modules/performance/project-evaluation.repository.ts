import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { ProjectEvaluation } from './project-evaluation.entity';

@Injectable()
export class ProjectEvaluationRepository extends BaseRepository<ProjectEvaluation> {
  constructor(
    @InjectRepository(ProjectEvaluation)
    repository: Repository<ProjectEvaluation>,
  ) {
    super(repository);
  }

  async findByUser(userId: string): Promise<ProjectEvaluation[]> {
    return this.repository.find({
      where: { userId },
      order: { completedAt: 'DESC' },
    });
  }

  async findByEvaluator(evaluatorId: string): Promise<ProjectEvaluation[]> {
    return this.repository.find({
      where: { evaluatorId },
      order: { completedAt: 'DESC' },
    });
  }

  async findByProject(projectName: string): Promise<ProjectEvaluation[]> {
    return this.repository.find({
      where: { projectName },
      order: { completedAt: 'DESC' },
    });
  }

  async findByTeam(userIds: string[]): Promise<ProjectEvaluation[]> {
    if (userIds.length === 0) return [];
    return this.repository.find({
      where: { userId: In(userIds) },
      order: { completedAt: 'DESC' },
    });
  }
}
