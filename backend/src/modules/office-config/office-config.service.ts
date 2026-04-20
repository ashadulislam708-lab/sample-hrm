import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepPartial } from 'typeorm';
import { OfficeConfig } from './office-config.entity';
import { OfficeConfigRepository } from './office-config.repository';

type ConfigValue =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | string[];

export const OFFICE_CONFIG_KEYS = {
  officeStartTime: 'officeStartTime',
  officeEndTime: 'officeEndTime',
  coreHoursStart: 'coreHoursStart',
  coreHoursEnd: 'coreHoursEnd',
  gracePeriodMinutes: 'gracePeriodMinutes',
  workDays: 'workDays',
  weekendDays: 'weekendDays',
  altShiftDays: 'altShiftDays',
} as const;

@Injectable()
export class OfficeConfigService {
  constructor(
    @Inject(OfficeConfigRepository)
    private readonly repository: OfficeConfigRepository,
    private readonly configService: ConfigService,
  ) {}

  private getDefaults(): Record<string, ConfigValue> {
    return {
      [OFFICE_CONFIG_KEYS.officeStartTime]:
        this.configService.get<string>('office.startTime') ?? '08:00',
      [OFFICE_CONFIG_KEYS.officeEndTime]:
        this.configService.get<string>('office.endTime') ?? '17:00',
      [OFFICE_CONFIG_KEYS.coreHoursStart]:
        this.configService.get<string>('office.coreHoursStart') ?? '08:00',
      [OFFICE_CONFIG_KEYS.coreHoursEnd]:
        this.configService.get<string>('office.coreHoursEnd') ?? '13:00',
      [OFFICE_CONFIG_KEYS.gracePeriodMinutes]:
        this.configService.get<number>('office.gracePeriodMinutes') ?? 10,
      [OFFICE_CONFIG_KEYS.workDays]: ['mon', 'tue', 'wed', 'thu', 'fri'],
      [OFFICE_CONFIG_KEYS.weekendDays]: ['sat', 'sun'],
      [OFFICE_CONFIG_KEYS.altShiftDays]: [],
    };
  }

  async getAllAsRecord(): Promise<Record<string, ConfigValue>> {
    const rows = await this.repository.findAllOrdered();
    const record: Record<string, ConfigValue> = { ...this.getDefaults() };
    for (const row of rows) {
      record[row.key] = row.value as ConfigValue;
    }
    return record;
  }

  async findAll(): Promise<OfficeConfig[]> {
    return this.repository.findAllOrdered();
  }

  async get(key: string): Promise<ConfigValue> {
    const row = await this.repository.findByKey(key);
    if (row) return row.value as ConfigValue;
    const defaults = this.getDefaults();
    if (key in defaults) return defaults[key];
    throw new NotFoundException(`Office config key '${key}' not found`);
  }

  async set(
    key: string,
    value: ConfigValue,
    updatedById: string,
  ): Promise<OfficeConfig> {
    const existing = await this.repository.findByKey(key);
    if (existing) {
      const payload: DeepPartial<OfficeConfig> = {
        value: value as OfficeConfig['value'],
        updatedById,
      };
      const updated = await this.repository.update(existing.id, payload);
      return updated ?? existing;
    }
    return this.repository.create({
      key,
      value: value as OfficeConfig['value'],
      updatedById,
    });
  }

  async bulkUpdate(
    values: Record<string, unknown>,
    updatedById: string,
  ): Promise<Record<string, ConfigValue>> {
    for (const [key, value] of Object.entries(values)) {
      await this.set(key, value as ConfigValue, updatedById);
    }
    return this.getAllAsRecord();
  }

  async resetAll(): Promise<Record<string, ConfigValue>> {
    await this.repository.deleteAll();
    return this.getAllAsRecord();
  }

  async getOfficeStartTime(): Promise<string> {
    return (await this.get(OFFICE_CONFIG_KEYS.officeStartTime)) as string;
  }

  async getOfficeEndTime(): Promise<string> {
    return (await this.get(OFFICE_CONFIG_KEYS.officeEndTime)) as string;
  }

  async getCoreHoursStart(): Promise<string> {
    return (await this.get(OFFICE_CONFIG_KEYS.coreHoursStart)) as string;
  }

  async getCoreHoursEnd(): Promise<string> {
    return (await this.get(OFFICE_CONFIG_KEYS.coreHoursEnd)) as string;
  }

  async getGracePeriodMinutes(): Promise<number> {
    return (await this.get(OFFICE_CONFIG_KEYS.gracePeriodMinutes)) as number;
  }

  async getWorkDays(): Promise<string[]> {
    return (await this.get(OFFICE_CONFIG_KEYS.workDays)) as string[];
  }

  async getWeekendDays(): Promise<string[]> {
    return (await this.get(OFFICE_CONFIG_KEYS.weekendDays)) as string[];
  }

  async getAltShiftDays(): Promise<string[]> {
    return (await this.get(OFFICE_CONFIG_KEYS.altShiftDays)) as string[];
  }
}
