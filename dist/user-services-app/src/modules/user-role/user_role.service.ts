import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { UserRole } from '@app/models/user_role.model';
import { UserRoleRepository } from '@app/repositories/user-role.repository';
import type {
  AssignRole,
  RemoveRole,
  GetRolesByCompanyUser,
} from '@app/common/interfaces/user-role.interface';

@Injectable()
export class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  async assignRoleToCompanyUser(data: Partial<AssignRole>): Promise<UserRole> {
    if (!data.companyUserId || !data.roleId) {
      throw new BadRequestException('ASSIGN_ROLE_COMPANY_USER_ID_AND_ROLE_ID_REQUIRED');
    }
    return this.userRoleRepository.create(data);
  }

  async removeRoleFromCompanyUser(data: Partial<RemoveRole>): Promise<boolean> {
  if (!data.companyUserId || !data.roleId) {
    throw new BadRequestException('REMOVE_ROLE_COMPANY_USER_ID_AND_ROLE_ID_REQUIRED');
  }
  const options: FindOptions<UserRole> = {
    where: { companyUserId: data.companyUserId, roleId: data.roleId },
  };
  return this.userRoleRepository.delete(options);
  }

  async listRolesForCompanyUser(data: Partial<GetRolesByCompanyUser>): Promise<UserRole[]> {
    const options: FindOptions<UserRole> = {
      where: { companyUserId: data.companyUserId },
    };
    return this.userRoleRepository.findAll(options);
  }
}

