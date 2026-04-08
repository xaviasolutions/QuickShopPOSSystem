# Chat Module Documentation

## Overview
The Chat Module provides real-time messaging functionality using WebSockets via Socket.IO. It supports group chats, direct messages, file attachments, and message history retrieval.

## Features
- Real-time messaging in rooms
- Direct messaging between users
- File attachments
- Message seen status
- Typing indicators
- User registration and session management
- Chat history retrieval
- Active room sessions listing
- Direct messages listing

## Socket Events

### Client to Server Events

#### `register`
Register or login a user with a username.
- **Payload**: `{ username: string }`
- **Response**: `{ status: 'ok', username: string, userId: number }`

#### `join`
Join a chat room.
- **Payload**: `{ room: string }`
- **Response**: `{ room: string, roomId: number }`

#### `message`
Send a message to a room.
- **Payload**: `{ sender: string, userId: number, roomId: number, content: string, room?: string, meta?: any }`
- **Response**: `{ status: 'ok' }`
- **Broadcast**: `message` event to room members

#### `direct_message`
Send a direct message to another user.
- **Payload**: `{ userId: number, sender: string, recipient: string, content: string, isNewDirectMessage: boolean }`
- **Response**: `{ status: 'ok', message: object }`
- **Broadcast**: `direct_message` to recipient

#### `attachment`
Send a file attachment to a room.
- **Payload**: `{ sender: string, room: string, filename: string, url: string }`
- **Response**: `{ status: 'ok' }`
- **Broadcast**: `attachment` event to room members

#### `seen`
Mark a message as seen.
- **Payload**: `{ messageId: number, userId: number, username: string }`
- **Broadcast**: `seen` event

#### `typing`
Indicate typing status.
- **Payload**: `{ isTyping: boolean }`
- **Broadcast**: `typing` event

#### `get_active_rooms`
Fetch the list of active rooms for the user.
- **Payload**: `{ userId: number }`
- **Response**: `{ rooms: ChatRoom[] }`

#### `get_direct_messages`
Fetch all direct messages for the user.
- **Payload**: `{ userId: number }`
- **Response**: `{ messages: any[] }`

#### `get_chat_history`
Fetch past message history for a room.
- **Payload**: `{ roomId: number, limit?: number }`
- **Response**: `{ roomId: number, history: any[] }`

### Server to Client Events

#### `joined`
Emitted when successfully joined a room.
- **Payload**: `{ room: string, roomId: number }`

#### `registered`
Emitted after successful user registration/login.
- **Payload**: `{ status: 'ok', username: string, userId: number }`

#### `message`
Broadcasted when a new message is sent in a room.
- **Payload**: Message object

#### `direct_message`
Broadcasted when a direct message is received.
- **Payload**: Message object

#### `direct_message_sent`
Emitted to sender after sending a direct message.
- **Payload**: `{ status: 'ok', message: object }`

#### `attachment`
Broadcasted when a new attachment is sent in a room.
- **Payload**: Attachment object

#### `seen`
Broadcasted when a message is marked as seen.
- **Payload**: `{ messageId: number }`

#### `typing`
Broadcasted when typing status changes.
- **Payload**: `{ clientId: string, isTyping: boolean }`

#### `active_rooms`
Response to `get_active_rooms` request.
- **Payload**: `{ rooms: ChatRoom[] }`

#### `direct_messages`
Response to `get_direct_messages` request.
- **Payload**: `{ messages: any[] }`

#### `chat_history`
Response to `get_chat_history` request.
- **Payload**: `{ roomId: number, history: any[] }`

#### `error`
Emitted when an error occurs.
- **Payload**: `{ message: string }`

## Data Models

### ChatRoom
- `id`: number
- `name`: string
- `isGroupChat`: boolean
- `createdAt`: Date
- `updatedAt`: Date

### ChatMessage
- `id`: number
- `content`: string
- `senderId`: number
- `roomId`: number
- `createdAt`: Date
- `updatedAt`: Date

### ChatMessageRecipient
- `id`: number
- `messageId`: number
- `userId`: number
- `isRead`: boolean
- `seenAt`: Date | null

## Usage Examples

### Connecting to the Chat Service
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000/chat', {
  transports: ['websocket']
});

// Register user
socket.emit('register', { username: 'john_doe' });

// Join a room
socket.emit('join', { room: 'general' });

// Send a message
socket.emit('message', {
  sender: 'john_doe',
  userId: 1,
  roomId: 1,
  content: 'Hello everyone!'
});

// Send direct message
socket.emit('direct_message', {
  userId: 1,
  sender: 'john_doe',
  recipient: 'jane_doe',
  content: 'Private message',
  isNewDirectMessage: true
});

// Get active rooms
socket.emit('get_active_rooms', { userId: 1 });

// Get direct messages
socket.emit('get_direct_messages', { userId: 1 });

// Get chat history
socket.emit('get_chat_history', { roomId: 1, limit: 50 });
```

## Error Handling
All error responses follow the format:
```json
{
  "message": "Error description"
}
```

Common errors:
- Username is required for registration
- Recipient not found
- Failed to save attachment
- Database errors