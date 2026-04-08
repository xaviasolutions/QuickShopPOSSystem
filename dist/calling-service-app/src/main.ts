import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CallingServiceAppModule } from './calling-service-app.module';

dotenv.config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV}`) });

async function bootstrap() {
    // HTTP app — needed for Socket.IO WebRTC gateway (same pattern as chat-service-app)
    const app = await NestFactory.create(CallingServiceAppModule);

    // Attach TCP transport for inter-service communication (same pattern as other microservices)
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: process.env.DEFAULT_HOST || '0.0.0.0',
            port: parseInt(process.env.CALLING_SERVICE_PORT || '3003'),
        },
    });

    app.enableCors({ origin: true, credentials: true });

    await app.startAllMicroservices();

    const wsPort = parseInt(process.env.CALLING_SERVICE_WS_PORT || '4001');
    await app.listen(wsPort);

    console.log(`Calling Service TCP listening on port ${process.env.CALLING_SERVICE_PORT || 3003}`);
    console.log(`Calling Service WebSocket listening on port ${wsPort}`);
}
bootstrap();
