import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { RolePermission } from '@app/models/role_permission.model';
import { RolePermissionsService } from './role-permissions.service';
import type { AssignRolePermission } from '@app/common/interfaces/role-permission.interface';

@Controller()
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @MessagePattern(USER_SERVICES_PATTERN.ROLE_PERMISSIONS.ASSIGN)
  async assignPermission(
    @Payload() data: AssignRolePermission,
  ): Promise<RolePermission[]> {
    try {
      return await this.rolePermissionsService.assignPermissionToRole(data);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSION_CANNOT_BE_ASSIGNED_TO_ROLE',
        status: error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ROLE_PERMISSIONS.REMOVE)
  async removePermission(
    @Payload() payload: { roleId: number; permissionId: number },
  ): Promise<boolean> {
    try {
      return await this.rolePermissionsService.removePermissionFromRole(
        payload.roleId,
        payload.permissionId,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSION_CANNOT_BE_REMOVED_FROM_ROLE',
        status: error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ROLE_PERMISSIONS.GET_BY_ROLE)
  async getPermissionsByRole(
    @Payload() roleId: number,
  ): Promise<RolePermission[]> {
    try {
      return await this.rolePermissionsService.listPermissionsForRole(roleId);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSIONS_CANNOT_BE_LISTED_FOR_ROLE',
        status: error.getStatus?.() || 400,
      });
    }
  }
}
