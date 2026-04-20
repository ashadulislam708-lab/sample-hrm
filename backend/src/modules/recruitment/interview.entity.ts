import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { Candidate } from './candidate.entity';

@Entity('interviews')
export class Interview extends BaseEntity {
  @Column({ name: 'candidate_id', type: 'uuid' })
  @Index()
  candidateId: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.interviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'scheduled_at', type: 'timestamp' })
  scheduledAt: Date;

  @Column({ name: 'interviewer_ids', type: 'jsonb', default: [] })
  interviewerIds: string[];

  @Column({ type: 'text', nullable: true })
  feedback: string | null;

  @Column({ type: 'int', nullable: true })
  rating: number | null;
}
