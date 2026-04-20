import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UserStatusEnum } from '../../common/enums/user-status.enum';

export interface DepartmentHeadcount {
  department: string;
  count: number;
}

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async listDistinct(): Promise<string[]> {
    const raw = await this.userRepository
      .createQueryBuilder('u')
      .select('DISTINCT u.department', 'department')
      .where('u.department IS NOT NULL')
      .andWhere('u.status = :status', { status: UserStatusEnum.ACTIVE })
      .orderBy('u.department', 'ASC')
      .getRawMany<{ department: string }>();
    return raw.map((r) => r.department).filter((d): d is string => !!d);
  }

  async countPerDepartment(): Promise<DepartmentHeadcount[]> {
    const raw = await this.userRepository
      .createQueryBuilder('u')
      .select('u.department', 'department')
      .addSelect('COUNT(u.id)', 'count')
      .where('u.department IS NOT NULL')
      .andWhere('u.status = :status', { status: UserStatusEnum.ACTIVE })
      .groupBy('u.department')
      .orderBy('u.department', 'ASC')
      .getRawMany<{ department: string; count: string }>();
    return raw.map((r) => ({ department: r.department, count: Number(r.count) }));
  }
}
