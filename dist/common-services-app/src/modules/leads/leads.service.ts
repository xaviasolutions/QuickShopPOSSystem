import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { Lead } from '@app/database/models/leads.model';
import { LeadsRepository } from '@app/database/repositories/leads.repository';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { FindAndCountAllOptions, PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { CreateLead, LeadFilters, LeadObject, UpdateLead } from '@app/common/interfaces/leads.interface';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import { AUDIT_TABLE_NAMES, AUDIT_OPERATIONS } from '@app/common/constants/audit.constants';

@Injectable()
export class LeadsService {
  constructor(
    private readonly leadsRepository: LeadsRepository,
    private readonly auditTrailRepository: AuditTrailRepository
  ) { }

  async createLead(data: Partial<CreateLead>): Promise<LeadObject> {
    try {
      if (!data.name || !data.title || !data.source) {
        throw new BadRequestException('CREATE_LEAD_NAME_TITLE_AND_SOURCE_REQUIRED');
      }

      const lead = await this.leadsRepository.create(data as CreateLead);

      await this.auditTrailRepository.logCreate(AUDIT_TABLE_NAMES.LEADS, null, lead.id, lead);

      return lead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeadById(id: number): Promise<LeadObject> {
    try {
      const options: FindOptions<Lead> = {
        where: { id },
      };
      const lead = await this.leadsRepository.findOne(options);
      if (!lead) {
        throw new BadRequestException('GET_LEAD_NOT_FOUND');
      }
      return lead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllLeads(paginated: Partial<Pagination<LeadFilters>>): Promise<PaginatedResponse<LeadObject>> {
    try {
      const filters = paginated?.filters;
      const page = Number(paginated?.page) || 1;
      const limit = Number(paginated?.size) || 10;
      const offset = (page - 1) * limit;

      const options: FindOptions<Lead> = {
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
              { title: { [Op.like]: `%${filters.search}%` } },
              { email: { [Op.like]: `%${filters.search}%` } },
              { phone: { [Op.like]: `%${filters.search}%` } },
            ],
          };
        }

        if (filters.source) {
          if (typeof filters.source === 'string') {
            options.where = {
              ...options.where,
              source: filters.source,
            };
          } else {
            options.where = {
              ...options.where,
              source: { [Op.in]: filters.source },
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

      const responseData: FindAndCountAllOptions<LeadObject> = await this.leadsRepository.findAndCountAll(options);

      return {
        data: responseData.rows,
        page: page,
        totalPages: Math.ceil(responseData.count / limit),
        totalItems: responseData.count,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateLead(request: ApiRequest<UpdateLead>): Promise<LeadObject> {
    try {
      const { id, ...updateData } = request.data;
      const userId = request.userId ? Number(request.userId) : null;
      const options: FindOptions<Lead> = {
        where: { id },
      };
      const lead = await this.leadsRepository.findOne(options);
      if (!lead) {
        throw new BadRequestException('UPDATE_LEAD_NOT_FOUND');
      }

      await lead.update({
        ...updateData,
        updatedBy: userId,
      });

      // Log changed fields
      await this.auditTrailRepository.logChanges(AUDIT_TABLE_NAMES.LEADS, userId, id, updateData);

      return lead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteLead(request: ApiRequest<number>): Promise<{ success: boolean }> {
    try {
      const id = request.data;
      const userId = request.userId ? Number(request.userId) : null;

      const options: FindOptions<Lead> = {
        where: { id },
      };

      await this.leadsRepository.delete(options);

      await this.auditTrailRepository.create({
        tableName: AUDIT_TABLE_NAMES.LEADS,
        createdByUserId: userId,
        updatedBy: userId,
        operationName: AUDIT_OPERATIONS.DELETE,
        operationId: id,
        operationValue: 'deleted',
      });

      return { success: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

