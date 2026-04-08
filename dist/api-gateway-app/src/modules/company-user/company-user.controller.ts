import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompanyUserService } from './company-user.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CreateCompanyUserDto, RemoveCompanyUserDto } from '@app/common/dto/company-user.dto';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  CompanyUserCreate,
  CompanyUserObject,
  CompanyUserFilters,
  CompanyUserRemove,
} from '@app/common/interfaces/company-user.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Controller('company-user')
export class CompanyUserController {
  constructor(private readonly companyUserService: CompanyUserService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/create')
  createCompanyUser(
    @Body() companyUserData: CreateCompanyUserDto,
    @Req() req: Request,
  ): Observable<CompanyUserObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<CompanyUserCreate> = {
      userId: userId,
      data: companyUserData,
    };
    return this.companyUserService.createCompanyUser(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/all')
  getCompanyUsers(@Req() req: Request, @Query() query: any): Observable<PaginatedResponse<CompanyUserObject>> {
    const userId: number = Number(req['user'].sub.toString());
    const { page, size, filters } = query;
    const data: ApiRequest<Pagination<CompanyUserFilters>> = {
      userId: userId,
      data: {
        page: Number(page) || 1,
        size: Number(size) || 10,
        filters: filters,
      },
    };
    return this.companyUserService.getCompanyUsers(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/:id')
  getCompanyUser(@Param('id') id: string, @Req() req: Request): Observable<CompanyUserObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.companyUserService.getCompanyUser(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/by-company/:companyId')
  getByCompany(@Param('companyId') companyId: string, @Req() req: Request): Observable<CompanyUserObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(companyId),
    };
    return this.companyUserService.getByCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/by-user/:userId')
  getByUser(@Param('userId') userIdParam: string, @Req() req: Request): Observable<CompanyUserObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(userIdParam),
    };
    return this.companyUserService.getByUser(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/remove')
  removeCompanyUser(
    @Body() removeData: RemoveCompanyUserDto,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<CompanyUserRemove> = {
      userId: userId,
      data: removeData,
    };
    return this.companyUserService.removeCompanyUser(data);
  }
}
