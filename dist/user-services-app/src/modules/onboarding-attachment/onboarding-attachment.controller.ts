import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { OnboardingAttachmentService } from './onboarding-attachment.service';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingAttachmentCreate, OnboardingAttachmentObject } from '@app/common/interfaces/onboarding.interface';

@Controller()
export class OnboardingAttachmentController {
  constructor(private readonly onboardingAttachmentService: OnboardingAttachmentService) {}

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.CREATE)
  async createAttachment(@Payload() request: ApiRequest<OnboardingAttachmentCreate>): Promise<OnboardingAttachmentObject> {
    try {
      return await this.onboardingAttachmentService.createAttachment(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ATTACHMENT_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.BULK_CREATE)
  async bulkCreateAttachments(@Payload() request: ApiRequest<OnboardingAttachmentCreate[]>): Promise<OnboardingAttachmentObject[]> {
    try {
      return await this.onboardingAttachmentService.bulkCreateAttachments(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ATTACHMENTS_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.GET_BY_ONBOARDING)
  async getAttachmentsByOnboarding(@Payload() request: ApiRequest<number>): Promise<OnboardingAttachmentObject[]> {
    try {
      return await this.onboardingAttachmentService.getAttachmentsByOnboardingId(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ATTACHMENTS_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.DELETE)
  async deleteAttachment(@Payload() request: ApiRequest<number>): Promise<boolean> {
    try {
      return await this.onboardingAttachmentService.deleteAttachment(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ATTACHMENT_CANNOT_BE_DELETED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
