import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { User } from '@app/database/models/user.model';
import type {AdminLogin, OnboardUserObject, UserFilters, UserLogin, UserObject } from '@app/common/interfaces/users.interfaces';
import { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import type { ApiRequest } from '@app/common/interfaces/request.interface';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @MessagePattern(USER_SERVICES_PATTERN.USER.CREATE_USER)
    async createUser(@Payload() data: Partial<User>): Promise<Partial<User>> {
        try {
            return await this.userService.createUser(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_USER_CANNOT_BE_CREATED',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(USER_SERVICES_PATTERN.USER.LOGIN_USER)
    async loginUser(@Payload() data: UserLogin): Promise<Partial<User>> {
        try {
            return await this.userService.login(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_USER_CANNOT_BE_LOGGED_IN',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(USER_SERVICES_PATTERN.USER.LOGIN_ADMIN)
    async loginAdmin(@Payload() data: AdminLogin): Promise<Partial<User>> {
        try {
            return await this.userService.loginAdmin(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_USER_CANNOT_BE_LOGGED_IN',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(USER_SERVICES_PATTERN.USER.GET_USER_INFO)
    async getUserInfo(@Payload() userId: string): Promise<UserObject> {
        try {
            return await this.userService.getUserInfo(userId);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_USER_INFO_CANNOT_BE_FETCHED',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(USER_SERVICES_PATTERN.USER.GET_ALL_USERS)
    async getAllUsers(@Payload() data: ApiRequest<Pagination<UserFilters>>): Promise<PaginatedResponse<UserObject>> {
        try {
            return await this.userService.getAllUsers(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_USERS_CANNOT_BE_FETCHED',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(USER_SERVICES_PATTERN.USER.CREATE_ONBOARD_USER)
    async createOnboardUser(@Payload() data: ApiRequest<OnboardUserObject>): Promise<Partial<User>> {
        try {
            return await this.userService.createOnboardUser(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_USER_ONBOARD_ERROR',
                status: error.getStatus() || 400,
            })
        }
    }
}
