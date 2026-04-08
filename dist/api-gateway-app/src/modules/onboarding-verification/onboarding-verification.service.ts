import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingVerificationCreate, OnboardingVerificationUpdate, OnboardingVerificationObject } from '@app/common/interfaces/onboarding.interface';

@Injectable()
export class OnboardingVerificationService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createVerification(data: ApiRequest<OnboardingVerificationCreate>): Observable<OnboardingVerificationObject> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.CREATE, data).pipe(
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

  bulkCreateVerifications(data: ApiRequest<OnboardingVerificationCreate[]>): Observable<OnboardingVerificationObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.BULK_CREATE, data).pipe(
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

  getVerificationsByOnboarding(data: ApiRequest<number>): Observable<OnboardingVerificationObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.GET_BY_ONBOARDING, data).pipe(
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

  updateVerification(
    data: ApiRequest<{ id: number; data: OnboardingVerificationUpdate }>,
  ): Observable<OnboardingVerificationObject> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.UPDATE, data).pipe(
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

  deleteVerification(data: ApiRequest<number>): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_VERIFICATION.DELETE, data).pipe(
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
