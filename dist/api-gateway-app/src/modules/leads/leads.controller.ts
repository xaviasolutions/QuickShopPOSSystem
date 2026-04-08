import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import type { CreateLead, LeadFilters, LeadObject, UpdateLead } from '@app/common/interfaces/leads.interface';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  @Post('/v1/create')
  createLead(@Body() body: CreateLead): Observable<LeadObject> {
    return this.leadsService.createLead(body);
  }

  @Get('/v1/lead/:id')
  getLead(@Param('id') id: number): Observable<LeadObject> {
    return this.leadsService.getLeadById(id);
  }

  @Get('/v1/lead-all')
  getAllLeads(@Query() query: any): Observable<PaginatedResponse<LeadObject>> {
    const { page, size, filters } = query;
    const data: Partial<Pagination<LeadFilters>> = {
      page: Number(page) || 1,
      size: Number(size) || 10,
      filters: filters,
    };
    return this.leadsService.getAllLeads(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Patch('/v1/update/:id')
  updateLead(
    @Param('id') id: number,
    @Body() body: Partial<UpdateLead>,
    @Req() req: any,
  ): Observable<LeadObject> {
    const userId = Number(req.user.sub);
    const data: ApiRequest<UpdateLead> = {
      userId,
      data: { id: Number(id), ...body, userId },
    };
    return this.leadsService.updateLead(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/delete/:id')
  deleteLead(@Param('id') id: number, @Req() req: any): Observable<{ success: boolean }> {
    const userId = Number(req.user.sub);
    const data: ApiRequest<number> = {
      userId,
      data: Number(id),
    };
    return this.leadsService.deleteLead(data);
  }
}
