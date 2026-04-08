import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { COMMON_SERVICES_PATTERNS } from '@app/common/constants/patterns';
import { LeadsService } from './leads.service';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import type { CreateLead, LeadFilters, LeadObject, UpdateLead } from '@app/common/interfaces/leads.interface';

@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  @MessagePattern(COMMON_SERVICES_PATTERNS.LEADS.CREATE)
  async createLead(@Payload() data: Partial<CreateLead>): Promise<LeadObject> {
    try {
      return await this.leadsService.createLead(data);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_CREATED',
        status: error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(COMMON_SERVICES_PATTERNS.LEADS.GET_ONE)
  async getLead(@Payload() data: Partial<number>): Promise<LeadObject> {
    try {
      return await this.leadsService.getLeadById(data);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_FETCHED',
        status: error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(COMMON_SERVICES_PATTERNS.LEADS.GET_ALL)
  async getAllLeads(@Payload() data: Partial<Pagination<LeadFilters>>): Promise<PaginatedResponse<LeadObject>> {
    try {
      return await this.leadsService.getAllLeads(data);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_LEADS_CANNOT_BE_FETCHED',
        status: error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(COMMON_SERVICES_PATTERNS.LEADS.UPDATE)
  async updateLead(@Payload() request: ApiRequest<UpdateLead>): Promise<LeadObject> {
    try {
      return await this.leadsService.updateLead(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_UPDATED',
        status: error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(COMMON_SERVICES_PATTERNS.LEADS.DELETE)
  async deleteLead(@Payload() request: ApiRequest<number>): Promise<{ success: boolean }> {
    try {
      return await this.leadsService.deleteLead(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_DELETED',
        status: error.getStatus?.() || 400,
      });
    }
  }
}
