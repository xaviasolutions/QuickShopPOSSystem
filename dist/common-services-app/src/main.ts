import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CommonServiceModule } from './common-service.module';

// Manually load the env file based on the same logic as your module
dotenv.config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV}`) });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommonServiceModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.DEFAULT_HOST || '0.0.0.0',
      port: parseInt(process.env.COMMON_SERVICE_PORT || '4001')
    },
  });
  await app.listen();
  console.log(`Common Services is listening on port ${process.env.COMMON_SERVICE_PORT}`);
}
bootstrap();