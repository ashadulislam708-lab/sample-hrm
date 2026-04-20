export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  cors: {
    origin: string;
    credentials: boolean;
  };
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    url: string | null;
    synchronize: boolean;
    logging: boolean;
  };
  jwt: {
    accessSecret: string;
    accessExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  cookie: {
    domain: string;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
    accessName: string;
    refreshName: string;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
  slack: {
    webhookUrl: string;
    emergencyChannel: string;
    botToken: string;
  };
  gather: {
    apiKey: string;
    spaceId: string;
    syncIntervalSeconds: number;
  };
  notion: {
    apiToken: string;
    databaseId: string;
    syncIntervalMinutes: number;
  };
  office: {
    startTime: string;
    endTime: string;
    coreHoursStart: string;
    coreHoursEnd: string;
    gracePeriodMinutes: number;
  };
  security: {
    rateLimitTtl: number;
    rateLimitMax: number;
  };
  sentryDsn: string;
  frontendBaseUrl: string;
}

const parseBool = (value: string | undefined, fallback = false): boolean => {
  if (value === undefined || value === '') return fallback;
  return value.toLowerCase() === 'true' || value === '1';
};

const parseInt10 = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
};

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt10(process.env.PORT, 3000),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  cors: {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt10(process.env.DB_PORT, 5432),
    username: process.env.DB_USER ?? 'hrm',
    password: process.env.DB_PASSWORD ?? 'hrm_dev_password',
    database: process.env.DB_NAME ?? 'sample_hrm',
    url: process.env.DATABASE_URL ?? null,
    synchronize: parseBool(process.env.DB_SYNCHRONIZE, false),
    logging: parseBool(process.env.DB_LOGGING, false),
  },
  jwt: {
    accessSecret: process.env.JWT_SECRET ?? '',
    accessExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET ?? '',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d',
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN ?? 'localhost',
    secure: parseBool(process.env.COOKIE_SECURE, false),
    sameSite:
      (process.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none' | undefined) ??
      'strict',
    accessName: process.env.COOKIE_ACCESS_NAME ?? 'access_token',
    refreshName: process.env.COOKIE_REFRESH_NAME ?? 'refresh_token',
  },
  mail: {
    host: process.env.MAIL_HOST ?? '',
    port: parseInt10(process.env.MAIL_PORT, 1025),
    user: process.env.MAIL_USER ?? '',
    password: process.env.MAIL_PASSWORD ?? '',
    from: process.env.MAIL_FROM ?? 'no-reply@sample-hrm.com',
  },
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL ?? '',
    emergencyChannel: process.env.SLACK_EMERGENCY_CHANNEL ?? '#emergency-leaves',
    botToken: process.env.SLACK_BOT_TOKEN ?? '',
  },
  gather: {
    apiKey: process.env.GATHER_API_KEY ?? '',
    spaceId: process.env.GATHER_SPACE_ID ?? '',
    syncIntervalSeconds: parseInt10(process.env.GATHER_SYNC_INTERVAL_SECONDS, 60),
  },
  notion: {
    apiToken: process.env.NOTION_API_TOKEN ?? '',
    databaseId: process.env.NOTION_DATABASE_ID ?? '',
    syncIntervalMinutes: parseInt10(
      process.env.NOTION_SYNC_INTERVAL_MINUTES,
      15,
    ),
  },
  office: {
    startTime: process.env.DEFAULT_OFFICE_START_TIME ?? '08:00',
    endTime: process.env.DEFAULT_OFFICE_END_TIME ?? '17:00',
    coreHoursStart: process.env.DEFAULT_CORE_HOURS_START ?? '08:00',
    coreHoursEnd: process.env.DEFAULT_CORE_HOURS_END ?? '13:00',
    gracePeriodMinutes: parseInt10(process.env.DEFAULT_GRACE_PERIOD_MINUTES, 10),
  },
  security: {
    rateLimitTtl: parseInt10(process.env.RATE_LIMIT_TTL, 60),
    rateLimitMax: parseInt10(process.env.RATE_LIMIT_MAX, 100),
  },
  sentryDsn: process.env.SENTRY_DSN ?? '',
  frontendBaseUrl: process.env.FRONTEND_BASE_URL ?? 'http://localhost:5173',
});
