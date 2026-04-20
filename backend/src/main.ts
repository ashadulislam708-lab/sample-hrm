import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Fail fast if required secrets are absent.
  const jwtSecret = configService.get<string>('jwt.accessSecret');
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is required');
  }
  const refreshSecret = configService.get<string>('jwt.refreshSecret');
  if (!refreshSecret) {
    throw new Error('REFRESH_TOKEN_SECRET is required');
  }

  const apiPrefix = configService.get<string>('apiPrefix') ?? 'api';
  app.setGlobalPrefix(apiPrefix);

  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const corsOrigin =
    configService.get<string>('cors.origin') ?? 'http://localhost:5173';
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sample HRM API')
    .setDescription('Potential HRM backend API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addCookieAuth('access_token')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = configService.get<number>('port') ?? 3000;
  await app.listen(port);
  logger.log(`Sample HRM backend listening on :${port} (prefix: /${apiPrefix})`);
  logger.log(`Swagger docs at /${apiPrefix}/docs`);
}

void bootstrap();
