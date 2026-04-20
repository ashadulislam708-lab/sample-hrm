import { ForbiddenException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { Goal } from './goal.entity';
import { GoalRepository } from './goal.repository';
import { UserRepository } from '../users/user.repository';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { UpdateGoalDto } from './dtos/update-goal.dto';

@Injectable()
export class GoalService extends BaseService<Goal> {
  constructor(
    protected readonly repository: GoalRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(repository, 'Goal');
  }

  async createGoal(dto: CreateGoalDto, setById: string): Promise<Goal> {
    const payload: DeepPartial<Goal> = {
      userId: dto.userId,
      title: dto.title,
      description: dto.description ?? null,
      targetDate: dto.targetDate ? new Date(dto.targetDate) : null,
      progress: dto.progress ?? 0,
      setById,
      status: 'active',
    };
    return this.repository.create(payload);
  }

  async listOwn(userId: string): Promise<Goal[]> {
    return this.repository.findByUser(userId);
  }

  async listForTeam(teamLeaderId: string): Promise<Goal[]> {
    const members = await this.userRepository.findByTeamLeader(teamLeaderId);
    return this.repository.findByTeam(members.map((m) => m.id));
  }

  async updateOwnProgress(
    goalId: string,
    userId: string,
    progress: number,
  ): Promise<Goal> {
    const goal = await this.findByIdOrFail(goalId);
    if (goal.userId !== userId) {
      throw new ForbiddenException('Cannot update another user goal progress');
    }
    return this.update(goalId, { progress });
  }

  async updateByLeader(
    goalId: string,
    leaderId: string,
    dto: UpdateGoalDto,
  ): Promise<Goal> {
    const goal = await this.findByIdOrFail(goalId);
    const target = await this.userRepository.findById(goal.userId);
    if (!target || target.teamLeaderId !== leaderId) {
      throw new ForbiddenException('Not authorized to edit this goal');
    }
    const payload: DeepPartial<Goal> = { ...dto } as DeepPartial<Goal>;
    if (dto.targetDate) {
      payload.targetDate = new Date(dto.targetDate);
    }
    return this.update(goalId, payload);
  }
}
