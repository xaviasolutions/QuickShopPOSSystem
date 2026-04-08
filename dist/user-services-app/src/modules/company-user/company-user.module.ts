import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyUser } from '@app/models/company_user.model';
import { CompanyUserRepository } from '@app/repositories/company-user.repository';
import { CompanyUserService } from './company-user.service';
import { CompanyUserController } from './company-user.controller';

@Module({
  imports: [SequelizeModule.forFeature([CompanyUser])],
  controllers: [CompanyUserController],
  providers: [CompanyUserService, CompanyUserRepository],
  exports: [CompanyUserService],
})
export class CompanyUserModule {}
