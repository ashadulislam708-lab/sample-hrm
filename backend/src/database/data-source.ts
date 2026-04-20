import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * Load a simple .env file into process.env WITHOUT external deps.
 * Used by the TypeORM CLI entry point (migrations / seeders) and the seeder
 * script. Supports lines like KEY=value and KEY="value with spaces".
 * Skips comments (#) and empty lines. Does NOT overwrite existing env vars.
 */
function loadDotEnv(): void {
  const envPath = path.resolve(__dirname, '..', '..', '.env');
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, 'utf-8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

const parseInt10 = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
};

const baseOptions: DataSourceOptions = process.env.DATABASE_URL
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [path.join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
      migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
    }
  : {
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt10(process.env.DB_PORT, 5432),
      username: process.env.DB_USER ?? 'hrm',
      password: process.env.DB_PASSWORD ?? 'hrm_dev_password',
      database: process.env.DB_NAME ?? 'sample_hrm',
      entities: [path.join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
      migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
    };

export const AppDataSource = new DataSource(baseOptions);

export default AppDataSource;
