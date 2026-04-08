import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingAttachmentCreate, OnboardingAttachmentObject } from '@app/common/interfaces/onboarding.interface';

@Injectable()
export class OnboardingAttachmentService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createAttachment(data: ApiRequest<OnboardingAttachmentCreate>): Observable<OnboardingAttachmentObject> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.CREATE, data).pipe(
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

  bulkCreateAttachments(data: ApiRequest<OnboardingAttachmentCreate[]>): Observable<OnboardingAttachmentObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.BULK_CREATE, data).pipe(
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

  getAttachmentsByOnboarding(data: ApiRequest<number>): Observable<OnboardingAttachmentObject[]> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.GET_BY_ONBOARDING, data).pipe(
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

  deleteAttachment(data: ApiRequest<number>): Observable<boolean> {
    return this.client.send(USER_SERVICES_PATTERN.ONBOARDING_ATTACHMENT.DELETE, data).pipe(
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
