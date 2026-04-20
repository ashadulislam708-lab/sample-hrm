import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../users/user.entity';

@Entity('office_config')
export class OfficeConfig extends BaseEntity {
  @Column({ type: 'varchar', length: 120, unique: true })
  @Index()
  key: string;

  @Column({ type: 'jsonb' })
  value: Record<string, unknown> | string | number | boolean | string[];

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'updated_by_id', type: 'uuid', nullable: true })
  updatedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy: User | null;
}
