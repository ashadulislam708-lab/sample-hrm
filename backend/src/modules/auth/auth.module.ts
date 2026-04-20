import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import { RefreshTokenRepository } from './refresh-token.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/user.module';
import { TokenModule } from '../../infrastructure/token/token.module';
import { MailModule } from '../../infrastructure/mail/mail.module';
import { SetTokenInterceptor } from './interceptors/set-token.interceptor';
import { RemoveTokenInterceptor } from './interceptors/remove-token.interceptor';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([RefreshToken]),
    UsersModule,
    TokenModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RefreshTokenRepository,
    JwtStrategy,
    SetTokenInterceptor,
    RemoveTokenInterceptor,
  ],
  exports: [AuthService],
})
export class AuthModule {}
