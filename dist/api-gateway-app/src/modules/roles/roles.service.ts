import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CreateRole, UpdateRole, RoleObject } from '@app/common/interfaces/role.interface';

@Injectable()
export class RolesService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createRole(data: ApiRequest<CreateRole>): Observable<RoleObject> {
    return this.client.send(USER_SERVICES_PATTERN.ROLES.CREATE, data).pipe(
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

  getRole(data: ApiRequest<number>): Observable<RoleObject> {
    return this.client.send(USER_SERVICES_PATTERN.ROLES.GET_ONE, data).pipe(
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

  getRolesByCompany(data: ApiRequest<number>): Observable<RoleObject[]> {
    return this.client
      .send(USER_SERVICES_PATTERN.ROLES.GET_BY_COMPANY, data)
      .pipe(
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

  updateRole(
    data: ApiRequest<{ id: number; data: UpdateRole }>,
  ): Observable<RoleObject> {
    return this.client.send(USER_SERVICES_PATTERN.ROLES.UPDATE, data).pipe(
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

  deleteRole(data: ApiRequest<number>): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.ROLES.DELETE, data).pipe(
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

