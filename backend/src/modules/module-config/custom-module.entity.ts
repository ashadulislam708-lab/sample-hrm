import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';
import { ModuleStatusEnum } from '../../common/enums/module-status.enum';

@Entity('custom_modules')
export class CustomModule extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'menu_placement', type: 'varchar', length: 120, nullable: true })
  menuPlacement: string | null;

  @Column({
    name: 'data_source_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  dataSourceUrl: string | null;

  @Column({ name: 'metrics_config', type: 'jsonb', default: {} })
  metricsConfig: Record<string, unknown>;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1 })
  weighting: number;

  @Column({
    type: 'enum',
    enum: ModuleStatusEnum,
    default: ModuleStatusEnum.ENABLED,
  })
  @Index()
  status: ModuleStatusEnum;

  @Column({ name: 'created_by_id', type: 'uuid', nullable: true })
  createdById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User | null;
}
