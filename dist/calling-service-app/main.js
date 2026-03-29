/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/calling-service-app/src/calling-service-app.module.ts"
/*!********************************************************************!*\
  !*** ./apps/calling-service-app/src/calling-service-app.module.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallingServiceAppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_module_1 = __webpack_require__(/*! libs/database/src/database.module */ "./libs/database/src/database.module.ts");
const config_module_1 = __webpack_require__(/*! ../../../libs/common/src/config/config.module */ "./libs/common/src/config/config.module.ts");
const calling_module_1 = __webpack_require__(/*! ./modules/calling/calling.module */ "./apps/calling-service-app/src/modules/calling/calling.module.ts");
const online_user_module_1 = __webpack_require__(/*! ./modules/online-user/online-user.module */ "./apps/calling-service-app/src/modules/online-user/online-user.module.ts");
let CallingServiceAppModule = class CallingServiceAppModule {
};
exports.CallingServiceAppModule = CallingServiceAppModule;
exports.CallingServiceAppModule = CallingServiceAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.CommonConfigModule,
            database_module_1.DatabaseModule,
            calling_module_1.CallingModule,
            online_user_module_1.OnlineUserModule,
        ],
        controllers: [],
        providers: [],
    })
], CallingServiceAppModule);


/***/ },

/***/ "./apps/calling-service-app/src/main.ts"
/*!**********************************************!*\
  !*** ./apps/calling-service-app/src/main.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path_1 = __webpack_require__(/*! path */ "path");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const calling_service_app_module_1 = __webpack_require__(/*! ./calling-service-app.module */ "./apps/calling-service-app/src/calling-service-app.module.ts");
dotenv.config({ path: (0, path_1.join)(process.cwd(), `.env.${process.env.NODE_ENV}`) });
async function bootstrap() {
    const app = await core_1.NestFactory.create(calling_service_app_module_1.CallingServiceAppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.DEFAULT_HOST || '0.0.0.0',
            port: parseInt(process.env.CALLING_SERVICE_PORT || '3003'),
        },
    });
    app.enableCors({ origin: true, credentials: true });
    await app.startAllMicroservices();
    const wsPort = parseInt(process.env.CALLING_SERVICE_WS_PORT || '4001');
    await app.listen(wsPort);
    console.log(`Calling Service TCP listening on port ${process.env.CALLING_SERVICE_PORT || 3003}`);
    console.log(`Calling Service WebSocket listening on port ${wsPort}`);
}
bootstrap();


/***/ },

/***/ "./apps/calling-service-app/src/modules/calling/calling-health.controller.ts"
/*!***********************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/calling/calling-health.controller.ts ***!
  \***********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallingHealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const patterns_1 = __webpack_require__(/*! @app/common/constants/patterns */ "./libs/common/src/constants/patterns.ts");
const calling_service_1 = __webpack_require__(/*! ./calling.service */ "./apps/calling-service-app/src/modules/calling/calling.service.ts");
const ice_config_service_1 = __webpack_require__(/*! ./ice-config.service */ "./apps/calling-service-app/src/modules/calling/ice-config.service.ts");
const online_user_service_1 = __webpack_require__(/*! ../online-user/online-user.service */ "./apps/calling-service-app/src/modules/online-user/online-user.service.ts");
let CallingHealthController = class CallingHealthController {
    callingService;
    iceConfigService;
    onlineUserService;
    constructor(callingService, iceConfigService, onlineUserService) {
        this.callingService = callingService;
        this.iceConfigService = iceConfigService;
        this.onlineUserService = onlineUserService;
    }
    async getStats() {
        try {
            const activeCalls = await this.callingService.getAllCalls('active');
            const turnServers = this.iceConfigService.getTurnServers();
            return {
                activeCalls: activeCalls.length,
                activeParticipants: activeCalls.reduce((sum, c) => sum + ((c.participants || []).length), 0),
                onlineUsers: this.onlineUserService.count(),
                service: 'Calling Microservice',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                turnServer: {
                    configured: turnServers.length > 0,
                    servers: turnServers.flatMap(s => Array.isArray(s.urls) ? s.urls : [s.urls]),
                    username: process.env.TURN_USERNAME || 'webrtcuser',
                },
            };
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'STATS_ERROR', status: 500 });
        }
    }
    getTurnConfig() {
        try {
            return this.iceConfigService.getTurnConfigResponse();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'TURN_CONFIG_ERROR', status: 500 });
        }
    }
};
exports.CallingHealthController = CallingHealthController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.GET_STATS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CallingHealthController.prototype, "getStats", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.GET_TURN_CONFIG),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], CallingHealthController.prototype, "getTurnConfig", null);
exports.CallingHealthController = CallingHealthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof calling_service_1.CallingService !== "undefined" && calling_service_1.CallingService) === "function" ? _a : Object, typeof (_b = typeof ice_config_service_1.IceConfigService !== "undefined" && ice_config_service_1.IceConfigService) === "function" ? _b : Object, typeof (_c = typeof online_user_service_1.OnlineUserService !== "undefined" && online_user_service_1.OnlineUserService) === "function" ? _c : Object])
], CallingHealthController);


/***/ },

/***/ "./apps/calling-service-app/src/modules/calling/calling.controller.ts"
/*!****************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/calling/calling.controller.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallingController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const patterns_1 = __webpack_require__(/*! @app/common/constants/patterns */ "./libs/common/src/constants/patterns.ts");
const calling_service_1 = __webpack_require__(/*! ./calling.service */ "./apps/calling-service-app/src/modules/calling/calling.service.ts");
let CallingController = class CallingController {
    callingService;
    constructor(callingService) {
        this.callingService = callingService;
    }
    async createCall(data) {
        try {
            return await this.callingService.createCall(data.data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getCall(callUuid) {
        try {
            return await this.callingService.getCallByUuid(callUuid);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAllCalls(data) {
        try {
            return await this.callingService.getAllCalls(data.data?.status);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async joinCall(data) {
        try {
            return await this.callingService.joinCall(data.data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_JOIN_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async leaveCall(data) {
        try {
            return await this.callingService.leaveCall(data.data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_LEAVE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async endCall(data) {
        try {
            return await this.callingService.endCall(data.data.callUuid);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_END_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getParticipants(callUuid) {
        try {
            return await this.callingService.getParticipants(callUuid);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_GET_PARTICIPANTS_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async updateSocket(data) {
        try {
            return await this.callingService.updateParticipantSocket(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_UPDATE_SOCKET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    getIceServers() {
        try {
            return this.callingService.getIceServers();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_ICE_SERVERS_ERROR', status: 400 });
        }
    }
    getTurnConfig() {
        try {
            return this.callingService.getTurnConfig();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CALL_TURN_CONFIG_ERROR', status: 400 });
        }
    }
};
exports.CallingController = CallingController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CallingController.prototype, "createCall", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CallingController.prototype, "getCall", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CallingController.prototype, "getAllCalls", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.JOIN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CallingController.prototype, "joinCall", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.LEAVE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CallingController.prototype, "leaveCall", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.END),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CallingController.prototype, "endCall", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.GET_PARTICIPANTS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CallingController.prototype, "getParticipants", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.UPDATE_SOCKET),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CallingController.prototype, "updateSocket", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.GET_ICE_SERVERS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], CallingController.prototype, "getIceServers", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.CALL.GET_TURN_CONFIG),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], CallingController.prototype, "getTurnConfig", null);
exports.CallingController = CallingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof calling_service_1.CallingService !== "undefined" && calling_service_1.CallingService) === "function" ? _a : Object])
], CallingController);


/***/ },

/***/ "./apps/calling-service-app/src/modules/calling/calling.gateway.ts"
/*!*************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/calling/calling.gateway.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallingGateway = void 0;
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const calling_service_1 = __webpack_require__(/*! ./calling.service */ "./apps/calling-service-app/src/modules/calling/calling.service.ts");
const ice_config_service_1 = __webpack_require__(/*! ./ice-config.service */ "./apps/calling-service-app/src/modules/calling/ice-config.service.ts");
const online_user_service_1 = __webpack_require__(/*! ../online-user/online-user.service */ "./apps/calling-service-app/src/modules/online-user/online-user.service.ts");
let CallingGateway = class CallingGateway {
    callingService;
    iceConfigService;
    onlineUserService;
    server;
    socketToParticipant = new Map();
    constructor(callingService, iceConfigService, onlineUserService) {
        this.callingService = callingService;
        this.iceConfigService = iceConfigService;
        this.onlineUserService = onlineUserService;
    }
    async handleConnection(client) {
        console.log(`[CallingGateway] Connected: ${client.id}`);
        const users = this.onlineUserService.getAll();
        client.emit('users-online', users);
    }
    async handleDisconnect(client) {
        console.log(`[CallingGateway] Disconnected: ${client.id}`);
        await this.cleanupOnDisconnect(client);
    }
    async handleRegisterUser(data, client) {
        const { userId, userName } = data;
        if (!userName?.trim()) {
            client.emit('error', { message: 'USERNAME_REQUIRED' });
            return;
        }
        const onlineUsers = this.onlineUserService.register(userId, userName, client.id);
        client['userId'] = userId;
        this.server.emit('users-online', onlineUsers);
    }
    async handleJoinCall(data, client) {
        const { callUuid, participantUuid, userName } = data;
        try {
            const call = await this.callingService.getCallByUuid(callUuid);
            await this.callingService.updateParticipantSocket({ participantUuid, socketId: client.id });
            this.socketToParticipant.set(client.id, participantUuid);
            client.join(callUuid);
            client.to(callUuid).emit('participant-joined', {
                participantUuid,
                userName,
                participantCount: call.participants?.length ?? 0,
            });
            const iceConfig = this.iceConfigService.getIceConfig();
            client.emit('call-joined', {
                callUuid,
                participants: (call.participants || [])
                    .filter(p => p.participantUuid !== participantUuid)
                    .map(p => ({ participantUuid: p.participantUuid, userName: p.userName })),
                iceServers: iceConfig.iceServers,
            });
        }
        catch (error) {
            client.emit('error', { message: error.message });
        }
    }
    async handleSignal(data, client) {
        const { callUuid, targetParticipantUuid, signal, type } = data;
        const fromParticipantUuid = this.socketToParticipant.get(client.id);
        if (!fromParticipantUuid) {
            client.emit('error', { message: 'NOT_IN_CALL' });
            return;
        }
        if (targetParticipantUuid) {
            const target = await this.callingService.getParticipantByUuid(targetParticipantUuid);
            if (target?.socketId) {
                this.server.to(target.socketId).emit('signal', { fromParticipantUuid, signal, type });
            }
        }
        else {
            client.to(callUuid).emit('signal', { fromParticipantUuid, signal, type });
        }
    }
    async handleSendInvitation(data, client) {
        const { targetUserId, callUuid, callType, callerId, callerName } = data;
        const targetUser = this.onlineUserService.getOne(targetUserId);
        if (!targetUser) {
            client.emit('invitation-result', { success: false, error: 'USER_OFFLINE' });
            return;
        }
        this.server.to(targetUser.socketId).emit('incoming-call', {
            callUuid,
            callType,
            callerId,
            callerName,
        });
        client.emit('invitation-result', { success: true });
    }
    async handleAcceptCall(data, client) {
        const { callUuid, callerId } = data;
        const caller = this.onlineUserService.getOne(callerId);
        if (caller?.socketId) {
            const accepter = this.onlineUserService.getOne(client['userId']);
            this.server.to(caller.socketId).emit('call-accepted', {
                callUuid,
                acceptedBy: client['userId'],
                acceptedByName: accepter?.userName ?? 'User',
            });
        }
    }
    async handleRejectCall(data, client) {
        const { callUuid, callerId } = data;
        const caller = this.onlineUserService.getOne(callerId);
        if (caller?.socketId) {
            const rejecter = this.onlineUserService.getOne(client['userId']);
            this.server.to(caller.socketId).emit('call-rejected', {
                callUuid,
                rejectedBy: client['userId'],
                rejectedByName: rejecter?.userName ?? 'User',
            });
        }
    }
    async handleLeaveCall(data, client) {
        const { callUuid, reason = 'left' } = data || {};
        if (callUuid) {
            const user = this.onlineUserService.getOne(client['userId']);
            client.to(callUuid).emit('user-left-call', {
                userId: client['userId'],
                userName: user?.userName ?? 'User',
                reason,
            });
        }
        await this.cleanupOnDisconnect(client);
    }
    async cleanupOnDisconnect(client) {
        const participantUuid = this.socketToParticipant.get(client.id);
        if (participantUuid) {
            try {
                const participant = await this.callingService.getParticipantByUuid(participantUuid);
                if (participant?.callId) {
                    const call = await this.callingService.getCallById(participant.callId);
                    if (call) {
                        await this.callingService.leaveCall({
                            callUuid: call.callUuid,
                            participantUuid,
                        });
                        client.to(call.callUuid).emit('participant-left', {
                            participantUuid,
                            participantCount: Math.max(0, (call.participants?.length ?? 1) - 1),
                        });
                    }
                }
            }
            catch (_) {
            }
            this.socketToParticipant.delete(client.id);
        }
        if (client['userId']) {
            this.onlineUserService.remove(client['userId']);
            const onlineUsers = this.onlineUserService.getAll();
            this.server.emit('users-online', onlineUsers);
        }
    }
};
exports.CallingGateway = CallingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_d = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _d : Object)
], CallingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('register-user'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], CallingGateway.prototype, "handleRegisterUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], CallingGateway.prototype, "handleJoinCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('signal'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_g = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], CallingGateway.prototype, "handleSignal", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-call-invitation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], CallingGateway.prototype, "handleSendInvitation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('accept-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_j = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], CallingGateway.prototype, "handleAcceptCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('reject-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_k = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], CallingGateway.prototype, "handleRejectCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_l = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], CallingGateway.prototype, "handleLeaveCall", null);
exports.CallingGateway = CallingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/calling',
        cors: { origin: '*' },
        transports: ['websocket', 'polling'],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof calling_service_1.CallingService !== "undefined" && calling_service_1.CallingService) === "function" ? _a : Object, typeof (_b = typeof ice_config_service_1.IceConfigService !== "undefined" && ice_config_service_1.IceConfigService) === "function" ? _b : Object, typeof (_c = typeof online_user_service_1.OnlineUserService !== "undefined" && online_user_service_1.OnlineUserService) === "function" ? _c : Object])
], CallingGateway);


/***/ },

/***/ "./apps/calling-service-app/src/modules/calling/calling.module.ts"
/*!************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/calling/calling.module.ts ***!
  \************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallingModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const call_model_1 = __webpack_require__(/*! @app/database/models/call.model */ "./libs/database/src/models/call.model.ts");
const call_participant_model_1 = __webpack_require__(/*! @app/database/models/call-participant.model */ "./libs/database/src/models/call-participant.model.ts");
const call_repository_1 = __webpack_require__(/*! @app/database/repositories/call.repository */ "./libs/database/src/repositories/call.repository.ts");
const call_participant_repository_1 = __webpack_require__(/*! @app/database/repositories/call-participant.repository */ "./libs/database/src/repositories/call-participant.repository.ts");
const calling_controller_1 = __webpack_require__(/*! ./calling.controller */ "./apps/calling-service-app/src/modules/calling/calling.controller.ts");
const calling_health_controller_1 = __webpack_require__(/*! ./calling-health.controller */ "./apps/calling-service-app/src/modules/calling/calling-health.controller.ts");
const calling_service_1 = __webpack_require__(/*! ./calling.service */ "./apps/calling-service-app/src/modules/calling/calling.service.ts");
const calling_gateway_1 = __webpack_require__(/*! ./calling.gateway */ "./apps/calling-service-app/src/modules/calling/calling.gateway.ts");
const ice_config_service_1 = __webpack_require__(/*! ./ice-config.service */ "./apps/calling-service-app/src/modules/calling/ice-config.service.ts");
const online_user_module_1 = __webpack_require__(/*! ../online-user/online-user.module */ "./apps/calling-service-app/src/modules/online-user/online-user.module.ts");
let CallingModule = class CallingModule {
};
exports.CallingModule = CallingModule;
exports.CallingModule = CallingModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([call_model_1.Call, call_participant_model_1.CallParticipant]), online_user_module_1.OnlineUserModule],
        controllers: [calling_controller_1.CallingController, calling_health_controller_1.CallingHealthController],
        providers: [calling_service_1.CallingService, calling_gateway_1.CallingGateway, call_repository_1.CallRepository, call_participant_repository_1.CallParticipantRepository, ice_config_service_1.IceConfigService],
        exports: [calling_service_1.CallingService, ice_config_service_1.IceConfigService],
    })
], CallingModule);


/***/ },

