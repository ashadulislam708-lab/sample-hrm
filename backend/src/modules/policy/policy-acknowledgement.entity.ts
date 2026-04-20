import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { Policy } from './policy.entity';

@Entity('policy_acknowledgements')
@Unique('UQ_policy_ack_user_policy', ['userId', 'policyId'])
export class PolicyAcknowledgement extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  @Index()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'policy_id', type: 'uuid' })
  @Index()
  policyId: string;

  @ManyToOne(() => Policy, (policy) => policy.acknowledgements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'policy_id' })
  policy: Policy;

  @Column({ name: 'acknowledged_at', type: 'timestamp' })
  acknowledgedAt: Date;
}
