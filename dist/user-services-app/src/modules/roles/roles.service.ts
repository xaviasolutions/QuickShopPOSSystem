import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { Role } from '@app/models/role.model';
import { RoleRepository } from '@app/repositories/role.repository';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CreateRole, UpdateRole, RoleObject } from '@app/common/interfaces/role.interface';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(request: ApiRequest<CreateRole>): Promise<RoleObject> {
    const { data } = request;
    
    if (!data.name || !data.companyId) {
      throw new BadRequestException('CREATE_ROLE_NAME_AND_COMPANY_ID_REQUIRED');
    }

    return this.roleRepository.create(data);
  }

  async getRoleById(request: ApiRequest<number>): Promise<RoleObject> {
    const roleId = request.data;
    
    const options: FindOptions<Role> = {
      where: { id: roleId },
    };
    
    const role = await this.roleRepository.findOne(options);
    if (!role) {
      throw new NotFoundException('GET_ROLE_NOT_FOUND');
    }
    
    return role;
  }

  async listRolesByCompany(request: ApiRequest<number>): Promise<RoleObject[]> {
    const companyId = request.data;
    
    const options: FindOptions<Role> = {
      where: { companyId },
    };
    
    return this.roleRepository.findAll(options);
  }

  async updateRole(request: ApiRequest<{ id: number; data: UpdateRole }>): Promise<RoleObject> {
    const { id, data } = request.data;
    
    const options: FindOptions<Role> = {
      where: { id },
    };
    
    return this.roleRepository.update(options, data);
  }

  async deleteRole(request: ApiRequest<number>): Promise<boolean> {
    const roleId = request.data;
    
    const options: FindOptions<Role> = {
      where: { id: roleId },
    };
    
    return this.roleRepository.delete(options);
  }
}
