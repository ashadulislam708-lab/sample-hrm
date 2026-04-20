import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { JobPostingStatusEnum } from '../../common/enums/job-posting-status.enum';
import { Candidate } from './candidate.entity';

@Entity('job_postings')
export class JobPosting extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 120 })
  @Index()
  department: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({
    type: 'enum',
    enum: JobPostingStatusEnum,
    default: JobPostingStatusEnum.DRAFT,
  })
  @Index()
  status: JobPostingStatusEnum;

  @Column({ name: 'posted_by_id', type: 'uuid', nullable: true })
  postedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'posted_by_id' })
  postedBy: User | null;

  @Column({ name: 'posted_at', type: 'timestamp', nullable: true })
  postedAt: Date | null;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date | null;

  @OneToMany(() => Candidate, (candidate) => candidate.jobPosting)
  candidates: Candidate[];
}
