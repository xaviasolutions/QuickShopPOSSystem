import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { Permission } from '@app/models/permission.model';
import { PermissionRepository } from '@app/repositories/permission.repository';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CreatePermission, UpdatePermission, PermissionObject } from '@app/common/interfaces/permission.interface';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async createPermission(request: ApiRequest<CreatePermission>): Promise<PermissionObject> {
    const { data } = request;
    
    if (!data.name || !data.resource || !data.action) {
      throw new BadRequestException('CREATE_PERMISSION_NAME_RESOURCE_AND_ACTION_REQUIRED');
    }

    return this.permissionRepository.create(data);
  }

  async getPermissionById(request: ApiRequest<number>): Promise<PermissionObject> {
    const permissionId = request.data;
    
    const options: FindOptions<Permission> = {
      where: { id: permissionId },
    };
    
    const permission = await this.permissionRepository.findOne(options);
    if (!permission) {
      throw new NotFoundException('GET_PERMISSION_NOT_FOUND');
    }
    
    return permission;
  }

  async listPermissions(request: ApiRequest<void>): Promise<PermissionObject[]> {
    return this.permissionRepository.findAll({});
  }

  async updatePermission(request: ApiRequest<{ id: number; data: UpdatePermission }>): Promise<PermissionObject> {
    const { id, data } = request.data;
    
    const options: FindOptions<Permission> = {
      where: { id },
    };
    
    return this.permissionRepository.update(options, data);
  }

  async deletePermission(request: ApiRequest<number>): Promise<boolean> {
    const permissionId = request.data;
    
    const options: FindOptions<Permission> = {
      where: { id: permissionId },
    };
    
    return this.permissionRepository.delete(options);
  }
}