/***/ "./apps/calling-service-app/src/modules/calling/calling.service.ts"
/*!*************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/calling/calling.service.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const call_repository_1 = __webpack_require__(/*! @app/database/repositories/call.repository */ "./libs/database/src/repositories/call.repository.ts");
const call_participant_repository_1 = __webpack_require__(/*! @app/database/repositories/call-participant.repository */ "./libs/database/src/repositories/call-participant.repository.ts");
const call_participant_model_1 = __webpack_require__(/*! @app/database/models/call-participant.model */ "./libs/database/src/models/call-participant.model.ts");
const ice_config_service_1 = __webpack_require__(/*! ./ice-config.service */ "./apps/calling-service-app/src/modules/calling/ice-config.service.ts");
let CallingService = class CallingService {
    callRepository;
    participantRepository;
    iceConfigService;
    constructor(callRepository, participantRepository, iceConfigService) {
        this.callRepository = callRepository;
        this.participantRepository = participantRepository;
        this.iceConfigService = iceConfigService;
    }
    async createCall(input) {
        try {
            const { callType = 'video', isGroup = false, maxParticipants = 10 } = input || {};
            return await this.callRepository.create({
                callUuid: (0, uuid_1.v4)(),
                callType,
                isGroup,
                maxParticipants: isGroup ? maxParticipants : 2,
                status: 'active',
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getCallByUuid(callUuid) {
        try {
            const call = await this.callRepository.findOne({
                where: { callUuid },
                include: [{ model: call_participant_model_1.CallParticipant, where: { leftAt: { [sequelize_1.Op.is]: null } }, required: false }],
            });
            if (!call)
                throw new common_1.NotFoundException('CALL_NOT_FOUND');
            return call;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllCalls(status) {
        try {
            const options = {
                where: status ? { status } : {},
                include: [{ model: call_participant_model_1.CallParticipant, where: { leftAt: { [sequelize_1.Op.is]: null } }, required: false }],
            };
            return await this.callRepository.findAll(options);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async joinCall(input) {
        try {
            const { callUuid, userName, userId } = input;
            const call = await this.callRepository.findOne({
                where: { callUuid },
                include: [{ model: call_participant_model_1.CallParticipant, where: { leftAt: { [sequelize_1.Op.is]: null } }, required: false }],
            });
            if (!call)
                throw new common_1.NotFoundException('CALL_NOT_FOUND');
            if (call.status === 'ended')
                throw new common_1.BadRequestException('CALL_ALREADY_ENDED');
            const activeParticipants = call.participants || [];
            if (userId) {
                const existing = activeParticipants.find(p => p.userId === userId);
                if (existing) {
                    return {
                        participant: existing,
                        call,
                        otherParticipants: activeParticipants.filter(p => p.userId !== userId),
                    };
                }
            }
            if (activeParticipants.length >= call.maxParticipants) {
                throw new common_1.BadRequestException('CALL_IS_FULL');
            }
            const participant = await this.participantRepository.create({
                callId: call.id,
                participantUuid: (0, uuid_1.v4)(),
                userName,
                userId: userId || undefined,
            });
            return {
                participant,
                call,
                otherParticipants: activeParticipants,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async leaveCall(input) {
        try {
            const { callUuid, participantUuid } = input;
            const call = await this.callRepository.findOne({ where: { callUuid } });
            if (!call)
                throw new common_1.NotFoundException('CALL_NOT_FOUND');
            const participant = await this.participantRepository.findOne({
                where: { participantUuid, callId: call.id },
            });
            if (!participant)
                throw new common_1.NotFoundException('PARTICIPANT_NOT_FOUND');
            await participant.update({ leftAt: new Date() });
            const remaining = await this.participantRepository.findAll({
                where: { callId: call.id, leftAt: { [sequelize_1.Op.is]: null } },
            });
            if (remaining.length === 0) {
                await call.update({ status: 'ended' });
            }
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async endCall(callUuid) {
        try {
            const call = await this.callRepository.findOne({ where: { callUuid } });
            if (!call)
                throw new common_1.NotFoundException('CALL_NOT_FOUND');
            await call.update({ status: 'ended' });
            const activeParticipants = await this.participantRepository.findAll({
                where: { callId: call.id, leftAt: { [sequelize_1.Op.is]: null } },
            });
            for (const p of activeParticipants) {
                await p.update({ leftAt: new Date() });
            }
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getParticipants(callUuid) {
        try {
            const call = await this.callRepository.findOne({ where: { callUuid } });
            if (!call)
                throw new common_1.NotFoundException('CALL_NOT_FOUND');
            return await this.participantRepository.findAll({
                where: { callId: call.id, leftAt: { [sequelize_1.Op.is]: null } },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateParticipantSocket(input) {
        try {
            const { participantUuid, socketId } = input;
            const participant = await this.participantRepository.findOne({ where: { participantUuid } });
            if (!participant)
                throw new common_1.NotFoundException('PARTICIPANT_NOT_FOUND');
            return await participant.update({ socketId });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getParticipantByUuid(participantUuid) {
        return this.participantRepository.findOne({ where: { participantUuid } });
    }
    async getCallById(callId) {
        return this.callRepository.findOne({
            where: { id: callId },
            include: [{ model: call_participant_model_1.CallParticipant, where: { leftAt: { [sequelize_1.Op.is]: null } }, required: false }],
        });
    }
    getIceServers() {
        return this.iceConfigService.getIceConfig();
    }
    getTurnConfig() {
        return this.iceConfigService.getTurnConfigResponse();
    }
};
exports.CallingService = CallingService;
exports.CallingService = CallingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof call_repository_1.CallRepository !== "undefined" && call_repository_1.CallRepository) === "function" ? _a : Object, typeof (_b = typeof call_participant_repository_1.CallParticipantRepository !== "undefined" && call_participant_repository_1.CallParticipantRepository) === "function" ? _b : Object, typeof (_c = typeof ice_config_service_1.IceConfigService !== "undefined" && ice_config_service_1.IceConfigService) === "function" ? _c : Object])
], CallingService);


/***/ },

/***/ "./apps/calling-service-app/src/modules/calling/ice-config.service.ts"
/*!****************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/calling/ice-config.service.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IceConfigService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let IceConfigService = class IceConfigService {
    turnUrls;
    turnUsername;
    turnCredential;
    iceConfig;
    constructor() {
        this.turnUrls = process.env.TURN_URLS
            ? process.env.TURN_URLS.split(',').map(u => u.trim())
            : ['turn:51.21.167.29:3478', 'turns:51.21.167.29:5349'];
        this.turnUsername = process.env.TURN_USERNAME || 'webrtcuser';
        this.turnCredential = process.env.TURN_CREDENTIAL || 'webrtcpass123';
        this.iceConfig = {
            iceServers: [
                {
                    urls: [
                        'stun:stun.l.google.com:19302',
                        'stun:stun1.l.google.com:19302',
                        'stun:stun2.l.google.com:19302',
                        'stun:stun3.l.google.com:19302',
                        'stun:stun4.l.google.com:19302',
                    ],
                },
                {
                    urls: this.turnUrls,
                    username: this.turnUsername,
                    credential: this.turnCredential,
                },
            ],
            iceCandidatePoolSize: 10,
            iceTransportPolicy: 'all',
            bundlePolicy: 'max-bundle',
            rtcpMuxPolicy: 'require',
        };
        this.logConfiguration();
    }
    getIceConfig() {
        return this.iceConfig;
    }
    getIceServers() {
        return this.iceConfig.iceServers;
    }
    getTurnServers() {
        return this.iceConfig.iceServers.filter(s => {
            const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
            return urls.some(u => u.startsWith('turn:') || u.startsWith('turns:'));
        });
    }
    getTurnConfigResponse() {
        return {
            success: true,
            iceServers: this.iceConfig.iceServers,
            config: {
                iceCandidatePoolSize: this.iceConfig.iceCandidatePoolSize,
                iceTransportPolicy: this.iceConfig.iceTransportPolicy,
                bundlePolicy: this.iceConfig.bundlePolicy,
                rtcpMuxPolicy: this.iceConfig.rtcpMuxPolicy,
            },
            info: {
                stunServers: this.iceConfig.iceServers[0].urls.length,
                turnServers: this.turnUrls.length,
                turnUsername: this.turnUsername,
                note: 'Use these ICE servers for WebRTC peer connections',
            },
        };
    }
    logConfiguration() {
        console.log('\n🔧 ICE Server Configuration:');
        console.log('   STUN Servers: Google (5 servers)');
        console.log(`   TURN Servers: ${this.turnUrls.join(', ')}`);
        console.log(`   TURN Username: ${this.turnUsername}`);
        console.log(`   TURN Credential: ***${this.turnCredential.slice(-4)}`);
        const usingOwn = this.turnUrls.some(u => u.includes('51.21.167.29'));
        console.log(`   Status: ${usingOwn ? '✅ Using YOUR TURN server' : '⚠️  Using public TURN'}`);
    }
};
exports.IceConfigService = IceConfigService;
exports.IceConfigService = IceConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IceConfigService);


/***/ },

/***/ "./apps/calling-service-app/src/modules/online-user/online-user.controller.ts"
/*!************************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/online-user/online-user.controller.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnlineUserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const patterns_1 = __webpack_require__(/*! @app/common/constants/patterns */ "./libs/common/src/constants/patterns.ts");
const online_user_service_1 = __webpack_require__(/*! ./online-user.service */ "./apps/calling-service-app/src/modules/online-user/online-user.service.ts");
let OnlineUserController = class OnlineUserController {
    onlineUserService;
    constructor(onlineUserService) {
        this.onlineUserService = onlineUserService;
    }
    register(data) {
        try {
            return this.onlineUserService.register(data.userId, data.userName, data.socketId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'ONLINE_USER_REGISTER_ERROR', status: 400 });
        }
    }
    remove(userId) {
        try {
            return this.onlineUserService.remove(userId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'ONLINE_USER_REMOVE_ERROR', status: 400 });
        }
    }
    getAll() {
        return this.onlineUserService.getAll();
    }
    getOne(userId) {
        return this.onlineUserService.getOne(userId);
    }
    updateLastSeen(userId) {
        this.onlineUserService.updateLastSeen(userId);
    }
};
exports.OnlineUserController = OnlineUserController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.ONLINE_USER.REGISTER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], OnlineUserController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.ONLINE_USER.REMOVE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], OnlineUserController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.ONLINE_USER.GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], OnlineUserController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.ONLINE_USER.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], OnlineUserController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.CALLING_SERVICE_PATTERNS.ONLINE_USER.UPDATE_LAST_SEEN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnlineUserController.prototype, "updateLastSeen", null);
exports.OnlineUserController = OnlineUserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof online_user_service_1.OnlineUserService !== "undefined" && online_user_service_1.OnlineUserService) === "function" ? _a : Object])
], OnlineUserController);


/***/ },

/***/ "./apps/calling-service-app/src/modules/online-user/online-user.module.ts"
/*!********************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/online-user/online-user.module.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnlineUserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const online_user_controller_1 = __webpack_require__(/*! ./online-user.controller */ "./apps/calling-service-app/src/modules/online-user/online-user.controller.ts");
const online_user_service_1 = __webpack_require__(/*! ./online-user.service */ "./apps/calling-service-app/src/modules/online-user/online-user.service.ts");
let OnlineUserModule = class OnlineUserModule {
};
exports.OnlineUserModule = OnlineUserModule;
exports.OnlineUserModule = OnlineUserModule = __decorate([
    (0, common_1.Module)({
        controllers: [online_user_controller_1.OnlineUserController],
        providers: [online_user_service_1.OnlineUserService],
        exports: [online_user_service_1.OnlineUserService],
    })
], OnlineUserModule);


/***/ },

/***/ "./apps/calling-service-app/src/modules/online-user/online-user.service.ts"
/*!*********************************************************************************!*\
  !*** ./apps/calling-service-app/src/modules/online-user/online-user.service.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnlineUserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let OnlineUserService = class OnlineUserService {
    users = new Map();
    register(userId, userName, socketId) {
        if (!userName?.trim())
            throw new Error('ONLINE_USER_USERNAME_REQUIRED');
        this.users.set(userId, {
            userId,
            userName: userName.trim(),
            socketId,
            isOnline: true,
            lastSeen: new Date().toISOString(),
        });
        return this.getAll();
    }
    remove(userId) {
        const user = this.users.get(userId);
        this.users.delete(userId);
        return user;
    }
    getAll() {
        return Array.from(this.users.values()).map(u => ({
            userId: u.userId,
            userName: u.userName,
            isOnline: true,
        }));
    }
    getOne(userId) {
        return this.users.get(userId);
    }
    updateLastSeen(userId) {
        const user = this.users.get(userId);
        if (user) {
            user.lastSeen = new Date().toISOString();
            this.users.set(userId, user);
        }
    }
    count() {
        return this.users.size;
    }
};
exports.OnlineUserService = OnlineUserService;
exports.OnlineUserService = OnlineUserService = __decorate([
    (0, common_1.Injectable)()
], OnlineUserService);


/***/ },

/***/ "./libs/common/src/config/config.module.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/config/config.module.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonConfigModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let CommonConfigModule = class CommonConfigModule {
};
exports.CommonConfigModule = CommonConfigModule;
exports.CommonConfigModule = CommonConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [
                    `.env.${process.env.NODE_ENV}`,
                    `./apps/${process.env.SERVICE_NAME}/.env.${process.env.NODE_ENV}`
                ],
                isGlobal: true,
            }),
        ],
    })
], CommonConfigModule);


/***/ },

/***/ "./libs/common/src/constants/patterns.ts"
/*!***********************************************!*\
  !*** ./libs/common/src/constants/patterns.ts ***!
  \***********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COMMON_SERVICES_PATTERNS = exports.CALLING_SERVICE_PATTERNS = exports.USER_SERVICES_PATTERN = void 0;
exports.USER_SERVICES_PATTERN = {
    USER: {
        GET_EMAILS: { cmd: 'user_get_email' },
        CREATE_USER: { cmd: 'user_create' },
        LOGIN_USER: { cmd: 'user_login' },
        GET_USER_INFO: { cmd: 'user_get_info' },
        GET_ALL_USERS: { cmd: 'user_get_all' },
        CREATE_ONBOARD_USER: { cmd: 'user_create_onboard' }
    },
    COMPANY: {
        CREATE: { cmd: 'company_create' },
        GET_ONE: { cmd: 'company_get_one' },
        GET_ALL: { cmd: 'company_get_all' },
        UPDATE: { cmd: 'company_update' },
        DELETE: { cmd: 'company_delete' },
    },
    ROLES: {
        CREATE: { cmd: 'role_create' },
        GET_ONE: { cmd: 'role_get_one' },
        GET_BY_COMPANY: { cmd: 'role_get_by_company' },
        UPDATE: { cmd: 'role_update' },
        DELETE: { cmd: 'role_delete' },
    },
    PERMISSIONS: {
        CREATE: { cmd: 'permission_create' },
        GET_ONE: { cmd: 'permission_get_one' },
        GET_ALL: { cmd: 'permission_get_all' },
        UPDATE: { cmd: 'permission_update' },
        DELETE: { cmd: 'permission_delete' },
    },
    ROLE_PERMISSIONS: {
        ASSIGN: { cmd: 'role_permission_assign' },
        REMOVE: { cmd: 'role_permission_remove' },
        GET_BY_ROLE: { cmd: 'role_permission_get_by_role' },
    },
    USER_ROLES: {
        ASSIGN: { cmd: 'user_role_assign' },
        REMOVE: { cmd: 'user_role_remove' },
        GET_BY_COMPANY_USER: { cmd: 'user_role_get_by_company_user' },
    },
    COMPANY_USER: {
        CREATE: { cmd: 'company_user_create' },
        GET_ONE: { cmd: 'company_user_get_one' },
        GET_ALL: { cmd: 'company_user_get_all' },
        GET_BY_COMPANY: { cmd: 'company_user_get_by_company' },
        GET_BY_USER: { cmd: 'company_user_get_by_user' },
        REMOVE: { cmd: 'company_user_remove' },
    },
    ONBOARDING_COMPANY: {
        CREATE: { cmd: 'onboarding_company_create' },
        GET_ONE: { cmd: 'onboarding_company_get_one' },
        GET_ALL: { cmd: 'onboarding_company_get_all' },
        GET_BY_USER: { cmd: 'onboarding_company_get_by_user' },
        UPDATE: { cmd: 'onboarding_company_update' },
        APPROVE: { cmd: 'onboarding_company_approve' },
        DELETE: { cmd: 'onboarding_company_delete' },
    },
    ONBOARDING_ATTACHMENT: {
        CREATE: { cmd: 'onboarding_attachment_create' },
        BULK_CREATE: { cmd: 'onboarding_attachment_bulk_create' },
        GET_BY_ONBOARDING: { cmd: 'onboarding_attachment_get_by_onboarding' },
        DELETE: { cmd: 'onboarding_attachment_delete' },
    },
    ONBOARDING_VERIFICATION: {
        CREATE: { cmd: 'onboarding_verification_create' },
        BULK_CREATE: { cmd: 'onboarding_verification_bulk_create' },
        GET_BY_ONBOARDING: { cmd: 'onboarding_verification_get_by_onboarding' },
        UPDATE: { cmd: 'onboarding_verification_update' },
        DELETE: { cmd: 'onboarding_verification_delete' },
    },
};
exports.CALLING_SERVICE_PATTERNS = {
    CALL: {
        CREATE: { cmd: 'call_create' },
        GET_ONE: { cmd: 'call_get_one' },
        GET_ALL: { cmd: 'call_get_all' },
        JOIN: { cmd: 'call_join' },
        LEAVE: { cmd: 'call_leave' },
        END: { cmd: 'call_end' },
        GET_PARTICIPANTS: { cmd: 'call_get_participants' },
        UPDATE_SOCKET: { cmd: 'call_update_socket' },
        GET_ICE_SERVERS: { cmd: 'call_get_ice_servers' },
        GET_STATS: { cmd: 'call_get_stats' },
        GET_TURN_CONFIG: { cmd: 'call_get_turn_config' },
    },
    ONLINE_USER: {
        REGISTER: { cmd: 'online_user_register' },
        REMOVE: { cmd: 'online_user_remove' },
        GET_ALL: { cmd: 'online_user_get_all' },
        GET_ONE: { cmd: 'online_user_get_one' },
        UPDATE_LAST_SEEN: { cmd: 'online_user_update_last_seen' },
    },
};
exports.COMMON_SERVICES_PATTERNS = {
    NOTIFICATION: {
        CREATE_BULK_NOTIFICATION: { cmd: 'notification_create_bulk' },
        BULK_CREATE_NOTIFICATION: { cmd: 'notification_bulk_create' },
        POST: { cmd: 'notification_post' },
        GET_USER_NOTIFICATIONS: { cmd: 'notification_get_user_notifications' },
        GET_UNREAD_NOTIFICATIONS: { cmd: 'notification_get_unread' },
        GET_UNREAD_COUNT: { cmd: 'notification_get_unread_count' },
        MARK_AS_READ: { cmd: 'notification_mark_as_read' },
        CREATE_NOTIFICATION: { cmd: 'notification_create' },
        CREATE_ADMIN_BROADCAST: { cmd: 'notification_create_admin_broadcast' },
        CREATE_VENDOR_BROADCAST: { cmd: 'notification_create_vendor_broadcast' },
        APPROVE_BROADCAST: { cmd: 'notification_approve_broadcast' },
        GET_VENDOR_BROADCAST_REQUESTS: { cmd: 'notification_get_vendor_broadcast_requests' },
        GET_ADMIN_BROADCAST_HISTORY: { cmd: 'notification_get_admin_broadcast_history' },
        GET_VENDOR_CUSTOMERS_COUNT: { cmd: 'notification_get_vendor_customers_count' },
        GET_VENDOR_BROADCAST_HISTORY: { cmd: 'notification_get_vendor_broadcast_history' },
    },
    LOOKUP: {
        CREATE: { cmd: 'lookup_create' },
        GET_PARENT: { cmd: 'lookup_get_parent_child' },
        GET_ALL_PARENTS: { cmd: 'lookup_get_all_parent' },
        DELETE_ROW: { cmd: 'lookup_delete_row' }
    },
    LEADS: {
        CREATE: { cmd: 'leads_create' },
        GET_ONE: { cmd: 'leads_get_one' },
        GET_ALL: { cmd: 'leads_get_all' },
        UPDATE: { cmd: 'leads_update' },
        DELETE: { cmd: 'leads_delete' },
    },
};


/***/ },

/***/ "./libs/database/src/database.module.ts"
/*!**********************************************!*\
  !*** ./libs/database/src/database.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const config_module_1 = __webpack_require__(/*! @app/common/config/config.module */ "./libs/common/src/config/config.module.ts");
const model_1 = __webpack_require__(/*! ./models/model */ "./libs/database/src/models/model.ts");
const repository_1 = __webpack_require__(/*! ./repositories/repository */ "./libs/database/src/repositories/repository.ts");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_module_1.CommonConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    dialect: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    models: model_1.ALL_MODELS,
                    autoLoadModels: true,
                    sync: { force: true },
                    define: {
                        freezeTableName: true,
                    },
                    logging: false,
                }),
            }),
            sequelize_1.SequelizeModule.forFeature(model_1.ALL_MODELS),
        ],
        providers: [...repository_1.ALL_REPOSITORY],
        exports: [sequelize_1.SequelizeModule, ...repository_1.ALL_REPOSITORY],
    })
], DatabaseModule);


/***/ },

/***/ "./libs/database/src/models/call-participant.model.ts"
/*!************************************************************!*\
  !*** ./libs/database/src/models/call-participant.model.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallParticipant = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const call_model_1 = __webpack_require__(/*! ./call.model */ "./libs/database/src/models/call.model.ts");
let CallParticipant = class CallParticipant extends sequelize_typescript_1.Model {
    callId;
    participantUuid;
    userName;
    userId;
    socketId;
    leftAt;
    call;
};
exports.CallParticipant = CallParticipant;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => call_model_1.Call),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CallParticipant.prototype, "callId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], CallParticipant.prototype, "participantUuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], CallParticipant.prototype, "userName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], CallParticipant.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], CallParticipant.prototype, "socketId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CallParticipant.prototype, "leftAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => call_model_1.Call),
    __metadata("design:type", typeof (_b = typeof call_model_1.Call !== "undefined" && call_model_1.Call) === "function" ? _b : Object)
], CallParticipant.prototype, "call", void 0);
exports.CallParticipant = CallParticipant = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'call_participants',
        timestamps: true,
        underscored: true,
    })
], CallParticipant);


/***/ },

/***/ "./libs/database/src/models/call.model.ts"
/*!************************************************!*\
  !*** ./libs/database/src/models/call.model.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Call = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const call_participant_model_1 = __webpack_require__(/*! ./call-participant.model */ "./libs/database/src/models/call-participant.model.ts");
let Call = class Call extends sequelize_typescript_1.Model {
    callUuid;
    callType;
    isGroup;
    maxParticipants;
    status;
    isDeleted;
    participants;
};
exports.Call = Call;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Call.prototype, "callUuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('audio', 'video', 'screen'),
        allowNull: false,
        defaultValue: 'video',
    }),
    __metadata("design:type", String)
], Call.prototype, "callType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Call.prototype, "isGroup", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 2,
    }),
    __metadata("design:type", Number)
], Call.prototype, "maxParticipants", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('active', 'ended'),
        allowNull: false,
        defaultValue: 'active',
    }),
    __metadata("design:type", String)
], Call.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Call.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => call_participant_model_1.CallParticipant, 'callId'),
    __metadata("design:type", Array)
], Call.prototype, "participants", void 0);
exports.Call = Call = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isDeleted: false },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'calls',
        timestamps: true,
        underscored: true,
    })
], Call);


/***/ },

/***/ "./libs/database/src/models/company.model.ts"
/*!***************************************************!*\
  !*** ./libs/database/src/models/company.model.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Company = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const company_user_model_1 = __webpack_require__(/*! ./company_user.model */ "./libs/database/src/models/company_user.model.ts");
const role_model_1 = __webpack_require__(/*! ./role.model */ "./libs/database/src/models/role.model.ts");
let Company = class Company extends sequelize_typescript_1.Model {
    name;
    description;
    status;
    logo;
    isDeleted;
    companyUsers;
    roles;
};
exports.Company = Company;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
    }),
    __metadata("design:type", String)
], Company.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Company.prototype, "logo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Company.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => company_user_model_1.CompanyUser, 'companyId'),
    __metadata("design:type", Array)
], Company.prototype, "companyUsers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => role_model_1.Role, 'companyId'),
    __metadata("design:type", Array)
], Company.prototype, "roles", void 0);
exports.Company = Company = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: {
            isDeleted: false
        }
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'company',
        timestamps: true,
        underscored: true
    })
], Company);


/***/ },

