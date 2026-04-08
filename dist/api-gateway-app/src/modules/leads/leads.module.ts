import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeadsController } from './leads.controller';
import { ConfigService } from '@nestjs/config';
import { LeadsService } from './leads.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '@app/database/repositories/user.repository';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'COMMON_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('COMMON_SERVICE_HOST'),
            port: configService.get<number>('COMMON_SERVICE_PORT'),
          },
        }),
      },
    ]),
    DatabaseModule,
  ],
  providers: [LeadsService, ConfigService, JwtService, UsersRepository],
  controllers: [LeadsController],
})
export class LeadsModule { }
