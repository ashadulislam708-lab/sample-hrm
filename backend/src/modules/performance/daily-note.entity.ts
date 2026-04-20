import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';

@Entity('daily_notes')
@Unique('UQ_daily_note_user_date', ['userId', 'noteDate'])
export class DailyNote extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'note_date', type: 'date' })
  @Index()
  noteDate: Date;

  @Column({
    name: 'notion_page_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  notionPageId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string | null;

  @Column({ type: 'text', nullable: true })
  summary: string | null;

  @Column({ name: 'tasks_completed', type: 'int', default: 0 })
  tasksCompleted: number;

  @Column({ name: 'blockers_reported', type: 'jsonb', default: [] })
  blockersReported: string[];
}
