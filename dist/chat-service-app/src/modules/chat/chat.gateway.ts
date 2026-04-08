import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { AttachmentDto } from './dto/attachment.dto';
import { ChatUser } from '@app/database/models/chat-users.model';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' }, transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) { }

  handleConnection(client: Socket) {
    const id = client.id;
    this.chatService.addClient(id);
    console.log(`Client connected: ${id}`);
  }

  handleDisconnect(client: Socket) {
    const id = client.id;
    this.chatService.removeClient(id);
    console.log(`Client disconnected: ${id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() payload: MessageDto, @ConnectedSocket() client: Socket) {
    const msg = await this.chatService.saveMessage(payload); // Ensure content supports Unicode for emojis
    const room = payload.room || 'global';
    this.server.to(room).emit('message', msg);
    return { status: 'ok' };
  }

  @SubscribeMessage('join')
  async handleJoin(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket | any) {
    const room = data?.room || 'global';
    console.log(`Client ${client.id} for userId: ${client.user.id} joining room: ${room}`);
    const roomDetail = await this.chatService.createRoom(room, true, client.user.id);
    client.join(room);
    client.emit('joined', { room, roomId: roomDetail.id });
  }

  @SubscribeMessage('attachment')
  async handleAttachment(@MessageBody() payload: AttachmentDto, @ConnectedSocket() client: Socket) {
    const attachment = await this.chatService.saveAttachment(payload);
    const room = payload.room || 'global';
    this.server.to(room).emit('attachment', attachment);
    return { status: 'ok' };
  }

  @SubscribeMessage('seen')
  handleSeen(@MessageBody() data: { messageId: number, userId: number, username: string }, @ConnectedSocket() client: Socket) {
    console.log("Marking message as seen: ", data);
    this.chatService.markMessageAsSeen(data.messageId, data.userId, data.username);
    this.server.emit('seen', { messageId: data.messageId });
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: { isTyping: boolean }, @ConnectedSocket() client: Socket) {
    this.chatService.setTypingStatus(client.id, data.isTyping);
    this.server.emit('typing', { clientId: client.id, isTyping: data.isTyping });
  }

  @SubscribeMessage('register')
  async handleRegister(@MessageBody() data: { username: string }, @ConnectedSocket() client: Socket | any) {
    const username = data?.username;

    if (!username) {
      console.error('Username is required for registration');
      client.emit('error', { message: 'Username is required for registration' });
      return;
    }

    const user: ChatUser = await this.chatService.registerOrLogin(username, client.id);
    client.emit('registered', { status: 'ok', username, userId: user.id });
    client.user = { id: user.id, username: user.username };
    console.log(`User registered: ${username} with id: ${user.id}, Socket ID: ${client.id}`);
  }

  @SubscribeMessage('direct_message')
  async handleDirectMessage(
    @MessageBody() data: { userId: number; sender: string; recipient: string; content: string; isNewDirectMessage: boolean },
    @ConnectedSocket() client: Socket | any,
  ) {
    try {
      console.log(`Direct message from ${data.sender} to ${data.recipient}: ${data.content}, ${data.isNewDirectMessage} ---- ${client.user.id} ${client.user.username}`);
      const { message, recipientUserInfo } = await this.chatService.sendDirectMessage(
        data.userId,
        data.sender,
        data.recipient,
        data.content,
        data.isNewDirectMessage
      );
      if (recipientUserInfo) {
        this.server.to(recipientUserInfo.sessionId).emit('direct_message', message);
        client.emit('direct_message_sent', { status: 'ok', message });
      }

    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('get_active_rooms')
  async handleGetActiveRooms(@MessageBody() data: { userId: number }, @ConnectedSocket() client: Socket) {
    try {
      const rooms = await this.chatService.getActiveRoomsForUser(data.userId);
      client.emit('active_rooms', { rooms });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('get_direct_messages')
  async handleGetDirectMessages(@MessageBody() data: { userId: number }, @ConnectedSocket() client: Socket) {
    try {
      const messages = await this.chatService.getDirectMessagesForUser(data.userId);
      client.emit('direct_messages', { messages });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('get_chat_history')
  async handleGetChatHistory(@MessageBody() data: { roomId: number; limit?: number }, @ConnectedSocket() client: Socket) {
    try {
      const history = await this.chatService.getChatHistory(data.roomId, data.limit);
      client.emit('chat_history', { roomId: data.roomId, history });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }
}
