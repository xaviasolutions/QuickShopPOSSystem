import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { COMMON_SERVICES_PATTERNS } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import type {
    CreateNotification,
    CreateBroadcast,
    ApproveBroadcast,
    NotificationObject,
    NotificationFilters,
    UserMapNotificationObject
} from '@app/common/interfaces/notification.interface';
import { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { ApiRequest } from '@app/common/interfaces/request.interface';

@Injectable()
export class NotificationService {
    constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) { }

    getUserNotifications(data: ApiRequest<Pagination<NotificationFilters>>): Observable<PaginatedResponse<UserMapNotificationObject>> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_USER_NOTIFICATIONS, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getUnreadNotifications(data: ApiRequest<null>): Observable<NotificationObject[]> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_UNREAD_NOTIFICATIONS, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getUnreadCount(data: ApiRequest<null>): Observable<{ count: number }> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_UNREAD_COUNT, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    markAsRead(data: ApiRequest<number>): Observable<NotificationObject> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.MARK_AS_READ, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    createAdminBroadcast(data: ApiRequest<CreateBroadcast>): Observable<NotificationObject> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_ADMIN_BROADCAST, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    approveBroadcast(data: ApiRequest<ApproveBroadcast>): Observable<NotificationObject> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.APPROVE_BROADCAST, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getVendorBroadcastRequests(data: ApiRequest<Pagination<NotificationFilters>>): Observable<PaginatedResponse<NotificationObject>> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_BROADCAST_REQUESTS, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getAdminBroadcastHistory(data: ApiRequest<Pagination<NotificationFilters>>): Observable<PaginatedResponse<NotificationObject>> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_ADMIN_BROADCAST_HISTORY, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    createVendorBroadcast(data: ApiRequest<CreateBroadcast>): Observable<NotificationObject> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_VENDOR_BROADCAST, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getVendorCustomersCount(data: ApiRequest<null>): Observable<{ count: number }> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_CUSTOMERS_COUNT, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getVendorBroadcastHistory(data: ApiRequest<Pagination<NotificationFilters>>): Observable<PaginatedResponse<NotificationObject>> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_BROADCAST_HISTORY, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    createNotification(data: ApiRequest<CreateNotification>): Observable<NotificationObject> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_NOTIFICATION, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    bulkCreateNotification(data: ApiRequest<CreateNotification[]>): Observable<NotificationObject[]> {
        return this.client.send(COMMON_SERVICES_PATTERNS.NOTIFICATION.BULK_CREATE_NOTIFICATION, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }
}

