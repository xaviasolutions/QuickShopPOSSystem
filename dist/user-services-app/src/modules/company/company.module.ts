import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from '@app/models/company.model';
import { CompanyRepository } from '@app/repositories/company.repository';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService],
})
export class CompanyModule {}

