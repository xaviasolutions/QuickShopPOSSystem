import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { CompanyUser } from '@app/models/company_user.model';
import { CompanyUserRepository } from '@app/repositories/company-user.repository';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CompanyUserCreate, CompanyUserObject, CompanyUserFilters, CompanyUserRemove } from '@app/common/interfaces/company-user.interface';
import type { PaginatedResponse, Pagination, FindAndCountAllOptions } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class CompanyUserService {
  constructor(private readonly companyUserRepository: CompanyUserRepository) {}

  async createCompanyUser(request: ApiRequest<CompanyUserCreate>): Promise<CompanyUserObject> {
    const { data } = request;
    
    if (!data.companyId || !data.userId) {
      throw new BadRequestException('CREATE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED');
    }

    return this.companyUserRepository.create(data);
  }

  async getCompanyUserById(request: ApiRequest<number>): Promise<CompanyUserObject> {
    const companyUserId = request.data;
    
    const options: FindOptions<CompanyUser> = {
      where: { id: companyUserId },
    };
    
    const companyUser = await this.companyUserRepository.findOne(options);
    if (!companyUser) {
      throw new NotFoundException('GET_COMPANY_USER_NOT_FOUND');
    }
    
    return companyUser;
  }

  async listByCompany(request: ApiRequest<number>): Promise<CompanyUserObject[]> {
    const companyId = request.data;
    
    const options: FindOptions<CompanyUser> = {
      where: { companyId },
    };
    
    return this.companyUserRepository.findAll(options);
  }

  async listByUser(request: ApiRequest<number>): Promise<CompanyUserObject[]> {
    const userId = request.data;
    
    const options: FindOptions<CompanyUser> = {
      where: { userId },
    };
    
    return this.companyUserRepository.findAll(options);
  }

  async listCompanyUsers(request: ApiRequest<Pagination<CompanyUserFilters>>): Promise<PaginatedResponse<CompanyUserObject>> {
    const paginated = request.data;
    const filters = request.data?.filters;
    const page = Number(paginated?.page) || 1;
    const limit = Number(paginated?.size) || 10;
    const offset = (page - 1) * limit;

    const options: FindOptions<CompanyUser> = {
      where: {},
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: limit,
    };

    if (filters) {
      if (filters.companyId) {
        options.where = {
          ...options.where,
          companyId: filters.companyId,
        };
      }

      if (filters.userId) {
        options.where = {
          ...options.where,
          userId: filters.userId,
        };
      }

      if (filters.isInitialAdmin !== undefined) {
        options.where = {
          ...options.where,
          isInitialAdmin: filters.isInitialAdmin,
        };
      }

      if (filters.dateFrom || filters.dateTo) {
        const createdAt: any = {};
        if (filters.dateFrom) {
          createdAt[Op.gte] = new Date(filters.dateFrom);
        }
        if (filters.dateTo) {
          createdAt[Op.lte] = new Date(filters.dateTo);
        }
        options.where = {
          ...options.where,
          createdAt: createdAt,
        };
      }
    }

    const responseData: FindAndCountAllOptions<CompanyUserObject> = await this.companyUserRepository.findAndCountAll(options);

    return {
      data: responseData.rows,
      page: page,
      totalPages: Math.ceil(responseData.count / limit),
      totalItems: responseData.count,
    };
  }

  async removeCompanyUser(request: ApiRequest<CompanyUserRemove>): Promise<boolean> {
    const { companyId, userId } = request.data;
    
    if (!companyId || !userId) {
      throw new BadRequestException('REMOVE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED');
    }
    
    const options: FindOptions<CompanyUser> = {
      where: { companyId, userId },
    };
    
    return this.companyUserRepository.delete(options);
  }
}

