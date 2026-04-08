import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CallingService } from './calling.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CreateCallDto, JoinCallDto, LeaveCallDto } from '@app/common/dto/calling.dto';
import type { CallObject, ParticipantObject } from '@app/common/interfaces/calling.interface';
import type { ApiRequest } from '@app/common/interfaces/request.interface';

@Controller('calling')
export class CallingController {
    constructor(private readonly callingService: CallingService) {}

    // ── Static routes first (must be before /:callUuid) ──────────────────────

    @Get('/v1/health')
    getStats(): Observable<object> {
        return this.callingService.getStats();
    }

    @Get('/v1/ice-servers')
    getIceServers(): Observable<object> {
        return this.callingService.getIceServers();
    }

    @Get('/v1/turn-config')
    getTurnConfig(): Observable<object> {
        return this.callingService.getTurnConfig();
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/online-users')
    getOnlineUsers(): Observable<object[]> {
        return this.callingService.getOnlineUsers();
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/calls')
    getAllCalls(@Req() req: Request): Observable<CallObject[]> {
        const userId = Number(req['user'].sub.toString());
        const data: ApiRequest<{ status?: string }> = { userId, data: {} };
        return this.callingService.getAllCalls(data);
    }

    // ── POST routes ───────────────────────────────────────────────────────────

    @UseGuards(GatewayAuthGuard)
    @Post('/v1/create')
    createCall(@Req() req: Request, @Body() body: CreateCallDto): Observable<CallObject> {
        const userId = Number(req['user'].sub.toString());
        const data: ApiRequest<CreateCallDto> = { userId, data: body };
        return this.callingService.createCall(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Post('/v1/join')
    joinCall(@Req() req: Request, @Body() body: JoinCallDto): Observable<{ participant: ParticipantObject; call: CallObject; otherParticipants: ParticipantObject[] }> {
        const userId = Number(req['user'].sub.toString());
        const data: ApiRequest<JoinCallDto> = { userId, data: body };
        return this.callingService.joinCall(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Post('/v1/leave')
    leaveCall(@Req() req: Request, @Body() body: LeaveCallDto): Observable<{ success: boolean }> {
        const userId = Number(req['user'].sub.toString());
        const data: ApiRequest<LeaveCallDto> = { userId, data: body };
        return this.callingService.leaveCall(data);
    }

    // ── Param routes last ─────────────────────────────────────────────────────

    @UseGuards(GatewayAuthGuard)
    @Post('/v1/:callUuid/end')
    endCall(@Req() req: Request, @Param('callUuid') callUuid: string): Observable<{ success: boolean }> {
        const userId = Number(req['user'].sub.toString());
        const data: ApiRequest<{ callUuid: string }> = { userId, data: { callUuid } };
        return this.callingService.endCall(data);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/:callUuid/participants')
    getParticipants(@Param('callUuid') callUuid: string): Observable<ParticipantObject[]> {
        return this.callingService.getParticipants(callUuid);
    }

    @UseGuards(GatewayAuthGuard)
    @Get('/v1/:callUuid')
    getCall(@Param('callUuid') callUuid: string): Observable<CallObject> {
        return this.callingService.getCall(callUuid);
    }
}
