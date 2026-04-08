import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { OnboardingAttachment } from '@app/database/models/onboarding-attachment.model';
import { OnboardingAttachmentRepository } from '@app/database/repositories/onboarding-attachment.repository';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import { OnboardingAttachmentCreate, OnboardingAttachmentObject } from '@app/common/interfaces/onboarding.interface';
import { AUDIT_TABLE_NAMES, AUDIT_OPERATIONS } from '@app/common/constants/audit.constants';

@Injectable()
export class OnboardingAttachmentService {
  constructor(
    private readonly onboardingAttachmentRepository: OnboardingAttachmentRepository,
    private readonly auditTrailRepository: AuditTrailRepository
  ) {}

  async createAttachment(request: ApiRequest<OnboardingAttachmentCreate>): Promise<OnboardingAttachmentObject> {
    const { data } = request;
    const userId = Number(request.userId);
    
    if (!data.onboardingId || !data.documentName || !data.url) {
      throw new BadRequestException('CREATE_ATTACHMENT_REQUIRED_FIELDS_MISSING');
    }

    const attachment = await this.onboardingAttachmentRepository.create({
      ...data,
      updatedBy: userId,
    });

    await this.auditTrailRepository.logCreate(AUDIT_TABLE_NAMES.ONBOARDING_ATTACHMENTS, userId, attachment.id, attachment);

    return attachment;
  }

  async bulkCreateAttachments(request: ApiRequest<OnboardingAttachmentCreate[]>): Promise<OnboardingAttachmentObject[]> {
    const { data } = request;
    const userId = Number(request.userId);
    
    if (!data || data.length === 0) {
      throw new BadRequestException('BULK_CREATE_ATTACHMENT_DATA_REQUIRED');
    }

    const attachmentsData = data.map(item => ({
      ...item,
      updatedBy: userId,
    }));

    const attachments = await this.onboardingAttachmentRepository.bulkCreate(attachmentsData);

    for (const attachment of attachments) {
      await this.auditTrailRepository.logCreate(AUDIT_TABLE_NAMES.ONBOARDING_ATTACHMENTS, userId, attachment.id, attachment);
    }

    return attachments;
  }

  async getAttachmentsByOnboardingId(request: ApiRequest<number>): Promise<OnboardingAttachmentObject[]> {
    const onboardingId = request.data;
    
    const options: FindOptions<OnboardingAttachment> = {
      where: { onboardingId },
      order: [['createdAt', 'DESC']],
    };
    
    return this.onboardingAttachmentRepository.findAll(options);
  }

  async deleteAttachment(request: ApiRequest<number>): Promise<boolean> {
    const attachmentId = request.data;
    
    const options: FindOptions<OnboardingAttachment> = {
      where: { id: attachmentId },
    };
    
    await this.auditTrailRepository.create({
      tableName: AUDIT_TABLE_NAMES.ONBOARDING_ATTACHMENTS,
      createdByUserId: Number(request.userId),
      updatedBy: Number(request.userId),
      operationName: AUDIT_OPERATIONS.DELETE,
      operationId: attachmentId,
      operationValue: 'deleted',
    });
    
    return this.onboardingAttachmentRepository.delete(options);
  }
}
