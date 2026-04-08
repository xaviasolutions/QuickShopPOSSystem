import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { RolesService } from './roles.service';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  CreateRole,
  UpdateRole,
  RoleObject,
} from '@app/common/interfaces/role.interface';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern(USER_SERVICES_PATTERN.ROLES.CREATE)
  async createRole(
    @Payload() request: ApiRequest<CreateRole>,
  ): Promise<RoleObject> {
    try {
      return await this.rolesService.createRole(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLE_CANNOT_BE_CREATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ROLES.GET_ONE)
  async getRole(@Payload() request: ApiRequest<number>): Promise<RoleObject> {
    try {
      return await this.rolesService.getRoleById(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLE_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ROLES.GET_BY_COMPANY)
  async getRolesByCompany(
    @Payload() request: ApiRequest<number>,
  ): Promise<RoleObject[]> {
    try {
      return await this.rolesService.listRolesByCompany(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLES_CANNOT_BE_FETCHED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ROLES.UPDATE)
  async updateRole(
    @Payload() request: ApiRequest<{ id: number; data: UpdateRole }>,
  ): Promise<RoleObject> {
    try {
      return await this.rolesService.updateRole(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLE_CANNOT_BE_UPDATED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.ROLES.DELETE)
  async deleteRole(
    @Payload() request: ApiRequest<number>,
  ): Promise<boolean> {
    try {
      return await this.rolesService.deleteRole(request);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLE_CANNOT_BE_DELETED',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
