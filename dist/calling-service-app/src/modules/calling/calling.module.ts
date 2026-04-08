import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Call } from '@app/database/models/call.model';
import { CallParticipant } from '@app/database/models/call-participant.model';
import { CallRepository } from '@app/database/repositories/call.repository';
import { CallParticipantRepository } from '@app/database/repositories/call-participant.repository';
import { CallingController } from './calling.controller';
import { CallingHealthController } from './calling-health.controller';
import { CallingService } from './calling.service';
import { CallingGateway } from './calling.gateway';
import { IceConfigService } from './ice-config.service';
import { SfuService } from './sfu.service';
import { OnlineUserModule } from '../online-user/online-user.module';

@Module({
    imports: [SequelizeModule.forFeature([Call, CallParticipant]), OnlineUserModule],
    controllers: [CallingController, CallingHealthController],
    providers: [CallingService, CallingGateway, CallRepository, CallParticipantRepository, IceConfigService, SfuService],
    exports: [CallingService, IceConfigService],
})
export class CallingModule {}
