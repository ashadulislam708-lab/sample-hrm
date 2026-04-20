import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { Bonus } from './bonus.entity';
import { BonusFilters, BonusRepository } from './bonus.repository';
import { BonusTypeEnum } from '../../common/enums/bonus-type.enum';
import { RoleEnum } from '../../common/enums/role.enum';

@Injectable()
export class BonusService extends BaseService<Bonus> {
  protected defaultRelations: string[] = ['user', 'awardedBy', 'payrollRun'];

  constructor(protected readonly repository: BonusRepository) {
    super(repository, 'Bonus');
  }

  async createProjectBonus(
    userId: string,
    amount: number,
    projectReference: string,
    awardedById: string,
    awardedByRole: RoleEnum,
    reason?: string,
  ): Promise<Bonus> {
    if (awardedByRole !== RoleEnum.HR_ADMIN) {
      throw new ForbiddenException('Only HR admins can create bonuses');
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('Amount must be positive');
    }
    return this.repository.create({
      userId,
      amount,
      type: BonusTypeEnum.PROJECT,
      reason: reason ?? `Project bonus: ${projectReference}`,
      projectReference,
      awardedById,
      awardedAt: new Date(),
    });
  }

  async createFestivalBonus(
    userIds: string[],
    amount: number,
    festivalName: string,
    awardedById: string,
    awardedByRole: RoleEnum,
    reason?: string,
  ): Promise<Bonus[]> {
    if (awardedByRole !== RoleEnum.HR_ADMIN) {
      throw new ForbiddenException('Only HR admins can create bonuses');
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('Amount must be positive');
    }
    if (userIds.length === 0) {
      throw new BadRequestException('At least one recipient is required');
    }
    const awardedAt = new Date();
    const created: Bonus[] = [];
    for (const uid of userIds) {
      const bonus = await this.repository.create({
        userId: uid,
        amount,
        type: BonusTypeEnum.FESTIVAL,
        reason: reason ?? `Festival bonus: ${festivalName}`,
        festivalName,
        awardedById,
        awardedAt,
      });
      created.push(bonus);
    }
    return created;
  }

  async listOwn(userId: string): Promise<Bonus[]> {
    return this.repository.listByUser(userId);
  }

  async listAll(filters: BonusFilters, page = 1, limit = 20) {
    return this.repository.listWithFilters(filters, page, limit);
  }

  async attachToPayroll(
    bonusId: string,
    payrollRunId: string,
  ): Promise<Bonus> {
    const existing = await this.repository.findById(bonusId);
    if (!existing) throw new NotFoundException('Bonus not found');
    const updated = await this.repository.update(bonusId, { payrollRunId });
    if (!updated) throw new NotFoundException('Bonus not found after update');
    return updated;
  }

  async findPendingForPayroll(
    month: number,
    year: number,
  ): Promise<Bonus[]> {
    return this.repository.findPendingForPayroll(month, year);
  }

  async findPendingForUser(
    userId: string,
    month: number,
    year: number,
  ): Promise<Bonus[]> {
    return this.repository.findPendingForUserAndMonth(userId, month, year);
  }
}
