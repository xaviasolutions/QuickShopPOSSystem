import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OnboardingCompany } from '@app/models/onboarding-company.model';
import { OnboardingCompanyRepository } from '@app/repositories/onboarding-company.repository';
import { AuditTrail } from '@app/database/models/audit-trail.model';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { OnboardingCompanyService } from './onboarding-company.service';
import { OnboardingCompanyController } from './onboarding-company.controller';

@Module({
  imports: [SequelizeModule.forFeature([OnboardingCompany, AuditTrail])],
  controllers: [OnboardingCompanyController],
  providers: [OnboardingCompanyService, OnboardingCompanyRepository, AuditTrailRepository],
  exports: [OnboardingCompanyService],
})
export class OnboardingCompanyModule {}
