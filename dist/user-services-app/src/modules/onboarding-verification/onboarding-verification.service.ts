import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { OnboardingVerification } from '@app/database/models/onboarding-verification.model';
import { OnboardingVerificationRepository } from '@app/database/repositories/onboarding-verification.repository';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import { OnboardingVerificationCreate, OnboardingVerificationUpdate, OnboardingVerificationObject } from '@app/common/interfaces/onboarding.interface';
import { AUDIT_TABLE_NAMES, AUDIT_OPERATIONS } from '@app/common/constants/audit.constants';

@Injectable()
export class OnboardingVerificationService {
  constructor(
    private readonly onboardingVerificationRepository: OnboardingVerificationRepository,
    private readonly auditTrailRepository: AuditTrailRepository
  ) {}

  async createVerification(request: ApiRequest<OnboardingVerificationCreate>): Promise<OnboardingVerificationObject> {
    const { data } = request;
    const userId = Number(request.userId);
    
    if (!data.onboardingId || !data.columnName) {
      throw new BadRequestException('CREATE_VERIFICATION_REQUIRED_FIELDS_MISSING');
    }

    const verification = await this.onboardingVerificationRepository.create({
      ...data,
      updatedBy: userId,
    });

    await this.auditTrailRepository.logCreate(AUDIT_TABLE_NAMES.ONBOARDING_VERIFICATION, userId, verification.id, verification);

    return verification;
  }

  async bulkCreateVerifications(request: ApiRequest<OnboardingVerificationCreate[]>): Promise<OnboardingVerificationObject[]> {
    const { data } = request;
    const userId = Number(request.userId);
    
    if (!data || data.length === 0) {
      throw new BadRequestException('BULK_CREATE_VERIFICATION_DATA_REQUIRED');
    }

    const verificationsData = data.map(item => ({
      ...item,
      updatedBy: userId,
    }));

    const verifications = await this.onboardingVerificationRepository.bulkCreate(verificationsData);

    for (const verification of verifications) {
      await this.auditTrailRepository.logCreate(AUDIT_TABLE_NAMES.ONBOARDING_VERIFICATION, userId, verification.id, verification);
    }

    return verifications;
  }

  async getVerificationsByOnboardingId(request: ApiRequest<number>): Promise<OnboardingVerificationObject[]> {
    const onboardingId = request.data;
    
    const options: FindOptions<OnboardingVerification> = {
      where: { onboardingId },
      order: [['createdAt', 'DESC']],
    };
    
    return this.onboardingVerificationRepository.findAll(options);
  }

  async updateVerification(request: ApiRequest<{ id: number; data: OnboardingVerificationUpdate }>): Promise<OnboardingVerificationObject> {
    const { id, data } = request.data;
    const userId = Number(request.userId);
    
    const options: FindOptions<OnboardingVerification> = {
      where: { id },
    };
    
    const verification = await this.onboardingVerificationRepository.update(options, {
      ...data,
      updatedBy: userId,
    });

    // Log each changed field
    await this.auditTrailRepository.logChanges(AUDIT_TABLE_NAMES.ONBOARDING_VERIFICATION, userId, id, data);

    return verification;
  }

  async deleteVerification(request: ApiRequest<number>): Promise<boolean> {
    const verificationId = request.data;
    
    const options: FindOptions<OnboardingVerification> = {
      where: { id: verificationId },
    };
    
    await this.auditTrailRepository.create({
      tableName: AUDIT_TABLE_NAMES.ONBOARDING_VERIFICATION,
      createdByUserId: Number(request.userId),
      updatedBy: Number(request.userId),
      operationName: AUDIT_OPERATIONS.DELETE,
      operationId: verificationId,
      operationValue: 'deleted',
    });
    
    return this.onboardingVerificationRepository.delete(options);
  }
}