/***/ "./libs/database/src/models/company_user.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/company_user.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyUser = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const user_model_1 = __webpack_require__(/*! ./user.model */ "./libs/database/src/models/user.model.ts");
const company_model_1 = __webpack_require__(/*! ./company.model */ "./libs/database/src/models/company.model.ts");
const user_role_model_1 = __webpack_require__(/*! ./user_role.model */ "./libs/database/src/models/user_role.model.ts");
let CompanyUser = class CompanyUser extends sequelize_typescript_1.Model {
    companyId;
    userId;
    isInitialAdmin;
    isDeleted;
    joinedAt;
    user;
    company;
    userRoles;
};
exports.CompanyUser = CompanyUser;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CompanyUser.prototype, "companyId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CompanyUser.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], CompanyUser.prototype, "isInitialAdmin", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], CompanyUser.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: new Date(),
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CompanyUser.prototype, "joinedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, 'userId'),
    __metadata("design:type", typeof (_b = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _b : Object)
], CompanyUser.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_model_1.Company, 'companyId'),
    __metadata("design:type", typeof (_c = typeof company_model_1.Company !== "undefined" && company_model_1.Company) === "function" ? _c : Object)
], CompanyUser.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_role_model_1.UserRole, 'companyUserId'),
    __metadata("design:type", Array)
], CompanyUser.prototype, "userRoles", void 0);
exports.CompanyUser = CompanyUser = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: {
            isDeleted: false
        }
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'company_user',
        timestamps: true,
        underscored: true
    })
], CompanyUser);


/***/ },

/***/ "./libs/database/src/models/leads.model.ts"
/*!*************************************************!*\
  !*** ./libs/database/src/models/leads.model.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lead = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Lead = class Lead extends sequelize_typescript_1.Model {
    name;
    title;
    source;
    email;
    phone;
    status;
    description;
    metadata;
    isDeleted;
};
exports.Lead = Lead;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lead.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lead.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lead.prototype, "source", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Lead.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Lead.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'contacted', 'qualified', 'converted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    }),
    __metadata("design:type", String)
], Lead.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Lead.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Lead.prototype, "metadata", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Lead.prototype, "isDeleted", void 0);
exports.Lead = Lead = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isDeleted: false },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'leads',
        timestamps: true,
        underscored: true,
    })
], Lead);


/***/ },

/***/ "./libs/database/src/models/lookup.model.ts"
/*!**************************************************!*\
  !*** ./libs/database/src/models/lookup.model.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lookup = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Lookup = class Lookup extends sequelize_typescript_1.Model {
    name;
    parent;
    metadata;
    icon;
    createdBy;
    isDeleted;
    parentLookup;
    children;
};
exports.Lookup = Lookup;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
    }),
    __metadata("design:type", String)
], Lookup.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Lookup),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Lookup.prototype, "parent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
    }),
    __metadata("design:type", String)
], Lookup.prototype, "metadata", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Lookup.prototype, "icon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Lookup.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Lookup.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Lookup),
    __metadata("design:type", Lookup)
], Lookup.prototype, "parentLookup", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Lookup),
    __metadata("design:type", Array)
], Lookup.prototype, "children", void 0);
exports.Lookup = Lookup = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: {
            isDeleted: false
        }
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'lookup',
        timestamps: true,
        underscored: true
    })
], Lookup);


/***/ },

/***/ "./libs/database/src/models/model.ts"
/*!*******************************************!*\
  !*** ./libs/database/src/models/model.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_MODELS = void 0;
const lookup_model_1 = __webpack_require__(/*! ./lookup.model */ "./libs/database/src/models/lookup.model.ts");
const notifications_model_1 = __webpack_require__(/*! ./notifications.model */ "./libs/database/src/models/notifications.model.ts");
const user_model_1 = __webpack_require__(/*! ./user.model */ "./libs/database/src/models/user.model.ts");
const user_map_notification_model_1 = __webpack_require__(/*! ./user-map-notification.model */ "./libs/database/src/models/user-map-notification.model.ts");
const company_user_model_1 = __webpack_require__(/*! ./company_user.model */ "./libs/database/src/models/company_user.model.ts");
const role_model_1 = __webpack_require__(/*! ./role.model */ "./libs/database/src/models/role.model.ts");
const permission_model_1 = __webpack_require__(/*! ./permission.model */ "./libs/database/src/models/permission.model.ts");
const role_permission_model_1 = __webpack_require__(/*! ./role_permission.model */ "./libs/database/src/models/role_permission.model.ts");
const user_role_model_1 = __webpack_require__(/*! ./user_role.model */ "./libs/database/src/models/user_role.model.ts");
const company_model_1 = __webpack_require__(/*! ./company.model */ "./libs/database/src/models/company.model.ts");
const leads_model_1 = __webpack_require__(/*! ./leads.model */ "./libs/database/src/models/leads.model.ts");
const onboarding_company_model_1 = __webpack_require__(/*! ./onboarding-company.model */ "./libs/database/src/models/onboarding-company.model.ts");
const onboarding_attachment_model_1 = __webpack_require__(/*! ./onboarding-attachment.model */ "./libs/database/src/models/onboarding-attachment.model.ts");
const onboarding_verification_model_1 = __webpack_require__(/*! ./onboarding-verification.model */ "./libs/database/src/models/onboarding-verification.model.ts");
const call_model_1 = __webpack_require__(/*! ./call.model */ "./libs/database/src/models/call.model.ts");
const call_participant_model_1 = __webpack_require__(/*! ./call-participant.model */ "./libs/database/src/models/call-participant.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos/pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
const category_model_1 = __webpack_require__(/*! ./pos/category.model */ "./libs/database/src/models/pos/category.model.ts");
const unit_model_1 = __webpack_require__(/*! ./pos/unit.model */ "./libs/database/src/models/pos/unit.model.ts");
const product_model_1 = __webpack_require__(/*! ./pos/product.model */ "./libs/database/src/models/pos/product.model.ts");
const product_variant_model_1 = __webpack_require__(/*! ./pos/product-variant.model */ "./libs/database/src/models/pos/product-variant.model.ts");
const product_price_model_1 = __webpack_require__(/*! ./pos/product-price.model */ "./libs/database/src/models/pos/product-price.model.ts");
const supplier_model_1 = __webpack_require__(/*! ./pos/supplier.model */ "./libs/database/src/models/pos/supplier.model.ts");
const batch_model_1 = __webpack_require__(/*! ./pos/batch.model */ "./libs/database/src/models/pos/batch.model.ts");
const purchase_model_1 = __webpack_require__(/*! ./pos/purchase.model */ "./libs/database/src/models/pos/purchase.model.ts");
const purchase_item_model_1 = __webpack_require__(/*! ./pos/purchase-item.model */ "./libs/database/src/models/pos/purchase-item.model.ts");
const purchase_return_model_1 = __webpack_require__(/*! ./pos/purchase-return.model */ "./libs/database/src/models/pos/purchase-return.model.ts");
const supplier_payment_model_1 = __webpack_require__(/*! ./pos/supplier-payment.model */ "./libs/database/src/models/pos/supplier-payment.model.ts");
const customer_model_1 = __webpack_require__(/*! ./pos/customer.model */ "./libs/database/src/models/pos/customer.model.ts");
const customer_payment_model_1 = __webpack_require__(/*! ./pos/customer-payment.model */ "./libs/database/src/models/pos/customer-payment.model.ts");
const udhaar_transaction_model_1 = __webpack_require__(/*! ./pos/udhaar-transaction.model */ "./libs/database/src/models/pos/udhaar-transaction.model.ts");
const sale_model_1 = __webpack_require__(/*! ./pos/sale.model */ "./libs/database/src/models/pos/sale.model.ts");
const sale_item_model_1 = __webpack_require__(/*! ./pos/sale-item.model */ "./libs/database/src/models/pos/sale-item.model.ts");
const sale_return_model_1 = __webpack_require__(/*! ./pos/sale-return.model */ "./libs/database/src/models/pos/sale-return.model.ts");
const stock_adjustment_model_1 = __webpack_require__(/*! ./pos/stock-adjustment.model */ "./libs/database/src/models/pos/stock-adjustment.model.ts");
const expense_model_1 = __webpack_require__(/*! ./pos/expense.model */ "./libs/database/src/models/pos/expense.model.ts");
const audit_log_model_1 = __webpack_require__(/*! ./pos/audit-log.model */ "./libs/database/src/models/pos/audit-log.model.ts");
const fbr_invoice_log_model_1 = __webpack_require__(/*! ./pos/fbr-invoice-log.model */ "./libs/database/src/models/pos/fbr-invoice-log.model.ts");
const tax_setting_model_1 = __webpack_require__(/*! ./pos/tax-setting.model */ "./libs/database/src/models/pos/tax-setting.model.ts");
const sale_payment_model_1 = __webpack_require__(/*! ./pos/sale-payment.model */ "./libs/database/src/models/pos/sale-payment.model.ts");
const discount_rule_model_1 = __webpack_require__(/*! ./pos/discount-rule.model */ "./libs/database/src/models/pos/discount-rule.model.ts");
const loyalty_points_log_model_1 = __webpack_require__(/*! ./pos/loyalty-points-log.model */ "./libs/database/src/models/pos/loyalty-points-log.model.ts");
const supplier_ledger_transaction_model_1 = __webpack_require__(/*! ./pos/supplier-ledger-transaction.model */ "./libs/database/src/models/pos/supplier-ledger-transaction.model.ts");
const store_setting_model_1 = __webpack_require__(/*! ./pos/store-setting.model */ "./libs/database/src/models/pos/store-setting.model.ts");
const fbr_setting_model_1 = __webpack_require__(/*! ./pos/fbr-setting.model */ "./libs/database/src/models/pos/fbr-setting.model.ts");
const terminal_model_1 = __webpack_require__(/*! ./pos/terminal.model */ "./libs/database/src/models/pos/terminal.model.ts");
const offline_sync_queue_model_1 = __webpack_require__(/*! ./pos/offline-sync-queue.model */ "./libs/database/src/models/pos/offline-sync-queue.model.ts");
const sms_whatsapp_log_model_1 = __webpack_require__(/*! ./pos/sms-whatsapp-log.model */ "./libs/database/src/models/pos/sms-whatsapp-log.model.ts");
const cron_job_log_model_1 = __webpack_require__(/*! ./pos/cron-job-log.model */ "./libs/database/src/models/pos/cron-job-log.model.ts");
const pos_role_model_1 = __webpack_require__(/*! ./pos/pos-role.model */ "./libs/database/src/models/pos/pos-role.model.ts");
const pos_permission_model_1 = __webpack_require__(/*! ./pos/pos-permission.model */ "./libs/database/src/models/pos/pos-permission.model.ts");
const pos_role_permission_model_1 = __webpack_require__(/*! ./pos/pos-role-permission.model */ "./libs/database/src/models/pos/pos-role-permission.model.ts");
const pos_user_role_model_1 = __webpack_require__(/*! ./pos/pos-user-role.model */ "./libs/database/src/models/pos/pos-user-role.model.ts");
const pos_notification_model_1 = __webpack_require__(/*! ./pos/pos-notification.model */ "./libs/database/src/models/pos/pos-notification.model.ts");
const product_image_model_1 = __webpack_require__(/*! ./pos/product-image.model */ "./libs/database/src/models/pos/product-image.model.ts");
exports.ALL_MODELS = [
    user_model_1.User,
    notifications_model_1.Notification,
    lookup_model_1.Lookup,
    user_map_notification_model_1.UserMapNotification,
    company_user_model_1.CompanyUser,
    role_model_1.Role,
    permission_model_1.Permission,
    role_permission_model_1.RolePermission,
    user_role_model_1.UserRole,
    company_model_1.Company,
    leads_model_1.Lead,
    onboarding_company_model_1.OnboardingCompany,
    onboarding_attachment_model_1.OnboardingAttachment,
    onboarding_verification_model_1.OnboardingVerification,
    call_model_1.Call,
    call_participant_model_1.CallParticipant,
    pos_user_model_1.PosUser,
    category_model_1.Category,
    unit_model_1.Unit,
    product_model_1.Product,
    product_variant_model_1.ProductVariant,
    product_price_model_1.ProductPrice,
    supplier_model_1.Supplier,
    batch_model_1.Batch,
    purchase_model_1.Purchase,
    purchase_item_model_1.PurchaseItem,
    purchase_return_model_1.PurchaseReturn,
    supplier_payment_model_1.SupplierPayment,
    customer_model_1.Customer,
    customer_payment_model_1.CustomerPayment,
    udhaar_transaction_model_1.UdhaarTransaction,
    sale_model_1.Sale,
    sale_item_model_1.SaleItem,
    sale_return_model_1.SaleReturn,
    stock_adjustment_model_1.StockAdjustment,
    expense_model_1.Expense,
    audit_log_model_1.AuditLog,
    fbr_invoice_log_model_1.FbrInvoiceLog,
    tax_setting_model_1.TaxSetting,
    sale_payment_model_1.SalePayment,
    discount_rule_model_1.DiscountRule,
    loyalty_points_log_model_1.LoyaltyPointsLog,
    supplier_ledger_transaction_model_1.SupplierLedgerTransaction,
    store_setting_model_1.StoreSetting,
    fbr_setting_model_1.FbrSetting,
    terminal_model_1.Terminal,
    offline_sync_queue_model_1.OfflineSyncQueue,
    sms_whatsapp_log_model_1.SmsWhatsappLog,
    cron_job_log_model_1.CronJobLog,
    pos_role_model_1.PosRole,
    pos_permission_model_1.PosPermission,
    pos_role_permission_model_1.PosRolePermission,
    pos_user_role_model_1.PosUserRole,
    pos_notification_model_1.PosNotification,
    product_image_model_1.ProductImage,
];


/***/ },

/***/ "./libs/database/src/models/notifications.model.ts"
/*!*********************************************************!*\
  !*** ./libs/database/src/models/notifications.model.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Notification = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Notification = class Notification extends sequelize_typescript_1.Model {
    userId;
    title;
    message;
    image;
    type;
    status;
    userType;
    isApproved;
    isDelivered;
    bookingId;
    operation;
    vendorId;
    numberOfUsers;
    createdBy;
    isDeleted;
};
exports.Notification = Notification;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        comment: 'Specific user ke liye (null for broadcasts)'
    }),
    __metadata("design:type", Number)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Notification.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        comment: 'Comma-separated: push,email,in-app,sms'
    }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'sent', 'failed', 'read'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('user', 'system', 'vendor', 'admin'),
        allowNull: false,
        defaultValue: 'system',
    }),
    __metadata("design:type", String)
], Notification.prototype, "userType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Broadcast notifications ke liye approval flag'
    }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isApproved", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isDelivered", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        comment: 'Booking se related notifications ke liye'
    }),
    __metadata("design:type", Number)
], Notification.prototype, "bookingId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        comment: 'Event type: booking_confirmed, vendor_broadcast, etc.'
    }),
    __metadata("design:type", String)
], Notification.prototype, "operation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        comment: 'Vendor broadcasts ke liye'
    }),
    __metadata("design:type", Number)
], Notification.prototype, "vendorId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: 'Broadcast me kitne users ko send karna hai'
    }),
    __metadata("design:type", Number)
], Notification.prototype, "numberOfUsers", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Notification.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isDeleted", void 0);
exports.Notification = Notification = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: {
            isDeleted: false
        }
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'notifications',
        timestamps: true,
        underscored: true
    })
], Notification);


/***/ },

/***/ "./libs/database/src/models/onboarding-attachment.model.ts"
/*!*****************************************************************!*\
  !*** ./libs/database/src/models/onboarding-attachment.model.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingAttachment = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const onboarding_company_model_1 = __webpack_require__(/*! ./onboarding-company.model */ "./libs/database/src/models/onboarding-company.model.ts");
let OnboardingAttachment = class OnboardingAttachment extends sequelize_typescript_1.Model {
    onboardingId;
    documentName;
    url;
    type;
    onboardingCompany;
};
exports.OnboardingAttachment = OnboardingAttachment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => onboarding_company_model_1.OnboardingCompany),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OnboardingAttachment.prototype, "onboardingId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], OnboardingAttachment.prototype, "documentName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], OnboardingAttachment.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingAttachment.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => onboarding_company_model_1.OnboardingCompany, 'onboardingId'),
    __metadata("design:type", typeof (_a = typeof onboarding_company_model_1.OnboardingCompany !== "undefined" && onboarding_company_model_1.OnboardingCompany) === "function" ? _a : Object)
], OnboardingAttachment.prototype, "onboardingCompany", void 0);
exports.OnboardingAttachment = OnboardingAttachment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'onboarding_attachments',
        timestamps: true,
        underscored: true
    })
], OnboardingAttachment);


/***/ },

/***/ "./libs/database/src/models/onboarding-company.model.ts"
/*!**************************************************************!*\
  !*** ./libs/database/src/models/onboarding-company.model.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingCompany = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const user_model_1 = __webpack_require__(/*! ./user.model */ "./libs/database/src/models/user.model.ts");
const onboarding_attachment_model_1 = __webpack_require__(/*! ./onboarding-attachment.model */ "./libs/database/src/models/onboarding-attachment.model.ts");
const onboarding_verification_model_1 = __webpack_require__(/*! ./onboarding-verification.model */ "./libs/database/src/models/onboarding-verification.model.ts");
let OnboardingCompany = class OnboardingCompany extends sequelize_typescript_1.Model {
    userId;
    name;
    address;
    city;
    country;
    businessCategory;
    businessType;
    ntnNumber;
    status;
    isApproved;
    isDeleted;
    user;
    attachments;
    verifications;
};
exports.OnboardingCompany = OnboardingCompany;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OnboardingCompany.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "businessCategory", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "businessType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "ntnNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'in_review', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], OnboardingCompany.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], OnboardingCompany.prototype, "isApproved", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], OnboardingCompany.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, 'userId'),
    __metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], OnboardingCompany.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => onboarding_attachment_model_1.OnboardingAttachment, 'onboardingId'),
    __metadata("design:type", Array)
], OnboardingCompany.prototype, "attachments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => onboarding_verification_model_1.OnboardingVerification, 'onboardingId'),
    __metadata("design:type", Array)
], OnboardingCompany.prototype, "verifications", void 0);
exports.OnboardingCompany = OnboardingCompany = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: {
            isDeleted: false
        }
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'onboarding_company',
        timestamps: true,
        underscored: true
    })
], OnboardingCompany);


/***/ },

/***/ "./libs/database/src/models/onboarding-verification.model.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/models/onboarding-verification.model.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingVerification = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const onboarding_company_model_1 = __webpack_require__(/*! ./onboarding-company.model */ "./libs/database/src/models/onboarding-company.model.ts");
let OnboardingVerification = class OnboardingVerification extends sequelize_typescript_1.Model {
    onboardingId;
    columnName;
    attachmentUrl;
    reviewDescription;
    status;
    verifiedById;
    verifiedAt;
    onboardingCompany;
};
exports.OnboardingVerification = OnboardingVerification;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => onboarding_company_model_1.OnboardingCompany),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OnboardingVerification.prototype, "onboardingId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], OnboardingVerification.prototype, "columnName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingVerification.prototype, "attachmentUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], OnboardingVerification.prototype, "reviewDescription", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], OnboardingVerification.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], OnboardingVerification.prototype, "verifiedById", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], OnboardingVerification.prototype, "verifiedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => onboarding_company_model_1.OnboardingCompany, 'onboardingId'),
    __metadata("design:type", typeof (_b = typeof onboarding_company_model_1.OnboardingCompany !== "undefined" && onboarding_company_model_1.OnboardingCompany) === "function" ? _b : Object)
], OnboardingVerification.prototype, "onboardingCompany", void 0);
exports.OnboardingVerification = OnboardingVerification = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'onboarding_verification',
        timestamps: true,
        underscored: true
    })
], OnboardingVerification);


/***/ },

/***/ "./libs/database/src/models/permission.model.ts"
/*!******************************************************!*\
  !*** ./libs/database/src/models/permission.model.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permission = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const role_permission_model_1 = __webpack_require__(/*! ./role_permission.model */ "./libs/database/src/models/role_permission.model.ts");
const role_model_1 = __webpack_require__(/*! ./role.model */ "./libs/database/src/models/role.model.ts");
let Permission = class Permission extends sequelize_typescript_1.Model {
    name;
    resource;
    action;
    description;
    isDeleted;
    rolePermissions;
    roles;
};
exports.Permission = Permission;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Permission.prototype, "resource", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Permission.prototype, "action", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Permission.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => role_permission_model_1.RolePermission, 'permissionId'),
    __metadata("design:type", Array)
], Permission.prototype, "rolePermissions", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => role_model_1.Role, () => role_permission_model_1.RolePermission, 'permissionId', 'roleId'),
    __metadata("design:type", Array)
], Permission.prototype, "roles", void 0);
exports.Permission = Permission = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isDeleted: false },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'permissions',
        timestamps: true,
        underscored: true,
    })
], Permission);


