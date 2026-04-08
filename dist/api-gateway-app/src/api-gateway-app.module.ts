import { Module } from '@nestjs/common';
import { NotificationModule } from './modules/notification/notification.module';
import { UsersModule } from './modules/users/users.module';
import { CommonConfigModule } from '../../../libs/common/src/config/config.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DocumentsController } from './modules/file/file.controller';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { LookupModule } from './modules/lookup/lookup.module';
import { LeadsModule } from './modules/leads/leads.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { CompanyModule } from './modules/company/company.module';
import { CompanyUserModule } from './modules/company-user/company-user.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { UserRolesModule } from './modules/user-roles/user-roles.module';
import { OnboardingCompanyModule } from './modules/onboarding-company/onboarding-company.module';
import { OnboardingAttachmentModule } from './modules/onboarding-attachment/onboarding-attachment.module';
import { OnboardingVerificationModule } from './modules/onboarding-verification/onboarding-verification.module';
import { CallingModule } from './modules/calling/calling.module';

@Module({
  imports: [
    CommonConfigModule,
    NotificationModule,
    UsersModule,
    LookupModule,
    LeadsModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    CompanyModule,
    CompanyUserModule,
    UserRolesModule,
    OnboardingCompanyModule,
    OnboardingAttachmentModule,
    OnboardingVerificationModule,
    CallingModule,
  ],
  controllers: [DocumentsController],
  providers: [JwtService, ConfigService, FileUploadService],
})
export class AppModule { }