import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';

@Entity('project_evaluations')
export class ProjectEvaluation extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'project_name', type: 'varchar', length: 255 })
  projectName: string;

  @Column({ name: 'evaluator_id', type: 'uuid' })
  @Index()
  evaluatorId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: User;

  @Column({ type: 'int' })
  quality: number;

  @Column({ type: 'int' })
  timeliness: number;

  @Column({ type: 'int' })
  collaboration: number;

  @Column({ name: 'problem_solving', type: 'int' })
  problemSolving: number;

  @Column({ type: 'int' })
  communication: number;

  @Column({
    name: 'overall_rating',
    type: 'decimal',
    precision: 4,
    scale: 2,
  })
  overallRating: number;

  @Column({ type: 'text', nullable: true })
  feedback: string | null;

  @Column({ name: 'completed_at', type: 'timestamp' })
  completedAt: Date;
}
