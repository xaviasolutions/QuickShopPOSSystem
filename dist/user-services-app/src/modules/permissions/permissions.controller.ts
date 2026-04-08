import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { PermissionsService } from './permissions.service';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  CreatePermission,
  UpdatePermission,
  PermissionObject,
} from '@app/common/interfaces/permission.interface';

@Controller()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern(USER_SERVICES_PATTERN.PERMISSIONS.CREATE)
  async createPermission(@Payload() request: ApiRequest<CreatePermission>): Promise<PermissionObject> {
    try {
      return await this.permissionsService.createPermission(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSION_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.PERMISSIONS.GET_ONE)
  async getPermission(@Payload() request: ApiRequest<number>): Promise<PermissionObject> {
    try {
      return await this.permissionsService.getPermissionById(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSION_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.PERMISSIONS.GET_ALL)
  async getPermissions(@Payload() request: ApiRequest<void>): Promise<PermissionObject[]> {
    try {
      return await this.permissionsService.listPermissions(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSIONS_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.PERMISSIONS.UPDATE)
  async updatePermission(
    @Payload() request: ApiRequest<{ id: number; data: UpdatePermission }>,
  ): Promise<PermissionObject> {
    try {
      return await this.permissionsService.updatePermission(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSION_CANNOT_BE_UPDATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.PERMISSIONS.DELETE)
  async deletePermission(@Payload() request: ApiRequest<number>): Promise<boolean> {
    try {
      return await this.permissionsService.deletePermission(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_PERMISSION_CANNOT_BE_DELETED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
