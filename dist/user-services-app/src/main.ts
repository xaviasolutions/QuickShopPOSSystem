import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UserServiceAppModule } from './user-service-app.module';
// Manually load the env file based on the same logic as your module
dotenv.config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV}`) });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserServiceAppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.DEFAULT_HOST || '0.0.0.0',
      port: parseInt(process.env.USER_SERVICE_PORT || '3002')
    },
  });

  await app.listen();
  console.log(`User Connect Service is listening on port ${process.env.USER_SERVICE_PORT}`);
}
bootstrap();