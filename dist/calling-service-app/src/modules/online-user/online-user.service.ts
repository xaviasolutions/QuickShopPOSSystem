import { Injectable } from '@nestjs/common';
import type { OnlineUser } from '@app/common/interfaces/webrtc.interface';

/**
 * Tracks online users in-memory (same pattern as the monolithic userService.js).
 * For multi-instance deployments this can be swapped for a Redis-backed store.
 */
@Injectable()
export class OnlineUserService {
    private readonly users = new Map<string, OnlineUser>();

    register(userId: string, userName: string, socketId: string): OnlineUser[] {
        if (!userName?.trim()) throw new Error('ONLINE_USER_USERNAME_REQUIRED');

        this.users.set(userId, {
            userId,
            userName: userName.trim(),
            socketId,
            isOnline: true,
            lastSeen: new Date().toISOString(),
        });

        return this.getAll();
    }

    remove(userId: string): OnlineUser | undefined {
        const user = this.users.get(userId);
        this.users.delete(userId);
        return user;
    }

    getAll(): OnlineUser[] {
        return Array.from(this.users.values()).map(u => ({
            userId: u.userId,
            userName: u.userName,
            isOnline: true,
        }));
    }

    getOne(userId: string): OnlineUser | undefined {
        return this.users.get(userId);
    }

    updateLastSeen(userId: string): void {
        const user = this.users.get(userId);
        if (user) {
            user.lastSeen = new Date().toISOString();
            this.users.set(userId, user);
        }
    }

    count(): number {
        return this.users.size;
    }
}
