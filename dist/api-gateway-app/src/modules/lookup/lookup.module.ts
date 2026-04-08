import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@app/database/database.module';
import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'COMMON_SERVICE',
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: { host: configService.get<string>('COMMON_SERVICE_HOST'), port: configService.get<number>('COMMON_SERVICE_PORT') },
                })
            },
        ]),
        DatabaseModule
    ],
    providers: [LookupService],
    controllers: [LookupController],
})
export class LookupModule { }