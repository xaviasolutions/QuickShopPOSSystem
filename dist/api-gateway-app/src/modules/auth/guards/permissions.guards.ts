// permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { RolePermission } from '@app/database/models/role_permission.model';
import { Permission } from '@app/database/models/permission.model';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(RolePermission) private rolePermissionModel: typeof RolePermission,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Get the required permission from the decorator
    const requiredPermission = this.reflector.get<string>('permission', context.getHandler());
    if (!requiredPermission) return true; // If no permission is set, allow access

    // 2. Get the user from the request (injected by your JWT/Auth Guard)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roleId) {
      throw new ForbiddenException('User role not identified');
    }

    // 3. Check DB if this Role has this Permission
    const hasPermission = await this.rolePermissionModel.findOne({
      where: { roleId: user.roleId },
      include: [{
        model: Permission,
        where: { name: requiredPermission } // e.g., 'user:create'
      }]
    });

    if (!hasPermission) {
      throw new ForbiddenException(`You do not have the required permission: ${requiredPermission}`);
    }

    return true;
  }
}