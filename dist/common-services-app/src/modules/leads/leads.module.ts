import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lead } from '@app/database/models/leads.model';
import { AuditTrail } from '@app/database/models/audit-trail.model';
import { LeadsRepository } from '@app/database/repositories/leads.repository';
import { AuditTrailRepository } from '@app/database/repositories/audit-trail.repository';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
  imports: [SequelizeModule.forFeature([Lead, AuditTrail])],
  controllers: [LeadsController],
  providers: [LeadsService, LeadsRepository, AuditTrailRepository],
  exports: [LeadsService],
})
export class LeadsModule {}
