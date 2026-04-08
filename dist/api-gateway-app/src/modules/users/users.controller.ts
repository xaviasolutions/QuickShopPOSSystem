import { BadRequestException, Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import { UsersService } from './users.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import type { UserFilters, UserObject } from '@app/common/interfaces/users.interfaces';
import { Observable } from 'rxjs';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { LoginUserDto, CreateUserDto } from '@app/common/dto/users.dto';
import { RequirePermission } from '@app/common/decorators/permissions.decortor';
import { PermissionsGuard } from '../auth/guards/permissions.guards';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy,
        private readonly userService: UsersService) { }

    @Post('/v1/create')
    createUser(@Body() userData: CreateUserDto): any {
        const data = this.userService.createUser(userData);
        return data;
    }

    @Post('/v1/login')
    loginUser(@Body() userData: LoginUserDto): Observable<UserObject> {
        const data = this.userService.loginUser(userData);
        return data;
    }

    @Post('/v1/admin-login')
    loginAdmin(@Body() userData: LoginUserDto): Observable<UserObject> {
        const data = this.userService.loginAdmin(userData);
        return data;
    }

    @UseGuards(GatewayAuthGuard)
    // @UseGuards(PermissionsGuard)
    // @RequirePermission('user:create')
    @Get('/v1/user')
    getUserInfo(@Req() req: Request): any {
        const userId: number = Number(req['user'].sub.toString());
        const data = this.userService.getUserInfo(userId.toString());
        return data;
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/users')
    getAllUsers(@Req() req: Request, @Query() query: any): Observable<PaginatedResponse<UserObject>> {
        const userId: number = Number(req['user'].sub.toString());
        const { page, size, filters } = query;
        const _data: ApiRequest<Pagination<UserFilters>> = {
            userId: userId,
            data: {
                page: page,
                size: size,
                filters: filters
            }
        }
        const data = this.userService.getAllUsers(_data);
        return data;
    }
}
