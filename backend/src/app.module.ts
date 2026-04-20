import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { typeOrmConfigFactory } from './database/typeorm.config';

import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { RolesGuard } from './core/guards/roles.guard';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';

import { GatherModule } from './infrastructure/gather-town/gather.module';
import { MailModule } from './infrastructure/mail/mail.module';
import { NotionModule } from './infrastructure/notion/notion.module';
import { SlackModule } from './infrastructure/slack/slack.module';
import { TokenModule } from './infrastructure/token/token.module';

import { AttendanceModule } from './modules/attendance/attendance.module';
import { AuditModule } from './modules/audit/audit.module';
import { AuthModule } from './modules/auth/auth.module';
import { BonusModule } from './modules/bonus/bonus.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { LeaveModule } from './modules/leave/leave.module';
import { LoanModule } from './modules/loan/loan.module';
import { ModuleConfigModule } from './modules/module-config/module-config.module';
import { NotificationsModule } from './modules/notifications/notification.module';
import { OfficeConfigModule } from './modules/office-config/office-config.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { PerformanceModule } from './modules/performance/performance.module';
import { PolicyModule } from './modules/policy/policy.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ShiftModule } from './modules/work-shift/shift.module';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    ScheduleModule.forRoot(),

    // Global infrastructure
    TokenModule,
    MailModule,
    SlackModule,
    GatherModule,
    NotionModule,

    // Cross-cutting globals
    AuditModule,
    OfficeConfigModule,

    // Identity
    UsersModule,
    AuthModule,
    NotificationsModule,

    // HR flows
    AttendanceModule,
    LeaveModule,
    ShiftModule,
    LoanModule,
    PayrollModule,
    BonusModule,

    // People & performance
    PerformanceModule,
    PolicyModule,
    RecruitmentModule,

    // Administration & extensibility
    DepartmentsModule,
    IntegrationsModule,
    ModuleConfigModule,
    ReportsModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
