# server-runner

Ek simple runner jo:
- Backend `dist/main.js` ko `child_process.fork` se start karta hai
- Frontend `dist/` folder ko static files ki tarah serve karta hai
- `/api` requests ko backend port par proxy karta hai

## Setup

```bash
cd server-runner
npm install
```

## Run

```bash
node server.js
```

## Environment Variables

| Variable  | Default | Description                  |
|-----------|---------|------------------------------|
| PORT      | 3000    | Frontend server port         |
| API_PORT  | 4000    | Backend NestJS port          |
