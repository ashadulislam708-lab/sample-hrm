import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { ReviewCycleStatusEnum } from '../../common/enums/review-cycle-status.enum';
import { PerformanceReview } from './performance-review.entity';

@Entity('review_cycles')
export class ReviewCycle extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'period_start', type: 'date' })
  periodStart: Date;

  @Column({ name: 'period_end', type: 'date' })
  periodEnd: Date;

  @Column({
    type: 'enum',
    enum: ReviewCycleStatusEnum,
    default: ReviewCycleStatusEnum.DRAFT,
  })
  @Index()
  status: ReviewCycleStatusEnum;

  @Column({ name: 'created_by_id', type: 'uuid', nullable: true })
  createdById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User | null;

  @OneToMany(() => PerformanceReview, (review) => review.cycle)
  reviews: PerformanceReview[];
}
