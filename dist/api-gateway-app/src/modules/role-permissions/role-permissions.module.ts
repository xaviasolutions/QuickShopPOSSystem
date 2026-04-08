import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RolePermissionsController } from './role-permissions.controller';
import { RolePermissionsService } from './role-permissions.service';
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
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService, ConfigService, JwtService, UsersRepository],
})
export class RolePermissionsModule {}