/***/ },

/***/ "./libs/database/src/models/pos/audit-log.model.ts"
/*!*********************************************************!*\
  !*** ./libs/database/src/models/pos/audit-log.model.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLog = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let AuditLog = class AuditLog extends sequelize_typescript_1.Model {
    userId;
    module;
    action;
    oldValue;
    newValue;
    terminal;
    user;
};
exports.AuditLog = AuditLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], AuditLog.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], AuditLog.prototype, "module", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, allowNull: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "oldValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, allowNull: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "newValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "terminal", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'userId'),
    __metadata("design:type", typeof (_a = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _a : Object)
], AuditLog.prototype, "user", void 0);
exports.AuditLog = AuditLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'audit_logs',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], AuditLog);


/***/ },

/***/ "./libs/database/src/models/pos/batch.model.ts"
/*!*****************************************************!*\
  !*** ./libs/database/src/models/pos/batch.model.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Batch = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const supplier_model_1 = __webpack_require__(/*! ./supplier.model */ "./libs/database/src/models/pos/supplier.model.ts");
const purchase_model_1 = __webpack_require__(/*! ./purchase.model */ "./libs/database/src/models/pos/purchase.model.ts");
let Batch = class Batch extends sequelize_typescript_1.Model {
    productId;
    supplierId;
    purchaseId;
    qty;
    remainingQty;
    purchasePrice;
    expiryDate;
    receivedDate;
    batchNumber;
    status;
    product;
    supplier;
    purchase;
};
exports.Batch = Batch;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Batch.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Batch.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => purchase_model_1.Purchase),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Batch.prototype, "purchaseId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Batch.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Batch.prototype, "remainingQty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Batch.prototype, "purchasePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], Batch.prototype, "expiryDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], Batch.prototype, "receivedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Batch.prototype, "batchNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('active', 'expired', 'returned', 'depleted'),
        allowNull: false,
        defaultValue: 'active',
    }),
    __metadata("design:type", String)
], Batch.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_a = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _a : Object)
], Batch.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_b = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _b : Object)
], Batch.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => purchase_model_1.Purchase, 'purchaseId'),
    __metadata("design:type", typeof (_c = typeof purchase_model_1.Purchase !== "undefined" && purchase_model_1.Purchase) === "function" ? _c : Object)
], Batch.prototype, "purchase", void 0);
exports.Batch = Batch = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'batches',
        timestamps: true,
        underscored: true,
    })
], Batch);


/***/ },

/***/ "./libs/database/src/models/pos/category.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/pos/category.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Category = class Category extends sequelize_typescript_1.Model {
    name;
    parentId;
    level;
    parent;
    children;
};
exports.Category = Category;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TINYINT,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Category.prototype, "level", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Category, 'parentId'),
    __metadata("design:type", Category)
], Category.prototype, "parent", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Category, 'parentId'),
    __metadata("design:type", Array)
], Category.prototype, "children", void 0);
exports.Category = Category = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'categories',
        timestamps: true,
        underscored: true,
    })
], Category);


/***/ },

/***/ "./libs/database/src/models/pos/cron-job-log.model.ts"
/*!************************************************************!*\
  !*** ./libs/database/src/models/pos/cron-job-log.model.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronJobLog = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let CronJobLog = class CronJobLog extends sequelize_typescript_1.Model {
    jobName;
    status;
    message;
    startedAt;
    finishedAt;
};
exports.CronJobLog = CronJobLog;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], CronJobLog.prototype, "jobName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('success', 'failed', 'running'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], CronJobLog.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], CronJobLog.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CronJobLog.prototype, "startedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CronJobLog.prototype, "finishedAt", void 0);
exports.CronJobLog = CronJobLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'cron_job_logs',
        timestamps: false,
        underscored: true,
    })
], CronJobLog);


/***/ },

/***/ "./libs/database/src/models/pos/customer-payment.model.ts"
/*!****************************************************************!*\
  !*** ./libs/database/src/models/pos/customer-payment.model.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerPayment = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const customer_model_1 = __webpack_require__(/*! ./customer.model */ "./libs/database/src/models/pos/customer.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let CustomerPayment = class CustomerPayment extends sequelize_typescript_1.Model {
    customerId;
    recordedBy;
    amount;
    paymentMethod;
    referenceNo;
    paymentDate;
    notes;
    customer;
    recordedByUser;
};
exports.CustomerPayment = CustomerPayment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_model_1.Customer),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], CustomerPayment.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], CustomerPayment.prototype, "recordedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], CustomerPayment.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('cash', 'easypaisa', 'jazzcash', 'card'),
        allowNull: false,
        defaultValue: 'cash',
    }),
    __metadata("design:type", String)
], CustomerPayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], CustomerPayment.prototype, "referenceNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false }),
    __metadata("design:type", String)
], CustomerPayment.prototype, "paymentDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], CustomerPayment.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_a = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _a : Object)
], CustomerPayment.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'recordedBy'),
    __metadata("design:type", typeof (_b = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _b : Object)
], CustomerPayment.prototype, "recordedByUser", void 0);
exports.CustomerPayment = CustomerPayment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'customer_payments',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], CustomerPayment);


/***/ },

/***/ "./libs/database/src/models/pos/customer.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/pos/customer.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const sale_model_1 = __webpack_require__(/*! ./sale.model */ "./libs/database/src/models/pos/sale.model.ts");
const udhaar_transaction_model_1 = __webpack_require__(/*! ./udhaar-transaction.model */ "./libs/database/src/models/pos/udhaar-transaction.model.ts");
const loyalty_points_log_model_1 = __webpack_require__(/*! ./loyalty-points-log.model */ "./libs/database/src/models/pos/loyalty-points-log.model.ts");
let Customer = class Customer extends sequelize_typescript_1.Model {
    name;
    phone;
    email;
    address;
    creditLimit;
    udhaarBalance;
    loyaltyPoints;
    isActive;
    sales;
    udhaarTransactions;
    loyaltyLogs;
};
exports.Customer = Customer;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: false }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "creditLimit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "udhaarBalance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "loyaltyPoints", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sale_model_1.Sale, 'customerId'),
    __metadata("design:type", Array)
], Customer.prototype, "sales", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => udhaar_transaction_model_1.UdhaarTransaction, 'customerId'),
    __metadata("design:type", Array)
], Customer.prototype, "udhaarTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => loyalty_points_log_model_1.LoyaltyPointsLog, 'customerId'),
    __metadata("design:type", Array)
], Customer.prototype, "loyaltyLogs", void 0);
exports.Customer = Customer = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isActive: true },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'customers',
        timestamps: true,
        underscored: true,
    })
], Customer);


/***/ },

/***/ "./libs/database/src/models/pos/discount-rule.model.ts"
/*!*************************************************************!*\
  !*** ./libs/database/src/models/pos/discount-rule.model.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscountRule = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let DiscountRule = class DiscountRule extends sequelize_typescript_1.Model {
    name;
    type;
    appliesTo;
    appliesToId;
    value;
    minOrderAmount;
    validFrom;
    validTo;
    isActive;
    minQty;
    createdBy;
    createdByUser;
};
exports.DiscountRule = DiscountRule;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], DiscountRule.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('percentage', 'fixed'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], DiscountRule.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('all', 'product', 'category', 'order'),
        allowNull: false,
        defaultValue: 'all',
    }),
    __metadata("design:type", String)
], DiscountRule.prototype, "appliesTo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DiscountRule.prototype, "appliesToId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], DiscountRule.prototype, "value", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], DiscountRule.prototype, "minOrderAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], DiscountRule.prototype, "validFrom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], DiscountRule.prototype, "validTo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], DiscountRule.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DiscountRule.prototype, "minQty", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DiscountRule.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_a = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _a : Object)
], DiscountRule.prototype, "createdByUser", void 0);
exports.DiscountRule = DiscountRule = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'discount_rules',
        timestamps: true,
        underscored: true,
    })
], DiscountRule);


/***/ },

/***/ "./libs/database/src/models/pos/expense.model.ts"
/*!*******************************************************!*\
  !*** ./libs/database/src/models/pos/expense.model.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Expense = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let Expense = class Expense extends sequelize_typescript_1.Model {
    createdBy;
    category;
    amount;
    description;
    expenseDate;
    createdByUser;
};
exports.Expense = Expense;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Expense.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('rent', 'electricity', 'salary', 'misc', 'transport', 'maintenance'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Expense.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], Expense.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], Expense.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false }),
    __metadata("design:type", String)
], Expense.prototype, "expenseDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_a = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _a : Object)
], Expense.prototype, "createdByUser", void 0);
exports.Expense = Expense = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'expenses',
        timestamps: true,
        underscored: true,
    })
], Expense);


/***/ },

/***/ "./libs/database/src/models/pos/fbr-invoice-log.model.ts"
/*!***************************************************************!*\
  !*** ./libs/database/src/models/pos/fbr-invoice-log.model.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FbrInvoiceLog = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const sale_model_1 = __webpack_require__(/*! ./sale.model */ "./libs/database/src/models/pos/sale.model.ts");
let FbrInvoiceLog = class FbrInvoiceLog extends sequelize_typescript_1.Model {
    saleId;
    irn;
    posId;
    syncStatus;
    retryCount;
    errorMessage;
    lastAttemptAt;
    syncedAt;
    retryNotBefore;
    sale;
};
exports.FbrInvoiceLog = FbrInvoiceLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], FbrInvoiceLog.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], FbrInvoiceLog.prototype, "irn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], FbrInvoiceLog.prototype, "posId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'synced', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], FbrInvoiceLog.prototype, "syncStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], FbrInvoiceLog.prototype, "retryCount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], FbrInvoiceLog.prototype, "errorMessage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FbrInvoiceLog.prototype, "lastAttemptAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], FbrInvoiceLog.prototype, "syncedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], FbrInvoiceLog.prototype, "retryNotBefore", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_model_1.Sale, 'saleId'),
    __metadata("design:type", typeof (_d = typeof sale_model_1.Sale !== "undefined" && sale_model_1.Sale) === "function" ? _d : Object)
], FbrInvoiceLog.prototype, "sale", void 0);
exports.FbrInvoiceLog = FbrInvoiceLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'fbr_invoices_log',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], FbrInvoiceLog);


/***/ },

/***/ "./libs/database/src/models/pos/fbr-setting.model.ts"
/*!***********************************************************!*\
  !*** ./libs/database/src/models/pos/fbr-setting.model.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FbrSetting = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let FbrSetting = class FbrSetting extends sequelize_typescript_1.Model {
    posId;
    apiToken;
    apiUrl;
    environment;
    isActive;
    updatedBy;
    updatedByUser;
};
exports.FbrSetting = FbrSetting;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], FbrSetting.prototype, "posId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], FbrSetting.prototype, "apiToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], FbrSetting.prototype, "apiUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('sandbox', 'production'),
        allowNull: false,
        defaultValue: 'sandbox',
    }),
    __metadata("design:type", String)
], FbrSetting.prototype, "environment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], FbrSetting.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], FbrSetting.prototype, "updatedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FbrSetting.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'updatedBy'),
    __metadata("design:type", typeof (_b = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _b : Object)
], FbrSetting.prototype, "updatedByUser", void 0);
exports.FbrSetting = FbrSetting = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'fbr_settings',
        timestamps: false,
        underscored: true,
    })
], FbrSetting);


/***/ },

/***/ "./libs/database/src/models/pos/loyalty-points-log.model.ts"
/*!******************************************************************!*\
  !*** ./libs/database/src/models/pos/loyalty-points-log.model.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoyaltyPointsLog = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const customer_model_1 = __webpack_require__(/*! ./customer.model */ "./libs/database/src/models/pos/customer.model.ts");
const sale_model_1 = __webpack_require__(/*! ./sale.model */ "./libs/database/src/models/pos/sale.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let LoyaltyPointsLog = class LoyaltyPointsLog extends sequelize_typescript_1.Model {
    customerId;
    saleId;
    adjustedBy;
    type;
    points;
    balanceAfter;
    notes;
    customer;
    sale;
    adjustedByUser;
};
exports.LoyaltyPointsLog = LoyaltyPointsLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_model_1.Customer),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], LoyaltyPointsLog.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], LoyaltyPointsLog.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], LoyaltyPointsLog.prototype, "adjustedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('earn', 'redeem', 'adjust'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], LoyaltyPointsLog.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], LoyaltyPointsLog.prototype, "points", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], LoyaltyPointsLog.prototype, "balanceAfter", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], LoyaltyPointsLog.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_a = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _a : Object)
], LoyaltyPointsLog.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_model_1.Sale, 'saleId'),
    __metadata("design:type", typeof (_b = typeof sale_model_1.Sale !== "undefined" && sale_model_1.Sale) === "function" ? _b : Object)
], LoyaltyPointsLog.prototype, "sale", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'adjustedBy'),
    __metadata("design:type", typeof (_c = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _c : Object)
], LoyaltyPointsLog.prototype, "adjustedByUser", void 0);
exports.LoyaltyPointsLog = LoyaltyPointsLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'loyalty_points_log',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], LoyaltyPointsLog);


/***/ },

/***/ "./libs/database/src/models/pos/offline-sync-queue.model.ts"
/*!******************************************************************!*\
  !*** ./libs/database/src/models/pos/offline-sync-queue.model.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfflineSyncQueue = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const terminal_model_1 = __webpack_require__(/*! ./terminal.model */ "./libs/database/src/models/pos/terminal.model.ts");
let OfflineSyncQueue = class OfflineSyncQueue extends sequelize_typescript_1.Model {
    terminalId;
    entityType;
    entityId;
    operation;
    payload;
    syncStatus;
    retryCount;
    queuedAt;
    syncedAt;
    errorMessage;
    terminal;
};
exports.OfflineSyncQueue = OfflineSyncQueue;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => terminal_model_1.Terminal),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], OfflineSyncQueue.prototype, "terminalId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], OfflineSyncQueue.prototype, "entityType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], OfflineSyncQueue.prototype, "entityId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('create', 'update', 'delete'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], OfflineSyncQueue.prototype, "operation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, allowNull: true }),
    __metadata("design:type", Object)
], OfflineSyncQueue.prototype, "payload", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'synced', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], OfflineSyncQueue.prototype, "syncStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], OfflineSyncQueue.prototype, "retryCount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], OfflineSyncQueue.prototype, "queuedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], OfflineSyncQueue.prototype, "syncedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], OfflineSyncQueue.prototype, "errorMessage", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => terminal_model_1.Terminal, 'terminalId'),
    __metadata("design:type", typeof (_c = typeof terminal_model_1.Terminal !== "undefined" && terminal_model_1.Terminal) === "function" ? _c : Object)
], OfflineSyncQueue.prototype, "terminal", void 0);
exports.OfflineSyncQueue = OfflineSyncQueue = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'offline_sync_queue',
        timestamps: false,
        underscored: true,
    })
], OfflineSyncQueue);


/***/ },

/***/ "./libs/database/src/models/pos/pos-notification.model.ts"
/*!****************************************************************!*\
  !*** ./libs/database/src/models/pos/pos-notification.model.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosNotification = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let PosNotification = class PosNotification extends sequelize_typescript_1.Model {
    userId;
    type;
    title;
    message;
    payload;
    isRead;
    channel;
    user;
};
exports.PosNotification = PosNotification;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PosNotification.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('low_stock', 'expiry', 'udhaar_overdue', 'sale', 'system'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], PosNotification.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], PosNotification.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(500), allowNull: false }),
    __metadata("design:type", String)
], PosNotification.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, allowNull: true }),
    __metadata("design:type", Object)
], PosNotification.prototype, "payload", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], PosNotification.prototype, "isRead", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('in_app', 'sms', 'whatsapp'),
        allowNull: false,
        defaultValue: 'in_app',
    }),
    __metadata("design:type", String)
], PosNotification.prototype, "channel", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'userId'),
    __metadata("design:type", typeof (_a = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _a : Object)
], PosNotification.prototype, "user", void 0);
exports.PosNotification = PosNotification = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_notifications',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosNotification);


/***/ },

/***/ "./libs/database/src/models/pos/pos-permission.model.ts"
/*!**************************************************************!*\
  !*** ./libs/database/src/models/pos/pos-permission.model.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPermission = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let PosPermission = class PosPermission extends sequelize_typescript_1.Model {
    name;
    resource;
    action;
    description;
};
exports.PosPermission = PosPermission;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false, unique: true }),
    __metadata("design:type", String)
], PosPermission.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], PosPermission.prototype, "resource", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('create', 'read', 'update', 'delete', 'export'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], PosPermission.prototype, "action", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], PosPermission.prototype, "description", void 0);
exports.PosPermission = PosPermission = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_permissions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosPermission);


/***/ },

/***/ "./libs/database/src/models/pos/pos-role-permission.model.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/models/pos/pos-role-permission.model.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolePermission = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_role_model_1 = __webpack_require__(/*! ./pos-role.model */ "./libs/database/src/models/pos/pos-role.model.ts");
const pos_permission_model_1 = __webpack_require__(/*! ./pos-permission.model */ "./libs/database/src/models/pos/pos-permission.model.ts");
let PosRolePermission = class PosRolePermission extends sequelize_typescript_1.Model {
    roleId;
    permissionId;
    role;
    permission;
};
exports.PosRolePermission = PosRolePermission;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_role_model_1.PosRole),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PosRolePermission.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_permission_model_1.PosPermission),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PosRolePermission.prototype, "permissionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_role_model_1.PosRole, 'roleId'),
    __metadata("design:type", typeof (_a = typeof pos_role_model_1.PosRole !== "undefined" && pos_role_model_1.PosRole) === "function" ? _a : Object)
], PosRolePermission.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_permission_model_1.PosPermission, 'permissionId'),
    __metadata("design:type", typeof (_b = typeof pos_permission_model_1.PosPermission !== "undefined" && pos_permission_model_1.PosPermission) === "function" ? _b : Object)
], PosRolePermission.prototype, "permission", void 0);
exports.PosRolePermission = PosRolePermission = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_role_permissions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosRolePermission);


/***/ },

/***/ "./libs/database/src/models/pos/pos-role.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/pos/pos-role.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRole = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let PosRole = class PosRole extends sequelize_typescript_1.Model {
    name;
    description;
    isSystem;
    isActive;
};
exports.PosRole = PosRole;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false, unique: true }),
    __metadata("design:type", String)
], PosRole.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], PosRole.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], PosRole.prototype, "isSystem", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], PosRole.prototype, "isActive", void 0);
exports.PosRole = PosRole = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_roles',
        timestamps: true,
        underscored: true,
    })
], PosRole);


/***/ },

/***/ "./libs/database/src/models/pos/pos-user-role.model.ts"
/*!*************************************************************!*\
  !*** ./libs/database/src/models/pos/pos-user-role.model.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRole = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
const pos_role_model_1 = __webpack_require__(/*! ./pos-role.model */ "./libs/database/src/models/pos/pos-role.model.ts");
let PosUserRole = class PosUserRole extends sequelize_typescript_1.Model {
    userId;
    roleId;
    user;
    role;
};
exports.PosUserRole = PosUserRole;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PosUserRole.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_role_model_1.PosRole),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PosUserRole.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'userId'),
    __metadata("design:type", typeof (_a = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _a : Object)
], PosUserRole.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_role_model_1.PosRole, 'roleId'),
    __metadata("design:type", typeof (_b = typeof pos_role_model_1.PosRole !== "undefined" && pos_role_model_1.PosRole) === "function" ? _b : Object)
], PosUserRole.prototype, "role", void 0);
exports.PosUserRole = PosUserRole = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_user_roles',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosUserRole);


/***/ },

/***/ "./libs/database/src/models/pos/pos-user.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/pos/pos-user.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUser = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let PosUser = class PosUser extends sequelize_typescript_1.Model {
    name;
    email;
    password;
    role;
    permissions;
    isActive;
};
exports.PosUser = PosUser;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], PosUser.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false, unique: true }),
    __metadata("design:type", String)
], PosUser.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: false }),
    __metadata("design:type", String)
], PosUser.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('admin', 'manager', 'cashier'),
        allowNull: false,
        defaultValue: 'cashier',
    }),
    __metadata("design:type", String)
], PosUser.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, allowNull: true }),
    __metadata("design:type", Object)
], PosUser.prototype, "permissions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], PosUser.prototype, "isActive", void 0);
exports.PosUser = PosUser = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isActive: true },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_users',
        timestamps: true,
        underscored: true,
    })
], PosUser);


/***/ },

/***/ "./libs/database/src/models/pos/product-image.model.ts"
/*!*************************************************************!*\
  !*** ./libs/database/src/models/pos/product-image.model.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductImage = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
let ProductImage = class ProductImage extends sequelize_typescript_1.Model {
    productId;
    url;
    isPrimary;
    product;
};
exports.ProductImage = ProductImage;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductImage.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(500), allowNull: false }),
    __metadata("design:type", String)
], ProductImage.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], ProductImage.prototype, "isPrimary", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_a = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _a : Object)
], ProductImage.prototype, "product", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'product_images',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], ProductImage);


/***/ },

