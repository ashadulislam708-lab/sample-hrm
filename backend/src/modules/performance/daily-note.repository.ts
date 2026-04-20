import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { DailyNote } from './daily-note.entity';

@Injectable()
export class DailyNoteRepository extends BaseRepository<DailyNote> {
  constructor(
    @InjectRepository(DailyNote)
    repository: Repository<DailyNote>,
  ) {
    super(repository);
  }

  async findByUserAndDateRange(
    userId: string,
    from: Date,
    to: Date,
  ): Promise<DailyNote[]> {
    return this.repository.find({
      where: { userId, noteDate: Between(from, to) },
      order: { noteDate: 'DESC' },
    });
  }

  async findByNotionPageId(pageId: string): Promise<DailyNote | null> {
    return this.repository.findOne({ where: { notionPageId: pageId } });
  }

  async findByUserAndDate(
    userId: string,
    noteDate: Date,
  ): Promise<DailyNote | null> {
    return this.repository.findOne({
      where: { userId, noteDate },
    });
  }

  async findByTeam(userIds: string[], from: Date, to: Date): Promise<DailyNote[]> {
    if (userIds.length === 0) return [];
    return this.repository.find({
      where: { userId: In(userIds), noteDate: Between(from, to) },
      order: { noteDate: 'DESC' },
    });
  }

  async streakForUser(userId: string, since: Date): Promise<number> {
    const notes = await this.repository.find({
      where: { userId },
      order: { noteDate: 'DESC' },
    });
    let streak = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    for (const note of notes) {
      const noteDay = new Date(note.noteDate);
      noteDay.setHours(0, 0, 0, 0);
      if (noteDay.getTime() === cursor.getTime()) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else if (noteDay < since) {
        break;
      } else {
        break;
      }
    }
    return streak;
  }
}
