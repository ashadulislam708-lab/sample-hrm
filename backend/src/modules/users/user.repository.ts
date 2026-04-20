import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { User } from './user.entity';
import { UserStatusEnum } from '../../common/enums/user-status.enum';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }

  /**
   * Find a user by email.
   * By default the password column is `select: false`; pass `includePassword` to pull it.
   */
  async findByEmail(
    email: string,
    includePassword = false,
  ): Promise<User | null> {
    const qb = this.repository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email });

    if (includePassword) {
      qb.addSelect('user.password');
    }

    return qb.getOne();
  }

  async findActive(): Promise<User[]> {
    return this.repository.find({
      where: { status: UserStatusEnum.ACTIVE },
    });
  }

  async findByTeamLeader(teamLeaderId: string): Promise<User[]> {
    return this.repository.find({
      where: { teamLeaderId },
      order: { fullName: 'ASC' },
    });
  }

  async updateLastLogin(userId: string, loggedInAt: Date): Promise<void> {
    await this.repository.update(userId, { lastLoginAt: loggedInAt });
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await this.repository.update(userId, { password: hashedPassword });
  }

  /**
   * Fetch user by id including password (which is `select: false` by default).
   */
  async findByIdWithPassword(userId: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: userId })
      .getOne();
  }
}
