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
import { OnboardingCompanyService } from './onboarding-company.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  OnboardingCompanyCreate,
  OnboardingCompanyUpdate,
  OnboardingCompanyObject,
  OnboardingCompanyFilters,
} from '@app/common/interfaces/onboarding.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Controller('onboarding-company')
export class OnboardingCompanyController {
  constructor(private readonly onboardingCompanyService: OnboardingCompanyService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/create')
  createOnboardingCompany(
    @Body() companyData: OnboardingCompanyCreate,
    @Req() req: Request,
  ): Observable<OnboardingCompanyObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<OnboardingCompanyCreate> = {
      userId: userId,
      data: { ...companyData, userId },
    };
    return this.onboardingCompanyService.createOnboardingCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/all')
  getOnboardingCompanies(@Req() req: Request, @Query() query: any): Observable<PaginatedResponse<OnboardingCompanyObject>> {
    const userId: number = Number(req['user'].sub.toString());
    const { page, size, filters } = query;
    const data: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
      userId: userId,
      data: {
        page: Number(page) || 1,
        size: Number(size) || 10,
        filters: filters,
      },
    };
    return this.onboardingCompanyService.getOnboardingCompanies(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/user/:userId')
  getOnboardingCompaniesByUser(@Param('userId') userId: string, @Req() req: Request): Observable<OnboardingCompanyObject[]> {
    const currentUserId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: currentUserId,
      data: Number(userId),
    };
    return this.onboardingCompanyService.getOnboardingCompaniesByUser(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Patch('/v1/:id/approve')
  approveOnboardingCompany(
    @Param('id') id: string,
    @Body() approvalData: { isApproved: boolean },
    @Req() req: Request,
  ): Observable<OnboardingCompanyObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<{ id: number; isApproved: boolean }> = {
      userId: userId,
      data: {
        id: Number(id),
        isApproved: approvalData.isApproved,
      },
    };
    return this.onboardingCompanyService.approveOnboardingCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/:id')
  getOnboardingCompany(@Param('id') id: string, @Req() req: Request): Observable<OnboardingCompanyObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.onboardingCompanyService.getOnboardingCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Patch('/v1/:id')
  updateOnboardingCompany(
    @Param('id') id: string,
    @Body() companyData: OnboardingCompanyUpdate,
    @Req() req: Request,
  ): Observable<OnboardingCompanyObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<{ id: number; data: OnboardingCompanyUpdate }> = {
      userId: userId,
      data: {
        id: Number(id),
        data: companyData,
      },
    };
    return this.onboardingCompanyService.updateOnboardingCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/:id')
  deleteOnboardingCompany(
    @Param('id') id: string,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.onboardingCompanyService.deleteOnboardingCompany(data);
  }
}
