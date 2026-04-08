import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';
import { CALLING_SERVICE_PATTERNS } from '@app/common/constants/patterns';
import type { CallObject, CreateCallInput, JoinCallInput, LeaveCallInput, ParticipantObject, UpdateSocketInput } from '@app/common/interfaces/calling.interface';
import type { ApiRequest } from '@app/common/interfaces/request.interface';

@Injectable()
export class CallingService {
    constructor(@Inject('CALLING_SERVICE') private readonly client: ClientProxy) {}

    createCall(data: ApiRequest<CreateCallInput>): Observable<CallObject> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.CREATE, data).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    getCall(callUuid: string): Observable<CallObject> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.GET_ONE, callUuid).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    getAllCalls(data: ApiRequest<{ status?: string }>): Observable<CallObject[]> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.GET_ALL, data).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    joinCall(data: ApiRequest<JoinCallInput>): Observable<{ participant: ParticipantObject; call: CallObject; otherParticipants: ParticipantObject[] }> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.JOIN, data).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    leaveCall(data: ApiRequest<LeaveCallInput>): Observable<{ success: boolean }> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.LEAVE, data).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    endCall(data: ApiRequest<{ callUuid: string }>): Observable<{ success: boolean }> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.END, data).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    getParticipants(callUuid: string): Observable<ParticipantObject[]> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.GET_PARTICIPANTS, callUuid).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    getIceServers(): Observable<object> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.GET_ICE_SERVERS, {}).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    getStats(): Observable<object> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.GET_STATS, {}).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    getTurnConfig(): Observable<object> {
        return this.client.send(CALLING_SERVICE_PATTERNS.CALL.GET_TURN_CONFIG, {}).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }

    getOnlineUsers(): Observable<object[]> {
        return this.client.send(CALLING_SERVICE_PATTERNS.ONLINE_USER.GET_ALL, {}).pipe(
            catchError(error => throwError(() => new HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || HttpStatus.INTERNAL_SERVER_ERROR))),
        );
    }
}
