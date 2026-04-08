import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CallingController } from './calling.controller';
import { CallingService } from './calling.service';
import { DatabaseModule } from '@app/database/database.module';
import { UsersRepository } from '@app/database/repositories/user.repository';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'CALLING_SERVICE',
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>('CALLING_SERVICE_HOST'),
                        port: configService.get<number>('CALLING_SERVICE_PORT'),
                    },
                }),
            },
        ]),
        DatabaseModule,
    ],
    controllers: [CallingController],
    providers: [CallingService, ConfigService, JwtService, UsersRepository],
})
export class CallingModule {}
