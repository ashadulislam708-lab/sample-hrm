import { DataSource } from 'typeorm';
import { OfficeConfig } from '../../modules/office-config/office-config.entity';
import { IntegrationConfig } from '../../modules/integrations/integration-config.entity';
import { IntegrationProviderEnum } from '../../common/enums/integration-provider.enum';

interface OfficeConfigSeedRow {
  key: string;
  value: unknown;
  description: string;
}

export const DEFAULT_OFFICE_CONFIG: OfficeConfigSeedRow[] = [
  {
    key: 'officeStartTime',
    value: '08:00',
    description: 'Office opening time (24h HH:mm)',
  },
  {
    key: 'officeEndTime',
    value: '17:00',
    description: 'Office closing time (24h HH:mm)',
  },
  {
    key: 'coreHoursStart',
    value: '08:00',
    description: 'Core working hours start',
  },
  {
    key: 'coreHoursEnd',
    value: '13:00',
    description: 'Core working hours end',
  },
  {
    key: 'gracePeriodMinutes',
    value: 10,
    description: 'Minutes after office start before late flag',
  },
  {
    key: 'workDays',
    value: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    description: 'Standard work days',
  },
  {
    key: 'weekendDays',
    value: ['saturday', 'sunday'],
    description: 'Weekend days',
  },
  {
    key: 'altShiftDays',
    value: ['friday', 'saturday', 'sunday'],
    description: 'Alternative shift days',
  },
];

const DEFAULT_INTEGRATIONS: IntegrationProviderEnum[] = [
  IntegrationProviderEnum.GATHER,
  IntegrationProviderEnum.NOTION,
  IntegrationProviderEnum.SLACK,
];

export async function seedInitialOfficeConfig(
  dataSource: DataSource,
): Promise<void> {
  const officeRepo = dataSource.getRepository(OfficeConfig);
  for (const row of DEFAULT_OFFICE_CONFIG) {
    const existing = await officeRepo.findOne({ where: { key: row.key } });
    if (existing) continue;
    await officeRepo.save(
      officeRepo.create({
        key: row.key,
        value: row.value as OfficeConfig['value'],
        description: row.description,
      }),
    );
  }

  const integrationRepo = dataSource.getRepository(IntegrationConfig);
  for (const provider of DEFAULT_INTEGRATIONS) {
    const existing = await integrationRepo.findOne({ where: { provider } });
    if (existing) continue;
    await integrationRepo.save(
      integrationRepo.create({
        provider,
        configJson: {},
        connected: false,
      }),
    );
  }
}
