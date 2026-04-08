import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { Company } from '@app/models/company.model';
import { CompanyRepository } from '@app/repositories/company.repository';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CompanyCreate, CompanyUpdate, CompanyObject, CompanyFilters } from '@app/common/interfaces/company.interface';
import type { PaginatedResponse, Pagination, FindAndCountAllOptions } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createCompany(request: ApiRequest<CompanyCreate>): Promise<CompanyObject> {
    const { data } = request;
    
    if (!data.name) {
      throw new BadRequestException('CREATE_COMPANY_NAME_REQUIRED');
    }

    return this.companyRepository.create(data);
  }

  async getCompanyById(request: ApiRequest<number>): Promise<CompanyObject> {
    const companyId = request.data;
    
    const options: FindOptions<Company> = {
      where: { id: companyId },
    };
    
    const company = await this.companyRepository.findOne(options);
    if (!company) {
      throw new NotFoundException('GET_COMPANY_NOT_FOUND');
    }
    
    return company;
  }

  async listCompanies(request: ApiRequest<Pagination<CompanyFilters>>): Promise<PaginatedResponse<CompanyObject>> {
    const paginated = request.data;
    const filters = request.data?.filters;
    const page = Number(paginated?.page) || 1;
    const limit = Number(paginated?.size) || 10;
    const offset = (page - 1) * limit;

    const options: FindOptions<Company> = {
      where: {},
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: limit,
    };

    if (filters) {
      if (filters.search) {
        options.where = {
          ...options.where,
          [Op.or]: [
            { name: { [Op.like]: `%${filters.search}%` } },
            { description: { [Op.like]: `%${filters.search}%` } },
          ],
        };
      }

      if (filters.status) {
        if (typeof filters.status === 'string') {
          options.where = {
            ...options.where,
            status: filters.status,
          };
        } else {
          options.where = {
            ...options.where,
            status: { [Op.in]: filters.status },
          };
        }
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

    const responseData: FindAndCountAllOptions<CompanyObject> = await this.companyRepository.findAndCountAll(options);

    return {
      data: responseData.rows,
      page: page,
      totalPages: Math.ceil(responseData.count / limit),
      totalItems: responseData.count,
    };
  }

  async updateCompany(request: ApiRequest<{ id: number; data: CompanyUpdate }>): Promise<CompanyObject> {
    const { id, data } = request.data;
    
    const options: FindOptions<Company> = {
      where: { id },
    };
    
    return this.companyRepository.update(options, data);
  }

  async deleteCompany(request: ApiRequest<number>): Promise<boolean> {
    const companyId = request.data;
    
    const options: FindOptions<Company> = {
      where: { id: companyId },
    };
    
    return this.companyRepository.delete(options);
  }
}

