import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { BadRequestException } from '@nestjs/common';
import { NotificationRepository } from '@app/database/repositories/notification.repository';
import { UserMapNotificationRepository } from '@app/database/repositories/user-map-notification.repository';
import { UsersRepository } from '@app/database/repositories/user.repository';
import { FcmService, EmailService } from '@app/common';
import {
    CreateNotification,
    CreateBroadcast,
    ApproveBroadcast,
    NotificationFilters,
} from '@app/common/interfaces/notification.interface';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import { Pagination } from '@app/common/interfaces/pagination.interface';

describe('NotificationService', () => {
    let service: NotificationService;
    let notificationRepository: NotificationRepository;
    let userMapNotificationRepository: UserMapNotificationRepository;
    let usersRepository: UsersRepository;
    let fcmService: FcmService;
    let emailService: EmailService;

    const testUserId = 1;
    const testEmail = 'rana@mailinator.com';

    const mockNotification = {
        id: 1,
        title: 'Test Notification',
        message: 'This is a test notification',
        type: 'push,email',
        userType: 'system',
        status: 'pending',
        isApproved: true,
        createdBy: testUserId,
    };

    const mockUser = {
        id: testUserId,
        email: testEmail,
        firstName: 'Rana',
        lastName: 'Test',
        fcmToken: 'mock-fcm-token',
        dataValues: {
            id: testUserId,
            email: testEmail,
            fcmToken: 'mock-fcm-token',
        },
    };

    const mockUserMapNotification = {
        id: 1,
        userId: testUserId,
        notificationId: 1,
        isRead: false,
        isSent: false,
        isDelivered: false,
    };

    const mockNotificationRepository = {
        create: jest.fn(),
        createBulk: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        findAndCountAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    const mockUserMapNotificationRepository = {
        create: jest.fn(),
        createBulk: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        findAndCountAll: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
    };

    const mockUsersRepository = {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findAndCountAll: jest.fn(),
    };

    const mockFcmService = {
        sendPushNotification: jest.fn().mockResolvedValue(true),
    };

    const mockEmailService = {
        sendEmail: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotificationService,
                {
                    provide: NotificationRepository,
                    useValue: mockNotificationRepository,
                },
                {
                    provide: UserMapNotificationRepository,
                    useValue: mockUserMapNotificationRepository,
                },
                {
                    provide: UsersRepository,
                    useValue: mockUsersRepository,
                },
                {
                    provide: FcmService,
                    useValue: mockFcmService,
                },
                {
                    provide: EmailService,
                    useValue: mockEmailService,
                },
            ],
        }).compile();

        service = module.get<NotificationService>(NotificationService);
        notificationRepository = module.get<NotificationRepository>(NotificationRepository);
        userMapNotificationRepository = module.get<UserMapNotificationRepository>(
            UserMapNotificationRepository
        );
        usersRepository = module.get<UsersRepository>(UsersRepository);
        fcmService = module.get<FcmService>(FcmService);
        emailService = module.get<EmailService>(EmailService);

        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    describe('createNotification', () => {

        it('should create a notification successfully', async () => {
            const notificationData: CreateNotification = {
                userId: testUserId,
                title: 'Test Notification',
                message: 'Test message',
                type: 'push',
            };

            const request: ApiRequest<CreateNotification> = {
                userId: testUserId,
                data: notificationData,
            };

            mockNotificationRepository.create.mockResolvedValue(mockNotification);
            mockUserMapNotificationRepository.create.mockResolvedValue(mockUserMapNotification);

            const result = await service.createNotification(request);

            expect(result).toEqual(mockNotification);
            expect(mockNotificationRepository.create).toHaveBeenCalledWith({
                ...notificationData,
                userType: 'system',
                status: 'pending',
                isApproved: true,
                createdBy: testUserId,
            });
            expect(mockUserMapNotificationRepository.create).toHaveBeenCalledWith({
                userId: testUserId,
                notificationId: mockNotification.id,
                isRead: false,
                isSent: false,
                isDelivered: false,
            });
        });

        it('should throw BadRequestException if notification data is missing', async () => {
            const request: ApiRequest<CreateNotification> = {
                userId: testUserId,
                data: null as any,
            };

            await expect(service.createNotification(request)).rejects.toThrow(BadRequestException);
            await expect(service.createNotification(request)).rejects.toThrow('NOTIFICATION_DATA_REQUIRED');
        });

        it('should create notification without userId', async () => {
            const notificationData: CreateNotification = {
                title: 'Broadcast Notification',
                message: 'Test broadcast',
                type: 'push',
            };

            const request: ApiRequest<CreateNotification> = {
                userId: testUserId,
                data: notificationData,
            };

            mockNotificationRepository.create.mockResolvedValue(mockNotification);

            await service.createNotification(request);

            expect(mockNotificationRepository.create).toHaveBeenCalled();
            expect(mockUserMapNotificationRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('getUserNotifications', () => {
        it('should return paginated user notifications', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {},
                },
            };

            const mockResponse = {
                rows: [mockUserMapNotification],
                count: 1,
            };

            mockUserMapNotificationRepository.findAndCountAll.mockResolvedValue(mockResponse);

            const result = await service.getUserNotifications(request);

            expect(result).toEqual({
                data: mockResponse.rows,
                page: 1,
                totalPages: 1,
                totalItems: 1,
            });
        });

        it('should apply search filter correctly', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        search: 'test',
                    },
                },
            };

            mockUserMapNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockUserMapNotification],
                count: 1,
            });

            await service.getUserNotifications(request);

            const callArgs = mockUserMapNotificationRepository.findAndCountAll.mock.calls[0][0];
            expect(callArgs.where).toBeDefined();
            expect(callArgs.include).toBeDefined();
        });

        it('should apply type filter with single value', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        type: 'push',
                    },
                },
            };

            mockUserMapNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockUserMapNotification],
                count: 1,
            });

            await service.getUserNotifications(request);

            expect(mockUserMapNotificationRepository.findAndCountAll).toHaveBeenCalled();
        });

        it('should apply isRead filter', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        isRead: false,
                    },
                },
            };

            mockUserMapNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockUserMapNotification],
                count: 1,
            });

            await service.getUserNotifications(request);

            const callArgs = mockUserMapNotificationRepository.findAndCountAll.mock.calls[0][0];
            expect(callArgs.where.isRead).toBe(false);
        });

        it('should handle pagination correctly', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 2,
                    size: 5,
                    filters: {},
                },
            };

            mockUserMapNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockUserMapNotification],
                count: 12,
            });

            const result = await service.getUserNotifications(request);

            expect(result.page).toBe(2);
            expect(result.totalPages).toBe(3);
            expect(result.totalItems).toBe(12);
            expect(mockUserMapNotificationRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    offset: 5,
                    limit: 5,
                })
            );
        });

        it('should use default pagination values if not provided', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    filters: {},
                },
            };

            mockUserMapNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockUserMapNotification],
                count: 1,
            });

            const result = await service.getUserNotifications(request);

            expect(result.page).toBe(1);
            expect(mockUserMapNotificationRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    offset: 0,
                    limit: 10,
                })
            );
        });

        it('should return empty array if no notifications found', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {},
                },
            };

            mockUserMapNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [],
                count: 0,
            });

            const result = await service.getUserNotifications(request);

            expect(result.data).toEqual([]);
            expect(result.totalItems).toBe(0);
            expect(result.totalPages).toBe(0);
        });
    });

    describe('getUnreadNotifications', () => {
        it('should return unread notifications for user', async () => {
            const request: ApiRequest<void> = {
                userId: testUserId,
                data: undefined,
            };

            const mockUnreadNotifications = [mockUserMapNotification];
            mockUserMapNotificationRepository.findAll.mockResolvedValue(mockUnreadNotifications);

            const result = await service.getUnreadNotifications(request);

            expect(result).toEqual(mockUnreadNotifications);
            expect(mockUserMapNotificationRepository.findAll).toHaveBeenCalledWith({
                where: {
                    userId: testUserId,
                    isRead: false,
                    isDeleted: false,
                },
                include: [{ association: 'notification' }],
                order: [['createdAt', 'DESC']],
            });
        });
    });

    describe('getUnreadCount', () => {
        it('should return unread count for user', async () => {
            const request: ApiRequest<void> = {
                userId: testUserId,
                data: undefined,
            };

            mockUserMapNotificationRepository.count.mockResolvedValue(5);

            const result = await service.getUnreadCount(request);

            expect(result).toEqual({ count: 5 });
            expect(mockUserMapNotificationRepository.count).toHaveBeenCalledWith({
                where: {
                    userId: testUserId,
                    isRead: false,
                    isDeleted: false,
                },
            });
        });
    });

    describe('markAsRead', () => {
        it('should mark notification as read successfully', async () => {
            const request: ApiRequest<number> = {
                userId: testUserId,
                data: 1,
            };

            const mockUserMap = {
                ...mockUserMapNotification,
                update: jest.fn().mockResolvedValue(true),
            };

            mockUserMapNotificationRepository.findOne.mockResolvedValue(mockUserMap);

            const result = await service.markAsRead(request);

            expect(result).toEqual({ success: true });
            expect(mockUserMap.update).toHaveBeenCalledWith({
                isRead: true,
                readAt: expect.any(Date),
            });
        });

        it('should throw BadRequestException if notification not found', async () => {
            const request: ApiRequest<number> = {
                userId: testUserId,
                data: 999,
            };

            mockUserMapNotificationRepository.findOne.mockResolvedValue(null);

            await expect(service.markAsRead(request)).rejects.toThrow(BadRequestException);
            await expect(service.markAsRead(request)).rejects.toThrow('NOTIFICATION_NOT_FOUND');
        });
    });

    describe('createAdminBroadcast', () => {
        it('should create admin broadcast successfully', async () => {
            const broadcastData: CreateBroadcast = {
                title: 'Admin Broadcast',
                message: 'Important announcement',
                type: 'push,email',
            };

            const request: ApiRequest<CreateBroadcast> = {
                userId: testUserId,
                data: broadcastData,
            };

            const mockUsers = [mockUser, { ...mockUser, id: 2 }];
            mockUsersRepository.findAll.mockResolvedValue(mockUsers);
            mockNotificationRepository.create.mockResolvedValue(mockNotification);
            mockUserMapNotificationRepository.createBulk.mockResolvedValue([]);

            const result = await service.createAdminBroadcast(request);

            expect(result).toEqual(mockNotification);
            expect(mockNotificationRepository.create).toHaveBeenCalledWith({
                title: broadcastData.title,
                message: broadcastData.message,
                image: broadcastData.image,
                type: broadcastData.type,
                userType: 'admin',
                status: 'pending',
                isApproved: false,
                operation: 'admin_broadcast',
                numberOfUsers: mockUsers.length,
                createdBy: testUserId,
            });
            expect(mockUserMapNotificationRepository.createBulk).toHaveBeenCalled();
        });

        it('should throw BadRequestException if broadcast data is missing', async () => {
            const request: ApiRequest<CreateBroadcast> = {
                userId: testUserId,
                data: null as any,
            };

            await expect(service.createAdminBroadcast(request)).rejects.toThrow(BadRequestException);
            await expect(service.createAdminBroadcast(request)).rejects.toThrow('BROADCAST_DATA_REQUIRED');
        });

        it('should create user map entries for all users', async () => {
            const broadcastData: CreateBroadcast = {
                title: 'Admin Broadcast',
                message: 'Important announcement',
                type: 'push,email',
            };

            const request: ApiRequest<CreateBroadcast> = {
                userId: testUserId,
                data: broadcastData,
            };

            const mockUsers = [mockUser, { ...mockUser, id: 2 }, { ...mockUser, id: 3 }];
            mockUsersRepository.findAll.mockResolvedValue(mockUsers);
            mockNotificationRepository.create.mockResolvedValue(mockNotification);
            mockUserMapNotificationRepository.createBulk.mockResolvedValue([]);

            await service.createAdminBroadcast(request);

            expect(mockUserMapNotificationRepository.createBulk).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        userId: expect.any(Number),
                        notificationId: mockNotification.id,
                        isRead: false,
                        isSent: false,
                        isDelivered: false,
                    }),
                ])
            );
        });
    });

    describe('createVendorBroadcast', () => {
        it('should create vendor broadcast successfully', async () => {
            const broadcastData: CreateBroadcast = {
                title: 'Vendor Broadcast',
                message: 'Special offer',
                type: 'push',
                userIds: [1, 2, 3],
            };

            const request: ApiRequest<CreateBroadcast> = {
                userId: testUserId,
                data: broadcastData,
            };

            const mockCustomers = [mockUser, { ...mockUser, id: 2 }];
            mockUsersRepository.findAll.mockResolvedValue(mockCustomers);
            mockNotificationRepository.create.mockResolvedValue(mockNotification);
            mockUserMapNotificationRepository.createBulk.mockResolvedValue([]);

            const result = await service.createVendorBroadcast(request);

            expect(result).toEqual(mockNotification);
            expect(mockNotificationRepository.create).toHaveBeenCalledWith({
                title: broadcastData.title,
                message: broadcastData.message,
                image: broadcastData.image,
                type: broadcastData.type,
                userType: 'vendor',
                status: 'pending',
                isApproved: false,
                operation: 'vendor_broadcast',
                vendorId: testUserId,
                numberOfUsers: mockCustomers.length,
                createdBy: testUserId,
            });
        });

        it('should create vendor broadcast with empty userIds', async () => {
            const broadcastData: CreateBroadcast = {
                title: 'Vendor Broadcast',
                message: 'Special offer',
                type: 'push',
            };

            const request: ApiRequest<CreateBroadcast> = {
                userId: testUserId,
                data: broadcastData,
            };

            mockNotificationRepository.create.mockResolvedValue(mockNotification);
            mockUserMapNotificationRepository.createBulk.mockResolvedValue([]);

            await service.createVendorBroadcast(request);

            expect(mockUsersRepository.findAll).not.toHaveBeenCalled();
        });

        it('should throw BadRequestException if broadcast data is missing', async () => {
            const request: ApiRequest<CreateBroadcast> = {
                userId: testUserId,
                data: null as any,
            };

            await expect(service.createVendorBroadcast(request)).rejects.toThrow(BadRequestException);
            await expect(service.createVendorBroadcast(request)).rejects.toThrow('BROADCAST_DATA_REQUIRED');
        });
    });

    describe('approveBroadcast', () => {
        it('should approve broadcast successfully', async () => {
            const approveData: ApproveBroadcast = {
                notificationId: 1,
            };

            const request: ApiRequest<ApproveBroadcast> = {
                userId: testUserId,
                data: approveData,
            };

            const mockNotif = {
                ...mockNotification,
                update: jest.fn().mockResolvedValue(true),
            };

            mockNotificationRepository.findOne.mockResolvedValue(mockNotif);

            const result = await service.approveBroadcast(request);

            expect(result).toEqual({ success: true, message: 'BROADCAST_APPROVED_SUCCESS' });
            expect(mockNotif.update).toHaveBeenCalledWith({ isApproved: true });
        });

        it('should throw BadRequestException if notification not found', async () => {
            const approveData: ApproveBroadcast = {
                notificationId: 999,
            };

            const request: ApiRequest<ApproveBroadcast> = {
                userId: testUserId,
                data: approveData,
            };

            mockNotificationRepository.findOne.mockResolvedValue(null);

            await expect(service.approveBroadcast(request)).rejects.toThrow(BadRequestException);
            await expect(service.approveBroadcast(request)).rejects.toThrow('NOTIFICATION_NOT_FOUND');
        });

        it('should throw BadRequestException if broadcast data is missing', async () => {
            const request: ApiRequest<ApproveBroadcast> = {
                userId: testUserId,
                data: null as any,
            };

            await expect(service.approveBroadcast(request)).rejects.toThrow(BadRequestException);
            await expect(service.approveBroadcast(request)).rejects.toThrow('BROADCAST_DATA_REQUIRED');
        });
    });

    describe('getVendorCustomersCount', () => {
        it('should return vendor customers count', async () => {
            const request: ApiRequest<void> = {
                userId: testUserId,
                data: undefined,
            };

            const result = await service.getVendorCustomersCount(request);

            expect(result).toEqual({ count: 0 });
        });
    });

    describe('getVendorBroadcastHistory', () => {
        it('should return paginated vendor broadcast history', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {},
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockNotification],
                count: 1,
            });

            const result = await service.getVendorBroadcastHistory(request);

            expect(result).toEqual({
                data: [mockNotification],
                page: 1,
                totalPages: 1,
                totalItems: 1,
            });
        });

        it('should apply filters correctly', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        search: 'test',
                        type: 'push',
                        status: 'sent',
                        isApproved: true,
                    },
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockNotification],
                count: 1,
            });

            await service.getVendorBroadcastHistory(request);

            const callArgs = mockNotificationRepository.findAndCountAll.mock.calls[0][0];
            expect(callArgs.where).toBeDefined();
            expect(callArgs.where.vendorId).toBe(testUserId);
        });

        it('should handle pagination correctly', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 2,
                    size: 5,
                    filters: {},
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockNotification],
                count: 12,
            });

            const result = await service.getVendorBroadcastHistory(request);

            expect(result.page).toBe(2);
            expect(result.totalPages).toBe(3);
            expect(result.totalItems).toBe(12);
            expect(mockNotificationRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    offset: 5,
                    limit: 5,
                })
            );
        });
    });

    describe('getAdminBroadcastHistory', () => {
        it('should return paginated admin broadcast history', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {},
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockNotification],
                count: 1,
            });

            const result = await service.getAdminBroadcastHistory(request);

            expect(result).toEqual({
                data: [mockNotification],
                page: 1,
                totalPages: 1,
                totalItems: 1,
            });
        });

        it('should apply filters correctly', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        search: 'announcement',
                        type: 'email',
                        status: 'sent',
                    },
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockNotification],
                count: 1,
            });

            await service.getAdminBroadcastHistory(request);

            const callArgs = mockNotificationRepository.findAndCountAll.mock.calls[0][0];
            expect(callArgs.where).toBeDefined();
            expect(callArgs.where.operation).toBe('admin_broadcast');
        });

        it('should use default pagination values if not provided', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    filters: {},
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockNotification],
                count: 1,
            });

            const result = await service.getAdminBroadcastHistory(request);

            expect(result.page).toBe(1);
            expect(mockNotificationRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    offset: 0,
                    limit: 10,
                })
            );
        });
    });

    describe('getVendorBroadcastRequests', () => {
        it('should return paginated vendor broadcast requests', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {},
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [mockNotification],
                count: 1,
            });

            const result = await service.getVendorBroadcastRequests(request);

            expect(result).toEqual({
                data: [mockNotification],
                page: 1,
                totalPages: 1,
                totalItems: 1,
            });
        });

        it('should filter by vendorId', async () => {
            const request: ApiRequest<Pagination<NotificationFilters>> = {
                userId: testUserId,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        vendorId: 5,
                    },
                },
            };

            mockNotificationRepository.findAndCountAll.mockResolvedValue({
                rows: [],
                count: 0,
            });

            await service.getVendorBroadcastRequests(request);

            expect(mockNotificationRepository.findAndCountAll).toHaveBeenCalled();
        });
    });

    describe('bulkCreateNotification', () => {
        it('should bulk create notifications successfully', async () => {
            const notificationsData: CreateNotification[] = [
                {
                    userId: 1,
                    title: 'Notification 1',
                    message: 'Message 1',
                    type: 'push',
                },
                {
                    userId: 2,
                    title: 'Notification 2',
                    message: 'Message 2',
                    type: 'email',
                },
            ];

            const request: ApiRequest<CreateNotification[]> = {
                userId: testUserId,
                data: notificationsData,
            };

            mockNotificationRepository.create.mockResolvedValue(mockNotification);
            mockUserMapNotificationRepository.create.mockResolvedValue(mockUserMapNotification);

            const result = await service.bulkCreateNotification(request);

            expect(result).toHaveLength(2);
            expect(mockNotificationRepository.create).toHaveBeenCalledTimes(2);
            expect(mockUserMapNotificationRepository.create).toHaveBeenCalledTimes(2);
        });

        it('should throw BadRequestException if notifications data is missing', async () => {
            const request: ApiRequest<CreateNotification[]> = {
                userId: testUserId,
                data: null as any,
            };

            await expect(service.bulkCreateNotification(request)).rejects.toThrow(
                BadRequestException
            );
            await expect(service.bulkCreateNotification(request)).rejects.toThrow(
                'NOTIFICATIONS_DATA_REQUIRED'
            );
        });
    });
});
