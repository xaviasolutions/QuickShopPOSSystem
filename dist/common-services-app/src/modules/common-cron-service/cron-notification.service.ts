// import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { NotificationService } from '../notification/notification.service';

// @Injectable()
// export class CronService {
//     private readonly logger = new Logger(CronService.name);
//     private isSendingPending = false;
//     private isSendingApproved = false;

//     constructor(private readonly notificationService: NotificationService) { }

//     // Send pending system notifications every 1 minute
//     @Cron(CronExpression.EVERY_MINUTE)
//     async handleSendPendingNotifications() {
//         if (this.isSendingPending) {
//             this.logger.warn('Previous pending notifications job still running, skipping...');
//             return;
//         }

//         try {
//             this.isSendingPending = true;
//             this.logger.log('Starting CRON_SEND_PENDING_NOTIFICATIONS');
//             await this.notificationService.sendPendingNotifications();
//             this.logger.log('Completed CRON_SEND_PENDING_NOTIFICATIONS');
//         } catch (error) {
//             this.logger.error(`CRON_SEND_PENDING_NOTIFICATIONS failed: ${error.message}`);
//         } finally {
//             this.isSendingPending = false;
//         }
//     }

//     // Send approved broadcasts every 1 minute
//     @Cron(CronExpression.EVERY_MINUTE)
//     async handleSendApprovedBroadcasts() {
//         if (this.isSendingApproved) {
//             this.logger.warn('Previous approved broadcasts job still running, skipping...');
//             return;
//         }

//         try {
//             this.isSendingApproved = true;
//             this.logger.log('Starting CRON_SEND_APPROVED_VENDOR_NOTIFICATIONS');
//             await this.notificationService.sendApprovedBroadcasts();
//             this.logger.log('Completed CRON_SEND_APPROVED_VENDOR_NOTIFICATIONS');
//         } catch (error) {
//             this.logger.error(`CRON_SEND_APPROVED_VENDOR_NOTIFICATIONS failed: ${error.message}`);
//         } finally {
//             this.isSendingApproved = false;
//         }
//     }
// }
