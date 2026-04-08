# Chat Service

The Chat Service is a microservice built with NestJS to handle WebSocket-based real-time chat functionality. It uses `@nestjs/websockets` and `socket.io` to manage connections, rooms, and message broadcasting.

## Features
- WebSocket-based real-time communication.
- Room-based messaging.
- Seen/unseen message tracking.
- Typing status notifications.
- In-memory message storage.
- Client connection tracking.

## Setup

### Prerequisites
- Node.js and npm installed.
- The backend monorepo dependencies installed.

### Install Dependencies
Ensure the required dependencies are installed:
```bash
npm install
```

### Start the Chat Service
Run the chat service in development mode:
```bash
npm run start:dev -- --project=chat-service-app
```

The service will start on the default port `4000` (or the port specified in your environment variables).

## WebSocket API

### Connect to the Chat Service
Use the `socket.io-client` library to connect to the chat service from your frontend:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000/chat', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to chat service');
});

socket.on('disconnect', () => {
  console.log('Disconnected from chat service');
});
```

### Join a Room
To join a specific chat room:

```javascript
socket.emit('join', { room: 'room-name' });

socket.on('joined', (data) => {
  console.log(`Joined room: ${data.room}`);
});
```

### Send a Message
To send a message to a room:

```javascript
socket.emit('message', {
  sender: 'user-id',
  content: 'Hello, world!',
  room: 'room-name',
});
```

### Send an Attachment
To send an attachment, emit the `attachment` event with the file metadata:

```javascript
socket.emit('attachment', {
  sender: 'user-id',
  room: 'room-name',
  filename: 'example.png',
  url: 'https://localhost:4000/uploads/example.png',
});

socket.on('attachment', (data) => {
  console.log('New attachment:', data);
});
```

### Receive Messages
Listen for incoming messages:

```javascript
socket.on('message', (msg) => {
  console.log('New message:', msg);
});
```

### Mark a Message as Seen
To mark a message as seen:

```javascript
socket.emit('seen', { messageId: 123 });

socket.on('seen', (data) => {
  console.log(`Message ${data.messageId} marked as seen`);
});
```

### Typing Notifications
To notify others when a user is typing:

```javascript
socket.emit('typing', { isTyping: true });

socket.on('typing', (data) => {
  console.log(`User ${data.clientId} is typing: ${data.isTyping}`);
});
```

### Register a User
To register a user with their username:

```javascript
socket.emit('register', { username: 'john_doe' });

socket.on('registered', (data) => {
  console.log(`User registered: ${data.username}`);
});
```

### Send a Direct Message
To send a direct message to another user:

```javascript
socket.emit('direct_message', {
  sender: 'john_doe',
  recipient: 'jane_doe',
  content: 'Hello, Jane!',
});

socket.on('direct_message', (msg) => {
  console.log('New direct message:', msg);
});

socket.on('direct_message_sent', (data) => {
  console.log('Direct message sent:', data.message);
});
```

## Frontend Integration

1. **Install `socket.io-client`**:
   ```bash
   npm install socket.io-client
   ```

2. **Connect to the Chat Service**:
   Use the WebSocket API described above to establish a connection and interact with the chat service.

3. **UI Implementation**:
   - Create a chat interface with input fields for messages and a display area for chat history.
   - Use the `join` event to join rooms and the `message` event to send/receive messages.
   - Implement seen/unseen indicators and typing notifications.

4. **Handle Reconnection**:
   Implement reconnection logic to handle network interruptions:
   ```javascript
   socket.on('connect_error', (err) => {
     console.error('Connection error:', err);
   });

   socket.on('reconnect', (attempt) => {
     console.log(`Reconnected after ${attempt} attempts`);
   });
   ```

## Environment Variables

| Variable              | Default | Description                  |
|-----------------------|---------|------------------------------|
| `CHAT_SERVICE_PORT`   | `4000`  | Port for the chat service.   |

## Example Frontend Code

Here is a minimal example of a React component to integrate the chat service:

```javascript
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:4000/chat', {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat service');
      newSocket.emit('join', { room: 'global' });
    });

    newSocket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on('typing', (data) => {
      console.log(`User ${data.clientId} is typing: ${data.isTyping}`);
      setTyping(data.isTyping);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (socket && input) {
      socket.emit('message', { sender: 'user-id', content: input, room: 'global' });
      setInput('');
    }
  };

  const handleTyping = (isTyping) => {
    if (socket) {
      socket.emit('typing', { isTyping });
    }
  };

    const handleFileUpload = async (file) => {
        // Simulate file upload and get the URL
        uploadFile
        const url = await uploadFileToServer(file); // Replace with actual upload logic

        socket.emit('attachment', {
        sender: 'user-id',
        room: 'room-name',
        filename: file.name,
        url,
        });
    };

    socket.on('attachment', (data) => {
        console.log('New attachment received:', data);
        // Display the attachment in the chat UI
    });

    const uploadFileToServer = async (file) => {
        // Replace this with actual file upload logic
        return `https://localhost.com/uploads/${file.name}`;
    };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.sender}: {msg.content}</div>
        ))}
      </div>
      {typing && <div>Someone is typing...</div>}
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleTyping(true);
        }}
        onBlur={() => handleTyping(false)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default Chat;
```

This example demonstrates connecting to the chat service, joining a room, sending messages, marking messages as seen, and displaying typing notifications.

### Example Frontend Code for Direct Messaging
Here is an example of how to handle direct messaging in the frontend:

```javascript
const registerUser = (username) => {
  socket.emit('register', { username });
  socket.on('registered', (data) => {
    console.log(`User registered: ${data.username}`);
  });
};

const sendDirectMessage = (sender, recipient, content) => {
  socket.emit('direct_message', { sender, recipient, content });

  socket.on('direct_message', (msg) => {
    console.log('New direct message:', msg);
  });

  socket.on('direct_message_sent', (data) => {
    console.log('Direct message sent:', data.message);
  });
};

// Example usage
registerUser('john_doe');
sendDirectMessage('john_doe', 'jane_doe', 'Hello, Jane!');
```