/***/ "./libs/database/src/models/pos/product-price.model.ts"
/*!*************************************************************!*\
  !*** ./libs/database/src/models/pos/product-price.model.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductPrice = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let ProductPrice = class ProductPrice extends sequelize_typescript_1.Model {
    productId;
    salePrice;
    purchasePrice;
    effectiveFrom;
    changedBy;
    product;
    changedByUser;
};
exports.ProductPrice = ProductPrice;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "salePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "purchasePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ProductPrice.prototype, "effectiveFrom", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "changedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_b = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _b : Object)
], ProductPrice.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'changedBy'),
    __metadata("design:type", typeof (_c = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _c : Object)
], ProductPrice.prototype, "changedByUser", void 0);
exports.ProductPrice = ProductPrice = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'product_prices',
        timestamps: false,
        underscored: true,
    })
], ProductPrice);


/***/ },

/***/ "./libs/database/src/models/pos/product-variant.model.ts"
/*!***************************************************************!*\
  !*** ./libs/database/src/models/pos/product-variant.model.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductVariant = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const unit_model_1 = __webpack_require__(/*! ./unit.model */ "./libs/database/src/models/pos/unit.model.ts");
let ProductVariant = class ProductVariant extends sequelize_typescript_1.Model {
    productId;
    size;
    unitId;
    barcode;
    salePrice;
    purchasePrice;
    stockQty;
    isActive;
    product;
    unit;
};
exports.ProductVariant = ProductVariant;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: false }),
    __metadata("design:type", String)
], ProductVariant.prototype, "size", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => unit_model_1.Unit),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "unitId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true, unique: true }),
    __metadata("design:type", String)
], ProductVariant.prototype, "barcode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "salePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "purchasePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "stockQty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], ProductVariant.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_a = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _a : Object)
], ProductVariant.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => unit_model_1.Unit, 'unitId'),
    __metadata("design:type", typeof (_b = typeof unit_model_1.Unit !== "undefined" && unit_model_1.Unit) === "function" ? _b : Object)
], ProductVariant.prototype, "unit", void 0);
exports.ProductVariant = ProductVariant = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isActive: true },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'product_variants',
        timestamps: true,
        underscored: true,
    })
], ProductVariant);


/***/ },

/***/ "./libs/database/src/models/pos/product.model.ts"
/*!*******************************************************!*\
  !*** ./libs/database/src/models/pos/product.model.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const category_model_1 = __webpack_require__(/*! ./category.model */ "./libs/database/src/models/pos/category.model.ts");
const unit_model_1 = __webpack_require__(/*! ./unit.model */ "./libs/database/src/models/pos/unit.model.ts");
const batch_model_1 = __webpack_require__(/*! ./batch.model */ "./libs/database/src/models/pos/batch.model.ts");
const product_variant_model_1 = __webpack_require__(/*! ./product-variant.model */ "./libs/database/src/models/pos/product-variant.model.ts");
const product_price_model_1 = __webpack_require__(/*! ./product-price.model */ "./libs/database/src/models/pos/product-price.model.ts");
const product_image_model_1 = __webpack_require__(/*! ./product-image.model */ "./libs/database/src/models/pos/product-image.model.ts");
let Product = class Product extends sequelize_typescript_1.Model {
    categoryId;
    unitId;
    name;
    barcode;
    salePrice;
    purchasePrice;
    lowStockThreshold;
    isActive;
    category;
    unit;
    batches;
    variants;
    priceHistory;
    images;
};
exports.Product = Product;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_model_1.Category),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => unit_model_1.Unit),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "unitId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "barcode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "salePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "purchasePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "lowStockThreshold", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_model_1.Category, 'categoryId'),
    __metadata("design:type", typeof (_a = typeof category_model_1.Category !== "undefined" && category_model_1.Category) === "function" ? _a : Object)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => unit_model_1.Unit, 'unitId'),
    __metadata("design:type", typeof (_b = typeof unit_model_1.Unit !== "undefined" && unit_model_1.Unit) === "function" ? _b : Object)
], Product.prototype, "unit", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => batch_model_1.Batch, 'productId'),
    __metadata("design:type", Array)
], Product.prototype, "batches", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_variant_model_1.ProductVariant, 'productId'),
    __metadata("design:type", Array)
], Product.prototype, "variants", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_price_model_1.ProductPrice, 'productId'),
    __metadata("design:type", Array)
], Product.prototype, "priceHistory", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_image_model_1.ProductImage, 'productId'),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isActive: true },
    })),
    (0, sequelize_typescript_1.Scopes)(() => ({
        withInactive: {},
        active: { where: { isActive: true } },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'products',
        timestamps: true,
        underscored: true,
    })
], Product);


/***/ },

/***/ "./libs/database/src/models/pos/purchase-item.model.ts"
/*!*************************************************************!*\
  !*** ./libs/database/src/models/pos/purchase-item.model.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseItem = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const purchase_model_1 = __webpack_require__(/*! ./purchase.model */ "./libs/database/src/models/pos/purchase.model.ts");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const batch_model_1 = __webpack_require__(/*! ./batch.model */ "./libs/database/src/models/pos/batch.model.ts");
let PurchaseItem = class PurchaseItem extends sequelize_typescript_1.Model {
    purchaseId;
    productId;
    batchId;
    qty;
    purchasePrice;
    total;
    purchase;
    product;
    batch;
};
exports.PurchaseItem = PurchaseItem;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => purchase_model_1.Purchase),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseItem.prototype, "purchaseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseItem.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => batch_model_1.Batch),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PurchaseItem.prototype, "batchId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false }),
    __metadata("design:type", Number)
], PurchaseItem.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], PurchaseItem.prototype, "purchasePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], PurchaseItem.prototype, "total", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => purchase_model_1.Purchase, 'purchaseId'),
    __metadata("design:type", typeof (_a = typeof purchase_model_1.Purchase !== "undefined" && purchase_model_1.Purchase) === "function" ? _a : Object)
], PurchaseItem.prototype, "purchase", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_b = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _b : Object)
], PurchaseItem.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => batch_model_1.Batch, 'batchId'),
    __metadata("design:type", typeof (_c = typeof batch_model_1.Batch !== "undefined" && batch_model_1.Batch) === "function" ? _c : Object)
], PurchaseItem.prototype, "batch", void 0);
exports.PurchaseItem = PurchaseItem = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchase_items',
        timestamps: false,
        underscored: true,
    })
], PurchaseItem);


/***/ },

/***/ "./libs/database/src/models/pos/purchase-return.model.ts"
/*!***************************************************************!*\
  !*** ./libs/database/src/models/pos/purchase-return.model.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseReturn = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const purchase_model_1 = __webpack_require__(/*! ./purchase.model */ "./libs/database/src/models/pos/purchase.model.ts");
const supplier_model_1 = __webpack_require__(/*! ./supplier.model */ "./libs/database/src/models/pos/supplier.model.ts");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const batch_model_1 = __webpack_require__(/*! ./batch.model */ "./libs/database/src/models/pos/batch.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let PurchaseReturn = class PurchaseReturn extends sequelize_typescript_1.Model {
    purchaseId;
    supplierId;
    productId;
    batchId;
    processedBy;
    qty;
    amount;
    reason;
    status;
    purchase;
    supplier;
    product;
    batch;
    processedByUser;
};
exports.PurchaseReturn = PurchaseReturn;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => purchase_model_1.Purchase),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "purchaseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => batch_model_1.Batch),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "batchId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "processedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], PurchaseReturn.prototype, "reason", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], PurchaseReturn.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => purchase_model_1.Purchase, 'purchaseId'),
    __metadata("design:type", typeof (_a = typeof purchase_model_1.Purchase !== "undefined" && purchase_model_1.Purchase) === "function" ? _a : Object)
], PurchaseReturn.prototype, "purchase", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_b = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _b : Object)
], PurchaseReturn.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_c = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _c : Object)
], PurchaseReturn.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => batch_model_1.Batch, 'batchId'),
    __metadata("design:type", typeof (_d = typeof batch_model_1.Batch !== "undefined" && batch_model_1.Batch) === "function" ? _d : Object)
], PurchaseReturn.prototype, "batch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'processedBy'),
    __metadata("design:type", typeof (_e = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _e : Object)
], PurchaseReturn.prototype, "processedByUser", void 0);
exports.PurchaseReturn = PurchaseReturn = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchase_returns',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PurchaseReturn);


/***/ },

/***/ "./libs/database/src/models/pos/purchase.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/pos/purchase.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Purchase = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const supplier_model_1 = __webpack_require__(/*! ./supplier.model */ "./libs/database/src/models/pos/supplier.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
const purchase_item_model_1 = __webpack_require__(/*! ./purchase-item.model */ "./libs/database/src/models/pos/purchase-item.model.ts");
let Purchase = class Purchase extends sequelize_typescript_1.Model {
    supplierId;
    createdBy;
    totalAmount;
    paidAmount;
    discountAmount;
    status;
    invoiceRef;
    purchaseDate;
    supplier;
    createdByUser;
    purchaseItems;
};
exports.Purchase = Purchase;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Purchase.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Purchase.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "totalAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "paidAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "discountAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'received', 'partial', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], Purchase.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Purchase.prototype, "invoiceRef", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], Purchase.prototype, "purchaseDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_a = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _a : Object)
], Purchase.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_b = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _b : Object)
], Purchase.prototype, "createdByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => purchase_item_model_1.PurchaseItem, 'purchaseId'),
    __metadata("design:type", Array)
], Purchase.prototype, "purchaseItems", void 0);
exports.Purchase = Purchase = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchases',
        timestamps: true,
        underscored: true,
    })
], Purchase);


/***/ },

/***/ "./libs/database/src/models/pos/sale-item.model.ts"
/*!*********************************************************!*\
  !*** ./libs/database/src/models/pos/sale-item.model.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleItem = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const sale_model_1 = __webpack_require__(/*! ./sale.model */ "./libs/database/src/models/pos/sale.model.ts");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const product_variant_model_1 = __webpack_require__(/*! ./product-variant.model */ "./libs/database/src/models/pos/product-variant.model.ts");
const batch_model_1 = __webpack_require__(/*! ./batch.model */ "./libs/database/src/models/pos/batch.model.ts");
let SaleItem = class SaleItem extends sequelize_typescript_1.Model {
    saleId;
    productId;
    variantId;
    batchId;
    qty;
    unitPrice;
    discount;
    taxRate;
    taxAmount;
    total;
    sale;
    product;
    variant;
    batch;
};
exports.SaleItem = SaleItem;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_variant_model_1.ProductVariant),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleItem.prototype, "variantId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => batch_model_1.Batch),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleItem.prototype, "batchId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "unitPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "taxRate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "taxAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "total", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_model_1.Sale, 'saleId'),
    __metadata("design:type", typeof (_a = typeof sale_model_1.Sale !== "undefined" && sale_model_1.Sale) === "function" ? _a : Object)
], SaleItem.prototype, "sale", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_b = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _b : Object)
], SaleItem.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_variant_model_1.ProductVariant, 'variantId'),
    __metadata("design:type", typeof (_c = typeof product_variant_model_1.ProductVariant !== "undefined" && product_variant_model_1.ProductVariant) === "function" ? _c : Object)
], SaleItem.prototype, "variant", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => batch_model_1.Batch, 'batchId'),
    __metadata("design:type", typeof (_d = typeof batch_model_1.Batch !== "undefined" && batch_model_1.Batch) === "function" ? _d : Object)
], SaleItem.prototype, "batch", void 0);
exports.SaleItem = SaleItem = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sale_items',
        timestamps: false,
        underscored: true,
    })
], SaleItem);


/***/ },

/***/ "./libs/database/src/models/pos/sale-payment.model.ts"
/*!************************************************************!*\
  !*** ./libs/database/src/models/pos/sale-payment.model.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalePayment = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const sale_model_1 = __webpack_require__(/*! ./sale.model */ "./libs/database/src/models/pos/sale.model.ts");
let SalePayment = class SalePayment extends sequelize_typescript_1.Model {
    saleId;
    paymentMethod;
    amount;
    referenceNo;
    sale;
};
exports.SalePayment = SalePayment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SalePayment.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('cash', 'easypaisa', 'jazzcash', 'card', 'udhaar'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], SalePayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SalePayment.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], SalePayment.prototype, "referenceNo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_model_1.Sale, 'saleId'),
    __metadata("design:type", typeof (_a = typeof sale_model_1.Sale !== "undefined" && sale_model_1.Sale) === "function" ? _a : Object)
], SalePayment.prototype, "sale", void 0);
exports.SalePayment = SalePayment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sale_payments',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], SalePayment);


/***/ },

/***/ "./libs/database/src/models/pos/sale-return.model.ts"
/*!***********************************************************!*\
  !*** ./libs/database/src/models/pos/sale-return.model.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleReturn = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const sale_model_1 = __webpack_require__(/*! ./sale.model */ "./libs/database/src/models/pos/sale.model.ts");
const sale_item_model_1 = __webpack_require__(/*! ./sale-item.model */ "./libs/database/src/models/pos/sale-item.model.ts");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const product_variant_model_1 = __webpack_require__(/*! ./product-variant.model */ "./libs/database/src/models/pos/product-variant.model.ts");
const batch_model_1 = __webpack_require__(/*! ./batch.model */ "./libs/database/src/models/pos/batch.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let SaleReturn = class SaleReturn extends sequelize_typescript_1.Model {
    saleId;
    saleItemId;
    productId;
    variantId;
    batchId;
    quantity;
    reason;
    refundType;
    refundAmount;
    processedBy;
    sale;
    saleItem;
    product;
    variant;
    batch;
    processedByUser;
};
exports.SaleReturn = SaleReturn;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_item_model_1.SaleItem),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "saleItemId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_variant_model_1.ProductVariant),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "variantId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => batch_model_1.Batch),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "batchId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('defective', 'wrong_item', 'customer_change_of_mind', 'expired', 'damaged', 'other'),
        allowNull: true,
        defaultValue: 'other',
    }),
    __metadata("design:type", String)
], SaleReturn.prototype, "reason", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('cash', 'digital', 'udhaar'),
        allowNull: false,
        defaultValue: 'cash',
    }),
    __metadata("design:type", String)
], SaleReturn.prototype, "refundType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "refundAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "processedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_model_1.Sale, 'saleId'),
    __metadata("design:type", typeof (_a = typeof sale_model_1.Sale !== "undefined" && sale_model_1.Sale) === "function" ? _a : Object)
], SaleReturn.prototype, "sale", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_item_model_1.SaleItem, 'saleItemId'),
    __metadata("design:type", typeof (_b = typeof sale_item_model_1.SaleItem !== "undefined" && sale_item_model_1.SaleItem) === "function" ? _b : Object)
], SaleReturn.prototype, "saleItem", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_c = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _c : Object)
], SaleReturn.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_variant_model_1.ProductVariant, 'variantId'),
    __metadata("design:type", typeof (_d = typeof product_variant_model_1.ProductVariant !== "undefined" && product_variant_model_1.ProductVariant) === "function" ? _d : Object)
], SaleReturn.prototype, "variant", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => batch_model_1.Batch, 'batchId'),
    __metadata("design:type", typeof (_e = typeof batch_model_1.Batch !== "undefined" && batch_model_1.Batch) === "function" ? _e : Object)
], SaleReturn.prototype, "batch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'processedBy'),
    __metadata("design:type", typeof (_f = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _f : Object)
], SaleReturn.prototype, "processedByUser", void 0);
exports.SaleReturn = SaleReturn = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sale_returns',
        timestamps: true,
        underscored: true,
    })
], SaleReturn);


/***/ },

/***/ "./libs/database/src/models/pos/sale.model.ts"
/*!****************************************************!*\
  !*** ./libs/database/src/models/pos/sale.model.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sale = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const customer_model_1 = __webpack_require__(/*! ./customer.model */ "./libs/database/src/models/pos/customer.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
const sale_item_model_1 = __webpack_require__(/*! ./sale-item.model */ "./libs/database/src/models/pos/sale-item.model.ts");
const sale_payment_model_1 = __webpack_require__(/*! ./sale-payment.model */ "./libs/database/src/models/pos/sale-payment.model.ts");
const sale_return_model_1 = __webpack_require__(/*! ./sale-return.model */ "./libs/database/src/models/pos/sale-return.model.ts");
let Sale = class Sale extends sequelize_typescript_1.Model {
    customerId;
    createdBy;
    subtotal;
    discountAmount;
    taxAmount;
    total;
    paidAmount;
    changeAmount;
    paymentType;
    isHeld;
    holdLabel;
    fbrIrn;
    fbrSyncStatus;
    terminalId;
    buyerNtn;
    buyerCnic;
    customer;
    createdByUser;
    saleItems;
    salePayments;
    saleReturns;
};
exports.Sale = Sale;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_model_1.Customer),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Sale.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Sale.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "subtotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "discountAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "taxAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "total", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "paidAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "changeAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('cash', 'easypaisa', 'jazzcash', 'card', 'udhaar'),
        allowNull: false,
        defaultValue: 'cash',
    }),
    __metadata("design:type", String)
], Sale.prototype, "paymentType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], Sale.prototype, "isHeld", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Sale.prototype, "holdLabel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Sale.prototype, "fbrIrn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'synced', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], Sale.prototype, "fbrSyncStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], Sale.prototype, "terminalId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: true }),
    __metadata("design:type", String)
], Sale.prototype, "buyerNtn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(15), allowNull: true }),
    __metadata("design:type", String)
], Sale.prototype, "buyerCnic", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_a = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _a : Object)
], Sale.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_b = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _b : Object)
], Sale.prototype, "createdByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sale_item_model_1.SaleItem, 'saleId'),
    __metadata("design:type", Array)
], Sale.prototype, "saleItems", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sale_payment_model_1.SalePayment, 'saleId'),
    __metadata("design:type", Array)
], Sale.prototype, "salePayments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sale_return_model_1.SaleReturn, 'saleId'),
    __metadata("design:type", Array)
], Sale.prototype, "saleReturns", void 0);
exports.Sale = Sale = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sales',
        timestamps: true,
        underscored: true,
    })
], Sale);


/***/ },

/***/ "./libs/database/src/models/pos/sms-whatsapp-log.model.ts"
/*!****************************************************************!*\
  !*** ./libs/database/src/models/pos/sms-whatsapp-log.model.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmsWhatsappLog = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let SmsWhatsappLog = class SmsWhatsappLog extends sequelize_typescript_1.Model {
    channel;
    recipientPhone;
    message;
    status;
    errorMessage;
    refId;
    refType;
    sentAt;
};
exports.SmsWhatsappLog = SmsWhatsappLog;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('sms', 'whatsapp'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], SmsWhatsappLog.prototype, "channel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: false }),
    __metadata("design:type", String)
], SmsWhatsappLog.prototype, "recipientPhone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], SmsWhatsappLog.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('sent', 'failed', 'pending'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], SmsWhatsappLog.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], SmsWhatsappLog.prototype, "errorMessage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SmsWhatsappLog.prototype, "refId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], SmsWhatsappLog.prototype, "refType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SmsWhatsappLog.prototype, "sentAt", void 0);
exports.SmsWhatsappLog = SmsWhatsappLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sms_whatsapp_logs',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], SmsWhatsappLog);


/***/ },

/***/ "./libs/database/src/models/pos/stock-adjustment.model.ts"
/*!****************************************************************!*\
  !*** ./libs/database/src/models/pos/stock-adjustment.model.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StockAdjustment = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const batch_model_1 = __webpack_require__(/*! ./batch.model */ "./libs/database/src/models/pos/batch.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let StockAdjustment = class StockAdjustment extends sequelize_typescript_1.Model {
    productId;
    batchId;
    adjustedBy;
    qtyChange;
    reason;
    notes;
    product;
    batch;
    adjustedByUser;
};
exports.StockAdjustment = StockAdjustment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], StockAdjustment.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => batch_model_1.Batch),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], StockAdjustment.prototype, "batchId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], StockAdjustment.prototype, "adjustedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false }),
    __metadata("design:type", Number)
], StockAdjustment.prototype, "qtyChange", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('waste', 'damage', 'expiry', 'correction', 'theft', 'recount'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], StockAdjustment.prototype, "reason", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], StockAdjustment.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_a = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _a : Object)
], StockAdjustment.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => batch_model_1.Batch, 'batchId'),
    __metadata("design:type", typeof (_b = typeof batch_model_1.Batch !== "undefined" && batch_model_1.Batch) === "function" ? _b : Object)
], StockAdjustment.prototype, "batch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'adjustedBy'),
    __metadata("design:type", typeof (_c = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _c : Object)
], StockAdjustment.prototype, "adjustedByUser", void 0);
exports.StockAdjustment = StockAdjustment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'stock_adjustments',
        timestamps: true,
        underscored: true,
    })
], StockAdjustment);


