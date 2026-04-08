import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OnboardingAttachmentController } from './onboarding-attachment.controller';
import { OnboardingAttachmentService } from './onboarding-attachment.service';
import { UsersRepository } from '@app/database/repositories/user.repository';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('USER_SERVICE_HOST'),
            port: configService.get<number>('USER_SERVICE_PORT'),
          },
        }),
      },
    ]),
    DatabaseModule,
  ],
  controllers: [OnboardingAttachmentController],
  providers: [OnboardingAttachmentService, ConfigService, JwtService, UsersRepository],
})
export class OnboardingAttachmentModule {}
