import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '@app/database/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '@app/database/models/user.model';
import { UserLogin, UserObject, ChangePassword, UserFilters } from '@app/common/interfaces/users.interfaces';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import { Pagination } from '@app/common/interfaces/pagination.interface';

// Mock bcrypt module
jest.mock('bcrypt');

describe('UsersService', () => {
    let service: UsersService;
    let usersRepository: UsersRepository;
    let jwtService: JwtService;
    let configService: ConfigService;

    const mockHashedPassword = '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNO';
    const testEmail = 'rana@mailinator.com';
    const testPassword = 'Abc123@@';

    const mockUser: Partial<User> = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: testEmail,
        password: mockHashedPassword,
        firstName: 'Rana',
        lastName: 'Test',
        phNumber: '+924001234567',
        token: 'mock-jwt-token',
        isVerified: false,
        userType: 'customer',
        isDeleted: false,
    };

    const mockUsersRepository = {
        create: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        findAndCountAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mock-jwt-token'),
        verify: jest.fn(),
    };

    const mockConfigService = {
        get: jest.fn().mockReturnValue('test-secret'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: mockUsersRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        usersRepository = module.get<UsersRepository>(UsersRepository);
        jwtService = module.get<JwtService>(JwtService);
        configService = module.get<ConfigService>(ConfigService);

        // Reset all mocks before each test
        jest.clearAllMocks();
        
        // Setup default bcrypt mocks
        (bcrypt.genSalt as jest.Mock).mockResolvedValue('mock-salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            const userData: Partial<User> = {
                email: testEmail,
                password: testPassword,
                firstName: 'Rana',
                lastName: 'Test',
            };

            mockUsersRepository.findOne.mockResolvedValue(null);
            mockUsersRepository.create.mockResolvedValue(mockUser);
            mockUsersRepository.update.mockResolvedValue(mockUser);

            const result = await service.createUser(userData);

            expect(result).toEqual({
                id: mockUser.id,
                email: mockUser.email,
            });
            expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
                where: { email: testEmail },
            });
            expect(mockUsersRepository.create).toHaveBeenCalled();
            expect(mockJwtService.sign).toHaveBeenCalled();
        });

        it('should throw BadRequestException if email is missing', async () => {
            const userData: Partial<User> = {
                password: testPassword,
            };

            await expect(service.createUser(userData)).rejects.toThrow(BadRequestException);
            await expect(service.createUser(userData)).rejects.toThrow('CREATE_USER_EMAIL_AND_PASSWORD_REQUIRED');
        });

        it('should throw BadRequestException if password is missing', async () => {
            const userData: Partial<User> = {
                email: testEmail,
            };

            await expect(service.createUser(userData)).rejects.toThrow(BadRequestException);
            await expect(service.createUser(userData)).rejects.toThrow('CREATE_USER_EMAIL_AND_PASSWORD_REQUIRED');
        });

        it('should throw BadRequestException if user already exists', async () => {
            const userData: Partial<User> = {
                email: testEmail,
                password: testPassword,
            };

            mockUsersRepository.findOne.mockResolvedValue(mockUser);

            await expect(service.createUser(userData)).rejects.toThrow(BadRequestException);
            await expect(service.createUser(userData)).rejects.toThrow('CREATE_USER_ALREADY_EXISTS');
        });


        it('should hash the password before saving', async () => {
            const userData: Partial<User> = {
                email: testEmail,
                password: testPassword,
                firstName: 'Rana',
            };

            mockUsersRepository.findOne.mockResolvedValue(null);
            mockUsersRepository.create.mockResolvedValue(mockUser);
            mockUsersRepository.update.mockResolvedValue(mockUser);

            await service.createUser(userData);

            const createCall = mockUsersRepository.create.mock.calls[0][0];
            expect(createCall.password).not.toBe(testPassword);
            expect(createCall.password).toBeDefined();
        });
    });

    describe('login', () => {
        it('should login user successfully with correct credentials', async () => {
            const loginData: UserLogin = {
                email: testEmail,
                password: testPassword,
            };

            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            mockUsersRepository.findOne.mockResolvedValue(mockUser);
            mockUsersRepository.update.mockResolvedValue(mockUser);

            const result = await service.login(loginData);

            expect(result).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                phNumber: mockUser.phNumber,
                token: 'mock-jwt-token',
            });
            expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
                where: { email: testEmail },
                raw: true,
            });
        });

        it('should throw BadRequestException if email is missing', async () => {
            const loginData: UserLogin = {
                email: '',
                password: testPassword,
            };

            await expect(service.login(loginData)).rejects.toThrow(BadRequestException);
            await expect(service.login(loginData)).rejects.toThrow('LOGIN_EMAIL_AND_PASSWORD_REQUIRED');
        });

        it('should throw BadRequestException if password is missing', async () => {
            const loginData: UserLogin = {
                email: testEmail,
                password: '',
            };

            await expect(service.login(loginData)).rejects.toThrow(BadRequestException);
            await expect(service.login(loginData)).rejects.toThrow('LOGIN_EMAIL_AND_PASSWORD_REQUIRED');
        });

        it('should throw UnauthorizedException if user not found', async () => {
            const loginData: UserLogin = {
                email: 'nonexistent@mailinator.com',
                password: testPassword,
            };

            mockUsersRepository.findOne.mockResolvedValue(null);

            await expect(service.login(loginData)).rejects.toThrow(UnauthorizedException);
            await expect(service.login(loginData)).rejects.toThrow('LOGIN_USER_NOT_FOUND');
        });

        it('should throw UnauthorizedException if password does not match', async () => {
            const loginData: UserLogin = {
                email: testEmail,
                password: 'WrongPassword123',
            };

            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            mockUsersRepository.findOne.mockResolvedValue(mockUser);

            await expect(service.login(loginData)).rejects.toThrow(UnauthorizedException);
            await expect(service.login(loginData)).rejects.toThrow('LOGIN_INVALID_EMAIL_OR_PASSWORD');
        });

        it('should generate and save JWT token on successful login', async () => {
            const loginData: UserLogin = {
                email: testEmail,
                password: testPassword,
            };

            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            mockUsersRepository.findOne.mockResolvedValue(mockUser);
            mockUsersRepository.update.mockResolvedValue(mockUser);

            await service.login(loginData);

            expect(mockJwtService.sign).toHaveBeenCalledWith(
                { sub: mockUser.id, email: mockUser.email },
                expect.objectContaining({
                    expiresIn: '2d',
                    secret: expect.any(String),
                })
            );
            expect(mockUsersRepository.update).toHaveBeenCalled();
        });
    });

    describe('getUserInfo', () => {
        it('should return user info successfully', async () => {
            const userId = mockUser.id;
            const expectedUser = {
                id: mockUser.id,
                email: mockUser.email,
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                phNumber: mockUser.phNumber,
            };

            mockUsersRepository.findOne.mockResolvedValue(expectedUser);

            const result = await service.getUserInfo(userId);

            expect(result).toEqual(expectedUser);
            expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
                where: { id: userId },
                attributes: ['id', 'email', 'firstName', 'lastName', 'phNumber'],
                raw: true,
            });
        });

        it('should throw BadRequestException if user not found', async () => {
            const userId = 'non-existent-id';

            mockUsersRepository.findOne.mockResolvedValue(null);

            await expect(service.getUserInfo(userId)).rejects.toThrow(BadRequestException);
            await expect(service.getUserInfo(userId)).rejects.toThrow('GET_USER_NOT_FOUND');
        });
    });

    describe('updateuser', () => {
        it('should update user successfully', async () => {
            const updateData: ApiRequest<UserObject> = {
                userId: mockUser.id,
                data: {
                    firstName: 'Updated',
                    lastName: 'Name',
                    phNumber: '+923009876543',
                },
            };

            mockUsersRepository.update.mockResolvedValue(mockUser);

            const result = await service.updateuser(updateData);

            expect(result).toEqual({
                id: mockUser.id,
                ...updateData.data,
            });
            expect(mockUsersRepository.update).toHaveBeenCalledWith(
                { where: { id: mockUser.id } },
                updateData.data
            );
        });

        it('should handle partial updates', async () => {
            const updateData: ApiRequest<UserObject> = {
                userId: mockUser.id,
                data: {
                    firstName: 'OnlyFirstName',
                },
            };

            mockUsersRepository.update.mockResolvedValue(mockUser);

            const result = await service.updateuser(updateData);

            expect(result).toEqual({
                id: mockUser.id,
                firstName: 'OnlyFirstName',
            });
        });
    });

    describe('changePassword', () => {
        it('should change password successfully', async () => {
            const changePasswordData: ApiRequest<ChangePassword> = {
                userId: mockUser.id,
                data: {
                    currentPassword: testPassword,
                    newPassword: 'NewPassword123@@',
                },
            };

            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            mockUsersRepository.findOne.mockResolvedValue(mockUser);
            mockUsersRepository.update.mockResolvedValue(mockUser);

            const result = await service.changePassword(changePasswordData);

            expect(result).toEqual({ id: mockUser.id });
            expect(mockUsersRepository.update).toHaveBeenCalled();
        });

        it('should throw BadRequestException if user not found', async () => {
            const changePasswordData: ApiRequest<ChangePassword> = {
                userId: 'non-existent-id',
                data: {
                    currentPassword: testPassword,
                    newPassword: 'NewPassword123@@',
                },
            };

            mockUsersRepository.findOne.mockResolvedValue(null);

            await expect(service.changePassword(changePasswordData)).rejects.toThrow(BadRequestException);
            await expect(service.changePassword(changePasswordData)).rejects.toThrow('CHANGE_PASSWORD_USER_NOT_FOUND');
        });

        it('should throw BadRequestException if current password does not match', async () => {
            const changePasswordData: ApiRequest<ChangePassword> = {
                userId: mockUser.id,
                data: {
                    currentPassword: 'WrongCurrentPassword',
                    newPassword: 'NewPassword123@@',
                },
            };

            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            mockUsersRepository.findOne.mockResolvedValue(mockUser);

            await expect(service.changePassword(changePasswordData)).rejects.toThrow(BadRequestException);
            await expect(service.changePassword(changePasswordData)).rejects.toThrow('CHANGE_PASSWORD_INVALID_CURRENT_PASSWORD');
        });

        it('should hash new password before saving', async () => {
            const changePasswordData: ApiRequest<ChangePassword> = {
                userId: mockUser.id,
                data: {
                    currentPassword: testPassword,
                    newPassword: 'NewPassword123@@',
                },
            };

            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            mockUsersRepository.findOne.mockResolvedValue(mockUser);
            mockUsersRepository.update.mockResolvedValue(mockUser);

            await service.changePassword(changePasswordData);

            const updateCall = mockUsersRepository.update.mock.calls[0][1];
            expect(updateCall.password).not.toBe('NewPassword123@@');
            expect(updateCall.password).toBeDefined();
        });
    });

    describe('getAllUsers', () => {
        const mockUsers = [
            {
                id: '1',
                email: 'user1@mailinator.com',
                firstName: 'User',
                lastName: 'One',
                phNumber: '+924001111111',
            },
            {
                id: '2',
                email: 'user2@mailinator.com',
                firstName: 'User',
                lastName: 'Two',
                phNumber: '+923002222222',
            },
        ];

        it('should return paginated users successfully', async () => {
            const requestData: ApiRequest<Pagination<UserFilters>> = {
                userId: mockUser.id,
                data: {
                    page: 1,
                    size: 10,
                    filters: {},
                },
            };

            mockUsersRepository.findAndCountAll.mockResolvedValue({
                rows: mockUsers,
                count: 2,
            });

            const result = await service.getAllUsers(requestData);

            expect(result).toEqual({
                data: mockUsers,
                page: 1,
                totalPages: 1,
                totalItems: 2,
            });
        });

        it('should apply search filter correctly', async () => {
            const requestData: ApiRequest<Pagination<UserFilters>> = {
                userId: mockUser.id,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        search: 'rana',
                    },
                },
            };

            mockUsersRepository.findAndCountAll.mockResolvedValue({
                rows: [mockUsers[0]],
                count: 1,
            });

            await service.getAllUsers(requestData);

            const callArgs = mockUsersRepository.findAndCountAll.mock.calls[0][0];
            expect(callArgs.where).toBeDefined();
            expect(callArgs.where[Symbol.for('or')]).toBeDefined();
            expect(Array.isArray(callArgs.where[Symbol.for('or')])).toBe(true);
        });

        it('should apply userType filter with single value', async () => {
            const requestData: ApiRequest<Pagination<UserFilters>> = {
                userId: mockUser.id,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        userType: 'customer',
                    },
                },
            };

            mockUsersRepository.findAndCountAll.mockResolvedValue({
                rows: mockUsers,
                count: 2,
            });

            await service.getAllUsers(requestData);

            expect(mockUsersRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        userType: 'customer',
                    }),
                })
            );
        });

        it('should apply userType filter with multiple values', async () => {
            const requestData: ApiRequest<Pagination<UserFilters>> = {
                userId: mockUser.id,
                data: {
                    page: 1,
                    size: 10,
                    filters: {
                        userType: ['customer', 'admin'],
                    },
                },
            };

            mockUsersRepository.findAndCountAll.mockResolvedValue({
                rows: mockUsers,
                count: 2,
            });

            await service.getAllUsers(requestData);

            expect(mockUsersRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        userType: expect.any(Object),
                    }),
                })
            );
        });

        it('should handle pagination correctly', async () => {
            const requestData: ApiRequest<Pagination<UserFilters>> = {
                userId: mockUser.id,
                data: {
                    page: 2,
                    size: 5,
                    filters: {},
                },
            };

            mockUsersRepository.findAndCountAll.mockResolvedValue({
                rows: mockUsers,
                count: 12,
            });

            const result = await service.getAllUsers(requestData);

            expect(result.page).toBe(2);
            expect(result.totalPages).toBe(3);
            expect(result.totalItems).toBe(12);
            expect(mockUsersRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    offset: 5,
                    limit: 5,
                })
            );
        });

        it('should use default pagination values if not provided', async () => {
            const requestData: ApiRequest<Pagination<UserFilters>> = {
                userId: mockUser.id,
                data: {
                    filters: {},
                },
            };

            mockUsersRepository.findAndCountAll.mockResolvedValue({
                rows: mockUsers,
                count: 2,
            });

            const result = await service.getAllUsers(requestData);

            expect(result.page).toBe(1);
            expect(mockUsersRepository.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    offset: 0,
                    limit: 10,
                })
            );
        });

        it('should return empty array if no users found', async () => {
            const requestData: ApiRequest<Pagination<UserFilters>> = {
                userId: mockUser.id,
                data: {
                    page: 1,
                    size: 10,
                    filters: {},
                },
            };

            mockUsersRepository.findAndCountAll.mockResolvedValue({
                rows: [],
                count: 0,
            });

            const result = await service.getAllUsers(requestData);

            expect(result.data).toEqual([]);
            expect(result.totalItems).toBe(0);
            expect(result.totalPages).toBe(0);
        });
    });
});