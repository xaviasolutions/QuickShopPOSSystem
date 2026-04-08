import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { OnboardingCompany } from '@app/models/onboarding-company.model';
import { OnboardingCompanyRepository } from '@app/repositories/onboarding-company.repository';
import { OnboardingAttachment } from '@app/models/onboarding-attachment.model';
import { OnboardingVerification } from '@app/models/onboarding-verification.model';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { AUDIT_TABLE_NAMES, AUDIT_OPERATIONS } from '@app/common/constants/audit.constants';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingCompanyCreate, OnboardingCompanyUpdate, OnboardingCompanyObject, OnboardingCompanyFilters } from '@app/common/interfaces/onboarding.interface';
import type { PaginatedResponse, Pagination, FindAndCountAllOptions } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class OnboardingCompanyService {
  constructor(
    private readonly onboardingCompanyRepository: OnboardingCompanyRepository,
    private readonly auditTrailRepository: AuditTrailRepository
  ) { }

  async createOnboardingCompany(request: ApiRequest<OnboardingCompanyCreate>): Promise<OnboardingCompanyObject> {
    const { data } = request;

    if (!data.name || !data.userId) {
      throw new BadRequestException('CREATE_ONBOARDING_COMPANY_NAME_AND_USER_REQUIRED');
    }

    const createData = {
      ...data,
      updatedBy: Number(request.userId),
    };

    const onboardingCompany = await this.onboardingCompanyRepository.create(createData);

    await this.auditTrailRepository.logCreate(AUDIT_TABLE_NAMES.ONBOARDING_COMPANY, Number(request.userId), onboardingCompany.id, onboardingCompany);

    return onboardingCompany;
  }

  async getOnboardingCompanyById(request: ApiRequest<number>): Promise<OnboardingCompanyObject> {
    const onboardingId = request.data;

    const options: FindOptions<OnboardingCompany> = {
      where: { id: onboardingId },
      include: [
        { model: OnboardingAttachment, as: 'attachments' },
        { model: OnboardingVerification, as: 'verifications' }
      ]
    };

    const onboardingCompany = await this.onboardingCompanyRepository.findOne(options);
    if (!onboardingCompany) {
      throw new NotFoundException('GET_ONBOARDING_COMPANY_NOT_FOUND');
    }

    return onboardingCompany;
  }

  async listOnboardingCompanies(request: ApiRequest<Pagination<OnboardingCompanyFilters>>): Promise<PaginatedResponse<OnboardingCompanyObject>> {
    const paginated = request.data;
    const filters = request.data?.filters;
    const page = Number(paginated?.page) || 1;
    const limit = Number(paginated?.size) || 10;
    const offset = (page - 1) * limit;

    const options: FindOptions<OnboardingCompany> = {
      where: {},
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: limit,
      include: [
        { model: OnboardingAttachment, as: 'attachments' },
        { model: OnboardingVerification, as: 'verifications' }
      ]
    };

    if (filters) {
      if (filters.search) {
        options.where = {
          ...options.where,
          [Op.or]: [
            { name: { [Op.like]: `%${filters.search}%` } },
            { city: { [Op.like]: `%${filters.search}%` } },
            { country: { [Op.like]: `%${filters.search}%` } },
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

      if (filters.userId) {
        options.where = {
          ...options.where,
          userId: filters.userId,
        };
      }

      if (filters.isApproved !== undefined) {
        options.where = {
          ...options.where,
          isApproved: filters.isApproved,
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

    const responseData: FindAndCountAllOptions<OnboardingCompanyObject> = await this.onboardingCompanyRepository.findAndCountAll(options);

    return {
      data: responseData.rows,
      page: page,
      totalPages: Math.ceil(responseData.count / limit),
      totalItems: responseData.count,
    };
  }

  async getOnboardingCompaniesByUser(request: ApiRequest<number>): Promise<OnboardingCompanyObject[]> {
    const userId = request.data;

    const options: FindOptions<OnboardingCompany> = {
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [
        { model: OnboardingAttachment, as: 'attachments' },
        { model: OnboardingVerification, as: 'verifications' }
      ]
    };

    return this.onboardingCompanyRepository.findAll(options);
  }

  async approveOnboardingCompany(request: ApiRequest<{ id: number; isApproved: boolean }>): Promise<OnboardingCompanyObject> {
    const { id, isApproved } = request.data;

    const options: FindOptions<OnboardingCompany> = {
      where: { id },
    };

    const updateData: Partial<OnboardingCompany> = {
      isApproved,
      status: isApproved ? 'approved' : 'rejected',
      updatedBy: Number(request.userId),
    };

    const updated = await this.onboardingCompanyRepository.update(options, updateData);

    await this.auditTrailRepository.create({
      tableName: AUDIT_TABLE_NAMES.ONBOARDING_COMPANY,
      createdByUserId: Number(request.userId),
      updatedBy: Number(request.userId),
      operationName: AUDIT_OPERATIONS.STATUS,
      operationId: id,
      operationValue: updateData.status,
    });

    return updated;
  }

  async updateOnboardingCompany(request: ApiRequest<{ id: number; data: OnboardingCompanyUpdate }>): Promise<OnboardingCompanyObject> {
    const { id, data } = request.data;

    const options: FindOptions<OnboardingCompany> = {
      where: { id },
    };

    const updateData = {
      ...data,
      updatedBy: Number(request.userId),
    };

    const updated = await this.onboardingCompanyRepository.update(options, updateData);

    // Log each changed field
    await this.auditTrailRepository.logChanges(AUDIT_TABLE_NAMES.ONBOARDING_COMPANY, Number(request.userId), id, data);

    return updated;
  }

  async deleteOnboardingCompany(request: ApiRequest<number>): Promise<boolean> {
    const onboardingId = request.data;

    const options: FindOptions<OnboardingCompany> = {
      where: { id: onboardingId },
    };

    return this.onboardingCompanyRepository.delete(options);
  }
}
