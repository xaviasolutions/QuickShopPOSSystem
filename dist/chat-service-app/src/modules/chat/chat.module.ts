import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { DatabaseModule } from '@app/database/database.module';
import { ChatUsersRepository } from '@app/database/repositories/chat-users.repository';
import { ChatRoomsRepository } from '@app/database/repositories/chat-rooms.repository';

@Module({
  imports: [DatabaseModule],
  providers: [ChatGateway, ChatService, ChatUsersRepository, ChatRoomsRepository],
  exports: [ChatService],
})
export class ChatModule { }
