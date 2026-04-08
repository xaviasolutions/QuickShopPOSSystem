import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@app/database/database.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CronModule } from './modules/common-cron-service/cron.module';
import { LookupController } from './modules/lookup/lookup.controller';
import { LookupService } from './modules/lookup/lookup.service';
import { LookupRepository } from '@app/database/repositories/lookup.repository';
import { LeadsModule } from './modules/leads/leads.module';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), NotificationModule, CronModule, LeadsModule],
  controllers: [LookupController],
  providers: [LookupService, LookupRepository],
})
export class CommonServiceModule { }
