import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { RolePermission } from '@app/models/role_permission.model';
import { RolePermissionRepository } from '@app/repositories/role-permission.repository';
import { AssignRolePermission } from '@app/common/interfaces/role-permission.interface';
import { getNewItems } from '@app/common/utils/array.utils';

@Injectable()
export class RolePermissionsService {
  constructor(private readonly rolePermissionRepository: RolePermissionRepository) {}

  async assignPermissionToRole(data: AssignRolePermission): Promise<RolePermission[]> {
    if (!data.roleId || !data.permissionIds) {
      throw new BadRequestException('ASSIGN_PERMISSION_ROLE_ID_AND_PERMISSION_IDS_REQUIRED');
    }

    const { roleId, permissionIds } = data;

    try {
      // 1. Fetch current permissions for the role (using raw: true for clean property access)
      const existingAssignments = await this.rolePermissionRepository.findAll({
        where: { roleId },
        raw: true,
      });

      const existingIds = existingAssignments.map((a) => Number(a.permissionId));
      const incomingIds = permissionIds.map((id) => Number(id));

      // 2. Diff calculation
      const idsToAdd = getNewItems(existingIds, incomingIds);
      const idsToRemove = existingIds.filter((id) => !incomingIds.includes(id));

      // 3. Perform atomic sync (Bulk delete and Bulk insert)
      if (idsToRemove.length > 0) {
        await this.rolePermissionRepository.deleteBulk({
          where: {
            roleId,
            permissionId: { [Op.in]: idsToRemove },
          },
        });
      }

      if (idsToAdd.length > 0) {
        const records: Partial<RolePermission>[] = idsToAdd.map((id) => ({
          roleId,
          permissionId: id,
        }));
        await this.rolePermissionRepository.bulkCreate(records, { ignoreDuplicates: true });
      }

      // 4. Return new state
      return this.listPermissionsForRole(roleId);
    } catch (error) {
      // Temporary descriptive error for testing as requested
      const existing = (await this.listPermissionsForRole(roleId)).map(p => p.permissionId).join(',');
      throw new BadRequestException(
        `SYNC_ERROR: Role[${roleId}] DB_HAS:[${existing}] TRYING:[${permissionIds.join(',')}] ERR:${error.message}`,
      );
    }
  }

  async removePermissionFromRole(roleId: number, permissionId: number): Promise<boolean> {
    const options: FindOptions<RolePermission> = {
      where: { roleId, permissionId },
    };
    return this.rolePermissionRepository.delete(options);
  }

  async listPermissionsForRole(roleId: number): Promise<RolePermission[]> {
    const options: FindOptions<RolePermission> = {
      where: { roleId },
      raw: true,
    };
    return this.rolePermissionRepository.findAll(options);
  }
}

