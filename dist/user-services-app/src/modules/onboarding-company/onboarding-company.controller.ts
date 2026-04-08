import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { OnboardingCompanyService } from './onboarding-company.service';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingCompanyCreate, OnboardingCompanyUpdate, OnboardingCompanyObject, OnboardingCompanyFilters } from '@app/common/interfaces/onboarding.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Controller()
export class OnboardingCompanyController {
  constructor(private readonly onboardingCompanyService: OnboardingCompanyService) {}

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.CREATE)
  async createOnboardingCompany(@Payload() request: ApiRequest<OnboardingCompanyCreate>): Promise<OnboardingCompanyObject> {
    try {
      return await this.onboardingCompanyService.createOnboardingCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.GET_ONE)
  async getOnboardingCompany(@Payload() request: ApiRequest<number>): Promise<OnboardingCompanyObject> {
    try {
      return await this.onboardingCompanyService.getOnboardingCompanyById(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.GET_ALL)
  async getOnboardingCompanies(@Payload() request: ApiRequest<Pagination<OnboardingCompanyFilters>>): Promise<PaginatedResponse<OnboardingCompanyObject>> {
    try {
      return await this.onboardingCompanyService.listOnboardingCompanies(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ONBOARDING_COMPANIES_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.GET_BY_USER)
  async getOnboardingCompaniesByUser(@Payload() request: ApiRequest<number>): Promise<OnboardingCompanyObject[]> {
    try {
      return await this.onboardingCompanyService.getOnboardingCompaniesByUser(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ONBOARDING_COMPANIES_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.APPROVE)
  async approveOnboardingCompany(
    @Payload() request: ApiRequest<{ id: number; isApproved: boolean }>,
  ): Promise<OnboardingCompanyObject> {
    try {
      return await this.onboardingCompanyService.approveOnboardingCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_UPDATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.UPDATE)
  async updateOnboardingCompany(
    @Payload() request: ApiRequest<{ id: number; data: OnboardingCompanyUpdate }>,
  ): Promise<OnboardingCompanyObject> {
    try {
      return await this.onboardingCompanyService.updateOnboardingCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_UPDATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.DELETE)
  async deleteOnboardingCompany(@Payload() request: ApiRequest<number>): Promise<boolean> {
    try {
      return await this.onboardingCompanyService.deleteOnboardingCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_DELETED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
