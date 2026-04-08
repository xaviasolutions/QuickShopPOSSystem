import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '@app/models/role.model';
import { RoleRepository } from '@app/repositories/role.repository';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RolesService],
})
export class RolesModule {}

