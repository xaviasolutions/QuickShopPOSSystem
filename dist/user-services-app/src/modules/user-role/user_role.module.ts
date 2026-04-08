import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from '@app/models/user_role.model';
import { UserRoleRepository } from '@app/repositories/user-role.repository';
import { UserRoleController } from './user_role.controller';
import { UserRoleService } from './user_role.service';

@Module({
  imports: [SequelizeModule.forFeature([UserRole])],
  controllers: [UserRoleController],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService],
})
export class UserRoleModule {}
