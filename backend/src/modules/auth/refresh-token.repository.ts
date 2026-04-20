import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken)
    repository: Repository<RefreshToken>,
  ) {
    super(repository);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.repository.findOne({ where: { token } });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.repository.delete({ token });
  }

  async deleteByUser(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async deleteExpired(now: Date = new Date()): Promise<void> {
    await this.repository.delete({ expiresAt: LessThan(now) });
  }
}
