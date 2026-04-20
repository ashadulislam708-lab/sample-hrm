import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { ShiftRequest } from './shift-request.entity';
import { ShiftStatusEnum } from '../../common/enums/shift-status.enum';

@Injectable()
export class ShiftRepository extends BaseRepository<ShiftRequest> {
  constructor(
    @InjectRepository(ShiftRequest)
    repository: Repository<ShiftRequest>,
  ) {
    super(repository);
  }

  async findPending(): Promise<ShiftRequest[]> {
    return this.repository.find({
      where: { status: ShiftStatusEnum.PENDING },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<ShiftRequest[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findForTeamLeader(teamMemberIds: string[]): Promise<ShiftRequest[]> {
    if (teamMemberIds.length === 0) return [];
    return this.repository
      .createQueryBuilder('sr')
      .leftJoinAndSelect('sr.user', 'user')
      .where('sr.user_id IN (:...ids)', { ids: teamMemberIds })
      .orderBy('sr.created_at', 'DESC')
      .getMany();
  }
}
