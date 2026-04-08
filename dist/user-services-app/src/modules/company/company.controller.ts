import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CompanyCreate, CompanyUpdate, CompanyObject, CompanyFilters } from '@app/common/interfaces/company.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY.CREATE)
  async createCompany(@Payload() request: ApiRequest<CompanyCreate>): Promise<CompanyObject> {
    try {
      return await this.companyService.createCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY.GET_ONE)
  async getCompany(@Payload() request: ApiRequest<number>): Promise<CompanyObject> {
    try {
      return await this.companyService.getCompanyById(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY.GET_ALL)
  async getCompanies(@Payload() request: ApiRequest<Pagination<CompanyFilters>>): Promise<PaginatedResponse<CompanyObject>> {
    try {
      return await this.companyService.listCompanies(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANIES_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY.UPDATE)
  async updateCompany(
    @Payload() request: ApiRequest<{ id: number; data: CompanyUpdate }>,
  ): Promise<CompanyObject> {
    try {
      return await this.companyService.updateCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_CANNOT_BE_UPDATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.COMPANY.DELETE)
  async deleteCompany(@Payload() request: ApiRequest<number>): Promise<boolean> {
    try {
      return await this.companyService.deleteCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_COMPANY_CANNOT_BE_DELETED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
