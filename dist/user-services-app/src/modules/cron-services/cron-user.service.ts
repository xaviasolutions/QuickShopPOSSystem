// import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';

// @Injectable()
// export class CronService {
//     private readonly logger = new Logger(CronService.name);

//     // Custom schedule: Every 1 minutes
//     @Cron('0 */1 * * * *')
//     handleFiveMinuteTask() {
//         this.logger.debug('Running every 1 minutes');
//     }
// }