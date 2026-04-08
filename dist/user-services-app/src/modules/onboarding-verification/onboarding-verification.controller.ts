import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { OnboardingVerificationService } from './onboarding-verification.service';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingVerificationCreate, OnboardingVerificationUpdate, OnboardingVerificationObject } from '@app/common/interfaces/onboarding.interface';

@Controller()
export class OnboardingVerificationController {
  constructor(private readonly onboardingVerificationService: OnboardingVerificationService) {}

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.CREATE)
  async createVerification(@Payload() request: ApiRequest<OnboardingVerificationCreate>): Promise<OnboardingVerificationObject> {
    try {
      return await this.onboardingVerificationService.createVerification(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_VERIFICATION_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.BULK_CREATE)
  async bulkCreateVerifications(@Payload() request: ApiRequest<OnboardingVerificationCreate[]>): Promise<OnboardingVerificationObject[]> {
    try {
      return await this.onboardingVerificationService.bulkCreateVerifications(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_VERIFICATIONS_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.GET_BY_ONBOARDING)
  async getVerificationsByOnboarding(@Payload() request: ApiRequest<number>): Promise<OnboardingVerificationObject[]> {
    try {
      return await this.onboardingVerificationService.getVerificationsByOnboardingId(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_VERIFICATIONS_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.UPDATE)
  async updateVerification(
    @Payload() request: ApiRequest<{ id: number; data: OnboardingVerificationUpdate }>,
  ): Promise<OnboardingVerificationObject> {
    try {
      return await this.onboardingVerificationService.updateVerification(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_VERIFICATION_CANNOT_BE_UPDATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.DELETE)
  async deleteVerification(@Payload() request: ApiRequest<number>): Promise<boolean> {
    try {
      return await this.onboardingVerificationService.deleteVerification(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_VERIFICATION_CANNOT_BE_DELETED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
