import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { ReviewCycle } from './review-cycle.entity';
import { RatingScaleEnum } from '../../common/enums/rating-scale.enum';

@Entity('performance_reviews')
export class PerformanceReview extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'cycle_id', type: 'uuid' })
  @Index()
  cycleId: string;

  @ManyToOne(() => ReviewCycle, (cycle) => cycle.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cycle_id' })
  cycle: ReviewCycle;

  @Column({ name: 'reviewer_id', type: 'uuid' })
  @Index()
  reviewerId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @Column({ type: 'enum', enum: RatingScaleEnum })
  rating: RatingScaleEnum;

  @Column({ type: 'text', nullable: true })
  strengths: string | null;

  @Column({ type: 'text', nullable: true })
  improvements: string | null;

  @Column({ type: 'text', nullable: true })
  feedback: string | null;

  @Column({ name: 'self_assessment', type: 'text', nullable: true })
  selfAssessment: string | null;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt: Date | null;
}
