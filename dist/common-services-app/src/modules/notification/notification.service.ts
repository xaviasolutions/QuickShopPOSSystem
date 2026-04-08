import { Injectable, BadRequestException, Logger } from "@nestjs/common";
import { NotificationRepository } from "@app/database/repositories/notification.repository";
import { UserMapNotificationRepository } from "@app/database/repositories/user-map-notification.repository";
import { UsersRepository } from "@app/database/repositories/user.repository";
import type { ApproveBroadcast, CreateNotification, NotificationObject, CreateBroadcast, NotificationFilters, UserMapNotificationObject } from "@app/common/interfaces/notification.interface";
import { FcmService, EmailService } from "@app/common";
import { FindOptions, Op } from "sequelize";
import { ApiRequest } from "@app/common/interfaces/request.interface";
import type { Pagination, PaginatedResponse, FindAndCountAllOptions } from "@app/common/interfaces/pagination.interface";
import { User } from "@app/database/models/user.model";
import { Notification } from "@app/database/models/notifications.model";

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly userMapNotificationRepository: UserMapNotificationRepository,
        private readonly usersRepository: UsersRepository,
        private readonly fcmService: FcmService,
        private readonly emailService: EmailService,
    ) { }

    async createNotification(request: ApiRequest<CreateNotification>): Promise<NotificationObject> {
        try {
            if (!request.data) {
                throw new BadRequestException('NOTIFICATION_DATA_REQUIRED');
            }

            const data = request.data;
            const userId = request.userId ? Number(request.userId) : undefined;

            const notification = await this.notificationRepository.create({
                ...data,
                userType: data.userType || 'system',
                status: 'pending',
                isApproved: true,
                createdBy: userId,
            });

            if (data.userId) {
                await this.userMapNotificationRepository.create({
                    userId: data.userId,
                    notificationId: notification.id,
                    isRead: false,
                    isSent: false,
                    isDelivered: false,
                });
            }

            return notification;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getUserNotifications(request: ApiRequest<Pagination<NotificationFilters>>): Promise<PaginatedResponse<UserMapNotificationObject>> {
        try {
            const userId = Number(request.userId);
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;

            const notificationWhere: any = {};
            const options: any = {
                where: {
                    userId: userId,
                    isDeleted: false
                },
                include: [{
                    association: 'notification',
                    required: false
                }],
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };

            if (filters) {
                if (filters.search) {
                    notificationWhere[Op.or] = [
                        { title: { [Op.like]: `%${filters.search}%` } },
                        { message: { [Op.like]: `%${filters.search}%` } },
                    ];
                }

                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        notificationWhere.type = { [Op.like]: `%${filters.type}%` };
                    } else {
                        notificationWhere.type = { [Op.in]: filters.type };
                    }
                }

                if (filters.userType) {
                    if (typeof filters.userType === 'string') {
                        notificationWhere.userType = filters.userType;
                    } else {
                        notificationWhere.userType = { [Op.in]: filters.userType };
                    }
                }

                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        notificationWhere.status = filters.status;
                    } else {
                        notificationWhere.status = { [Op.in]: filters.status };
                    }
                }

                if (filters.operation) {
                    if (typeof filters.operation === 'string') {
                        notificationWhere.operation = filters.operation;
                    } else {
                        notificationWhere.operation = { [Op.in]: filters.operation };
                    }
                }

                if (typeof filters.isApproved === 'boolean') {
                    notificationWhere.isApproved = filters.isApproved;
                }

                if (typeof filters.isRead === 'boolean') {
                    options.where = {
                        ...options.where,
                        isRead: filters.isRead,
                    };
                }

                if (filters.bookingId) {
                    notificationWhere.bookingId = filters.bookingId;
                }

                if (filters.vendorId) {
                    notificationWhere.vendorId = filters.vendorId;
                }

                if (filters.dateFrom || filters.dateTo) {
                    notificationWhere.createdAt = {};
                    if (filters.dateFrom) {
                        notificationWhere.createdAt[Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        notificationWhere.createdAt[Op.lte] = new Date(filters.dateTo);
                    }
                }
            }

            if (Object.keys(notificationWhere).length > 0) {
                options.include[0].where = notificationWhere;
                options.include[0].required = true;
            }

            const responseData: FindAndCountAllOptions<UserMapNotificationObject> = await this.userMapNotificationRepository.findAndCountAll(options);

            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getUnreadNotifications(request: ApiRequest<void>): Promise<any[]> {
        try {
            const userId = Number(request.userId);

            return await this.userMapNotificationRepository.findAll({
                where: {
                    userId: userId,
                    isRead: false,
                    isDeleted: false
                },
                include: [{ association: 'notification' }],
                order: [['createdAt', 'DESC']],
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getUnreadCount(request: ApiRequest<void>): Promise<{ count: number }> {
        try {
            const userId = Number(request.userId);

            const count = await this.userMapNotificationRepository.count({
                where: {
                    userId: userId,
                    isRead: false,
                    isDeleted: false
                },
            });
            return { count };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async markAsRead(data: ApiRequest<number>): Promise<{ success: boolean }> {
        try {
            const notificationId = data.data;
            const userId = Number(data.userId);
            const userMapNotification = await this.userMapNotificationRepository.findOne({
                where: { notificationId, userId },
            });

            if (!userMapNotification) {
                throw new BadRequestException('NOTIFICATION_NOT_FOUND');
            }

            await userMapNotification.update({
                isRead: true,
                readAt: new Date(),
            });

            return { success: true };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async createAdminBroadcast(request: ApiRequest<CreateBroadcast>): Promise<NotificationObject> {
        try {
            if (!request.data) {
                throw new BadRequestException('BROADCAST_DATA_REQUIRED');
            }

            const data = request.data;
            const adminId = Number(request.userId);

            const users: User[] = await this.usersRepository.findAll();

            const notification: Notification = await this.notificationRepository.create({
                title: data.title,
                message: data.message,
                image: data.image,
                type: data.type,
                userType: 'admin',
                status: 'pending',
                isApproved: false,
                operation: 'admin_broadcast',
                numberOfUsers: users.length,
                createdBy: adminId,
            });

            const userMapData = users.map(user => ({
                userId: user.id,
                notificationId: notification.id,
                isRead: false,
                isSent: false,
                isDelivered: false,
            }));

            await this.userMapNotificationRepository.createBulk(userMapData);

            return notification;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async createVendorBroadcast(request: ApiRequest<CreateBroadcast>): Promise<NotificationObject> {
        try {
            if (!request.data) {
                throw new BadRequestException('BROADCAST_DATA_REQUIRED');
            }

            const data = request.data;
            const vendorId = Number(request.userId);

            const customers = data.userIds
                ? await this.usersRepository.findAll({ where: { id: { [Op.in]: data.userIds } } })
                : [];

            const notification = await this.notificationRepository.create({
                title: data.title,
                message: data.message,
                image: data.image,
                type: data.type,
                userType: 'vendor',
                status: 'pending',
                isApproved: false,
                operation: 'vendor_broadcast',
                vendorId: vendorId,
                numberOfUsers: customers.length,
                createdBy: vendorId,
            });

            const userMapData = customers.map(customer => ({
                userId: customer.id,
                notificationId: notification.id,
                isRead: false,
                isSent: false,
                isDelivered: false,
            }));

            await this.userMapNotificationRepository.createBulk(userMapData);

            return notification;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // Approve broadcast
    async approveBroadcast(request: ApiRequest<ApproveBroadcast>): Promise<{ success: boolean; message: string }> {
        try {
            if (!request.data) {
                throw new BadRequestException('BROADCAST_DATA_REQUIRED');
            }

            const data = request.data;

            const notification = await this.notificationRepository.findOne({
                where: { id: data.notificationId },
            });

            if (!notification) {
                throw new BadRequestException('NOTIFICATION_NOT_FOUND');
            }

            await notification.update({ isApproved: true });
            return { success: true, message: 'BROADCAST_APPROVED_SUCCESS' };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getVendorCustomersCount(request: ApiRequest<void>): Promise<{ count: number }> {
        try {
            const vendorId = Number(request.userId);

            // Adjust this query based on your bookings table structure
            // const count = await this.bookingRepository.count({
            //     where: { vendorId: vendorId },
            //     distinct: true,
            //     col: 'userId'
            // });
            const count = 0; // Placeholder
            return { count };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getVendorBroadcastHistory(request: ApiRequest<Pagination<NotificationFilters>>): Promise<PaginatedResponse<NotificationObject>> {
        try {
            const vendorId = Number(request.userId);
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;

            const options: FindOptions<Notification> = {
                where: {
                    vendorId: vendorId,
                    operation: 'vendor_broadcast'
                },
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };

            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [Op.or]: [
                            { title: { [Op.like]: `%${filters.search}%` } },
                            { message: { [Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }

                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        options.where = {
                            ...options.where,
                            type: { [Op.like]: `%${filters.type}%` },
                        };
                    } else {
                        options.where = {
                            ...options.where,
                            type: { [Op.in]: filters.type },
                        };
                    }
                }

                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        options.where = {
                            ...options.where,
                            status: filters.status,
                        };
                    } else {
                        options.where = {
                            ...options.where,
                            status: { [Op.in]: filters.status },
                        };
                    }
                }

                if (typeof filters.isApproved === 'boolean') {
                    options.where = {
                        ...options.where,
                        isApproved: filters.isApproved,
                    };
                }

                if (filters.dateFrom || filters.dateTo) {
                    const createdAt: any = {};
                    if (filters.dateFrom) {
                        createdAt[Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        createdAt[Op.lte] = new Date(filters.dateTo);
                    }
                    options.where = {
                        ...options.where,
                        createdAt: createdAt,
                    };
                }
            }

            const responseData: FindAndCountAllOptions<NotificationObject> = await this.notificationRepository.findAndCountAll(options);

            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getAdminBroadcastHistory(request: ApiRequest<Pagination<NotificationFilters>>): Promise<PaginatedResponse<NotificationObject>> {
        try {
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;

            const options: FindOptions<Notification> = {
                where: {
                    operation: 'admin_broadcast'
                },
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };

            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [Op.or]: [
                            { title: { [Op.like]: `%${filters.search}%` } },
                            { message: { [Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }

                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        options.where = {
                            ...options.where,
                            type: { [Op.like]: `%${filters.type}%` },
                        };
                    } else {
                        options.where = {
                            ...options.where,
                            type: { [Op.in]: filters.type },
                        };
                    }
                }

                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        options.where = {
                            ...options.where,
                            status: filters.status,
                        };
                    } else {
                        options.where = {
                            ...options.where,
                            status: { [Op.in]: filters.status },
                        };
                    }
                }

                if (typeof filters.isApproved === 'boolean') {
                    options.where = {
                        ...options.where,
                        isApproved: filters.isApproved,
                    };
                }

                if (filters.dateFrom || filters.dateTo) {
                    const createdAt: any = {};
                    if (filters.dateFrom) {
                        createdAt[Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        createdAt[Op.lte] = new Date(filters.dateTo);
                    }
                    options.where = {
                        ...options.where,
                        createdAt: createdAt,
                    };
                }
            }

            const responseData: FindAndCountAllOptions<NotificationObject> = await this.notificationRepository.findAndCountAll(options);

            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getVendorBroadcastRequests(request: ApiRequest<Pagination<NotificationFilters>>): Promise<PaginatedResponse<NotificationObject>> {
        try {
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;

            const options: FindOptions<Notification> = {
                where: {
                    operation: 'vendor_broadcast',
                    isApproved: false
                },
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };

            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [Op.or]: [
                            { title: { [Op.like]: `%${filters.search}%` } },
                            { message: { [Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }

                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        options.where = {
                            ...options.where,
                            type: { [Op.like]: `%${filters.type}%` },
                        };
                    } else {
                        options.where = {
                            ...options.where,
                            type: { [Op.in]: filters.type },
                        };
                    }
                }

                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        options.where = {
                            ...options.where,
                            status: filters.status,
                        };
                    } else {
                        options.where = {
                            ...options.where,
                            status: { [Op.in]: filters.status },
                        };
                    }
                }

                if (filters.vendorId) {
                    options.where = {
                        ...options.where,
                        vendorId: filters.vendorId,
                    };
                }

                if (filters.dateFrom || filters.dateTo) {
                    const createdAt: any = {};
                    if (filters.dateFrom) {
                        createdAt[Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        createdAt[Op.lte] = new Date(filters.dateTo);
                    }
                    options.where = {
                        ...options.where,
                        createdAt: createdAt,
                    };
                }
            }

            const responseData: FindAndCountAllOptions<NotificationObject> = await this.notificationRepository.findAndCountAll(options);

            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // Send pending notifications (called by cron)
    async sendPendingNotifications() {
        try {
            const notifications = await this.notificationRepository.findAll({
                where: {
                    status: 'pending',
                    userType: 'system',
                    isDelivered: false,
                },
                limit: 50,
            });

            for (const notification of notifications) {
                const userMaps = await this.userMapNotificationRepository.findAll({
                    where: { notificationId: notification.id, isSent: false },
                });

                for (const userMap of userMaps) {
                    await this.sendNotificationToUser(notification, userMap);
                }

                await notification.update({ status: 'sent', isDelivered: true });
            }

            this.logger.log(`Processed ${notifications.length} pending notifications`);
        } catch (error) {
            this.logger.error(`Failed to send pending notifications: ${error.message}`);
        }
    }

    // Send approved broadcasts (called by cron)
    async sendApprovedBroadcasts() {
        try {
            const notifications = await this.notificationRepository.findAll({
                where: {
                    isApproved: true,
                    status: 'pending',
                    operation: { [Op.in]: ['vendor_broadcast', 'admin_broadcast'] },
                },
                limit: 10,
            });

            for (const notification of notifications) {
                const userMaps = await this.userMapNotificationRepository.findAll({
                    where: { notificationId: notification.id, isSent: false },
                    limit: 25, // Batch of 25
                });

                for (const userMap of userMaps) {
                    await this.sendNotificationToUser(notification, userMap);
                }

                // Check if all sent
                const remainingCount = await this.userMapNotificationRepository.count({
                    where: { notificationId: notification.id, isSent: false },
                });

                if (remainingCount === 0) {
                    await notification.update({ status: 'sent', isDelivered: true });
                }
            }

            this.logger.log(`Processed ${notifications.length} approved broadcasts`);
        } catch (error) {
            this.logger.error(`Failed to send approved broadcasts: ${error.message}`);
        }
    }

    // Helper: Send notification to individual user
    private async sendNotificationToUser(notification: any, userMap: any) {
        try {
            // Get userId from userMap (handle both plain object and Sequelize instance)
            const userId = userMap.userId || userMap.dataValues?.userId;

            if (!userId) {
                this.logger.error(`userId not found in userMap`);
                return;
            }

            const user = await this.usersRepository.findOne({ where: { id: userId } });
            if (!user) {
                this.logger.warn(`User ${userId} not found`);
                return;
            }

            // Get user data (handle Sequelize instance)
            const userData = user.dataValues || user;
            const userEmail = userData.email || user.email;
            const userFcmToken = userData.fcmToken || user.fcmToken;

            this.logger.log(`User ${userId} data - Email: ${userEmail ? 'exists' : 'missing'}, FCM: ${userFcmToken ? 'exists' : 'missing'}`);

            // Get notification properties (handle Sequelize instance)
            const notificationData = notification.dataValues || notification;
            const notificationType = notificationData.type;
            const notificationTitle = notificationData.title;
            const notificationMessage = notificationData.message;
            const notificationId = notificationData.id;

            if (!notificationType) {
                this.logger.error(`Notification type is undefined for notification ${notificationId}`);
                return;
            }

            const types = notificationType.split(',').map((t: string) => t.trim());

            this.logger.log(`Processing notification types: ${types.join(', ')} for user ${userId}`);

            // Send push notification
            if (types.includes('push')) {
                if (userFcmToken) {
                    this.logger.log(`Sending push notification to user ${userId}`);
                    await this.fcmService.sendPushNotification(
                        userFcmToken,
                        notificationTitle,
                        notificationMessage,
                        { notificationId: notificationId }
                    );
                } else {
                    this.logger.warn(`User ${userId} has no FCM token, skipping push notification`);
                }
            }

            // Send email
            if (types.includes('email')) {
                if (userEmail) {
                    this.logger.log(`Sending email to ${userEmail}`);
                    const emailSent = await this.emailService.sendEmail(
                        userEmail,
                        notificationTitle,
                        `<p>${notificationMessage}</p>`
                    );
                    this.logger.log(`Email send result: ${emailSent ? 'Success' : 'Failed'}`);
                } else {
                    this.logger.warn(`User ${userId} has no email address, skipping email notification`);
                }
            }

            // Update UserMapNotification
            await userMap.update({
                isSent: true,
                isDelivered: true,
                sentAt: new Date(),
                deliveredAt: new Date(),
            });

            this.logger.log(`Notification sent to user ${userId}`);
        } catch (error) {
            this.logger.error(`Failed to send notification to user: ${error.message}`);
        }
    }


    async bulkCreateNotification(request: ApiRequest<CreateNotification[]>): Promise<any[]> {
        try {
            if (!request.data) {
                throw new BadRequestException('NOTIFICATIONS_DATA_REQUIRED');
            }

            const notifications = request.data;
            const userId = Number(request.userId);
            const createdNotifications: any[] = [];

            for (const notificationData of notifications) {
                const notification = await this.notificationRepository.create({
                    ...notificationData,
                    userType: notificationData.userType || 'system',
                    status: 'pending',
                    isApproved: true,
                    createdBy: userId,
                });

                if (notificationData.userId) {
                    await this.userMapNotificationRepository.create({
                        userId: notificationData.userId,
                        notificationId: notification.id,
                        isRead: false,
                        isSent: false,
                        isDelivered: false,
                    });
                }

                createdNotifications.push(notification);
            }

            return createdNotifications;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
