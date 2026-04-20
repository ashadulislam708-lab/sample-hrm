import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const url = configService.get<string | null>('db.url');
  const common: Partial<TypeOrmModuleOptions> = {
    type: 'postgres',
    entities: [join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    migrationsRun: false,
    synchronize: configService.get<boolean>('db.synchronize') ?? false,
    logging: configService.get<boolean>('db.logging') ?? false,
    autoLoadEntities: true,
  };

  if (url) {
    return {
      ...(common as TypeOrmModuleOptions),
      url,
    } as TypeOrmModuleOptions;
  }

  return {
    ...(common as TypeOrmModuleOptions),
    host: configService.get<string>('db.host'),
    port: configService.get<number>('db.port'),
    username: configService.get<string>('db.username'),
    password: configService.get<string>('db.password'),
    database: configService.get<string>('db.database'),
  } as TypeOrmModuleOptions;
};
