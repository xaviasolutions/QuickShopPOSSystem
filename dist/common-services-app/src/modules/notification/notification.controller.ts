import { Controller } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { COMMON_SERVICES_PATTERNS } from "@app/common/constants/patterns";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import type {
    CreateNotification,
    CreateBroadcast,
    ApproveBroadcast,
    NotificationFilters
} from "@app/common/interfaces/notification.interface";
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import type { ApiRequest } from "@app/common/interfaces/request.interface";

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_USER_NOTIFICATIONS)
    async getUserNotifications(@Payload() data: ApiRequest<Pagination<NotificationFilters>>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getUserNotifications(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_NOTIFICATIONS',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_UNREAD_NOTIFICATIONS)
    async getUnreadNotifications(@Payload() data: ApiRequest<void>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getUnreadNotifications(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_UNREAD_NOTIFICATIONS',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_UNREAD_COUNT)
    async getUnreadCount(@Payload() data: ApiRequest<void>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getUnreadCount(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_UNREAD_COUNT',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.MARK_AS_READ)
    async markAsRead(@Payload() data: ApiRequest<number>) {
        try {
            return await this.notificationService.markAsRead(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_MARK_AS_READ',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_ADMIN_BROADCAST)
    async createAdminBroadcast(@Payload() data: ApiRequest<CreateBroadcast>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_ADMIN_ID_REQUIRED',
                    status: 400,
                });
            }
            if (!data.data) {
                throw new RpcException({
                    message: 'CONTROLLER_BROADCAST_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.createAdminBroadcast(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_CREATE_ADMIN_BROADCAST',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.APPROVE_BROADCAST)
    async approveBroadcast(@Payload() data: ApiRequest<ApproveBroadcast>) {
        try {
            if (!data.data) {
                throw new RpcException({
                    message: 'CONTROLLER_BROADCAST_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.approveBroadcast(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_APPROVE_BROADCAST',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_BROADCAST_REQUESTS)
    async getVendorBroadcastRequests(@Payload() data: ApiRequest<Pagination<NotificationFilters>>) {
        try {
            return await this.notificationService.getVendorBroadcastRequests(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_VENDOR_BROADCAST_REQUESTS',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_ADMIN_BROADCAST_HISTORY)
    async getAdminBroadcastHistory(@Payload() data: ApiRequest<Pagination<NotificationFilters>>) {
        try {
            return await this.notificationService.getAdminBroadcastHistory(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_ADMIN_BROADCAST_HISTORY',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_VENDOR_BROADCAST)
    async createVendorBroadcast(@Payload() data: ApiRequest<CreateBroadcast>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_VENDOR_ID_REQUIRED',
                    status: 400,
                });
            }
            if (!data.data) {
                throw new RpcException({
                    message: 'CONTROLLER_BROADCAST_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.createVendorBroadcast(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_CREATE_VENDOR_BROADCAST',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_CUSTOMERS_COUNT)
    async getVendorCustomersCount(@Payload() data: ApiRequest<void>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_VENDOR_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getVendorCustomersCount(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_VENDOR_CUSTOMERS_COUNT',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_BROADCAST_HISTORY)
    async getVendorBroadcastHistory(@Payload() data: ApiRequest<Pagination<NotificationFilters>>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_VENDOR_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getVendorBroadcastHistory(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_VENDOR_BROADCAST_HISTORY',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_NOTIFICATION)
    async createNotification(@Payload() data: ApiRequest<CreateNotification>) {
        try {
            if (!data.data) {
                throw new RpcException({
                    message: 'CONTROLLER_NOTIFICATION_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.createNotification(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_CREATE_NOTIFICATION',
                status: error.getStatus?.() || 400,
            });
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.NOTIFICATION.BULK_CREATE_NOTIFICATION)
    async bulkCreateNotification(@Payload() data: ApiRequest<CreateNotification[]>) {
        try {
            if (!data.userId) {
                throw new RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            if (!data.data) {
                throw new RpcException({
                    message: 'CONTROLLER_NOTIFICATIONS_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.bulkCreateNotification(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_BULK_CREATE_NOTIFICATIONS',
                status: error.getStatus?.() || 400,
            });
        }
    }
}
