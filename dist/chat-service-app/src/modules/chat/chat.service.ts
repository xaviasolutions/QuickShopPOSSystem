import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { AttachmentDto } from './dto/attachment.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ChatUsersRepository } from '@app/repositories/chat-users.repository';
import { ChatUser } from '@app/models/chat-users.model';
import { ChatRoomsRepository } from '@app/repositories/chat-rooms.repository';
import { ChatRoom } from '@app/models/chat-rooms.model';
import { FindOptions, Op, UpdateOptions } from 'sequelize';
import { ChatRoomMember } from '@app/database/models/chat-room-members.model';
import { ChatRoomMembersRepository } from '@app/database/repositories/chat-room-members.repository';
import { ChatMessage } from '@app/database/models/chat-messages.model';
import { ChatMessagesRepository } from '@app/database/repositories/chat-messages.repository';
import { ChatMessageRecipientsRepository } from '@app/database/repositories/chat-message-recipients.repository';
import { ChatMessageRecipient } from '@app/database/models/chat-message-recipients.model';

@Injectable()
export class ChatService {

    private messages: Array<any> = [];
    private attachments: Array<AttachmentDto> = [];
    private clients = new Set<string>();
    private typingStatus = new Map<string, boolean>();
    private users = new Map<string, string>(); // Map of username to client ID

    constructor(private readonly chatUsersRepository: ChatUsersRepository,
        private readonly chatRoomsRepository: ChatRoomsRepository,
        private readonly chatRoomMembersRepository: ChatRoomMembersRepository,
        private readonly chatMessageRepository: ChatMessagesRepository,
        private readonly chatMessageRecipientsRepository: ChatMessageRecipientsRepository
    ) { }

    async saveMessage(dto: MessageDto) {
        const chatMessage = await this.chatMessageRepository.create({
            content: dto.content,
            senderId: dto.userId,
            roomId: dto.roomId
        });

        const options: FindOptions<ChatRoomMember> = {
            where: {
                id: dto.roomId,
                [Op.not]: [
                    { userId: dto.userId },
                ]
            },
            raw: true,
            attributes: ['id', 'userId']
        }
        const room = await this.chatRoomMembersRepository.findAll(options);
        for (const member of room) {
            await this.chatMessageRecipientsRepository.create({
                messageId: chatMessage.id,
                userId: member.userId,
                isRead: false,
                seenAt: null
            });
        }


        const message = {
            id: chatMessage.id,
            sender: dto.sender,
            content: dto.content, // Ensure content supports Unicode for emojis
            room: dto.room || 'global',
            meta: dto.meta || null,
            seen: false, // Add seen status
            createdAt: new Date().toISOString(),
        };
        this.messages.push(message);
        return message;
    }

    async saveAttachment(dto: AttachmentDto) {
        console.log('Saving attachment:', dto); // Log input
        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Write file to uploads directory
        const filePath = path.join(uploadsDir, dto.filename);
        try {
            fs.writeFileSync(filePath, dto.url, 'base64'); // Assuming base64 encoded file content
        } catch (error) {
            console.error('Error writing file:', error);
            throw new Error('Failed to save attachment');
        }

        const attachment = {
            id: this.attachments.length + 1,
            sender: dto.sender,
            room: dto.room || 'global',
            filename: dto.filename,
            url: `/uploads/${dto.filename}`, // Generate URL for the file
            createdAt: new Date().toISOString(),
        };
        this.attachments.push(attachment);
        console.log('Attachment saved:', attachment); // Log output
        return attachment;
    }

    identifyIdType(id) {
        // 1. Check if it's a number (or a string that is purely numeric)
        if (!isNaN(id) && !isNaN(parseFloat(id)) && /^\d+$/.test(id)) {
            return "Integer ID";
        }

        // 2. Check if it's a valid UUID string
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (typeof id === 'string' && uuidRegex.test(id)) {
            return "UUID";
        }

        return "Unknown Format";
    }

    async markMessageAsSeen(messageId: number, userId: number, username: string) {
        console.log(`Marking message ${messageId} as seen`);
        const updateOptions: UpdateOptions = {
            where: {
                messageId,
                userId,
            }
        }
        const updateObject: Partial<ChatMessageRecipient> = {
            seenAt: new Date(),
            isRead: true
        }
        await this.chatMessageRecipientsRepository.update(updateOptions, updateObject);

        const message = this.messages.find((msg) => msg.id === messageId);
        if (message) {
            message.seen = true;
        }
    }

    addClient(id: string) {
        this.clients.add(id);
    }

    removeClient(id: string) {
        this.clients.delete(id);
    }

    getClients() {
        return Array.from(this.clients);
    }

    getRecent(limit = 50) {
        return this.messages.slice(-limit);
    }

    setTypingStatus(clientId: string, isTyping: boolean) {
        this.typingStatus.set(clientId, isTyping);
    }

    getTypingStatus() {
        return Array.from(this.typingStatus.entries());
    }

    registerUser(username: string, clientId: string) {
        this.users.set(username, clientId);
        console.log(`User registered: ${username} -> ${clientId}`);
    }

    getUserClientId(username: string): string | undefined {
        return this.users.get(username);
    }

    async getUserByUsernmame(username: string): Promise<ChatUser | null> {
        const options: FindOptions<ChatUser> = {
            raw: true,
            where: { username },
            attributes: ['id', 'sessionId']
        };
        const user = await this.chatUsersRepository.findOne(options);
        return user;
    }

