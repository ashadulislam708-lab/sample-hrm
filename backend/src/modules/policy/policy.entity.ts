import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { PolicyStatusEnum } from '../../common/enums/policy-status.enum';
import { PolicyAcknowledgement } from './policy-acknowledgement.entity';

@Entity('policies')
export class Policy extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  @Index()
  category: string | null;

  @Column({
    type: 'enum',
    enum: PolicyStatusEnum,
    default: PolicyStatusEnum.DRAFT,
  })
  @Index()
  status: PolicyStatusEnum;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ name: 'published_by_id', type: 'uuid', nullable: true })
  publishedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'published_by_id' })
  publishedBy: User | null;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @OneToMany(() => PolicyAcknowledgement, (ack) => ack.policy)
  acknowledgements: PolicyAcknowledgement[];
}
