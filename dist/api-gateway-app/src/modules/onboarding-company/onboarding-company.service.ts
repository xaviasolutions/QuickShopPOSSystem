import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingCompanyCreate, OnboardingCompanyUpdate, OnboardingCompanyObject, OnboardingCompanyFilters } from '@app/common/interfaces/onboarding.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class OnboardingCompanyService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createOnboardingCompany(data: ApiRequest<OnboardingCompanyCreate>): Observable<OnboardingCompanyObject> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.CREATE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  getOnboardingCompany(data: ApiRequest<number>): Observable<OnboardingCompanyObject> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.GET_ONE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  getOnboardingCompanies(data: ApiRequest<Pagination<OnboardingCompanyFilters>>): Observable<PaginatedResponse<OnboardingCompanyObject>> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.GET_ALL, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  getOnboardingCompaniesByUser(data: ApiRequest<number>): Observable<OnboardingCompanyObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.GET_BY_USER, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  approveOnboardingCompany(data: ApiRequest<{ id: number; isApproved: boolean }>): Observable<OnboardingCompanyObject> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.APPROVE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  updateOnboardingCompany(
    data: ApiRequest<{ id: number; data: OnboardingCompanyUpdate }>,
  ): Observable<OnboardingCompanyObject> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.UPDATE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  deleteOnboardingCompany(data: ApiRequest<number>): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_COMPANY.DELETE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