/***/ },

/***/ "./libs/database/src/models/pos/store-setting.model.ts"
/*!*************************************************************!*\
  !*** ./libs/database/src/models/pos/store-setting.model.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreSetting = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let StoreSetting = class StoreSetting extends sequelize_typescript_1.Model {
    storeName;
    address;
    phone;
    email;
    logoUrl;
    returnWindowDays;
    lowStockAlertDays;
    expiryAlertDays;
    loyaltyEnabled;
    loyaltyPointsPerRupee;
    smsAlertsEnabled;
    whatsappAlertsEnabled;
    smsApiKey;
    whatsappApiKey;
    updatedBy;
    updatedByUser;
};
exports.StoreSetting = StoreSetting;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], StoreSetting.prototype, "storeName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "logoUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 7 }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "returnWindowDays", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 7 }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "lowStockAlertDays", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 30 }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "expiryAlertDays", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "loyaltyEnabled", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "loyaltyPointsPerRupee", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "smsAlertsEnabled", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "whatsappAlertsEnabled", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "smsApiKey", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "whatsappApiKey", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "updatedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], StoreSetting.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'updatedBy'),
    __metadata("design:type", typeof (_b = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _b : Object)
], StoreSetting.prototype, "updatedByUser", void 0);
exports.StoreSetting = StoreSetting = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'store_settings',
        timestamps: false,
        underscored: true,
    })
], StoreSetting);


/***/ },

/***/ "./libs/database/src/models/pos/supplier-ledger-transaction.model.ts"
/*!***************************************************************************!*\
  !*** ./libs/database/src/models/pos/supplier-ledger-transaction.model.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierLedgerTransaction = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const supplier_model_1 = __webpack_require__(/*! ./supplier.model */ "./libs/database/src/models/pos/supplier.model.ts");
const purchase_model_1 = __webpack_require__(/*! ./purchase.model */ "./libs/database/src/models/pos/purchase.model.ts");
const supplier_payment_model_1 = __webpack_require__(/*! ./supplier-payment.model */ "./libs/database/src/models/pos/supplier-payment.model.ts");
let SupplierLedgerTransaction = class SupplierLedgerTransaction extends sequelize_typescript_1.Model {
    supplierId;
    purchaseId;
    paymentId;
    type;
    amount;
    balanceAfter;
    notes;
    supplier;
    purchase;
    payment;
};
exports.SupplierLedgerTransaction = SupplierLedgerTransaction;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SupplierLedgerTransaction.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => purchase_model_1.Purchase),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierLedgerTransaction.prototype, "purchaseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_payment_model_1.SupplierPayment),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierLedgerTransaction.prototype, "paymentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('debit', 'credit'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], SupplierLedgerTransaction.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SupplierLedgerTransaction.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SupplierLedgerTransaction.prototype, "balanceAfter", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], SupplierLedgerTransaction.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_a = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _a : Object)
], SupplierLedgerTransaction.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => purchase_model_1.Purchase, 'purchaseId'),
    __metadata("design:type", typeof (_b = typeof purchase_model_1.Purchase !== "undefined" && purchase_model_1.Purchase) === "function" ? _b : Object)
], SupplierLedgerTransaction.prototype, "purchase", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_payment_model_1.SupplierPayment, 'paymentId'),
    __metadata("design:type", typeof (_c = typeof supplier_payment_model_1.SupplierPayment !== "undefined" && supplier_payment_model_1.SupplierPayment) === "function" ? _c : Object)
], SupplierLedgerTransaction.prototype, "payment", void 0);
exports.SupplierLedgerTransaction = SupplierLedgerTransaction = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'supplier_ledger_transactions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], SupplierLedgerTransaction);


/***/ },

/***/ "./libs/database/src/models/pos/supplier-payment.model.ts"
/*!****************************************************************!*\
  !*** ./libs/database/src/models/pos/supplier-payment.model.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierPayment = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const supplier_model_1 = __webpack_require__(/*! ./supplier.model */ "./libs/database/src/models/pos/supplier.model.ts");
const purchase_model_1 = __webpack_require__(/*! ./purchase.model */ "./libs/database/src/models/pos/purchase.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let SupplierPayment = class SupplierPayment extends sequelize_typescript_1.Model {
    supplierId;
    purchaseId;
    recordedBy;
    amount;
    paymentMethod;
    referenceNo;
    paymentDate;
    supplier;
    purchase;
    recordedByUser;
};
exports.SupplierPayment = SupplierPayment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SupplierPayment.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => purchase_model_1.Purchase),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierPayment.prototype, "purchaseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierPayment.prototype, "recordedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], SupplierPayment.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('cash', 'easypaisa', 'jazzcash', 'card', 'bank_transfer'),
        allowNull: false,
        defaultValue: 'cash',
    }),
    __metadata("design:type", String)
], SupplierPayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], SupplierPayment.prototype, "referenceNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false }),
    __metadata("design:type", String)
], SupplierPayment.prototype, "paymentDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_a = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _a : Object)
], SupplierPayment.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => purchase_model_1.Purchase, 'purchaseId'),
    __metadata("design:type", typeof (_b = typeof purchase_model_1.Purchase !== "undefined" && purchase_model_1.Purchase) === "function" ? _b : Object)
], SupplierPayment.prototype, "purchase", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'recordedBy'),
    __metadata("design:type", typeof (_c = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _c : Object)
], SupplierPayment.prototype, "recordedByUser", void 0);
exports.SupplierPayment = SupplierPayment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'supplier_payments',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], SupplierPayment);


/***/ },

/***/ "./libs/database/src/models/pos/supplier.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/pos/supplier.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Supplier = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Supplier = class Supplier extends sequelize_typescript_1.Model {
    name;
    phone;
    address;
    email;
    creditLimit;
    outstandingBalance;
    creditDays;
    isActive;
};
exports.Supplier = Supplier;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: true }),
    __metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Supplier.prototype, "creditLimit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Supplier.prototype, "outstandingBalance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Supplier.prototype, "creditDays", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isActive", void 0);
exports.Supplier = Supplier = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isActive: true },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'suppliers',
        timestamps: true,
        underscored: true,
    })
], Supplier);


/***/ },

/***/ "./libs/database/src/models/pos/tax-setting.model.ts"
/*!***********************************************************!*\
  !*** ./libs/database/src/models/pos/tax-setting.model.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaxSetting = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const category_model_1 = __webpack_require__(/*! ./category.model */ "./libs/database/src/models/pos/category.model.ts");
const product_model_1 = __webpack_require__(/*! ./product.model */ "./libs/database/src/models/pos/product.model.ts");
const pos_user_model_1 = __webpack_require__(/*! ./pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let TaxSetting = class TaxSetting extends sequelize_typescript_1.Model {
    categoryId;
    productId;
    gstRate;
    isActive;
    updatedBy;
    category;
    product;
    updatedByUser;
};
exports.TaxSetting = TaxSetting;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_model_1.Category),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], TaxSetting.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], TaxSetting.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], TaxSetting.prototype, "gstRate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], TaxSetting.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], TaxSetting.prototype, "updatedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_model_1.Category, 'categoryId'),
    __metadata("design:type", typeof (_a = typeof category_model_1.Category !== "undefined" && category_model_1.Category) === "function" ? _a : Object)
], TaxSetting.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_b = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _b : Object)
], TaxSetting.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'updatedBy'),
    __metadata("design:type", typeof (_c = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _c : Object)
], TaxSetting.prototype, "updatedByUser", void 0);
exports.TaxSetting = TaxSetting = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'tax_settings',
        timestamps: true,
        underscored: true,
        createdAt: false,
    })
], TaxSetting);


/***/ },

/***/ "./libs/database/src/models/pos/terminal.model.ts"
/*!********************************************************!*\
  !*** ./libs/database/src/models/pos/terminal.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Terminal = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Terminal = class Terminal extends sequelize_typescript_1.Model {
    name;
    identifier;
    isActive;
    lastSeenAt;
};
exports.Terminal = Terminal;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], Terminal.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false, unique: true }),
    __metadata("design:type", String)
], Terminal.prototype, "identifier", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Terminal.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Terminal.prototype, "lastSeenAt", void 0);
exports.Terminal = Terminal = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'terminals',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], Terminal);


/***/ },

/***/ "./libs/database/src/models/pos/udhaar-transaction.model.ts"
/*!******************************************************************!*\
  !*** ./libs/database/src/models/pos/udhaar-transaction.model.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UdhaarTransaction = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const customer_model_1 = __webpack_require__(/*! ./customer.model */ "./libs/database/src/models/pos/customer.model.ts");
const sale_model_1 = __webpack_require__(/*! ./sale.model */ "./libs/database/src/models/pos/sale.model.ts");
let UdhaarTransaction = class UdhaarTransaction extends sequelize_typescript_1.Model {
    customerId;
    saleId;
    paymentId;
    type;
    amount;
    balanceAfter;
    notes;
    customer;
    sale;
};
exports.UdhaarTransaction = UdhaarTransaction;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_model_1.Customer),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], UdhaarTransaction.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], UdhaarTransaction.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], UdhaarTransaction.prototype, "paymentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('debit', 'credit'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], UdhaarTransaction.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], UdhaarTransaction.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], UdhaarTransaction.prototype, "balanceAfter", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], UdhaarTransaction.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_a = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _a : Object)
], UdhaarTransaction.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_model_1.Sale, 'saleId'),
    __metadata("design:type", typeof (_b = typeof sale_model_1.Sale !== "undefined" && sale_model_1.Sale) === "function" ? _b : Object)
], UdhaarTransaction.prototype, "sale", void 0);
exports.UdhaarTransaction = UdhaarTransaction = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'udhaar_transactions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], UdhaarTransaction);


/***/ },

/***/ "./libs/database/src/models/pos/unit.model.ts"
/*!****************************************************!*\
  !*** ./libs/database/src/models/pos/unit.model.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Unit = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Unit = class Unit extends sequelize_typescript_1.Model {
    name;
    shortCode;
};
exports.Unit = Unit;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Unit.prototype, "shortCode", void 0);
exports.Unit = Unit = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'units',
        timestamps: false,
        underscored: true,
    })
], Unit);


/***/ },

/***/ "./libs/database/src/models/role.model.ts"
/*!************************************************!*\
  !*** ./libs/database/src/models/role.model.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const company_model_1 = __webpack_require__(/*! ./company.model */ "./libs/database/src/models/company.model.ts");
const role_permission_model_1 = __webpack_require__(/*! ./role_permission.model */ "./libs/database/src/models/role_permission.model.ts");
const permission_model_1 = __webpack_require__(/*! ./permission.model */ "./libs/database/src/models/permission.model.ts");
const user_role_model_1 = __webpack_require__(/*! ./user_role.model */ "./libs/database/src/models/user_role.model.ts");
let Role = class Role extends sequelize_typescript_1.Model {
    companyId;
    name;
    description;
    isDeleted;
    company;
    rolePermissions;
    permissions;
    userRoles;
};
exports.Role = Role;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Role.prototype, "companyId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Role.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_model_1.Company, 'companyId'),
    __metadata("design:type", typeof (_a = typeof company_model_1.Company !== "undefined" && company_model_1.Company) === "function" ? _a : Object)
], Role.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => role_permission_model_1.RolePermission, 'roleId'),
    __metadata("design:type", Array)
], Role.prototype, "rolePermissions", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => permission_model_1.Permission, () => role_permission_model_1.RolePermission, 'roleId', 'permissionId'),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_role_model_1.UserRole, 'roleId'),
    __metadata("design:type", Array)
], Role.prototype, "userRoles", void 0);
exports.Role = Role = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { isDeleted: false },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'roles',
        timestamps: true,
        underscored: true,
    })
], Role);


/***/ },

/***/ "./libs/database/src/models/role_permission.model.ts"
/*!***********************************************************!*\
  !*** ./libs/database/src/models/role_permission.model.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolePermission = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const role_model_1 = __webpack_require__(/*! ./role.model */ "./libs/database/src/models/role.model.ts");
const permission_model_1 = __webpack_require__(/*! ./permission.model */ "./libs/database/src/models/permission.model.ts");
let RolePermission = class RolePermission extends sequelize_typescript_1.Model {
    roleId;
    permissionId;
    role;
    permission;
};
exports.RolePermission = RolePermission;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => role_model_1.Role),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], RolePermission.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => permission_model_1.Permission),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], RolePermission.prototype, "permissionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => role_model_1.Role, 'roleId'),
    __metadata("design:type", typeof (_a = typeof role_model_1.Role !== "undefined" && role_model_1.Role) === "function" ? _a : Object)
], RolePermission.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => permission_model_1.Permission, 'permissionId'),
    __metadata("design:type", typeof (_b = typeof permission_model_1.Permission !== "undefined" && permission_model_1.Permission) === "function" ? _b : Object)
], RolePermission.prototype, "permission", void 0);
exports.RolePermission = RolePermission = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'role_permissions',
        timestamps: true,
        underscored: true,
    })
], RolePermission);


/***/ },

/***/ "./libs/database/src/models/user-map-notification.model.ts"
/*!*****************************************************************!*\
  !*** ./libs/database/src/models/user-map-notification.model.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMapNotification = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const notifications_model_1 = __webpack_require__(/*! ./notifications.model */ "./libs/database/src/models/notifications.model.ts");
const user_model_1 = __webpack_require__(/*! ./user.model */ "./libs/database/src/models/user.model.ts");
let UserMapNotification = class UserMapNotification extends sequelize_typescript_1.Model {
    userId;
    notificationId;
    isRead;
    isSent;
    isDelivered;
    sentAt;
    deliveredAt;
    readAt;
    isDeleted;
    user;
    notification;
};
exports.UserMapNotification = UserMapNotification;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], UserMapNotification.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => notifications_model_1.Notification),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], UserMapNotification.prototype, "notificationId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], UserMapNotification.prototype, "isRead", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], UserMapNotification.prototype, "isSent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], UserMapNotification.prototype, "isDelivered", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserMapNotification.prototype, "sentAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserMapNotification.prototype, "deliveredAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserMapNotification.prototype, "readAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], UserMapNotification.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_d = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _d : Object)
], UserMapNotification.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => notifications_model_1.Notification),
    __metadata("design:type", typeof (_e = typeof notifications_model_1.Notification !== "undefined" && notifications_model_1.Notification) === "function" ? _e : Object)
], UserMapNotification.prototype, "notification", void 0);
exports.UserMapNotification = UserMapNotification = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user_map_notifications',
        timestamps: true,
        underscored: true
    })
], UserMapNotification);


/***/ },

/***/ "./libs/database/src/models/user.model.ts"
/*!************************************************!*\
  !*** ./libs/database/src/models/user.model.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const company_user_model_1 = __webpack_require__(/*! ./company_user.model */ "./libs/database/src/models/company_user.model.ts");
let User = class User extends sequelize_typescript_1.Model {
    firstName;
    lastName;
    email;
    password;
    token;
    phNumber;
    isVerified;
    userType;
    fcmToken;
    isDeleted;
    companyUsers;
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        unique: false,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        unique: false,
    }),
    __metadata("design:type", String)
], User.prototype, "phNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('admin', 'onboarder', 'employeer', 'employee', 'customer'),
        allowNull: false,
        defaultValue: 'onboarder',
    }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        comment: 'FCM token for push notifications'
    }),
    __metadata("design:type", String)
], User.prototype, "fcmToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => company_user_model_1.CompanyUser, 'userId'),
    __metadata("design:type", Array)
], User.prototype, "companyUsers", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: {
            isDeleted: false
        }
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'users',
        timestamps: true,
        underscored: true
    })
], User);


/***/ },

/***/ "./libs/database/src/models/user_role.model.ts"
/*!*****************************************************!*\
  !*** ./libs/database/src/models/user_role.model.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRole = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const company_user_model_1 = __webpack_require__(/*! ./company_user.model */ "./libs/database/src/models/company_user.model.ts");
const role_model_1 = __webpack_require__(/*! ./role.model */ "./libs/database/src/models/role.model.ts");
let UserRole = class UserRole extends sequelize_typescript_1.Model {
    companyUserId;
    roleId;
    companyUser;
    role;
};
exports.UserRole = UserRole;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_user_model_1.CompanyUser),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], UserRole.prototype, "companyUserId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => role_model_1.Role),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], UserRole.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_user_model_1.CompanyUser, 'companyUserId'),
    __metadata("design:type", typeof (_a = typeof company_user_model_1.CompanyUser !== "undefined" && company_user_model_1.CompanyUser) === "function" ? _a : Object)
], UserRole.prototype, "companyUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => role_model_1.Role, 'roleId'),
    __metadata("design:type", typeof (_b = typeof role_model_1.Role !== "undefined" && role_model_1.Role) === "function" ? _b : Object)
], UserRole.prototype, "role", void 0);
exports.UserRole = UserRole = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user_roles',
        timestamps: true,
        underscored: true,
    })
], UserRole);


/***/ },

/***/ "./libs/database/src/repositories/call-participant.repository.ts"
/*!***********************************************************************!*\
  !*** ./libs/database/src/repositories/call-participant.repository.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallParticipantRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const call_participant_model_1 = __webpack_require__(/*! ../models/call-participant.model */ "./libs/database/src/models/call-participant.model.ts");
let CallParticipantRepository = class CallParticipantRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_PARTICIPANT_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.CallParticipantRepository = CallParticipantRepository;
exports.CallParticipantRepository = CallParticipantRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(call_participant_model_1.CallParticipant)),
    __metadata("design:paramtypes", [Object])
], CallParticipantRepository);


/***/ },

/***/ "./libs/database/src/repositories/call.repository.ts"
/*!***********************************************************!*\
  !*** ./libs/database/src/repositories/call.repository.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const call_model_1 = __webpack_require__(/*! ../models/call.model */ "./libs/database/src/models/call.model.ts");
let CallRepository = class CallRepository {
    callModel;
    constructor(callModel) {
        this.callModel = callModel;
    }
    async create(data) {
        return this.callModel.create(data);
    }
    async findOne(options) {
        return this.callModel.findOne(options);
    }
    async findAll(options) {
        return this.callModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.callModel.findAndCountAll(options);
    }
    async delete(options) {
        const call = await this.findOne(options);
        if (!call)
            throw new common_1.NotFoundException('REPOSITORY_CALL_NOT_FOUND');
        await call.update({ isDeleted: true });
        return true;
    }
};
exports.CallRepository = CallRepository;
exports.CallRepository = CallRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(call_model_1.Call)),
    __metadata("design:paramtypes", [Object])
], CallRepository);


/***/ },

/***/ "./libs/database/src/repositories/company-user.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/company-user.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyUserRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const company_user_model_1 = __webpack_require__(/*! ../models/company_user.model */ "./libs/database/src/models/company_user.model.ts");
let CompanyUserRepository = class CompanyUserRepository {
    companyUserModel;
    constructor(companyUserModel) {
        this.companyUserModel = companyUserModel;
    }
    async create(data) {
        return this.companyUserModel.create(data);
    }
    async findOne(options) {
        return this.companyUserModel.findOne(options);
    }
    async findAll(options) {
        return this.companyUserModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.companyUserModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record) {
            throw new common_1.NotFoundException('REPOSITORY_COMPANY_USER_NOT_FOUND');
        }
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record) {
            throw new common_1.NotFoundException('REPOSITORY_COMPANY_USER_NOT_FOUND');
        }
        await record.destroy();
        return true;
    }
};
exports.CompanyUserRepository = CompanyUserRepository;
exports.CompanyUserRepository = CompanyUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(company_user_model_1.CompanyUser)),
    __metadata("design:paramtypes", [Object])
], CompanyUserRepository);


/***/ },

/***/ "./libs/database/src/repositories/company.repository.ts"
/*!**************************************************************!*\
  !*** ./libs/database/src/repositories/company.repository.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const company_model_1 = __webpack_require__(/*! ../models/company.model */ "./libs/database/src/models/company.model.ts");
let CompanyRepository = class CompanyRepository {
    companyModel;
    constructor(companyModel) {
        this.companyModel = companyModel;
    }
    async create(data) {
        return this.companyModel.create(data);
    }
    async findOne(options) {
        return this.companyModel.findOne(options);
    }
    async findAll(options) {
        return this.companyModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.companyModel.findAndCountAll(options);
    }
    async update(options, data) {
        const company = await this.findOne(options);
        if (!company) {
            throw new common_1.NotFoundException('REPOSITORY_COMPANY_NOT_FOUND');
        }
        return company.update(data);
    }
    async delete(options) {
        const company = await this.findOne(options);
        if (!company) {
            throw new common_1.NotFoundException('REPOSITORY_COMPANY_NOT_FOUND');
        }
        await company.destroy();
        return true;
    }
};
exports.CompanyRepository = CompanyRepository;
exports.CompanyRepository = CompanyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(company_model_1.Company)),
    __metadata("design:paramtypes", [Object])
], CompanyRepository);


