import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ChatServiceAppModule } from './chat-service-app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// Manually load the env file based on the same logic as your module
dotenv.config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV}`) });

async function bootstrap() {


    // 1. Create a temporary context to read configurations
    const appContext = await NestFactory.createApplicationContext(ChatServiceAppModule);
    const configService = appContext.get(ConfigService);

    const protocol = configService.get<string>('PROTOCOL') || 'http';
    let httpsOptions: any = null;
    console.log({ protocol })


    // 2. Load SSL files if protocol is set to https
    if (protocol === 'https') {
        try {
            httpsOptions = {
                key: fs.readFileSync(path.resolve(configService.get<string>('SSL_KEY_PATH') || '')),
                cert: fs.readFileSync(path.resolve(configService.get<string>('SSL_CERT_PATH') || '')),
                ca: fs.readFileSync(path.resolve(configService.get<string>('SSL_CA_PATH') || '')),
                requestCert: false,
                rejectUnauthorized: false,
            };
        } catch (error) {
            console.error('❌ Failed to load SSL certificates:', error.message);
            // Fallback to http or exit if SSL is mandatory
        }
    }

    // Close the temp context to free up memory
    await appContext.close();

    // 3. Create the real app with httpsOptions (if any)

    // const app = await NestFactory.create(AppModule, { httpsOptions });
    const app = await NestFactory.create<NestExpressApplication>(
        ChatServiceAppModule,
        { httpsOptions }
    );
    app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
        prefix: '/uploads/', // This matches the start of your URL
    });

    const port = configService.get<number>('CHAT_SERVICE_PORT') || 4000;

    app.enableCors({
        origin: true, // or your specific frontend URL
        credentials: true,
    });
    await app.listen(port);

    console.log(`🚀 Chat Service is running on: ${protocol}://localhost:${port}`);
}
bootstrap();