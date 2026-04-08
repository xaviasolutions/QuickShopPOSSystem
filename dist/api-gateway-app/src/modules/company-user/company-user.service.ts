import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  CompanyUserCreate,
  CompanyUserObject,
  CompanyUserFilters,
  CompanyUserRemove,
} from '@app/common/interfaces/company-user.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class CompanyUserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createCompanyUser(data: ApiRequest<CompanyUserCreate>): Observable<CompanyUserObject> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY_USER.CREATE, data).pipe(
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

  getCompanyUser(data: ApiRequest<number>): Observable<CompanyUserObject> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY_USER.GET_ONE, data).pipe(
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

  getCompanyUsers(data: ApiRequest<Pagination<CompanyUserFilters>>): Observable<PaginatedResponse<CompanyUserObject>> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY_USER.GET_ALL, data).pipe(
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

  getByCompany(data: ApiRequest<number>): Observable<CompanyUserObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY_USER.GET_BY_COMPANY, data).pipe(
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

  getByUser(data: ApiRequest<number>): Observable<CompanyUserObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY_USER.GET_BY_USER, data).pipe(
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

  removeCompanyUser(data: ApiRequest<CompanyUserRemove>): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.COMPANY_USER.REMOVE, data).pipe(
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

