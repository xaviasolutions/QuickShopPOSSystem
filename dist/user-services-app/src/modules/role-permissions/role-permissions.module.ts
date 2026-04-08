import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolePermission } from '@app/models/role_permission.model';
import { RolePermissionRepository } from '@app/repositories/role-permission.repository';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';

@Module({
  imports: [SequelizeModule.forFeature([RolePermission])],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService, RolePermissionRepository],
  exports: [RolePermissionsService],
})
export class RolePermissionsModule {}

