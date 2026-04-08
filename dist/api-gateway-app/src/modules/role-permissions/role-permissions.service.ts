import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  AssignRolePermission,
  RemoveRolePermission,
  RolePermissionObject,
} from '@app/common/interfaces/role-permission.interface';

@Injectable()
export class RolePermissionsService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  assignPermission(
    data: ApiRequest<AssignRolePermission>,
  ): Observable<RolePermissionObject[]> {
    return this.client
      .send(USER_SERVICES_PATTERN.ROLE_PERMISSIONS.ASSIGN, data.data)
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

  removePermission(
    data: ApiRequest<RemoveRolePermission>,
  ): Observable<boolean> {
    return this.client
      .send(USER_SERVICES_PATTERN.ROLE_PERMISSIONS.REMOVE, data.data)
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

  getPermissionsByRole(data: ApiRequest<number>): Observable<RolePermissionObject[]> {
    return this.client
      .send(USER_SERVICES_PATTERN.ROLE_PERMISSIONS.GET_BY_ROLE, data.data)
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
}

