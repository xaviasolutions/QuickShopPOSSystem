import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import type {
    NotificationObject,
    NotificationFilters,
    UserMapNotificationObject
} from '@app/common/interfaces/notification.interface';
import { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Observable } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import { CreateBroadcastDto, ApproveBroadcastDto, CreateNotificationDto } from '@app/common/dto/notification.dto';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/user')
    getUserNotifications(@Req() req: any, @Query() query: any): Observable<PaginatedResponse<UserMapNotificationObject>> {
        const userId: number = Number(req['user'].sub.toString());
        const { page, size, filters } = query;
        const data: ApiRequest<Pagination<NotificationFilters>> = {
            userId: userId,
            data: {
                page: Number(page) || 1,
                size: Number(size) || 10,
                filters: filters
            }
        }
        return this.notificationService.getUserNotifications(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/user/unread')
    getUnreadNotifications(@Req() req: any): Observable<NotificationObject[]> {
        const userId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<null> = { userId, data: null };
        return this.notificationService.getUnreadNotifications(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/user/unread-count')
    getUnreadCount(@Req() req: any): Observable<{ count: number }> {
        const userId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<null> = { userId, data: null };
        return this.notificationService.getUnreadCount(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Patch('/v1/user/:id/read')
    markAsRead(@Param('id') id: number, @Req() req: any): Observable<NotificationObject> {
        const userId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<number> = {
            userId: userId,
            data: id
        }
        return this.notificationService.markAsRead(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Post('/v1/bulk-create')
    bulkCreateNotification(@Body() notifications: CreateNotificationDto[], @Req() req: any): Observable<NotificationObject[]> {
        const userId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<CreateNotificationDto[]> = {
            userId,
            data: notifications
        };
        return this.notificationService.bulkCreateNotification(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Post('/v1/admin/broadcast')
    createAdminBroadcast(@Body() body: CreateBroadcastDto, @Req() req: any): Observable<NotificationObject> {
        const adminId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<CreateBroadcastDto> = {
            userId: adminId,
            data: body
        };
        return this.notificationService.createAdminBroadcast(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Patch('/v1/admin/broadcast/approve')
    approveBroadcast(@Body() body: ApproveBroadcastDto, @Req() req: any): Observable<NotificationObject> {
        const userId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<ApproveBroadcastDto> = {
            userId,
            data: body
        };
        return this.notificationService.approveBroadcast(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/admin/vendor-broadcast-requests')
    getVendorBroadcastRequests(@Req() req: any, @Query() query: any): Observable<PaginatedResponse<NotificationObject>> {
        const userId: number = Number(req['user'].sub.toString());
        const { page, size, filters } = query;
        const data: ApiRequest<Pagination<NotificationFilters>> = {
            userId,
            data: {
                page: Number(page) || 1,
                size: Number(size) || 10,
                filters: filters
            }
        };
        return this.notificationService.getVendorBroadcastRequests(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/admin/broadcast-history')
    getAdminBroadcastHistory(@Req() req: any, @Query() query: any): Observable<PaginatedResponse<NotificationObject>> {
        const userId: number = Number(req['user'].sub.toString());
        const { page, size, filters } = query;
        const data: ApiRequest<Pagination<NotificationFilters>> = {
            userId,
            data: {
                page: Number(page) || 1,
                size: Number(size) || 10,
                filters: filters
            }
        };
        return this.notificationService.getAdminBroadcastHistory(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Post('/v1/vendor/broadcast')
    createVendorBroadcast(@Body() body: CreateBroadcastDto, @Req() req: any): Observable<NotificationObject> {
        const vendorId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<CreateBroadcastDto> = {
            userId: vendorId,
            data: body
        };
        return this.notificationService.createVendorBroadcast(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/vendor/customers-count')
    getVendorCustomersCount(@Req() req: any): Observable<{ count: number }> {
        const vendorId: number = Number(req['user'].sub.toString());
        const data: ApiRequest<null> = { userId: vendorId, data: null };
        return this.notificationService.getVendorCustomersCount(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/vendor/broadcast-history')
    getVendorBroadcastHistory(@Req() req: any, @Query() query: any): Observable<PaginatedResponse<NotificationObject>> {
        const vendorId: number = Number(req['user'].sub.toString());
        const { page, size, filters } = query;
        const data: ApiRequest<Pagination<NotificationFilters>> = {
            userId: vendorId,
            data: {
                page: Number(page) || 1,
                size: Number(size) || 10,
                filters: filters
            }
        };
        return this.notificationService.getVendorBroadcastHistory(data);
    }
}
