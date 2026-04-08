import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from "@app/database/repositories/user.repository";
import { UserObject } from "@app/common/interfaces/users.interfaces";
import { FindOptions } from "sequelize";
import { User } from "@app/database/models/user.model";

@Injectable()
export class GatewayAuthGuard implements CanActivate {

    //small change
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
        private readonly configService: ConfigService,
    ) { }

    async getUserInfo(id: string): Promise<UserObject> {
        const options: FindOptions<User> = {
            where: {
                id: id,
            },
            attributes: ['id', 'token', 'isVerified'],
            raw: true,
        };
        const userExists = await this.usersRepository.findOne(options);
        if (!userExists) {
            throw new BadRequestException('AUTH_GUARD_USER_NOT_FOUND')
        }
        if (!userExists.isVerified) {
            throw new BadRequestException('AUTH_GUARD_USER_NOT_VERIFIED')
        }
        return userExists;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // 1. Extract the token from the Authorization header
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('AUTH_GUARD_NO_TOKEN_PROVIDED');
        }

        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('AUTH_GUARD_INVALID_TOKEN_FORMAT');
        }

        try {
            // 2. Verify the token
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            });

            // 3. Attach payload to request object for use in controllers
            request['user'] = payload;
            const userInfo: UserObject = await this.getUserInfo(payload.sub);
            return true;
        } catch (error) {
            // Token is expired, malformed, or signature is invalid
            throw new UnauthorizedException('AUTH_GUARD_SESSION_EXPIRED_OR_INVALID_TOKEN');
        }
    }
}