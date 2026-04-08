import { Module } from '@nestjs/common';
import { CommonConfigModule } from '../../../libs/common/src/config/config.module';
import { ChatModule } from './modules/chat/chat.module';
import { DatabaseModule } from '@app/database/database.module';

@Module({
    imports: [DatabaseModule, CommonConfigModule, ChatModule],
})
export class ChatServiceAppModule { }
