import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompanyService } from './company.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CreateCompanyDto, UpdateCompanyDto } from '@app/common/dto/company.dto';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  CompanyCreate,
  CompanyUpdate,
  CompanyObject,
  CompanyFilters,
} from '@app/common/interfaces/company.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/create')
  createCompany(
    @Body() companyData: CreateCompanyDto,
    @Req() req: Request,
  ): Observable<CompanyObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<CompanyCreate> = {
      userId: userId,
      data: companyData,
    };
    return this.companyService.createCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/all')
  getCompanies(@Req() req: Request, @Query() query: any): Observable<PaginatedResponse<CompanyObject>> {
    const userId: number = Number(req['user'].sub.toString());
    const { page, size, filters } = query;
    const data: ApiRequest<Pagination<CompanyFilters>> = {
      userId: userId,
      data: {
        page: Number(page) || 1,
        size: Number(size) || 10,
        filters: filters,
      },
    };
    return this.companyService.getCompanies(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/:id')
  getCompany(@Param('id') id: string, @Req() req: Request): Observable<CompanyObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.companyService.getCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Patch('/v1/:id')
  updateCompany(
    @Param('id') id: string,
    @Body() companyData: UpdateCompanyDto,
    @Req() req: Request,
  ): Observable<CompanyObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<{ id: number; data: CompanyUpdate }> = {
      userId: userId,
      data: {
        id: Number(id),
        data: companyData,
      },
    };
    return this.companyService.updateCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/:id')
  deleteCompany(
    @Param('id') id: string,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.companyService.deleteCompany(data);
  }
}
