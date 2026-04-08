import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OnboardingVerification } from '@app/models/onboarding-verification.model';
import { OnboardingVerificationRepository } from '@app/repositories/onboarding-verification.repository';
import { AuditTrail } from '@app/database/models/audit-trail.model';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { OnboardingVerificationService } from './onboarding-verification.service';
import { OnboardingVerificationController } from './onboarding-verification.controller';

@Module({
  imports: [SequelizeModule.forFeature([OnboardingVerification, AuditTrail])],
  controllers: [OnboardingVerificationController],
  providers: [OnboardingVerificationService, OnboardingVerificationRepository, AuditTrailRepository],
  exports: [OnboardingVerificationService],
})
export class OnboardingVerificationModule {}
