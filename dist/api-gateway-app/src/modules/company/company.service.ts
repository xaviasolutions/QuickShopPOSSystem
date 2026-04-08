import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CompanyCreate, CompanyUpdate, CompanyObject, CompanyFilters } from '@app/common/interfaces/company.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class CompanyService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createCompany(data: ApiRequest<CompanyCreate>): Observable<CompanyObject> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY.CREATE, data).pipe(
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

  getCompany(data: ApiRequest<number>): Observable<CompanyObject> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY.GET_ONE, data).pipe(
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

  getCompanies(data: ApiRequest<Pagination<CompanyFilters>>): Observable<PaginatedResponse<CompanyObject>> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY.GET_ALL, data).pipe(
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

  updateCompany(
    data: ApiRequest<{ id: number; data: CompanyUpdate }>,
  ): Observable<CompanyObject> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY.UPDATE, data).pipe(
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

  deleteCompany(data: ApiRequest<number>): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY.DELETE, data).pipe(
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

