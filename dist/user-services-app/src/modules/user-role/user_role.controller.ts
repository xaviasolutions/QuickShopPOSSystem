import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { USER_SERVICES_PATTERN } from '@app/common/constants/patterns';
import { UserRole } from '@app/models/user_role.model';
import { UserRoleService } from './user_role.service';
import type {
  AssignRole,
  RemoveRole,
  GetRolesByCompanyUser,
} from '@app/common/interfaces/user-role.interface';

@Controller()
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @MessagePattern(USER_SERVICES_PATTERN.USER_ROLES.ASSIGN)
  async assignRole(
    @Payload() data: Partial<AssignRole>,
  ): Promise<UserRole> {
    try {
      return await this.userRoleService.assignRoleToCompanyUser(data);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLE_CANNOT_BE_ASSIGNED_TO_USER',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.USER_ROLES.REMOVE)
  async removeRole(
    @Payload() data: Partial<RemoveRole>,
  ): Promise<boolean> {
    try {
      return await this.userRoleService.removeRoleFromCompanyUser(data);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLE_CANNOT_BE_REMOVED_FROM_USER',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }

  @MessagePattern(USER_SERVICES_PATTERN.USER_ROLES.GET_BY_COMPANY_USER)
  async getRolesByCompanyUser(
    @Payload() data: Partial<GetRolesByCompanyUser>,
  ): Promise<UserRole[]> {
    try {
      return await this.userRoleService.listRolesForCompanyUser(data);
    } catch (error) {
      throw new RpcException({
        message: error.message || 'CONTROLLER_ROLES_CANNOT_BE_LISTED_FOR_USER',
        status: error.status || error.getStatus?.() || 400,
      });
    }
  }
}
