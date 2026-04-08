import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CompanyUserService } from './company-user.service';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CompanyUserCreate, CompanyUserObject, CompanyUserFilters, CompanyUserRemove } from '@app/common/interfaces/company-user.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Controller()
export class CompanyUserController {
  constructor(private readonly companyUserService: CompanyUserService) {}

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY_USER.CREATE)
  async createCompanyUser(@Payload() request: ApiRequest<CompanyUserCreate>): Promise<CompanyUserObject> {
    try {
      return await this.companyUserService.createCompanyUser(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_USER_MAPPING_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY_USER.GET_ONE)
  async getCompanyUser(@Payload() request: ApiRequest<number>): Promise<CompanyUserObject> {
    try {
      return await this.companyUserService.getCompanyUserById(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_USER_MAPPING_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY_USER.GET_ALL)
  async getCompanyUsers(@Payload() request: ApiRequest<Pagination<CompanyUserFilters>>): Promise<PaginatedResponse<CompanyUserObject>> {
    try {
      return await this.companyUserService.listCompanyUsers(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_USERS_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY_USER.GET_BY_COMPANY)
  async getByCompany(@Payload() request: ApiRequest<number>): Promise<CompanyUserObject[]> {
    try {
      return await this.companyUserService.listByCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_USERS_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY_USER.GET_BY_USER)
  async getByUser(@Payload() request: ApiRequest<number>): Promise<CompanyUserObject[]> {
    try {
      return await this.companyUserService.listByUser(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_USER_COMPANIES_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY_USER.REMOVE)
  async removeCompanyUser(@Payload() request: ApiRequest<CompanyUserRemove>): Promise<boolean> {
    try {
      return await this.companyUserService.removeCompanyUser(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_USER_MAPPING_CANNOT_BE_REMOVED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
