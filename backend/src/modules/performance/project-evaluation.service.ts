import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { ProjectEvaluation } from './project-evaluation.entity';
import { ProjectEvaluationRepository } from './project-evaluation.repository';
import { UserRepository } from '../users/user.repository';
import { CreateEvaluationDto } from './dtos/create-evaluation.dto';

@Injectable()
export class ProjectEvaluationService extends BaseService<ProjectEvaluation> {
  constructor(
    protected readonly repository: ProjectEvaluationRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(repository, 'ProjectEvaluation');
  }

  async createEvaluation(
    dto: CreateEvaluationDto,
    evaluatorId: string,
  ): Promise<ProjectEvaluation> {
    const overallRating =
      (dto.quality +
        dto.timeliness +
        dto.collaboration +
        dto.problemSolving +
        dto.communication) /
      5;
    const payload: DeepPartial<ProjectEvaluation> = {
      userId: dto.userId,
      evaluatorId,
      projectName: dto.projectName,
      quality: dto.quality,
      timeliness: dto.timeliness,
      collaboration: dto.collaboration,
      problemSolving: dto.problemSolving,
      communication: dto.communication,
      feedback: dto.feedback ?? null,
      overallRating: Number(overallRating.toFixed(2)),
      completedAt: new Date(),
    };
    return this.repository.create(payload);
  }

  async listOwn(userId: string): Promise<ProjectEvaluation[]> {
    return this.repository.findByUser(userId);
  }

  async listForUser(targetId: string): Promise<ProjectEvaluation[]> {
    return this.repository.findByUser(targetId);
  }

  async getTeamAverages(
    teamLeaderId: string,
  ): Promise<{ userId: string; averageRating: number; count: number }[]> {
    const members = await this.userRepository.findByTeamLeader(teamLeaderId);
    const ids = members.map((m) => m.id);
    const evals = await this.repository.findByTeam(ids);
    const bucket = new Map<string, { total: number; count: number }>();
    for (const e of evals) {
      const entry = bucket.get(e.userId) ?? { total: 0, count: 0 };
      entry.total += Number(e.overallRating);
      entry.count += 1;
      bucket.set(e.userId, entry);
    }
    return ids.map((uid) => {
      const stats = bucket.get(uid);
      return {
        userId: uid,
        averageRating: stats ? Number((stats.total / stats.count).toFixed(2)) : 0,
        count: stats?.count ?? 0,
      };
    });
  }
}