/***/ },

/***/ "./libs/database/src/repositories/leads.repository.ts"
/*!************************************************************!*\
  !*** ./libs/database/src/repositories/leads.repository.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const leads_model_1 = __webpack_require__(/*! ../models/leads.model */ "./libs/database/src/models/leads.model.ts");
let LeadsRepository = class LeadsRepository {
    leadModel;
    constructor(leadModel) {
        this.leadModel = leadModel;
    }
    async create(data) {
        return this.leadModel.create(data);
    }
    async findOne(options) {
        return this.leadModel.findOne(options);
    }
    async findAll(options) {
        return this.leadModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.leadModel.findAndCountAll(options);
    }
    async delete(options) {
        const lead = await this.findOne(options);
        if (!lead) {
            throw new common_1.NotFoundException('REPOSITORY_LEAD_NOT_FOUND');
        }
        await lead.destroy();
        return true;
    }
};
exports.LeadsRepository = LeadsRepository;
exports.LeadsRepository = LeadsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(leads_model_1.Lead)),
    __metadata("design:paramtypes", [Object])
], LeadsRepository);


/***/ },

/***/ "./libs/database/src/repositories/lookup.respository.ts"
/*!**************************************************************!*\
  !*** ./libs/database/src/repositories/lookup.respository.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LookupRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const lookup_model_1 = __webpack_require__(/*! ../models/lookup.model */ "./libs/database/src/models/lookup.model.ts");
let LookupRepository = class LookupRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return await this.model.create(data);
    }
    async createBulk(data) {
        return await this.model.bulkCreate(data);
    }
    async findOne(options) {
        return await this.model.findOne(options);
    }
    async findAll(options) {
        return await this.model.findAll(options);
    }
    async update(options, data) {
        return await this.model.update(data, options);
    }
    async delete(options) {
        const row = await this.findOne(options);
        if (!row) {
            throw new common_1.NotFoundException('REPOSITORY_LOOKUP_NOT_FOUND');
        }
        await row.destroy();
        return true;
    }
};
exports.LookupRepository = LookupRepository;
exports.LookupRepository = LookupRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(lookup_model_1.Lookup)),
    __metadata("design:paramtypes", [Object])
], LookupRepository);


/***/ },

/***/ "./libs/database/src/repositories/notification.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/notification.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const notifications_model_1 = __webpack_require__(/*! ../models/notifications.model */ "./libs/database/src/models/notifications.model.ts");
let NotificationRepository = class NotificationRepository {
    notificationModel;
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async create(data) {
        return this.notificationModel.create(data);
    }
    async createBulk(data) {
        return this.notificationModel.bulkCreate(data);
    }
    async findOne(options) {
        return this.notificationModel.findOne(options);
    }
    async findAll(options) {
        return this.notificationModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.notificationModel.findAndCountAll(options);
    }
    async update(options, data) {
        return await this.notificationModel.update(data, options);
    }
    async delete(options) {
        const notification = await this.findOne(options);
        if (!notification) {
            throw new common_1.NotFoundException('REPOSITORY_NOTIFICATION_NOT_FOUND');
        }
        await notification.destroy();
        return true;
    }
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(notifications_model_1.Notification)),
    __metadata("design:paramtypes", [Object])
], NotificationRepository);


/***/ },

/***/ "./libs/database/src/repositories/permission.repository.ts"
/*!*****************************************************************!*\
  !*** ./libs/database/src/repositories/permission.repository.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const permission_model_1 = __webpack_require__(/*! ../models/permission.model */ "./libs/database/src/models/permission.model.ts");
let PermissionRepository = class PermissionRepository {
    permissionModel;
    constructor(permissionModel) {
        this.permissionModel = permissionModel;
    }
    async create(data) {
        return this.permissionModel.create(data);
    }
    async findOne(options) {
        return this.permissionModel.findOne(options);
    }
    async findAll(options) {
        return this.permissionModel.findAll(options);
    }
    async update(options, data) {
        const permission = await this.findOne(options);
        if (!permission) {
            throw new common_1.NotFoundException('REPOSITORY_PERMISSION_NOT_FOUND');
        }
        return permission.update(data);
    }
    async delete(options) {
        const permission = await this.findOne(options);
        if (!permission) {
            throw new common_1.NotFoundException('REPOSITORY_PERMISSION_NOT_FOUND');
        }
        await permission.destroy();
        return true;
    }
};
exports.PermissionRepository = PermissionRepository;
exports.PermissionRepository = PermissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(permission_model_1.Permission)),
    __metadata("design:paramtypes", [Object])
], PermissionRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/audit-log.repository.ts"
/*!********************************************************************!*\
  !*** ./libs/database/src/repositories/pos/audit-log.repository.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const audit_log_model_1 = __webpack_require__(/*! ../../models/pos/audit-log.model */ "./libs/database/src/models/pos/audit-log.model.ts");
let AuditLogRepository = class AuditLogRepository {
    auditLogModel;
    constructor(auditLogModel) {
        this.auditLogModel = auditLogModel;
    }
    async create(data) {
        return this.auditLogModel.create(data);
    }
    async findAll(options) {
        return this.auditLogModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.auditLogModel.findAndCountAll(options);
    }
};
exports.AuditLogRepository = AuditLogRepository;
exports.AuditLogRepository = AuditLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(audit_log_model_1.AuditLog)),
    __metadata("design:paramtypes", [Object])
], AuditLogRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/batch.repository.ts"
/*!****************************************************************!*\
  !*** ./libs/database/src/repositories/pos/batch.repository.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const batch_model_1 = __webpack_require__(/*! ../../models/pos/batch.model */ "./libs/database/src/models/pos/batch.model.ts");
let BatchRepository = class BatchRepository {
    batchModel;
    constructor(batchModel) {
        this.batchModel = batchModel;
    }
    async create(data) {
        return this.batchModel.create(data);
    }
    async findOne(options) {
        return this.batchModel.findOne(options);
    }
    async findAll(options) {
        return this.batchModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.batchModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_BATCH_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_BATCH_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.BatchRepository = BatchRepository;
exports.BatchRepository = BatchRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(batch_model_1.Batch)),
    __metadata("design:paramtypes", [Object])
], BatchRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/category.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/category.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const category_model_1 = __webpack_require__(/*! ../../models/pos/category.model */ "./libs/database/src/models/pos/category.model.ts");
let CategoryRepository = class CategoryRepository {
    categoryModel;
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(data) {
        return this.categoryModel.create(data);
    }
    async findOne(options) {
        return this.categoryModel.findOne(options);
    }
    async findAll(options) {
        return this.categoryModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.categoryModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_CATEGORY_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_CATEGORY_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategoryRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/customer-payment.repository.ts"
/*!***************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/customer-payment.repository.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerPaymentRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const customer_payment_model_1 = __webpack_require__(/*! ../../models/pos/customer-payment.model */ "./libs/database/src/models/pos/customer-payment.model.ts");
let CustomerPaymentRepository = class CustomerPaymentRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
};
exports.CustomerPaymentRepository = CustomerPaymentRepository;
exports.CustomerPaymentRepository = CustomerPaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(customer_payment_model_1.CustomerPayment)),
    __metadata("design:paramtypes", [Object])
], CustomerPaymentRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/customer.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/customer.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const customer_model_1 = __webpack_require__(/*! ../../models/pos/customer.model */ "./libs/database/src/models/pos/customer.model.ts");
let CustomerRepository = class CustomerRepository {
    customerModel;
    constructor(customerModel) {
        this.customerModel = customerModel;
    }
    async create(data) {
        return this.customerModel.create(data);
    }
    async findOne(options) {
        return this.customerModel.findOne(options);
    }
    async findAll(options) {
        return this.customerModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.customerModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_CUSTOMER_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_CUSTOMER_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.CustomerRepository = CustomerRepository;
exports.CustomerRepository = CustomerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(customer_model_1.Customer)),
    __metadata("design:paramtypes", [Object])
], CustomerRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/discount-rule.repository.ts"
/*!************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/discount-rule.repository.ts ***!
  \************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscountRuleRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const discount_rule_model_1 = __webpack_require__(/*! ../../models/pos/discount-rule.model */ "./libs/database/src/models/pos/discount-rule.model.ts");
let DiscountRuleRepository = class DiscountRuleRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('DISCOUNT_RULE_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('DISCOUNT_RULE_NOT_FOUND');
        await record.destroy();
    }
};
exports.DiscountRuleRepository = DiscountRuleRepository;
exports.DiscountRuleRepository = DiscountRuleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(discount_rule_model_1.DiscountRule)),
    __metadata("design:paramtypes", [Object])
], DiscountRuleRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/expense.repository.ts"
/*!******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/expense.repository.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpenseRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const expense_model_1 = __webpack_require__(/*! ../../models/pos/expense.model */ "./libs/database/src/models/pos/expense.model.ts");
let ExpenseRepository = class ExpenseRepository {
    expenseModel;
    constructor(expenseModel) {
        this.expenseModel = expenseModel;
    }
    async create(data) {
        return this.expenseModel.create(data);
    }
    async findOne(options) {
        return this.expenseModel.findOne(options);
    }
    async findAll(options) {
        return this.expenseModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.expenseModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_EXPENSE_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_EXPENSE_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.ExpenseRepository = ExpenseRepository;
exports.ExpenseRepository = ExpenseRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(expense_model_1.Expense)),
    __metadata("design:paramtypes", [Object])
], ExpenseRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/fbr-invoice-log.repository.ts"
/*!**************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/fbr-invoice-log.repository.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FbrInvoiceLogRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const fbr_invoice_log_model_1 = __webpack_require__(/*! ../../models/pos/fbr-invoice-log.model */ "./libs/database/src/models/pos/fbr-invoice-log.model.ts");
let FbrInvoiceLogRepository = class FbrInvoiceLogRepository {
    fbrLogModel;
    constructor(fbrLogModel) {
        this.fbrLogModel = fbrLogModel;
    }
    async create(data) {
        return this.fbrLogModel.create(data);
    }
    async findOne(options) {
        return this.fbrLogModel.findOne(options);
    }
    async findAll(options) {
        return this.fbrLogModel.findAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_FBR_LOG_NOT_FOUND');
        return record.update(data);
    }
};
exports.FbrInvoiceLogRepository = FbrInvoiceLogRepository;
exports.FbrInvoiceLogRepository = FbrInvoiceLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(fbr_invoice_log_model_1.FbrInvoiceLog)),
    __metadata("design:paramtypes", [Object])
], FbrInvoiceLogRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/loyalty-points-log.repository.ts"
/*!*****************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/loyalty-points-log.repository.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoyaltyPointsLogRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const loyalty_points_log_model_1 = __webpack_require__(/*! ../../models/pos/loyalty-points-log.model */ "./libs/database/src/models/pos/loyalty-points-log.model.ts");
let LoyaltyPointsLogRepository = class LoyaltyPointsLogRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
};
exports.LoyaltyPointsLogRepository = LoyaltyPointsLogRepository;
exports.LoyaltyPointsLogRepository = LoyaltyPointsLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(loyalty_points_log_model_1.LoyaltyPointsLog)),
    __metadata("design:paramtypes", [Object])
], LoyaltyPointsLogRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/pos-permission.repository.ts"
/*!*************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/pos-permission.repository.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPermissionRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const pos_permission_model_1 = __webpack_require__(/*! ../../models/pos/pos-permission.model */ "./libs/database/src/models/pos/pos-permission.model.ts");
let PosPermissionRepository = class PosPermissionRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('POS_PERMISSION_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.PosPermissionRepository = PosPermissionRepository;
exports.PosPermissionRepository = PosPermissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_permission_model_1.PosPermission)),
    __metadata("design:paramtypes", [Object])
], PosPermissionRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/pos-role-permission.repository.ts"
/*!******************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/pos-role-permission.repository.ts ***!
  \******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolePermissionRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const pos_role_permission_model_1 = __webpack_require__(/*! ../../models/pos/pos-role-permission.model */ "./libs/database/src/models/pos/pos-role-permission.model.ts");
let PosRolePermissionRepository = class PosRolePermissionRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('POS_ROLE_PERMISSION_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.PosRolePermissionRepository = PosRolePermissionRepository;
exports.PosRolePermissionRepository = PosRolePermissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_role_permission_model_1.PosRolePermission)),
    __metadata("design:paramtypes", [Object])
], PosRolePermissionRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/pos-role.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/pos-role.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRoleRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const pos_role_model_1 = __webpack_require__(/*! ../../models/pos/pos-role.model */ "./libs/database/src/models/pos/pos-role.model.ts");
let PosRoleRepository = class PosRoleRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('POS_ROLE_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('POS_ROLE_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.PosRoleRepository = PosRoleRepository;
exports.PosRoleRepository = PosRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_role_model_1.PosRole)),
    __metadata("design:paramtypes", [Object])
], PosRoleRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/pos-user-role.repository.ts"
/*!************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/pos-user-role.repository.ts ***!
  \************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRoleRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const pos_user_role_model_1 = __webpack_require__(/*! ../../models/pos/pos-user-role.model */ "./libs/database/src/models/pos/pos-user-role.model.ts");
let PosUserRoleRepository = class PosUserRoleRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('POS_USER_ROLE_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.PosUserRoleRepository = PosUserRoleRepository;
exports.PosUserRoleRepository = PosUserRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_user_role_model_1.PosUserRole)),
    __metadata("design:paramtypes", [Object])
], PosUserRoleRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/pos-user.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/pos-user.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const pos_user_model_1 = __webpack_require__(/*! ../../models/pos/pos-user.model */ "./libs/database/src/models/pos/pos-user.model.ts");
let PosUserRepository = class PosUserRepository {
    posUserModel;
    constructor(posUserModel) {
        this.posUserModel = posUserModel;
    }
    async create(data) {
        return this.posUserModel.create(data);
    }
    async findOne(options) {
        return this.posUserModel.findOne(options);
    }
    async findAll(options) {
        return this.posUserModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.posUserModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_POS_USER_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_POS_USER_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.PosUserRepository = PosUserRepository;
exports.PosUserRepository = PosUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_user_model_1.PosUser)),
    __metadata("design:paramtypes", [Object])
], PosUserRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/product-variant.repository.ts"
/*!**************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/product-variant.repository.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductVariantRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const product_variant_model_1 = __webpack_require__(/*! ../../models/pos/product-variant.model */ "./libs/database/src/models/pos/product-variant.model.ts");
let ProductVariantRepository = class ProductVariantRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_PRODUCT_VARIANT_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_PRODUCT_VARIANT_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.ProductVariantRepository = ProductVariantRepository;
exports.ProductVariantRepository = ProductVariantRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __metadata("design:paramtypes", [Object])
], ProductVariantRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/product.repository.ts"
/*!******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/product.repository.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const product_model_1 = __webpack_require__(/*! ../../models/pos/product.model */ "./libs/database/src/models/pos/product.model.ts");
let ProductRepository = class ProductRepository {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(data) {
        return this.productModel.create(data);
    }
    async findOne(options) {
        return this.productModel.findOne(options);
    }
    async findAll(options) {
        return this.productModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.productModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_PRODUCT_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_PRODUCT_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object])
], ProductRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/purchase-item.repository.ts"
/*!************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/purchase-item.repository.ts ***!
  \************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseItemRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const purchase_item_model_1 = __webpack_require__(/*! ../../models/pos/purchase-item.model */ "./libs/database/src/models/pos/purchase-item.model.ts");
let PurchaseItemRepository = class PurchaseItemRepository {
    purchaseItemModel;
    constructor(purchaseItemModel) {
        this.purchaseItemModel = purchaseItemModel;
    }
    async bulkCreate(data) {
        return this.purchaseItemModel.bulkCreate(data);
    }
    async findAll(options) {
        return this.purchaseItemModel.findAll(options);
    }
};
exports.PurchaseItemRepository = PurchaseItemRepository;
exports.PurchaseItemRepository = PurchaseItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(purchase_item_model_1.PurchaseItem)),
    __metadata("design:paramtypes", [Object])
], PurchaseItemRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/purchase-return.repository.ts"
/*!**************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/purchase-return.repository.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseReturnRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const purchase_return_model_1 = __webpack_require__(/*! ../../models/pos/purchase-return.model */ "./libs/database/src/models/pos/purchase-return.model.ts");
let PurchaseReturnRepository = class PurchaseReturnRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('PURCHASE_RETURN_NOT_FOUND');
        return record.update(data);
    }
};
exports.PurchaseReturnRepository = PurchaseReturnRepository;
exports.PurchaseReturnRepository = PurchaseReturnRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(purchase_return_model_1.PurchaseReturn)),
    __metadata("design:paramtypes", [Object])
], PurchaseReturnRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/purchase.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/purchase.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const purchase_model_1 = __webpack_require__(/*! ../../models/pos/purchase.model */ "./libs/database/src/models/pos/purchase.model.ts");
let PurchaseRepository = class PurchaseRepository {
    purchaseModel;
    constructor(purchaseModel) {
        this.purchaseModel = purchaseModel;
    }
    async create(data) {
        return this.purchaseModel.create(data);
    }
    async findOne(options) {
        return this.purchaseModel.findOne(options);
    }
    async findAll(options) {
        return this.purchaseModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.purchaseModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_PURCHASE_NOT_FOUND');
        return record.update(data);
    }
};
exports.PurchaseRepository = PurchaseRepository;
exports.PurchaseRepository = PurchaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(purchase_model_1.Purchase)),
    __metadata("design:paramtypes", [Object])
], PurchaseRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/sale-item.repository.ts"
/*!********************************************************************!*\
  !*** ./libs/database/src/repositories/pos/sale-item.repository.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleItemRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const sale_item_model_1 = __webpack_require__(/*! ../../models/pos/sale-item.model */ "./libs/database/src/models/pos/sale-item.model.ts");
let SaleItemRepository = class SaleItemRepository {
    saleItemModel;
    constructor(saleItemModel) {
        this.saleItemModel = saleItemModel;
    }
    async bulkCreate(data) {
        return this.saleItemModel.bulkCreate(data);
    }
    async findAll(options) {
        return this.saleItemModel.findAll(options);
    }
};
exports.SaleItemRepository = SaleItemRepository;
exports.SaleItemRepository = SaleItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sale_item_model_1.SaleItem)),
    __metadata("design:paramtypes", [Object])
], SaleItemRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/sale-payment.repository.ts"
/*!***********************************************************************!*\
  !*** ./libs/database/src/repositories/pos/sale-payment.repository.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalePaymentRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const sale_payment_model_1 = __webpack_require__(/*! ../../models/pos/sale-payment.model */ "./libs/database/src/models/pos/sale-payment.model.ts");
let SalePaymentRepository = class SalePaymentRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async bulkCreate(data) {
        return this.model.bulkCreate(data);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
};
exports.SalePaymentRepository = SalePaymentRepository;
exports.SalePaymentRepository = SalePaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sale_payment_model_1.SalePayment)),
    __metadata("design:paramtypes", [Object])
], SalePaymentRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/sale-return.repository.ts"
/*!**********************************************************************!*\
  !*** ./libs/database/src/repositories/pos/sale-return.repository.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleReturnRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const sale_return_model_1 = __webpack_require__(/*! ../../models/pos/sale-return.model */ "./libs/database/src/models/pos/sale-return.model.ts");
let SaleReturnRepository = class SaleReturnRepository {
    saleReturnModel;
    constructor(saleReturnModel) {
        this.saleReturnModel = saleReturnModel;
    }
    async create(data) {
        return this.saleReturnModel.create(data);
    }
    async findOne(options) {
        return this.saleReturnModel.findOne(options);
    }
    async findAll(options) {
        return this.saleReturnModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.saleReturnModel.findAndCountAll(options);
    }
};
exports.SaleReturnRepository = SaleReturnRepository;
exports.SaleReturnRepository = SaleReturnRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sale_return_model_1.SaleReturn)),
    __metadata("design:paramtypes", [Object])
], SaleReturnRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/sale.repository.ts"
/*!***************************************************************!*\
  !*** ./libs/database/src/repositories/pos/sale.repository.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const sale_model_1 = __webpack_require__(/*! ../../models/pos/sale.model */ "./libs/database/src/models/pos/sale.model.ts");