    async sendDirectMessage(senderId: number, sender: string, recipient: string, content: string, isNewDirectMessage: boolean) {
        console.log(`Sending direct message from ${sender} id: ${senderId} to ${recipient}: ${content}, isNewDirectMessage: ${isNewDirectMessage}`);
        let senderUserInfo: ChatUser | null = null;
        let recipientUserInfo: ChatUser | null = null;
        let room: ChatRoom | null = null;

        // Create a new direct message room if this is a new direct message
        const roomName = [sender, recipient].sort().join('_'); // Sort to ensure consistent room naming
        room = await this.chatRoomsRepository.findOne({ where: { name: roomName } });
        senderUserInfo = await this.getUserByUsernmame(sender);
        recipientUserInfo = await this.getUserByUsernmame(recipient);
        if (isNewDirectMessage) {
            if (!room) {
                room = await this.chatRoomsRepository.create({ name: roomName, isGroupChat: false });
            }

            // Add both users to the room
            const senderUser = await this.chatRoomMembersRepository.findOne({ where: { room_id: room.id, user_id: senderUserInfo?.id } });
            const recipientUser = await this.chatRoomMembersRepository.findOne({ where: { room_id: room.id, user_id: recipientUserInfo?.id } });

            if (!senderUser) {
                await this.chatRoomMembersRepository.create({
                    roomId: room.id,
                    userId: senderUserInfo?.id
                });
            }

            if (!recipientUser) {
                await this.chatRoomMembersRepository.create({
                    roomId: room.id,
                    userId: recipientUserInfo?.id
                });
            }
        }
        //add content to the room;
        const chatMessage: ChatMessage = await this.chatMessageRepository.create({
            content,
            senderId: senderUserInfo?.id,
            roomId: room?.id
        });

        //add recipient to the message
        await this.chatMessageRecipientsRepository.create({
            messageId: chatMessage.id,
            userId: recipientUserInfo?.id,
            isRead: false
        });
        // const recipientClientId = this.getUserClientId(recipient);
        // if (!recipientClientId) {
        //     throw new Error(`Recipient ${recipient} not found`);
        // }
        const message = {
            id: chatMessage.id,
            sender,
            content,
            room: null, // Direct message
            createdAt: new Date().toISOString(),
        };
        this.messages.push(message);
        console.log("Direct message saved:", message); // Log output
        return { message, recipientUserInfo };
    }

    async createRoom(name: string, isGroupChat: boolean, userId: number): Promise<ChatRoom> {
        const options: FindOptions<ChatRoom> = {
            where: { name },
            attributes: ['id']
        }
        const existingRoom = await this.chatRoomsRepository.findOne(options);
        let room: ChatRoom;
        if (!existingRoom) {
            room = await this.chatRoomsRepository.create({ name, isGroupChat });
        } else {
            room = existingRoom;
        }
        const chatRoomMembers: ChatRoomMember = {
            roomId: room.id,
            userId: userId,
            joinedAt: new Date(),
        } as ChatRoomMember;
        await this.chatRoomMembersRepository.create(chatRoomMembers);

        return room;
    }

    async createDirectMessageRoom(usernameA: string, usernameB: string): Promise<ChatRoom> {
        const roomName = `${usernameA}_${usernameB}`;
        return this.chatRoomsRepository.create({ name: roomName, isGroupChat: false });
    }

    async registerOrLogin(username: string, sessionId: string): Promise<ChatUser> {
        console.log('Registering or logging in user:', { username, sessionId });
        // Check if the user already exists
        const options: FindOptions<ChatUser> = {
            where: { username },
            attributes: ['id']
        }
        const existingUser = await this.chatUsersRepository.findAll(options);
        if (existingUser.length > 0) {
            console.log('Existing user found:', existingUser[0].id);
            await this.chatUsersRepository.update(existingUser[0].id, { sessionId });
            return existingUser[0];
        } else {
            // User does not exist, create a new one
            return this.chatUsersRepository.create({ username, sessionId });
        }


    }

    async getActiveRoomsForUser(userId: number): Promise<ChatRoom[]> {
        try {
            const options: FindOptions<ChatRoomMember> = {
                where: { userId },
                include: [{
                    model: ChatRoom,
                    where: { isGroupChat: true },
                    as: 'roomDetail',
                    attributes: ['id', 'name']
                }],
                attributes: ['id', 'roomId'] // Include roomId for easier mapping
            };
            let roomMembers = await this.chatRoomMembersRepository.findAll(options);
            roomMembers = JSON.parse(JSON.stringify(roomMembers));
            const data = roomMembers.map(member =>member.roomDetail);
            return data;
        } catch (error) {
            console.error('Error fetching active rooms for user:', error);
            return [];
        }

    }

    async getDirectMessagesForUser(userId: number): Promise<any[]> {
        // Get messages where user is sender or recipient
        const options: FindOptions<ChatMessage> = {
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { '$recipients.userId$': userId }
                ]
            },
            include: [{
                model: ChatMessageRecipient,
                as: 'recipients',
                // where: { userId },
                required: false
            }],
            order: [['createdAt', 'DESC']]
        };
        const messages = await this.chatMessageRepository.findAll(options);
        return messages.map(msg => ({
            id: msg.id,
            senderId: msg.senderId,
            content: msg.content,
            roomId: msg.roomId,
            createdAt: msg.createdAt,
            isRead: msg.recipients?.[0]?.isRead || false
        }));
    }

    async getChatHistory(roomId: number, limit: number = 50): Promise<any[]> {
        const options: FindOptions<ChatMessage> = {
            where: { roomId },
            order: [['createdAt', 'DESC']],
            limit,
            include: [{
                model: ChatMessageRecipient,
                as: 'recipients',
                required: false
            }]
        };
        const messages = await this.chatMessageRepository.findAll(options);
        return messages.reverse().map(msg => ({
            id: msg.id,
            senderId: msg.senderId,
            content: msg.content,
            roomId: msg.roomId,
            createdAt: msg.createdAt,
            recipients: msg.recipients
        }));
    }
}
