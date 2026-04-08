import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CALLING_SERVICE_PATTERNS } from '@app/common/constants/patterns';
import { OnlineUserService } from './online-user.service';
import type { OnlineUser } from '@app/common/interfaces/webrtc.interface';

@Controller()
export class OnlineUserController {
    constructor(private readonly onlineUserService: OnlineUserService) {}

    @MessagePattern(CALLING_SERVICE_PATTERNS.ONLINE_USER.REGISTER)
    register(@Payload() data: { userId: string; userName: string; socketId: string }): OnlineUser[] {
        try {
            return this.onlineUserService.register(data.userId, data.userName, data.socketId);
        } catch (error) {
            throw new RpcException({ message: error.message || 'ONLINE_USER_REGISTER_ERROR', status: 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.ONLINE_USER.REMOVE)
    remove(@Payload() userId: string): OnlineUser | undefined {
        try {
            return this.onlineUserService.remove(userId);
        } catch (error) {
            throw new RpcException({ message: error.message || 'ONLINE_USER_REMOVE_ERROR', status: 400 });
        }
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.ONLINE_USER.GET_ALL)
    getAll(): OnlineUser[] {
        return this.onlineUserService.getAll();
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.ONLINE_USER.GET_ONE)
    getOne(@Payload() userId: string): OnlineUser | undefined {
        return this.onlineUserService.getOne(userId);
    }

    @MessagePattern(CALLING_SERVICE_PATTERNS.ONLINE_USER.UPDATE_LAST_SEEN)
    updateLastSeen(@Payload() userId: string): void {
        this.onlineUserService.updateLastSeen(userId);
    }
}
