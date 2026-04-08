import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/src/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtService } from '@nestjs/jwt';
import { ALL_MODELS } from '@app/database/models/model';
import { CronModule } from './modules/cron-services/cron.module';
import { UsersModule } from './modules/users/users.module';
import { CompanyModule } from './modules/company/company.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { UserRoleModule } from './modules/user-role/user_role.module';
import { CompanyUserModule } from './modules/company-user/company-user.module';
import { OnboardingCompanyModule } from './modules/onboarding-company/onboarding-company.module';
import { OnboardingAttachmentModule } from './modules/onboarding-attachment/onboarding-attachment.module';
import { OnboardingVerificationModule } from './modules/onboarding-verification/onboarding-verification.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature(ALL_MODELS),
    ScheduleModule.forRoot(),
    CronModule,
    UsersModule,
    CompanyModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    UserRoleModule,
    CompanyUserModule,
    OnboardingCompanyModule,
    OnboardingAttachmentModule,
    OnboardingVerificationModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class UserServiceAppModule { }
