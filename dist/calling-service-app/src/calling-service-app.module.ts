import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/src/database.module';
import { CommonConfigModule } from '../../../libs/common/src/config/config.module';
import { CallingModule } from './modules/calling/calling.module';
import { OnlineUserModule } from './modules/online-user/online-user.module';

@Module({
    imports: [
        CommonConfigModule,
        DatabaseModule,
        CallingModule,
        OnlineUserModule,
    ],
    controllers: [],
    providers: [],
})
export class CallingServiceAppModule {}
