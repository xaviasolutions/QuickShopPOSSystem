import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import type { AssignRole, RemoveRole, GetRolesByCompanyUser, UserRoleObject } from '@app/common/interfaces/user-role.interface';

@Injectable()
export class UserRolesService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  assignRole(data: AssignRole): Observable<UserRoleObject> {
    return this.client.send(USER_SERVICES_PATTERN.USER_ROLES.ASSIGN, data).pipe(
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

  removeRole(data: RemoveRole): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.USER_ROLES.REMOVE, data).pipe(
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

  getRolesByCompanyUser(data: GetRolesByCompanyUser): Observable<UserRoleObject[]> {
    return this.client
      .send(USER_SERVICES_PATTERN.USER_ROLES.GET_BY_COMPANY_USER, data)
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

