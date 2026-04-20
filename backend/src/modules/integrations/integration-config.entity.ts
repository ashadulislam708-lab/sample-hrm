import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { IntegrationProviderEnum } from '../../common/enums/integration-provider.enum';

@Entity('integration_configs')
export class IntegrationConfig extends BaseEntity {
  @Column({
    type: 'enum',
    enum: IntegrationProviderEnum,
    unique: true,
  })
  @Index()
  provider: IntegrationProviderEnum;

  @Column({ name: 'config_json', type: 'jsonb', default: {} })
  configJson: Record<string, unknown>;

  @Column({ type: 'boolean', default: false })
  connected: boolean;

  @Column({ name: 'last_sync_at', type: 'timestamp', nullable: true })
  lastSyncAt: Date | null;

  @Column({ name: 'updated_by_id', type: 'uuid', nullable: true })
  updatedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy: User | null;
}
