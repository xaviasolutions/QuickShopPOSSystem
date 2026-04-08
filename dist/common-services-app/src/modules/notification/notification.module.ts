import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { FcmService, EmailService } from '@app/common';
import { DatabaseModule } from '@app/database/database.module';
import { NotificationRepository } from '@app/database/repositories/notification.repository';
import { UserMapNotificationRepository } from '@app/database/repositories/user-map-notification.repository';
import { UsersRepository } from '@app/database/repositories/user.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationController],
    providers: [NotificationService, FcmService, EmailService, NotificationRepository, UserMapNotificationRepository, UsersRepository],
    exports: [NotificationService],
})
export class NotificationModule { }
