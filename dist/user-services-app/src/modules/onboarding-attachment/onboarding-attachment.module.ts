import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OnboardingAttachment } from '@app/models/onboarding-attachment.model';
import { OnboardingAttachmentRepository } from '@app/repositories/onboarding-attachment.repository';
import { AuditTrail } from '@app/database/models/audit-trail.model';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { OnboardingAttachmentService } from './onboarding-attachment.service';
import { OnboardingAttachmentController } from './onboarding-attachment.controller';

@Module({
  imports: [SequelizeModule.forFeature([OnboardingAttachment, AuditTrail])],
  controllers: [OnboardingAttachmentController],
  providers: [OnboardingAttachmentService, OnboardingAttachmentRepository, AuditTrailRepository],
  exports: [OnboardingAttachmentService],
})
export class OnboardingAttachmentModule {}
