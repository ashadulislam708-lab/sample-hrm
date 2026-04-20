import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { JobPosting } from './job-posting.entity';
import { ApplicationStatusEnum } from '../../common/enums/application-status.enum';
import { Interview } from './interview.entity';

@Entity('candidates')
export class Candidate extends BaseEntity {
  @Column({ name: 'job_posting_id', type: 'uuid' })
  @Index()
  jobPostingId: string;

  @ManyToOne(() => JobPosting, (posting) => posting.candidates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_posting_id' })
  jobPosting: JobPosting;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ name: 'resume_url', type: 'varchar', length: 500, nullable: true })
  resumeUrl: string | null;

  @Column({
    type: 'enum',
    enum: ApplicationStatusEnum,
    default: ApplicationStatusEnum.NEW,
  })
  @Index()
  status: ApplicationStatusEnum;

  @Column({ name: 'current_stage', type: 'varchar', length: 120, nullable: true })
  currentStage: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @OneToMany(() => Interview, (interview) => interview.candidate)
  interviews: Interview[];
}
