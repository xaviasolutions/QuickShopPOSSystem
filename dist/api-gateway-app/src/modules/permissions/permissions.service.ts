import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CreatePermission, UpdatePermission, PermissionObject } from '@app/common/interfaces/permission.interface';

@Injectable()
export class PermissionsService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createPermission(data: ApiRequest<CreatePermission>): Observable<PermissionObject> {
    return this.client.send(USER_SERVICES_PATTERN.PERMISSIONS.CREATE, data).pipe(
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

  getPermission(data: ApiRequest<number>): Observable<PermissionObject> {
    return this.client.send(USER_SERVICES_PATTERN.PERMISSIONS.GET_ONE, data).pipe(
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

  getPermissions(data: ApiRequest<void>): Observable<PermissionObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.PERMISSIONS.GET_ALL, data).pipe(
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

  updatePermission(
    data: ApiRequest<{ id: number; data: UpdatePermission }>,
  ): Observable<PermissionObject> {
    return this.client.send(USER_SERVICES_PATTERN.PERMISSIONS.UPDATE, data).pipe(
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

  deletePermission(data: ApiRequest<number>): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.PERMISSIONS.DELETE, data).pipe(
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

