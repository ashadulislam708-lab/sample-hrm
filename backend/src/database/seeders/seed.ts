/* eslint-disable no-console */
import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { seedUsers } from './users.seeder';
import { seedInitialOfficeConfig } from './initial-office-config.seeder';

export async function runSeeders(): Promise<void> {
  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();

  try {
    console.log('[seed] starting...');
    await seedUsers(dataSource);
    await seedInitialOfficeConfig(dataSource);
    console.log('[seed] complete.');
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

if (require.main === module) {
  runSeeders()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[seed] failed:', err);
      process.exit(1);
    });
}
