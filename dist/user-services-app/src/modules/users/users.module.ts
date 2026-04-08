import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@app/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService, JwtService],
})
export class UsersModule { }