let SaleRepository = class SaleRepository {
    saleModel;
    constructor(saleModel) {
        this.saleModel = saleModel;
    }
    async create(data) {
        return this.saleModel.create(data);
    }
    async findOne(options) {
        return this.saleModel.findOne(options);
    }
    async findAll(options) {
        return this.saleModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.saleModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_SALE_NOT_FOUND');
        return record.update(data);
    }
};
exports.SaleRepository = SaleRepository;
exports.SaleRepository = SaleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sale_model_1.Sale)),
    __metadata("design:paramtypes", [Object])
], SaleRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/stock-adjustment.repository.ts"
/*!***************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/stock-adjustment.repository.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StockAdjustmentRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const stock_adjustment_model_1 = __webpack_require__(/*! ../../models/pos/stock-adjustment.model */ "./libs/database/src/models/pos/stock-adjustment.model.ts");
let StockAdjustmentRepository = class StockAdjustmentRepository {
    stockAdjModel;
    constructor(stockAdjModel) {
        this.stockAdjModel = stockAdjModel;
    }
    async create(data) {
        return this.stockAdjModel.create(data);
    }
    async findAll(options) {
        return this.stockAdjModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.stockAdjModel.findAndCountAll(options);
    }
};
exports.StockAdjustmentRepository = StockAdjustmentRepository;
exports.StockAdjustmentRepository = StockAdjustmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(stock_adjustment_model_1.StockAdjustment)),
    __metadata("design:paramtypes", [Object])
], StockAdjustmentRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/supplier-ledger-transaction.repository.ts"
/*!**************************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/supplier-ledger-transaction.repository.ts ***!
  \**************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierLedgerTransactionRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const supplier_ledger_transaction_model_1 = __webpack_require__(/*! ../../models/pos/supplier-ledger-transaction.model */ "./libs/database/src/models/pos/supplier-ledger-transaction.model.ts");
let SupplierLedgerTransactionRepository = class SupplierLedgerTransactionRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
};
exports.SupplierLedgerTransactionRepository = SupplierLedgerTransactionRepository;
exports.SupplierLedgerTransactionRepository = SupplierLedgerTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(supplier_ledger_transaction_model_1.SupplierLedgerTransaction)),
    __metadata("design:paramtypes", [Object])
], SupplierLedgerTransactionRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/supplier-payment.repository.ts"
/*!***************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/supplier-payment.repository.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierPaymentRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const supplier_payment_model_1 = __webpack_require__(/*! ../../models/pos/supplier-payment.model */ "./libs/database/src/models/pos/supplier-payment.model.ts");
let SupplierPaymentRepository = class SupplierPaymentRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
};
exports.SupplierPaymentRepository = SupplierPaymentRepository;
exports.SupplierPaymentRepository = SupplierPaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(supplier_payment_model_1.SupplierPayment)),
    __metadata("design:paramtypes", [Object])
], SupplierPaymentRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/supplier.repository.ts"
/*!*******************************************************************!*\
  !*** ./libs/database/src/repositories/pos/supplier.repository.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const supplier_model_1 = __webpack_require__(/*! ../../models/pos/supplier.model */ "./libs/database/src/models/pos/supplier.model.ts");
let SupplierRepository = class SupplierRepository {
    supplierModel;
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
    }
    async create(data) {
        return this.supplierModel.create(data);
    }
    async findOne(options) {
        return this.supplierModel.findOne(options);
    }
    async findAll(options) {
        return this.supplierModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.supplierModel.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_SUPPLIER_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_SUPPLIER_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.SupplierRepository = SupplierRepository;
exports.SupplierRepository = SupplierRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(supplier_model_1.Supplier)),
    __metadata("design:paramtypes", [Object])
], SupplierRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/udhaar-transaction.repository.ts"
/*!*****************************************************************************!*\
  !*** ./libs/database/src/repositories/pos/udhaar-transaction.repository.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UdhaarTransactionRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const udhaar_transaction_model_1 = __webpack_require__(/*! ../../models/pos/udhaar-transaction.model */ "./libs/database/src/models/pos/udhaar-transaction.model.ts");
let UdhaarTransactionRepository = class UdhaarTransactionRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
};
exports.UdhaarTransactionRepository = UdhaarTransactionRepository;
exports.UdhaarTransactionRepository = UdhaarTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(udhaar_transaction_model_1.UdhaarTransaction)),
    __metadata("design:paramtypes", [Object])
], UdhaarTransactionRepository);


/***/ },

/***/ "./libs/database/src/repositories/pos/unit.repository.ts"
/*!***************************************************************!*\
  !*** ./libs/database/src/repositories/pos/unit.repository.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnitRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const unit_model_1 = __webpack_require__(/*! ../../models/pos/unit.model */ "./libs/database/src/models/pos/unit.model.ts");
let UnitRepository = class UnitRepository {
    unitModel;
    constructor(unitModel) {
        this.unitModel = unitModel;
    }
    async create(data) {
        return this.unitModel.create(data);
    }
    async findOne(options) {
        return this.unitModel.findOne(options);
    }
    async findAll(options) {
        return this.unitModel.findAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_UNIT_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_UNIT_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.UnitRepository = UnitRepository;
exports.UnitRepository = UnitRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(unit_model_1.Unit)),
    __metadata("design:paramtypes", [Object])
], UnitRepository);


/***/ },

/***/ "./libs/database/src/repositories/repository.ts"
/*!******************************************************!*\
  !*** ./libs/database/src/repositories/repository.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_REPOSITORY = void 0;
const user_map_notification_repository_1 = __webpack_require__(/*! ./user-map-notification.repository */ "./libs/database/src/repositories/user-map-notification.repository.ts");
const lookup_respository_1 = __webpack_require__(/*! ./lookup.respository */ "./libs/database/src/repositories/lookup.respository.ts");
const notification_repository_1 = __webpack_require__(/*! ./notification.repository */ "./libs/database/src/repositories/notification.repository.ts");
const user_respository_1 = __webpack_require__(/*! ./user.respository */ "./libs/database/src/repositories/user.respository.ts");
const company_repository_1 = __webpack_require__(/*! ./company.repository */ "./libs/database/src/repositories/company.repository.ts");
const company_user_repository_1 = __webpack_require__(/*! ./company-user.repository */ "./libs/database/src/repositories/company-user.repository.ts");
const role_repository_1 = __webpack_require__(/*! ./role.repository */ "./libs/database/src/repositories/role.repository.ts");
const permission_repository_1 = __webpack_require__(/*! ./permission.repository */ "./libs/database/src/repositories/permission.repository.ts");
const role_permission_repository_1 = __webpack_require__(/*! ./role-permission.repository */ "./libs/database/src/repositories/role-permission.repository.ts");
const user_role_repository_1 = __webpack_require__(/*! ./user-role.repository */ "./libs/database/src/repositories/user-role.repository.ts");
const leads_repository_1 = __webpack_require__(/*! ./leads.repository */ "./libs/database/src/repositories/leads.repository.ts");
const call_repository_1 = __webpack_require__(/*! ./call.repository */ "./libs/database/src/repositories/call.repository.ts");
const call_participant_repository_1 = __webpack_require__(/*! ./call-participant.repository */ "./libs/database/src/repositories/call-participant.repository.ts");
const pos_user_repository_1 = __webpack_require__(/*! ./pos/pos-user.repository */ "./libs/database/src/repositories/pos/pos-user.repository.ts");
const category_repository_1 = __webpack_require__(/*! ./pos/category.repository */ "./libs/database/src/repositories/pos/category.repository.ts");
const unit_repository_1 = __webpack_require__(/*! ./pos/unit.repository */ "./libs/database/src/repositories/pos/unit.repository.ts");
const product_repository_1 = __webpack_require__(/*! ./pos/product.repository */ "./libs/database/src/repositories/pos/product.repository.ts");
const batch_repository_1 = __webpack_require__(/*! ./pos/batch.repository */ "./libs/database/src/repositories/pos/batch.repository.ts");
const supplier_repository_1 = __webpack_require__(/*! ./pos/supplier.repository */ "./libs/database/src/repositories/pos/supplier.repository.ts");
const purchase_repository_1 = __webpack_require__(/*! ./pos/purchase.repository */ "./libs/database/src/repositories/pos/purchase.repository.ts");
const purchase_item_repository_1 = __webpack_require__(/*! ./pos/purchase-item.repository */ "./libs/database/src/repositories/pos/purchase-item.repository.ts");
const customer_repository_1 = __webpack_require__(/*! ./pos/customer.repository */ "./libs/database/src/repositories/pos/customer.repository.ts");
const customer_payment_repository_1 = __webpack_require__(/*! ./pos/customer-payment.repository */ "./libs/database/src/repositories/pos/customer-payment.repository.ts");
const udhaar_transaction_repository_1 = __webpack_require__(/*! ./pos/udhaar-transaction.repository */ "./libs/database/src/repositories/pos/udhaar-transaction.repository.ts");
const sale_repository_1 = __webpack_require__(/*! ./pos/sale.repository */ "./libs/database/src/repositories/pos/sale.repository.ts");
const sale_item_repository_1 = __webpack_require__(/*! ./pos/sale-item.repository */ "./libs/database/src/repositories/pos/sale-item.repository.ts");
const sale_return_repository_1 = __webpack_require__(/*! ./pos/sale-return.repository */ "./libs/database/src/repositories/pos/sale-return.repository.ts");
const stock_adjustment_repository_1 = __webpack_require__(/*! ./pos/stock-adjustment.repository */ "./libs/database/src/repositories/pos/stock-adjustment.repository.ts");
const expense_repository_1 = __webpack_require__(/*! ./pos/expense.repository */ "./libs/database/src/repositories/pos/expense.repository.ts");
const audit_log_repository_1 = __webpack_require__(/*! ./pos/audit-log.repository */ "./libs/database/src/repositories/pos/audit-log.repository.ts");
const fbr_invoice_log_repository_1 = __webpack_require__(/*! ./pos/fbr-invoice-log.repository */ "./libs/database/src/repositories/pos/fbr-invoice-log.repository.ts");
const sale_payment_repository_1 = __webpack_require__(/*! ./pos/sale-payment.repository */ "./libs/database/src/repositories/pos/sale-payment.repository.ts");
const discount_rule_repository_1 = __webpack_require__(/*! ./pos/discount-rule.repository */ "./libs/database/src/repositories/pos/discount-rule.repository.ts");
const loyalty_points_log_repository_1 = __webpack_require__(/*! ./pos/loyalty-points-log.repository */ "./libs/database/src/repositories/pos/loyalty-points-log.repository.ts");
const supplier_ledger_transaction_repository_1 = __webpack_require__(/*! ./pos/supplier-ledger-transaction.repository */ "./libs/database/src/repositories/pos/supplier-ledger-transaction.repository.ts");
const supplier_payment_repository_1 = __webpack_require__(/*! ./pos/supplier-payment.repository */ "./libs/database/src/repositories/pos/supplier-payment.repository.ts");
const purchase_return_repository_1 = __webpack_require__(/*! ./pos/purchase-return.repository */ "./libs/database/src/repositories/pos/purchase-return.repository.ts");
const pos_role_repository_1 = __webpack_require__(/*! ./pos/pos-role.repository */ "./libs/database/src/repositories/pos/pos-role.repository.ts");
const pos_permission_repository_1 = __webpack_require__(/*! ./pos/pos-permission.repository */ "./libs/database/src/repositories/pos/pos-permission.repository.ts");
const pos_role_permission_repository_1 = __webpack_require__(/*! ./pos/pos-role-permission.repository */ "./libs/database/src/repositories/pos/pos-role-permission.repository.ts");
const pos_user_role_repository_1 = __webpack_require__(/*! ./pos/pos-user-role.repository */ "./libs/database/src/repositories/pos/pos-user-role.repository.ts");
const product_variant_repository_1 = __webpack_require__(/*! ./pos/product-variant.repository */ "./libs/database/src/repositories/pos/product-variant.repository.ts");
exports.ALL_REPOSITORY = [
    lookup_respository_1.LookupRepository,
    user_map_notification_repository_1.UserMapNotificationRepository,
    user_respository_1.UsersRepository,
    notification_repository_1.NotificationRepository,
    company_repository_1.CompanyRepository,
    company_user_repository_1.CompanyUserRepository,
    role_repository_1.RoleRepository,
    permission_repository_1.PermissionRepository,
    role_permission_repository_1.RolePermissionRepository,
    user_role_repository_1.UserRoleRepository,
    leads_repository_1.LeadsRepository,
    call_repository_1.CallRepository,
    call_participant_repository_1.CallParticipantRepository,
    pos_user_repository_1.PosUserRepository,
    category_repository_1.CategoryRepository,
    unit_repository_1.UnitRepository,
    product_repository_1.ProductRepository,
    batch_repository_1.BatchRepository,
    supplier_repository_1.SupplierRepository,
    purchase_repository_1.PurchaseRepository,
    purchase_item_repository_1.PurchaseItemRepository,
    customer_repository_1.CustomerRepository,
    customer_payment_repository_1.CustomerPaymentRepository,
    udhaar_transaction_repository_1.UdhaarTransactionRepository,
    sale_repository_1.SaleRepository,
    sale_item_repository_1.SaleItemRepository,
    sale_return_repository_1.SaleReturnRepository,
    stock_adjustment_repository_1.StockAdjustmentRepository,
    expense_repository_1.ExpenseRepository,
    audit_log_repository_1.AuditLogRepository,
    fbr_invoice_log_repository_1.FbrInvoiceLogRepository,
    sale_payment_repository_1.SalePaymentRepository,
    discount_rule_repository_1.DiscountRuleRepository,
    loyalty_points_log_repository_1.LoyaltyPointsLogRepository,
    supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository,
    supplier_payment_repository_1.SupplierPaymentRepository,
    purchase_return_repository_1.PurchaseReturnRepository,
    pos_role_repository_1.PosRoleRepository,
    pos_permission_repository_1.PosPermissionRepository,
    pos_role_permission_repository_1.PosRolePermissionRepository,
    pos_user_role_repository_1.PosUserRoleRepository,
    product_variant_repository_1.ProductVariantRepository,
];


/***/ },

/***/ "./libs/database/src/repositories/role-permission.repository.ts"
/*!**********************************************************************!*\
  !*** ./libs/database/src/repositories/role-permission.repository.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolePermissionRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const role_permission_model_1 = __webpack_require__(/*! ../models/role_permission.model */ "./libs/database/src/models/role_permission.model.ts");
let RolePermissionRepository = class RolePermissionRepository {
    rolePermissionModel;
    constructor(rolePermissionModel) {
        this.rolePermissionModel = rolePermissionModel;
    }
    async create(data) {
        return this.rolePermissionModel.create(data);
    }
    async findOne(options) {
        return this.rolePermissionModel.findOne(options);
    }
    async findAll(options) {
        return this.rolePermissionModel.findAll(options);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record) {
            throw new common_1.NotFoundException('REPOSITORY_ROLE_PERMISSION_NOT_FOUND');
        }
        await record.destroy();
        return true;
    }
};
exports.RolePermissionRepository = RolePermissionRepository;
exports.RolePermissionRepository = RolePermissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(role_permission_model_1.RolePermission)),
    __metadata("design:paramtypes", [Object])
], RolePermissionRepository);


/***/ },

/***/ "./libs/database/src/repositories/role.repository.ts"
/*!***********************************************************!*\
  !*** ./libs/database/src/repositories/role.repository.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const role_model_1 = __webpack_require__(/*! ../models/role.model */ "./libs/database/src/models/role.model.ts");
let RoleRepository = class RoleRepository {
    roleModel;
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(data) {
        return this.roleModel.create(data);
    }
    async findOne(options) {
        return this.roleModel.findOne(options);
    }
    async findAll(options) {
        return this.roleModel.findAll(options);
    }
    async update(options, data) {
        const role = await this.findOne(options);
        if (!role) {
            throw new common_1.NotFoundException('REPOSITORY_ROLE_NOT_FOUND');
        }
        return role.update(data);
    }
    async delete(options) {
        const role = await this.findOne(options);
        if (!role) {
            throw new common_1.NotFoundException('REPOSITORY_ROLE_NOT_FOUND');
        }
        await role.destroy();
        return true;
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [Object])
], RoleRepository);


/***/ },

/***/ "./libs/database/src/repositories/user-map-notification.repository.ts"
/*!****************************************************************************!*\
  !*** ./libs/database/src/repositories/user-map-notification.repository.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMapNotificationRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const user_map_notification_model_1 = __webpack_require__(/*! ../models/user-map-notification.model */ "./libs/database/src/models/user-map-notification.model.ts");
let UserMapNotificationRepository = class UserMapNotificationRepository {
    userMapNotificationModel;
    constructor(userMapNotificationModel) {
        this.userMapNotificationModel = userMapNotificationModel;
    }
    async create(data) {
        return this.userMapNotificationModel.create(data);
    }
    async createBulk(data) {
        return this.userMapNotificationModel.bulkCreate(data);
    }
    async findOne(options) {
        return this.userMapNotificationModel.findOne(options);
    }
    async findAll(options) {
        return this.userMapNotificationModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.userMapNotificationModel.findAndCountAll(options);
    }
    async update(options, data) {
        const userMapNotification = await this.findOne(options);
        if (!userMapNotification) {
            throw new common_1.NotFoundException('REPOSITORY_USER_MAP_NOTIFICATION_NOT_FOUND');
        }
        return userMapNotification.update(data);
    }
    async bulkUpdate(where, data) {
        return this.userMapNotificationModel.update(data, { where });
    }
    async delete(options) {
        const userMapNotification = await this.findOne(options);
        if (!userMapNotification) {
            throw new common_1.NotFoundException('REPOSITORY_USER_MAP_NOTIFICATION_NOT_FOUND');
        }
        await userMapNotification.destroy();
        return true;
    }
    async count(options) {
        return this.userMapNotificationModel.count(options);
    }
};
exports.UserMapNotificationRepository = UserMapNotificationRepository;
exports.UserMapNotificationRepository = UserMapNotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_map_notification_model_1.UserMapNotification)),
    __metadata("design:paramtypes", [Object])
], UserMapNotificationRepository);


/***/ },

/***/ "./libs/database/src/repositories/user-role.repository.ts"
/*!****************************************************************!*\
  !*** ./libs/database/src/repositories/user-role.repository.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRoleRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const user_role_model_1 = __webpack_require__(/*! ../models/user_role.model */ "./libs/database/src/models/user_role.model.ts");
let UserRoleRepository = class UserRoleRepository {
    userRoleModel;
    constructor(userRoleModel) {
        this.userRoleModel = userRoleModel;
    }
    async create(data) {
        return this.userRoleModel.create(data);
    }
    async findOne(options) {
        return this.userRoleModel.findOne(options);
    }
    async findAll(options) {
        return this.userRoleModel.findAll(options);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record) {
            throw new common_1.NotFoundException('REPOSITORY_USER_ROLE_NOT_FOUND');
        }
        await record.destroy();
        return true;
    }
};
exports.UserRoleRepository = UserRoleRepository;
exports.UserRoleRepository = UserRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_role_model_1.UserRole)),
    __metadata("design:paramtypes", [Object])
], UserRoleRepository);


/***/ },

/***/ "./libs/database/src/repositories/user.respository.ts"
/*!************************************************************!*\
  !*** ./libs/database/src/repositories/user.respository.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const user_model_1 = __webpack_require__(/*! ../models/user.model */ "./libs/database/src/models/user.model.ts");
let UsersRepository = class UsersRepository {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(data) {
        return this.userModel.create(data);
    }
    async findOne(options) {
        return this.userModel.findOne(options);
    }
    async findAll(options) {
        return this.userModel.findAll(options);
    }
    async findAndCountAll(options) {
        return this.userModel.findAndCountAll(options);
    }
    async update(options, data) {
        const user = await this.findOne(options);
        if (!user) {
            throw new common_1.NotFoundException('REPOSITORY_USER_NOT_FOUND');
        }
        return user.update(data);
    }
    async delete(options) {
        const user = await this.findOne(options);
        if (!user) {
            throw new common_1.NotFoundException('REPOSITORY_USER_NOT_FOUND');
        }
        await user.destroy();
        return true;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersRepository);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/microservices"
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
(module) {

module.exports = require("@nestjs/microservices");

/***/ },

/***/ "@nestjs/sequelize"
/*!************************************!*\
  !*** external "@nestjs/sequelize" ***!
  \************************************/
(module) {

module.exports = require("@nestjs/sequelize");

/***/ },

/***/ "@nestjs/websockets"
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
(module) {

module.exports = require("@nestjs/websockets");

/***/ },

/***/ "dotenv"
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
(module) {

module.exports = require("dotenv");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

module.exports = require("path");

/***/ },

/***/ "sequelize"
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
(module) {

module.exports = require("sequelize");

/***/ },

/***/ "sequelize-typescript"
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
(module) {

module.exports = require("sequelize-typescript");

/***/ },

/***/ "socket.io"
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
(module) {

module.exports = require("socket.io");

/***/ },

/***/ "uuid"
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
(module) {

module.exports = require("uuid");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/calling-service-app/src/main.ts");
/******/ 	
/******/ })()
;