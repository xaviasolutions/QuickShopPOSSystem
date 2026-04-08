/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/common-services-app/src/common-service.module.ts"
/*!***************************************************************!*\
  !*** ./apps/common-services-app/src/common-service.module.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const database_module_1 = __webpack_require__(/*! @app/database/database.module */ "./libs/database/src/database.module.ts");
const notification_module_1 = __webpack_require__(/*! ./modules/notification/notification.module */ "./apps/common-services-app/src/modules/notification/notification.module.ts");
const cron_module_1 = __webpack_require__(/*! ./modules/common-cron-service/cron.module */ "./apps/common-services-app/src/modules/common-cron-service/cron.module.ts");
const lookup_controller_1 = __webpack_require__(/*! ./modules/lookup/lookup.controller */ "./apps/common-services-app/src/modules/lookup/lookup.controller.ts");
const lookup_service_1 = __webpack_require__(/*! ./modules/lookup/lookup.service */ "./apps/common-services-app/src/modules/lookup/lookup.service.ts");
const lookup_respository_1 = __webpack_require__(/*! @app/database/repositories/lookup.respository */ "./libs/database/src/repositories/lookup.respository.ts");
const leads_module_1 = __webpack_require__(/*! ./modules/leads/leads.module */ "./apps/common-services-app/src/modules/leads/leads.module.ts");
let CommonServiceModule = class CommonServiceModule {
};
exports.CommonServiceModule = CommonServiceModule;
exports.CommonServiceModule = CommonServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, schedule_1.ScheduleModule.forRoot(), notification_module_1.NotificationModule, cron_module_1.CronModule, leads_module_1.LeadsModule],
        controllers: [lookup_controller_1.LookupController],
        providers: [lookup_service_1.LookupService, lookup_respository_1.LookupRepository],
    })
], CommonServiceModule);


/***/ },

/***/ "./apps/common-services-app/src/main.ts"
/*!**********************************************!*\
  !*** ./apps/common-services-app/src/main.ts ***!
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
const common_service_module_1 = __webpack_require__(/*! ./common-service.module */ "./apps/common-services-app/src/common-service.module.ts");
dotenv.config({ path: (0, path_1.join)(process.cwd(), `.env.${process.env.NODE_ENV}`) });
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(common_service_module_1.CommonServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.DEFAULT_HOST || '0.0.0.0',
            port: parseInt(process.env.COMMON_SERVICE_PORT || '3001')
        },
    });
    await app.listen();
    console.log(`Common Services is listening on port ${process.env.COMMON_SERVICE_PORT}`);
}
bootstrap();


/***/ },

/***/ "./apps/common-services-app/src/modules/common-cron-service/cron-notification.service.ts"
/*!***********************************************************************************************!*\
  !*** ./apps/common-services-app/src/modules/common-cron-service/cron-notification.service.ts ***!
  \***********************************************************************************************/
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
var CronService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const notification_service_1 = __webpack_require__(/*! ../notification/notification.service */ "./apps/common-services-app/src/modules/notification/notification.service.ts");
let CronService = CronService_1 = class CronService {
    notificationService;
    logger = new common_1.Logger(CronService_1.name);
    isSendingPending = false;
    isSendingApproved = false;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async handleSendPendingNotifications() {
        if (this.isSendingPending) {
            this.logger.warn('Previous pending notifications job still running, skipping...');
            return;
        }
        try {
            this.isSendingPending = true;
            this.logger.log('Starting CRON_SEND_PENDING_NOTIFICATIONS');
            await this.notificationService.sendPendingNotifications();
            this.logger.log('Completed CRON_SEND_PENDING_NOTIFICATIONS');
        }
        catch (error) {
            this.logger.error(`CRON_SEND_PENDING_NOTIFICATIONS failed: ${error.message}`);
        }
        finally {
            this.isSendingPending = false;
        }
    }
    async handleSendApprovedBroadcasts() {
        if (this.isSendingApproved) {
            this.logger.warn('Previous approved broadcasts job still running, skipping...');
            return;
        }
        try {
            this.isSendingApproved = true;
            this.logger.log('Starting CRON_SEND_APPROVED_VENDOR_NOTIFICATIONS');
            await this.notificationService.sendApprovedBroadcasts();
            this.logger.log('Completed CRON_SEND_APPROVED_VENDOR_NOTIFICATIONS');
        }
        catch (error) {
            this.logger.error(`CRON_SEND_APPROVED_VENDOR_NOTIFICATIONS failed: ${error.message}`);
        }
        finally {
            this.isSendingApproved = false;
        }
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleSendPendingNotifications", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleSendApprovedBroadcasts", null);
exports.CronService = CronService = CronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _a : Object])
], CronService);


/***/ },

/***/ "./apps/common-services-app/src/modules/common-cron-service/cron.module.ts"
/*!*********************************************************************************!*\
  !*** ./apps/common-services-app/src/modules/common-cron-service/cron.module.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cron_notification_service_1 = __webpack_require__(/*! ./cron-notification.service */ "./apps/common-services-app/src/modules/common-cron-service/cron-notification.service.ts");
const notification_module_1 = __webpack_require__(/*! ../notification/notification.module */ "./apps/common-services-app/src/modules/notification/notification.module.ts");
let CronModule = class CronModule {
};
exports.CronModule = CronModule;
exports.CronModule = CronModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        providers: [cron_notification_service_1.CronService],
    })
], CronModule);


/***/ },

/***/ "./apps/common-services-app/src/modules/leads/leads.controller.ts"
/*!************************************************************************!*\
  !*** ./apps/common-services-app/src/modules/leads/leads.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const patterns_1 = __webpack_require__(/*! @app/common/constants/patterns */ "./libs/common/src/constants/patterns.ts");
const leads_service_1 = __webpack_require__(/*! ./leads.service */ "./apps/common-services-app/src/modules/leads/leads.service.ts");
let LeadsController = class LeadsController {
    leadsService;
    constructor(leadsService) {
        this.leadsService = leadsService;
    }
    async createLead(data) {
        try {
            return await this.leadsService.createLead(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_CREATED',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getLead(data) {
        try {
            return await this.leadsService.getLeadById(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_FETCHED',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getAllLeads(data) {
        try {
            return await this.leadsService.getAllLeads(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LEADS_CANNOT_BE_FETCHED',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async updateLead(data) {
        try {
            return await this.leadsService.updateLead(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_UPDATED',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async deleteLead(data) {
        try {
            return await this.leadsService.deleteLead(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LEAD_CANNOT_BE_DELETED',
                status: error.getStatus?.() || 400,
            });
        }
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LEADS.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Partial !== "undefined" && Partial) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], LeadsController.prototype, "createLead", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LEADS.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof Partial !== "undefined" && Partial) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], LeadsController.prototype, "getLead", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LEADS.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof Partial !== "undefined" && Partial) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], LeadsController.prototype, "getAllLeads", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LEADS.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof Partial !== "undefined" && Partial) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], LeadsController.prototype, "updateLead", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LEADS.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof Partial !== "undefined" && Partial) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], LeadsController.prototype, "deleteLead", null);
exports.LeadsController = LeadsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof leads_service_1.LeadsService !== "undefined" && leads_service_1.LeadsService) === "function" ? _a : Object])
], LeadsController);


/***/ },

/***/ "./apps/common-services-app/src/modules/leads/leads.module.ts"
/*!********************************************************************!*\
  !*** ./apps/common-services-app/src/modules/leads/leads.module.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const leads_model_1 = __webpack_require__(/*! @app/database/models/leads.model */ "./libs/database/src/models/leads.model.ts");
const leads_repository_1 = __webpack_require__(/*! @app/database/repositories/leads.repository */ "./libs/database/src/repositories/leads.repository.ts");
const leads_service_1 = __webpack_require__(/*! ./leads.service */ "./apps/common-services-app/src/modules/leads/leads.service.ts");
const leads_controller_1 = __webpack_require__(/*! ./leads.controller */ "./apps/common-services-app/src/modules/leads/leads.controller.ts");
let LeadsModule = class LeadsModule {
};
exports.LeadsModule = LeadsModule;
exports.LeadsModule = LeadsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([leads_model_1.Lead])],
        controllers: [leads_controller_1.LeadsController],
        providers: [leads_service_1.LeadsService, leads_repository_1.LeadsRepository],
        exports: [leads_service_1.LeadsService],
    })
], LeadsModule);


/***/ },

/***/ "./apps/common-services-app/src/modules/leads/leads.service.ts"
/*!*********************************************************************!*\
  !*** ./apps/common-services-app/src/modules/leads/leads.service.ts ***!
  \*********************************************************************/
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
exports.LeadsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const leads_repository_1 = __webpack_require__(/*! @app/database/repositories/leads.repository */ "./libs/database/src/repositories/leads.repository.ts");
let LeadsService = class LeadsService {
    leadsRepository;
    constructor(leadsRepository) {
        this.leadsRepository = leadsRepository;
    }
    async createLead(data) {
        try {
            if (!data.name || !data.title || !data.source) {
                throw new common_1.BadRequestException('CREATE_LEAD_NAME_TITLE_AND_SOURCE_REQUIRED');
            }
            return await this.leadsRepository.create(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getLeadById(id) {
        try {
            const options = {
                where: { id },
            };
            const lead = await this.leadsRepository.findOne(options);
            if (!lead) {
                throw new common_1.BadRequestException('GET_LEAD_NOT_FOUND');
            }
            return lead;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllLeads(paginated) {
        try {
            const filters = paginated?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;
            const options = {
                where: {},
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };
            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [sequelize_1.Op.or]: [
                            { name: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                            { title: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                            { email: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                            { phone: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }
                if (filters.source) {
                    if (typeof filters.source === 'string') {
                        options.where = {
                            ...options.where,
                            source: filters.source,
                        };
                    }
                    else {
                        options.where = {
                            ...options.where,
                            source: { [sequelize_1.Op.in]: filters.source },
                        };
                    }
                }
                if (filters.dateFrom || filters.dateTo) {
                    const createdAt = {};
                    if (filters.dateFrom) {
                        createdAt[sequelize_1.Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        createdAt[sequelize_1.Op.lte] = new Date(filters.dateTo);
                    }
                    options.where = {
                        ...options.where,
                        createdAt: createdAt,
                    };
                }
            }
            const responseData = await this.leadsRepository.findAndCountAll(options);
            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateLead(data) {
        try {
            const { id, ...updateData } = data;
            const options = {
                where: { id },
            };
            const lead = await this.leadsRepository.findOne(options);
            if (!lead) {
                throw new common_1.BadRequestException('UPDATE_LEAD_NOT_FOUND');
            }
            await lead.update(updateData);
            return lead;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteLead(id) {
        try {
            const options = {
                where: { id },
            };
            await this.leadsRepository.delete(options);
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof leads_repository_1.LeadsRepository !== "undefined" && leads_repository_1.LeadsRepository) === "function" ? _a : Object])
], LeadsService);


/***/ },

/***/ "./apps/common-services-app/src/modules/lookup/lookup.controller.ts"
/*!**************************************************************************!*\
  !*** ./apps/common-services-app/src/modules/lookup/lookup.controller.ts ***!
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LookupController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const lookup_service_1 = __webpack_require__(/*! ./lookup.service */ "./apps/common-services-app/src/modules/lookup/lookup.service.ts");
const patterns_1 = __webpack_require__(/*! @app/common/constants/patterns */ "./libs/common/src/constants/patterns.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let LookupController = class LookupController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_CANNOT_BE_CREATED',
                status: error.getStatus() || 400,
            });
        }
    }
    async getAllParents() {
        try {
            return await this.service.getAllParents();
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_CANNOT_BE_CREATED',
                status: error.getStatus() || 400,
            });
        }
    }
    async getParentChild(parentId) {
        try {
            return await this.service.getAllParentChild(parentId);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_PARENT_NOT_FOUND',
                status: error.getStatus() || 400,
            });
        }
    }
    async deleteRow(id) {
        try {
            return await this.service.deleteRow(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_ROW_CANNOT_BE_DELETED',
                status: error.getStatus() || 400,
            });
        }
    }
};
exports.LookupController = LookupController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LOOKUP.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], LookupController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LOOKUP.GET_ALL_PARENTS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], LookupController.prototype, "getAllParents", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LOOKUP.GET_PARENT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], LookupController.prototype, "getParentChild", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.LOOKUP.DELETE_ROW),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], LookupController.prototype, "deleteRow", null);
exports.LookupController = LookupController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof lookup_service_1.LookupService !== "undefined" && lookup_service_1.LookupService) === "function" ? _a : Object])
], LookupController);


/***/ },

/***/ "./apps/common-services-app/src/modules/lookup/lookup.service.ts"
/*!***********************************************************************!*\
  !*** ./apps/common-services-app/src/modules/lookup/lookup.service.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LookupService = void 0;
const lookup_respository_1 = __webpack_require__(/*! @app/database/repositories/lookup.respository */ "./libs/database/src/repositories/lookup.respository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LookupService = class LookupService {
    lookupRepository;
    constructor(lookupRepository) {
        this.lookupRepository = lookupRepository;
    }
    async create(body) {
        try {
            const data = await this.lookupRepository.create(body);
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAllParents() {
        try {
            const options = {
                where: {
                    parent: null
                },
                raw: true,
                attributes: ['id', 'name']
            };
            const data = await this.lookupRepository.findAll(options);
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAllParentChild(parentId) {
        try {
            const options = {
                where: {
                    id: Number(parentId)
                },
                raw: true,
                attributes: ['id', 'name']
            };
            const parentData = await this.lookupRepository.findOne(options);
            if (!parentData) {
                throw new common_1.BadRequestException('LOOKUP_PARENT_ID_NOT_FOUND');
            }
            const data = {
                category: parentData.name || "",
                subCategories: []
            };
            const parentChildOptions = {
                where: {
                    parent: Number(parentId)
                },
                raw: true,
                attributes: ['id', 'name']
            };
            const subCategoryData = await this.lookupRepository.findAll(parentChildOptions);
            data.subCategories = subCategoryData;
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteRow(id) {
        try {
            const options = {
                where: {
                    id: Number(id)
                },
            };
            const data = await this.lookupRepository.update(options, { isDeleted: true });
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.LookupService = LookupService;
exports.LookupService = LookupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof lookup_respository_1.LookupRepository !== "undefined" && lookup_respository_1.LookupRepository) === "function" ? _a : Object])
], LookupService);


/***/ },

/***/ "./apps/common-services-app/src/modules/notification/notification.controller.ts"
/*!**************************************************************************************!*\
  !*** ./apps/common-services-app/src/modules/notification/notification.controller.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_service_1 = __webpack_require__(/*! ./notification.service */ "./apps/common-services-app/src/modules/notification/notification.service.ts");
const patterns_1 = __webpack_require__(/*! @app/common/constants/patterns */ "./libs/common/src/constants/patterns.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let NotificationController = class NotificationController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getUserNotifications(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getUserNotifications(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_NOTIFICATIONS',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getUnreadNotifications(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getUnreadNotifications(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_UNREAD_NOTIFICATIONS',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getUnreadCount(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getUnreadCount(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_UNREAD_COUNT',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async markAsRead(data) {
        try {
            return await this.notificationService.markAsRead(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_MARK_AS_READ',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async createAdminBroadcast(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_ADMIN_ID_REQUIRED',
                    status: 400,
                });
            }
            if (!data.data) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_BROADCAST_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.createAdminBroadcast(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_CREATE_ADMIN_BROADCAST',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async approveBroadcast(data) {
        try {
            if (!data.data) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_BROADCAST_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.approveBroadcast(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_APPROVE_BROADCAST',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getVendorBroadcastRequests(data) {
        try {
            return await this.notificationService.getVendorBroadcastRequests(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_VENDOR_BROADCAST_REQUESTS',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getAdminBroadcastHistory(data) {
        try {
            return await this.notificationService.getAdminBroadcastHistory(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_ADMIN_BROADCAST_HISTORY',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async createVendorBroadcast(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_VENDOR_ID_REQUIRED',
                    status: 400,
                });
            }
            if (!data.data) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_BROADCAST_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.createVendorBroadcast(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_CREATE_VENDOR_BROADCAST',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getVendorCustomersCount(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_VENDOR_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getVendorCustomersCount(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_VENDOR_CUSTOMERS_COUNT',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async getVendorBroadcastHistory(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_VENDOR_ID_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.getVendorBroadcastHistory(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_GET_VENDOR_BROADCAST_HISTORY',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async createNotification(data) {
        try {
            if (!data.data) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_NOTIFICATION_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.createNotification(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_CREATE_NOTIFICATION',
                status: error.getStatus?.() || 400,
            });
        }
    }
    async bulkCreateNotification(data) {
        try {
            if (!data.userId) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_USER_ID_REQUIRED',
                    status: 400,
                });
            }
            if (!data.data) {
                throw new microservices_1.RpcException({
                    message: 'CONTROLLER_NOTIFICATIONS_DATA_REQUIRED',
                    status: 400,
                });
            }
            return await this.notificationService.bulkCreateNotification(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message || 'CONTROLLER_FAILED_TO_BULK_CREATE_NOTIFICATIONS',
                status: error.getStatus?.() || 400,
            });
        }
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_USER_NOTIFICATIONS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUserNotifications", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_UNREAD_NOTIFICATIONS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadNotifications", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_UNREAD_COUNT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadCount", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.MARK_AS_READ),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_ADMIN_BROADCAST),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createAdminBroadcast", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.APPROVE_BROADCAST),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "approveBroadcast", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_BROADCAST_REQUESTS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getVendorBroadcastRequests", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_ADMIN_BROADCAST_HISTORY),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getAdminBroadcastHistory", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_VENDOR_BROADCAST),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createVendorBroadcast", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_CUSTOMERS_COUNT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getVendorCustomersCount", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.GET_VENDOR_BROADCAST_HISTORY),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getVendorBroadcastHistory", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.CREATE_NOTIFICATION),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createNotification", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.COMMON_SERVICES_PATTERNS.NOTIFICATION.BULK_CREATE_NOTIFICATION),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "bulkCreateNotification", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _a : Object])
], NotificationController);


/***/ },

/***/ "./apps/common-services-app/src/modules/notification/notification.module.ts"
/*!**********************************************************************************!*\
  !*** ./apps/common-services-app/src/modules/notification/notification.module.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_controller_1 = __webpack_require__(/*! ./notification.controller */ "./apps/common-services-app/src/modules/notification/notification.controller.ts");
const notification_service_1 = __webpack_require__(/*! ./notification.service */ "./apps/common-services-app/src/modules/notification/notification.service.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const database_module_1 = __webpack_require__(/*! @app/database/database.module */ "./libs/database/src/database.module.ts");
const notification_repository_1 = __webpack_require__(/*! @app/database/repositories/notification.repository */ "./libs/database/src/repositories/notification.repository.ts");
const user_map_notification_repository_1 = __webpack_require__(/*! @app/database/repositories/user-map-notification.repository */ "./libs/database/src/repositories/user-map-notification.repository.ts");
const user_respository_1 = __webpack_require__(/*! @app/database/repositories/user.respository */ "./libs/database/src/repositories/user.respository.ts");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService, common_2.FcmService, common_2.EmailService, notification_repository_1.NotificationRepository, user_map_notification_repository_1.UserMapNotificationRepository, user_respository_1.UsersRepository],
        exports: [notification_service_1.NotificationService],
    })
], NotificationModule);


/***/ },

/***/ "./apps/common-services-app/src/modules/notification/notification.service.ts"
/*!***********************************************************************************!*\
  !*** ./apps/common-services-app/src/modules/notification/notification.service.ts ***!
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
var NotificationService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_repository_1 = __webpack_require__(/*! @app/database/repositories/notification.repository */ "./libs/database/src/repositories/notification.repository.ts");
const user_map_notification_repository_1 = __webpack_require__(/*! @app/database/repositories/user-map-notification.repository */ "./libs/database/src/repositories/user-map-notification.repository.ts");
const user_respository_1 = __webpack_require__(/*! @app/database/repositories/user.respository */ "./libs/database/src/repositories/user.respository.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
let NotificationService = NotificationService_1 = class NotificationService {
    notificationRepository;
    userMapNotificationRepository;
    usersRepository;
    fcmService;
    emailService;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(notificationRepository, userMapNotificationRepository, usersRepository, fcmService, emailService) {
        this.notificationRepository = notificationRepository;
        this.userMapNotificationRepository = userMapNotificationRepository;
        this.usersRepository = usersRepository;
        this.fcmService = fcmService;
        this.emailService = emailService;
    }
    async createNotification(request) {
        try {
            if (!request.data) {
                throw new common_1.BadRequestException('NOTIFICATION_DATA_REQUIRED');
            }
            const data = request.data;
            const userId = request.userId ? Number(request.userId) : undefined;
            const notification = await this.notificationRepository.create({
                ...data,
                userType: data.userType || 'system',
                status: 'pending',
                isApproved: true,
                createdBy: userId,
            });
            if (data.userId) {
                await this.userMapNotificationRepository.create({
                    userId: data.userId,
                    notificationId: notification.id,
                    isRead: false,
                    isSent: false,
                    isDelivered: false,
                });
            }
            return notification;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getUserNotifications(request) {
        try {
            const userId = Number(request.userId);
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;
            const notificationWhere = {};
            const options = {
                where: {
                    userId: userId,
                    isDeleted: false
                },
                include: [{
                        association: 'notification',
                        required: false
                    }],
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };
            if (filters) {
                if (filters.search) {
                    notificationWhere[sequelize_1.Op.or] = [
                        { title: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                        { message: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                    ];
                }
                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        notificationWhere.type = { [sequelize_1.Op.like]: `%${filters.type}%` };
                    }
                    else {
                        notificationWhere.type = { [sequelize_1.Op.in]: filters.type };
                    }
                }
                if (filters.userType) {
                    if (typeof filters.userType === 'string') {
                        notificationWhere.userType = filters.userType;
                    }
                    else {
                        notificationWhere.userType = { [sequelize_1.Op.in]: filters.userType };
                    }
                }
                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        notificationWhere.status = filters.status;
                    }
                    else {
                        notificationWhere.status = { [sequelize_1.Op.in]: filters.status };
                    }
                }
                if (filters.operation) {
                    if (typeof filters.operation === 'string') {
                        notificationWhere.operation = filters.operation;
                    }
                    else {
                        notificationWhere.operation = { [sequelize_1.Op.in]: filters.operation };
                    }
                }
                if (typeof filters.isApproved === 'boolean') {
                    notificationWhere.isApproved = filters.isApproved;
                }
                if (typeof filters.isRead === 'boolean') {
                    options.where = {
                        ...options.where,
                        isRead: filters.isRead,
                    };
                }
                if (filters.bookingId) {
                    notificationWhere.bookingId = filters.bookingId;
                }
                if (filters.vendorId) {
                    notificationWhere.vendorId = filters.vendorId;
                }
                if (filters.dateFrom || filters.dateTo) {
                    notificationWhere.createdAt = {};
                    if (filters.dateFrom) {
                        notificationWhere.createdAt[sequelize_1.Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        notificationWhere.createdAt[sequelize_1.Op.lte] = new Date(filters.dateTo);
                    }
                }
            }
            if (Object.keys(notificationWhere).length > 0) {
                options.include[0].where = notificationWhere;
                options.include[0].required = true;
            }
            const responseData = await this.userMapNotificationRepository.findAndCountAll(options);
            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getUnreadNotifications(request) {
        try {
            const userId = Number(request.userId);
            return await this.userMapNotificationRepository.findAll({
                where: {
                    userId: userId,
                    isRead: false,
                    isDeleted: false
                },
                include: [{ association: 'notification' }],
                order: [['createdAt', 'DESC']],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getUnreadCount(request) {
        try {
            const userId = Number(request.userId);
            const count = await this.userMapNotificationRepository.count({
                where: {
                    userId: userId,
                    isRead: false,
                    isDeleted: false
                },
            });
            return { count };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async markAsRead(data) {
        try {
            const notificationId = data.data;
            const userId = Number(data.userId);
            const userMapNotification = await this.userMapNotificationRepository.findOne({
                where: { notificationId, userId },
            });
            if (!userMapNotification) {
                throw new common_1.BadRequestException('NOTIFICATION_NOT_FOUND');
            }
            await userMapNotification.update({
                isRead: true,
                readAt: new Date(),
            });
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createAdminBroadcast(request) {
        try {
            if (!request.data) {
                throw new common_1.BadRequestException('BROADCAST_DATA_REQUIRED');
            }
            const data = request.data;
            const adminId = Number(request.userId);
            const users = await this.usersRepository.findAll();
            const notification = await this.notificationRepository.create({
                title: data.title,
                message: data.message,
                image: data.image,
                type: data.type,
                userType: 'admin',
                status: 'pending',
                isApproved: false,
                operation: 'admin_broadcast',
                numberOfUsers: users.length,
                createdBy: adminId,
            });
            const userMapData = users.map(user => ({
                userId: user.id,
                notificationId: notification.id,
                isRead: false,
                isSent: false,
                isDelivered: false,
            }));
            await this.userMapNotificationRepository.createBulk(userMapData);
            return notification;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createVendorBroadcast(request) {
        try {
            if (!request.data) {
                throw new common_1.BadRequestException('BROADCAST_DATA_REQUIRED');
            }
            const data = request.data;
            const vendorId = Number(request.userId);
            const customers = data.userIds
                ? await this.usersRepository.findAll({ where: { id: { [sequelize_1.Op.in]: data.userIds } } })
                : [];
            const notification = await this.notificationRepository.create({
                title: data.title,
                message: data.message,
                image: data.image,
                type: data.type,
                userType: 'vendor',
                status: 'pending',
                isApproved: false,
                operation: 'vendor_broadcast',
                vendorId: vendorId,
                numberOfUsers: customers.length,
                createdBy: vendorId,
            });
            const userMapData = customers.map(customer => ({
                userId: customer.id,
                notificationId: notification.id,
                isRead: false,
                isSent: false,
                isDelivered: false,
            }));
            await this.userMapNotificationRepository.createBulk(userMapData);
            return notification;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async approveBroadcast(request) {
        try {
            if (!request.data) {
                throw new common_1.BadRequestException('BROADCAST_DATA_REQUIRED');
            }
            const data = request.data;
            const notification = await this.notificationRepository.findOne({
                where: { id: data.notificationId },
            });
            if (!notification) {
                throw new common_1.BadRequestException('NOTIFICATION_NOT_FOUND');
            }
            await notification.update({ isApproved: true });
            return { success: true, message: 'BROADCAST_APPROVED_SUCCESS' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getVendorCustomersCount(request) {
        try {
            const vendorId = Number(request.userId);
            const count = 0;
            return { count };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getVendorBroadcastHistory(request) {
        try {
            const vendorId = Number(request.userId);
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;
            const options = {
                where: {
                    vendorId: vendorId,
                    operation: 'vendor_broadcast'
                },
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };
            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [sequelize_1.Op.or]: [
                            { title: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                            { message: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }
                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        options.where = {
                            ...options.where,
                            type: { [sequelize_1.Op.like]: `%${filters.type}%` },
                        };
                    }
                    else {
                        options.where = {
                            ...options.where,
                            type: { [sequelize_1.Op.in]: filters.type },
                        };
                    }
                }
                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        options.where = {
                            ...options.where,
                            status: filters.status,
                        };
                    }
                    else {
                        options.where = {
                            ...options.where,
                            status: { [sequelize_1.Op.in]: filters.status },
                        };
                    }
                }
                if (typeof filters.isApproved === 'boolean') {
                    options.where = {
                        ...options.where,
                        isApproved: filters.isApproved,
                    };
                }
                if (filters.dateFrom || filters.dateTo) {
                    const createdAt = {};
                    if (filters.dateFrom) {
                        createdAt[sequelize_1.Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        createdAt[sequelize_1.Op.lte] = new Date(filters.dateTo);
                    }
                    options.where = {
                        ...options.where,
                        createdAt: createdAt,
                    };
                }
            }
            const responseData = await this.notificationRepository.findAndCountAll(options);
            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAdminBroadcastHistory(request) {
        try {
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;
            const options = {
                where: {
                    operation: 'admin_broadcast'
                },
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };
            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [sequelize_1.Op.or]: [
                            { title: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                            { message: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }
                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        options.where = {
                            ...options.where,
                            type: { [sequelize_1.Op.like]: `%${filters.type}%` },
                        };
                    }
                    else {
                        options.where = {
                            ...options.where,
                            type: { [sequelize_1.Op.in]: filters.type },
                        };
                    }
                }
                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        options.where = {
                            ...options.where,
                            status: filters.status,
                        };
                    }
                    else {
                        options.where = {
                            ...options.where,
                            status: { [sequelize_1.Op.in]: filters.status },
                        };
                    }
                }
                if (typeof filters.isApproved === 'boolean') {
                    options.where = {
                        ...options.where,
                        isApproved: filters.isApproved,
                    };
                }
                if (filters.dateFrom || filters.dateTo) {
                    const createdAt = {};
                    if (filters.dateFrom) {
                        createdAt[sequelize_1.Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        createdAt[sequelize_1.Op.lte] = new Date(filters.dateTo);
                    }
                    options.where = {
                        ...options.where,
                        createdAt: createdAt,
                    };
                }
            }
            const responseData = await this.notificationRepository.findAndCountAll(options);
            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getVendorBroadcastRequests(request) {
        try {
            const paginated = request.data;
            const filters = request.data?.filters;
            const page = Number(paginated?.page) || 1;
            const limit = Number(paginated?.size) || 10;
            const offset = (page - 1) * limit;
            const options = {
                where: {
                    operation: 'vendor_broadcast',
                    isApproved: false
                },
                order: [['createdAt', 'DESC']],
                offset: offset,
                limit: limit,
            };
            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [sequelize_1.Op.or]: [
                            { title: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                            { message: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }
                if (filters.type) {
                    if (typeof filters.type === 'string') {
                        options.where = {
                            ...options.where,
                            type: { [sequelize_1.Op.like]: `%${filters.type}%` },
                        };
                    }
                    else {
                        options.where = {
                            ...options.where,
                            type: { [sequelize_1.Op.in]: filters.type },
                        };
                    }
                }
                if (filters.status) {
                    if (typeof filters.status === 'string') {
                        options.where = {
                            ...options.where,
                            status: filters.status,
                        };
                    }
                    else {
                        options.where = {
                            ...options.where,
                            status: { [sequelize_1.Op.in]: filters.status },
                        };
                    }
                }
                if (filters.vendorId) {
                    options.where = {
                        ...options.where,
                        vendorId: filters.vendorId,
                    };
                }
                if (filters.dateFrom || filters.dateTo) {
                    const createdAt = {};
                    if (filters.dateFrom) {
                        createdAt[sequelize_1.Op.gte] = new Date(filters.dateFrom);
                    }
                    if (filters.dateTo) {
                        createdAt[sequelize_1.Op.lte] = new Date(filters.dateTo);
                    }
                    options.where = {
                        ...options.where,
                        createdAt: createdAt,
                    };
                }
            }
            const responseData = await this.notificationRepository.findAndCountAll(options);
            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async sendPendingNotifications() {
        try {
            const notifications = await this.notificationRepository.findAll({
                where: {
                    status: 'pending',
                    userType: 'system',
                    isDelivered: false,
                },
                limit: 50,
            });
            for (const notification of notifications) {
                const userMaps = await this.userMapNotificationRepository.findAll({
                    where: { notificationId: notification.id, isSent: false },
                });
                for (const userMap of userMaps) {
                    await this.sendNotificationToUser(notification, userMap);
                }
                await notification.update({ status: 'sent', isDelivered: true });
            }
            this.logger.log(`Processed ${notifications.length} pending notifications`);
        }
        catch (error) {
            this.logger.error(`Failed to send pending notifications: ${error.message}`);
        }
    }
    async sendApprovedBroadcasts() {
        try {
            const notifications = await this.notificationRepository.findAll({
                where: {
                    isApproved: true,
                    status: 'pending',
                    operation: { [sequelize_1.Op.in]: ['vendor_broadcast', 'admin_broadcast'] },
                },
                limit: 10,
            });
            for (const notification of notifications) {
                const userMaps = await this.userMapNotificationRepository.findAll({
                    where: { notificationId: notification.id, isSent: false },
                    limit: 25,
                });
                for (const userMap of userMaps) {
                    await this.sendNotificationToUser(notification, userMap);
                }
                const remainingCount = await this.userMapNotificationRepository.count({
                    where: { notificationId: notification.id, isSent: false },
                });
                if (remainingCount === 0) {
                    await notification.update({ status: 'sent', isDelivered: true });
                }
            }
            this.logger.log(`Processed ${notifications.length} approved broadcasts`);
        }
        catch (error) {
            this.logger.error(`Failed to send approved broadcasts: ${error.message}`);
        }
    }
    async sendNotificationToUser(notification, userMap) {
        try {
            const userId = userMap.userId || userMap.dataValues?.userId;
            if (!userId) {
                this.logger.error(`userId not found in userMap`);
                return;
            }
            const user = await this.usersRepository.findOne({ where: { id: userId } });
            if (!user) {
                this.logger.warn(`User ${userId} not found`);
                return;
            }
            const userData = user.dataValues || user;
            const userEmail = userData.email || user.email;
            const userFcmToken = userData.fcmToken || user.fcmToken;
            this.logger.log(`User ${userId} data - Email: ${userEmail ? 'exists' : 'missing'}, FCM: ${userFcmToken ? 'exists' : 'missing'}`);
            const notificationData = notification.dataValues || notification;
            const notificationType = notificationData.type;
            const notificationTitle = notificationData.title;
            const notificationMessage = notificationData.message;
            const notificationId = notificationData.id;
            if (!notificationType) {
                this.logger.error(`Notification type is undefined for notification ${notificationId}`);
                return;
            }
            const types = notificationType.split(',').map((t) => t.trim());
            this.logger.log(`Processing notification types: ${types.join(', ')} for user ${userId}`);
            if (types.includes('push')) {
                if (userFcmToken) {
                    this.logger.log(`Sending push notification to user ${userId}`);
                    await this.fcmService.sendPushNotification(userFcmToken, notificationTitle, notificationMessage, { notificationId: notificationId });
                }
                else {
                    this.logger.warn(`User ${userId} has no FCM token, skipping push notification`);
                }
            }
            if (types.includes('email')) {
                if (userEmail) {
                    this.logger.log(`Sending email to ${userEmail}`);
                    const emailSent = await this.emailService.sendEmail(userEmail, notificationTitle, `<p>${notificationMessage}</p>`);
                    this.logger.log(`Email send result: ${emailSent ? 'Success' : 'Failed'}`);
                }
                else {
                    this.logger.warn(`User ${userId} has no email address, skipping email notification`);
                }
            }
            await userMap.update({
                isSent: true,
                isDelivered: true,
                sentAt: new Date(),
                deliveredAt: new Date(),
            });
            this.logger.log(`Notification sent to user ${userId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send notification to user: ${error.message}`);
        }
    }
    async bulkCreateNotification(request) {
        try {
            if (!request.data) {
                throw new common_1.BadRequestException('NOTIFICATIONS_DATA_REQUIRED');
            }
            const notifications = request.data;
            const userId = Number(request.userId);
            const createdNotifications = [];
            for (const notificationData of notifications) {
                const notification = await this.notificationRepository.create({
                    ...notificationData,
                    userType: notificationData.userType || 'system',
                    status: 'pending',
                    isApproved: true,
                    createdBy: userId,
                });
                if (notificationData.userId) {
                    await this.userMapNotificationRepository.create({
                        userId: notificationData.userId,
                        notificationId: notification.id,
                        isRead: false,
                        isSent: false,
                        isDelivered: false,
                    });
                }
                createdNotifications.push(notification);
            }
            return createdNotifications;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_repository_1.NotificationRepository !== "undefined" && notification_repository_1.NotificationRepository) === "function" ? _a : Object, typeof (_b = typeof user_map_notification_repository_1.UserMapNotificationRepository !== "undefined" && user_map_notification_repository_1.UserMapNotificationRepository) === "function" ? _b : Object, typeof (_c = typeof user_respository_1.UsersRepository !== "undefined" && user_respository_1.UsersRepository) === "function" ? _c : Object, typeof (_d = typeof common_2.FcmService !== "undefined" && common_2.FcmService) === "function" ? _d : Object, typeof (_e = typeof common_2.EmailService !== "undefined" && common_2.EmailService) === "function" ? _e : Object])
], NotificationService);


/***/ },

/***/ "./libs/common/src/common.module.ts"
/*!******************************************!*\
  !*** ./libs/common/src/common.module.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_service_1 = __webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts");
const transform_interceptors_1 = __webpack_require__(/*! ./interceptors/transform.interceptors */ "./libs/common/src/interceptors/transform.interceptors.ts");
const http_exception_filters_1 = __webpack_require__(/*! ./filters/http-exception.filters */ "./libs/common/src/filters/http-exception.filters.ts");
const rpc_exection_filters_1 = __webpack_require__(/*! ./filters/rpc-exection.filters */ "./libs/common/src/filters/rpc-exection.filters.ts");
const api_exeptions_1 = __webpack_require__(/*! ./exceptions/api.exeptions */ "./libs/common/src/exceptions/api.exeptions.ts");
const logging_interceptors_1 = __webpack_require__(/*! ./interceptors/logging.interceptors */ "./libs/common/src/interceptors/logging.interceptors.ts");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [common_service_1.CommonService, transform_interceptors_1.TransformInterceptor, http_exception_filters_1.HttpExceptionFilter, rpc_exection_filters_1.HyperRpcFilter, api_exeptions_1.ApiException, logging_interceptors_1.LoggingInterceptor],
        exports: [common_service_1.CommonService, transform_interceptors_1.TransformInterceptor, http_exception_filters_1.HttpExceptionFilter, rpc_exection_filters_1.HyperRpcFilter, api_exeptions_1.ApiException, logging_interceptors_1.LoggingInterceptor],
    })
], CommonModule);


/***/ },

/***/ "./libs/common/src/common.service.ts"
/*!*******************************************!*\
  !*** ./libs/common/src/common.service.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


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

/***/ "./libs/common/src/constants/pos-patterns.ts"
/*!***************************************************!*\
  !*** ./libs/common/src/constants/pos-patterns.ts ***!
  \***************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.POS_PATTERNS = void 0;
exports.POS_PATTERNS = {
    POS_USER: {
        CREATE: { cmd: 'pos_user_create' },
        LOGIN: { cmd: 'pos_user_login' },
        GET_ONE: { cmd: 'pos_user_get_one' },
        GET_ALL: { cmd: 'pos_user_get_all' },
        UPDATE: { cmd: 'pos_user_update' },
        DELETE: { cmd: 'pos_user_delete' },
    },
    CATEGORY: {
        CREATE: { cmd: 'category_create' },
        GET_ONE: { cmd: 'category_get_one' },
        GET_ALL: { cmd: 'category_get_all' },
        GET_TREE: { cmd: 'category_get_tree' },
        UPDATE: { cmd: 'category_update' },
        DELETE: { cmd: 'category_delete' },
    },
    UNIT: {
        CREATE: { cmd: 'unit_create' },
        GET_ALL: { cmd: 'unit_get_all' },
        UPDATE: { cmd: 'unit_update' },
        DELETE: { cmd: 'unit_delete' },
    },
    PRODUCT: {
        CREATE: { cmd: 'product_create' },
        GET_ONE: { cmd: 'product_get_one' },
        GET_ALL: { cmd: 'product_get_all' },
        UPDATE: { cmd: 'product_update' },
        DELETE: { cmd: 'product_delete' },
        SEARCH: { cmd: 'product_search' },
        GET_LOW_STOCK: { cmd: 'product_get_low_stock' },
        GET_EXPIRING: { cmd: 'product_get_expiring' },
        GET_PRICE_HISTORY: { cmd: 'product_get_price_history' },
        DELETE_PRICE_HISTORY: { cmd: 'product_delete_price_history' },
        BULK_IMPORT: { cmd: 'product_bulk_import' },
        ADD_IMAGE: { cmd: 'product_add_image' },
        GET_IMAGES: { cmd: 'product_get_images' },
        DELETE_IMAGE: { cmd: 'product_delete_image' },
    },
    BATCH: {
        CREATE: { cmd: 'batch_create' },
        GET_BY_PRODUCT: { cmd: 'batch_get_by_product' },
        UPDATE: { cmd: 'batch_update' },
    },
    PRODUCT_VARIANT: {
        CREATE: { cmd: 'product_variant_create' },
        GET_BY_PRODUCT: { cmd: 'product_variant_get_by_product' },
        UPDATE: { cmd: 'product_variant_update' },
        DELETE: { cmd: 'product_variant_delete' },
    },
    TAX_SETTING: {
        GET_ALL: { cmd: 'tax_setting_get_all' },
        UPSERT: { cmd: 'tax_setting_upsert' },
        DELETE: { cmd: 'tax_setting_delete' },
    },
    SUPPLIER: {
        CREATE: { cmd: 'supplier_create' },
        GET_ONE: { cmd: 'supplier_get_one' },
        GET_ALL: { cmd: 'supplier_get_all' },
        UPDATE: { cmd: 'supplier_update' },
        DELETE: { cmd: 'supplier_delete' },
    },
    PURCHASE: {
        CREATE: { cmd: 'purchase_create' },
        GET_ONE: { cmd: 'purchase_get_one' },
        GET_ALL: { cmd: 'purchase_get_all' },
        UPDATE: { cmd: 'purchase_update' },
    },
    CUSTOMER: {
        CREATE: { cmd: 'customer_create' },
        GET_ONE: { cmd: 'customer_get_one' },
        GET_ALL: { cmd: 'customer_get_all' },
        UPDATE: { cmd: 'customer_update' },
        DELETE: { cmd: 'customer_delete' },
        GET_UDHAAR: { cmd: 'customer_get_udhaar' },
        RECORD_PAYMENT: { cmd: 'customer_record_payment' },
    },
    SALE: {
        CREATE: { cmd: 'sale_create' },
        GET_ONE: { cmd: 'sale_get_one' },
        GET_ALL: { cmd: 'sale_get_all' },
        HOLD: { cmd: 'sale_hold' },
        GET_HELD: { cmd: 'sale_get_held' },
        RESUME: { cmd: 'sale_resume_held' },
        GET_RECEIPT: { cmd: 'sale_get_receipt' },
    },
    SALE_RETURN: {
        CREATE: { cmd: 'sale_return_create' },
        GET_BY_SALE: { cmd: 'sale_return_get_by_sale' },
        GET_ALL: { cmd: 'sale_return_get_all' },
        GET_RECEIPT: { cmd: 'sale_return_get_receipt' },
    },
    STOCK: {
        ADJUST: { cmd: 'stock_adjust' },
        GET_ADJUSTMENTS: { cmd: 'stock_get_adjustments' },
    },
    EXPENSE: {
        CREATE: { cmd: 'expense_create' },
        GET_ALL: { cmd: 'expense_get_all' },
        UPDATE: { cmd: 'expense_update' },
        DELETE: { cmd: 'expense_delete' },
    },
    REPORT: {
        DAILY_SUMMARY: { cmd: 'report_daily_summary' },
        SALES_BY_DATE: { cmd: 'report_sales_by_date' },
        PROFIT: { cmd: 'report_profit' },
        STOCK_STATUS: { cmd: 'report_stock_status' },
        EXPIRY_REPORT: { cmd: 'report_expiry' },
        PRODUCT_WISE_SALES: { cmd: 'report_product_wise_sales' },
        CUSTOMER_LEDGER: { cmd: 'report_customer_ledger' },
        SUPPLIER_LEDGER: { cmd: 'report_supplier_ledger' },
        EXPORT_SALES_EXCEL: { cmd: 'report_export_sales_excel' },
        EXPORT_EXPENSES_EXCEL: { cmd: 'report_export_expenses_excel' },
        EXPORT_PROFIT_EXCEL: { cmd: 'report_export_profit_excel' },
        EXPORT_SALES_PDF: { cmd: 'report_export_sales_pdf' },
        EXPORT_PROFIT_PDF: { cmd: 'report_export_profit_pdf' },
        EXPORT_FBR_GST: { cmd: 'report_export_fbr_gst' },
    },
    FBR: {
        SYNC: { cmd: 'fbr_sync' },
        GET_PENDING: { cmd: 'fbr_get_pending' },
        RETRY: { cmd: 'fbr_retry' },
        GET_QR: { cmd: 'fbr_get_qr' },
    },
    DISCOUNT_RULE: {
        CREATE: { cmd: 'discount_rule_create' },
        GET_ALL: { cmd: 'discount_rule_get_all' },
        UPDATE: { cmd: 'discount_rule_update' },
        DELETE: { cmd: 'discount_rule_delete' },
    },
    SETTINGS: {
        GET_STORE: { cmd: 'settings_get_store' },
        UPDATE_STORE: { cmd: 'settings_update_store' },
        GET_FBR: { cmd: 'settings_get_fbr' },
        UPDATE_FBR: { cmd: 'settings_update_fbr' },
        TAX_GET_ALL: { cmd: 'tax_setting_get_all' },
        TAX_UPSERT: { cmd: 'tax_setting_upsert' },
        TAX_DELETE: { cmd: 'tax_setting_delete' },
        TAX_RESOLVE: { cmd: 'tax_setting_resolve' },
    },
    NOTIFICATION: {
        GET_ALL: { cmd: 'notification_get_all' },
        MARK_READ: { cmd: 'notification_mark_read' },
        MARK_ALL_READ: { cmd: 'notification_mark_all_read' },
    },
    TERMINAL: {
        CREATE: { cmd: 'terminal_create' },
        GET_ALL: { cmd: 'terminal_get_all' },
        UPDATE: { cmd: 'terminal_update' },
        DELETE: { cmd: 'terminal_delete' },
    },
    LOYALTY: {
        GET_LOG: { cmd: 'loyalty_get_log' },
        ADJUST: { cmd: 'loyalty_adjust' },
    },
    SUPPLIER_PAYMENT: {
        CREATE: { cmd: 'supplier_payment_create' },
        GET_BY_SUPPLIER: { cmd: 'supplier_payment_get_by_supplier' },
    },
    PURCHASE_RETURN: {
        CREATE: { cmd: 'purchase_return_create' },
        GET_ALL: { cmd: 'purchase_return_get_all' },
        UPDATE_STATUS: { cmd: 'purchase_return_update_status' },
    },
    OFFLINE_SYNC: {
        ENQUEUE: { cmd: 'offline_sync_enqueue' },
        GET_PENDING: { cmd: 'offline_sync_get_pending' },
        MARK_SYNCED: { cmd: 'offline_sync_mark_synced' },
        FLUSH: { cmd: 'offline_sync_flush' },
        GET_STATUS: { cmd: 'offline_sync_get_status' },
    }, POS_ROLE: {
        CREATE: { cmd: 'pos_role_create' },
        GET_ALL: { cmd: 'pos_role_get_all' },
        UPDATE: { cmd: 'pos_role_update' },
        DELETE: { cmd: 'pos_role_delete' },
    },
    POS_PERMISSION: {
        CREATE: { cmd: 'pos_permission_create' },
        GET_ALL: { cmd: 'pos_permission_get_all' },
        DELETE: { cmd: 'pos_permission_delete' },
    },
    POS_ROLE_PERMISSION: {
        ASSIGN: { cmd: 'pos_role_permission_assign' },
        REVOKE: { cmd: 'pos_role_permission_revoke' },
        GET_BY_ROLE: { cmd: 'pos_role_permission_get_by_role' },
    },
    POS_USER_ROLE: {
        ASSIGN: { cmd: 'pos_user_role_assign' },
        REVOKE: { cmd: 'pos_user_role_revoke' },
        GET_BY_USER: { cmd: 'pos_user_role_get_by_user' },
    },
    AUDIT_LOG: {
        GET_ALL: { cmd: 'audit_log_get_all' },
        GET_BY_USER: { cmd: 'audit_log_get_by_user' },
    },
};


/***/ },

/***/ "./libs/common/src/dto/lookup.dto.ts"
/*!*******************************************!*\
  !*** ./libs/common/src/dto/lookup.dto.ts ***!
  \*******************************************/
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
exports.CreateLookupDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateLookupDto {
    name;
    parent;
}
exports.CreateLookupDto = CreateLookupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_LOOKUP_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateLookupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null ? null : Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateLookupDto.prototype, "parent", void 0);


/***/ },

/***/ "./libs/common/src/dto/notification.dto.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/dto/notification.dto.ts ***!
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
exports.ApproveBroadcastDto = exports.CreateBroadcastDto = exports.BulkCreateNotificationDto = exports.CreateNotificationDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateNotificationDto {
    userId;
    title;
    message;
    image;
    type;
    userType;
    bookingId;
    operation;
    vendorId;
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_NOTIFICATION_TITLE_REQUIRED' }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_NOTIFICATION_MESSAGE_REQUIRED' }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_NOTIFICATION_TYPE_REQUIRED' }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "userType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "bookingId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "operation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "vendorId", void 0);
class BulkCreateNotificationDto {
    notifications;
}
exports.BulkCreateNotificationDto = BulkCreateNotificationDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateNotificationDto),
    __metadata("design:type", Array)
], BulkCreateNotificationDto.prototype, "notifications", void 0);
class CreateBroadcastDto {
    title;
    message;
    image;
    type;
    userIds;
}
exports.CreateBroadcastDto = CreateBroadcastDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_BROADCAST_TITLE_REQUIRED' }),
    __metadata("design:type", String)
], CreateBroadcastDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_BROADCAST_MESSAGE_REQUIRED' }),
    __metadata("design:type", String)
], CreateBroadcastDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBroadcastDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_BROADCAST_TYPE_REQUIRED' }),
    __metadata("design:type", String)
], CreateBroadcastDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateBroadcastDto.prototype, "userIds", void 0);
class ApproveBroadcastDto {
    notificationId;
}
exports.ApproveBroadcastDto = ApproveBroadcastDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_NOTIFICATION_ID_REQUIRED' }),
    __metadata("design:type", Number)
], ApproveBroadcastDto.prototype, "notificationId", void 0);


/***/ },

/***/ "./libs/common/src/dto/permission.dto.ts"
/*!***********************************************!*\
  !*** ./libs/common/src/dto/permission.dto.ts ***!
  \***********************************************/
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
exports.UpdatePermissionDto = exports.CreatePermissionDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreatePermissionDto {
    name;
    resource;
    action;
    description;
}
exports.CreatePermissionDto = CreatePermissionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_PERMISSION_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_RESOURCE_REQUIRED' }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "resource", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_ACTION_REQUIRED' }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "description", void 0);
class UpdatePermissionDto {
    name;
    resource;
    action;
    description;
}
exports.UpdatePermissionDto = UpdatePermissionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "resource", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "description", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/category.dto.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/dto/pos/category.dto.ts ***!
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
exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCategoryDto {
    name;
    parentId;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_CATEGORY_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCategoryDto.prototype, "parentId", void 0);
class UpdateCategoryDto {
    name;
    parentId;
}
exports.UpdateCategoryDto = UpdateCategoryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCategoryDto.prototype, "parentId", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/customer.dto.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/dto/pos/customer.dto.ts ***!
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
exports.RecordCustomerPaymentDto = exports.UpdateCustomerDto = exports.CreateCustomerDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCustomerDto {
    name;
    phone;
    address;
    creditLimit;
}
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_CUSTOMER_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_CUSTOMER_PHONE_REQUIRED' }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "creditLimit", void 0);
class UpdateCustomerDto {
    name;
    phone;
    address;
    creditLimit;
}
exports.UpdateCustomerDto = UpdateCustomerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCustomerDto.prototype, "creditLimit", void 0);
class RecordCustomerPaymentDto {
    customerId;
    amount;
    paymentMethod;
    referenceNo;
    notes;
}
exports.RecordCustomerPaymentDto = RecordCustomerPaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordCustomerPaymentDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], RecordCustomerPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordCustomerPaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordCustomerPaymentDto.prototype, "referenceNo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordCustomerPaymentDto.prototype, "notes", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/expense.dto.ts"
/*!************************************************!*\
  !*** ./libs/common/src/dto/pos/expense.dto.ts ***!
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
exports.UpdateExpenseDto = exports.CreateExpenseDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateExpenseDto {
    category;
    amount;
    description;
    expenseDate;
}
exports.CreateExpenseDto = CreateExpenseDto;
__decorate([
    (0, class_validator_1.IsEnum)(['rent', 'electricity', 'salary', 'misc', 'transport', 'maintenance'], { message: 'DTO_EXPENSE_INVALID_CATEGORY' }),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "expenseDate", void 0);
class UpdateExpenseDto {
    category;
    amount;
    description;
    expenseDate;
}
exports.UpdateExpenseDto = UpdateExpenseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['rent', 'electricity', 'salary', 'misc', 'transport', 'maintenance']),
    __metadata("design:type", String)
], UpdateExpenseDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], UpdateExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateExpenseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateExpenseDto.prototype, "expenseDate", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/pos-user.dto.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/dto/pos/pos-user.dto.ts ***!
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
exports.UpdatePosUserDto = exports.LoginPosUserDto = exports.CreatePosUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreatePosUserDto {
    name;
    email;
    password;
    role;
}
exports.CreatePosUserDto = CreatePosUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_POS_USER_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreatePosUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'DTO_POS_USER_INVALID_EMAIL' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_POS_USER_EMAIL_REQUIRED' }),
    __metadata("design:type", String)
], CreatePosUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_POS_USER_PASSWORD_REQUIRED' }),
    (0, class_validator_1.MinLength)(6, { message: 'DTO_POS_USER_PASSWORD_MIN_LENGTH' }),
    __metadata("design:type", String)
], CreatePosUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['admin', 'manager', 'cashier'], { message: 'DTO_POS_USER_INVALID_ROLE' }),
    __metadata("design:type", String)
], CreatePosUserDto.prototype, "role", void 0);
class LoginPosUserDto {
    email;
    password;
}
exports.LoginPosUserDto = LoginPosUserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'DTO_POS_USER_INVALID_EMAIL' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_POS_USER_EMAIL_REQUIRED' }),
    __metadata("design:type", String)
], LoginPosUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_POS_USER_PASSWORD_REQUIRED' }),
    __metadata("design:type", String)
], LoginPosUserDto.prototype, "password", void 0);
class UpdatePosUserDto {
    name;
    role;
}
exports.UpdatePosUserDto = UpdatePosUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePosUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['admin', 'manager', 'cashier']),
    __metadata("design:type", String)
], UpdatePosUserDto.prototype, "role", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/product.dto.ts"
/*!************************************************!*\
  !*** ./libs/common/src/dto/pos/product.dto.ts ***!
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
exports.UpdateProductDto = exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateProductDto {
    name;
    categoryId;
    unitId;
    barcode;
    salePrice;
    purchasePrice;
    lowStockThreshold;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_PRODUCT_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "unitId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "barcode", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "salePrice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "lowStockThreshold", void 0);
class UpdateProductDto {
    name;
    categoryId;
    unitId;
    barcode;
    salePrice;
    purchasePrice;
    lowStockThreshold;
    isActive;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "unitId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "barcode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "salePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "lowStockThreshold", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "isActive", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/purchase.dto.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/dto/pos/purchase.dto.ts ***!
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
exports.CreatePurchaseDto = exports.PurchaseItemDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class PurchaseItemDto {
    productId;
    qty;
    purchasePrice;
    expiryDate;
    batchNumber;
}
exports.PurchaseItemDto = PurchaseItemDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.001),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "qty", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PurchaseItemDto.prototype, "expiryDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseItemDto.prototype, "batchNumber", void 0);
class CreatePurchaseDto {
    supplierId;
    items;
    invoiceRef;
    purchaseDate;
    paidAmount;
    discountAmount;
}
exports.CreatePurchaseDto = CreatePurchaseDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "supplierId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PurchaseItemDto),
    __metadata("design:type", Array)
], CreatePurchaseDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "invoiceRef", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "paidAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "discountAmount", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/sale-return.dto.ts"
/*!****************************************************!*\
  !*** ./libs/common/src/dto/pos/sale-return.dto.ts ***!
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
exports.CreateSaleReturnDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateSaleReturnDto {
    saleId;
    productId;
    batchId;
    quantity;
    reason;
    refundType;
}
exports.CreateSaleReturnDto = CreateSaleReturnDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleReturnDto.prototype, "saleId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleReturnDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleReturnDto.prototype, "batchId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.001),
    __metadata("design:type", Number)
], CreateSaleReturnDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSaleReturnDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['cash', 'digital', 'udhaar'], { message: 'DTO_RETURN_INVALID_REFUND_TYPE' }),
    __metadata("design:type", String)
], CreateSaleReturnDto.prototype, "refundType", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/sale.dto.ts"
/*!*********************************************!*\
  !*** ./libs/common/src/dto/pos/sale.dto.ts ***!
  \*********************************************/
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
exports.HoldSaleDto = exports.CreateSaleDto = exports.SaleItemDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class SaleItemDto {
    productId;
    variantId;
    batchId;
    qty;
    unitPrice;
    discount;
    taxRate;
}
exports.SaleItemDto = SaleItemDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SaleItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SaleItemDto.prototype, "variantId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SaleItemDto.prototype, "batchId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.001),
    __metadata("design:type", Number)
], SaleItemDto.prototype, "qty", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SaleItemDto.prototype, "unitPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SaleItemDto.prototype, "discount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SaleItemDto.prototype, "taxRate", void 0);
class CreateSaleDto {
    customerId;
    items;
    paymentType;
    paidAmount;
    discountAmount;
    terminalId;
}
exports.CreateSaleDto = CreateSaleDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SaleItemDto),
    __metadata("design:type", Array)
], CreateSaleDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['cash', 'easypaisa', 'jazzcash', 'card', 'udhaar'], { message: 'DTO_SALE_INVALID_PAYMENT_TYPE' }),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "paymentType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "paidAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "terminalId", void 0);
class HoldSaleDto {
    customerId;
    items;
    holdLabel;
}
exports.HoldSaleDto = HoldSaleDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HoldSaleDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SaleItemDto),
    __metadata("design:type", Array)
], HoldSaleDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HoldSaleDto.prototype, "holdLabel", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/stock-adjustment.dto.ts"
/*!*********************************************************!*\
  !*** ./libs/common/src/dto/pos/stock-adjustment.dto.ts ***!
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
exports.CreateStockAdjustmentDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateStockAdjustmentDto {
    productId;
    batchId;
    qtyChange;
    reason;
    notes;
}
exports.CreateStockAdjustmentDto = CreateStockAdjustmentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStockAdjustmentDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStockAdjustmentDto.prototype, "batchId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStockAdjustmentDto.prototype, "qtyChange", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['waste', 'damage', 'expiry', 'correction', 'theft'], { message: 'DTO_STOCK_ADJ_INVALID_REASON' }),
    __metadata("design:type", String)
], CreateStockAdjustmentDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockAdjustmentDto.prototype, "notes", void 0);


/***/ },

/***/ "./libs/common/src/dto/pos/supplier.dto.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/dto/pos/supplier.dto.ts ***!
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
exports.UpdateSupplierDto = exports.CreateSupplierDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateSupplierDto {
    name;
    phone;
    address;
    email;
    creditLimit;
    creditDays;
}
exports.CreateSupplierDto = CreateSupplierDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_SUPPLIER_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSupplierDto.prototype, "creditLimit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSupplierDto.prototype, "creditDays", void 0);
class UpdateSupplierDto {
    name;
    phone;
    address;
    email;
    creditLimit;
    creditDays;
}
exports.UpdateSupplierDto = UpdateSupplierDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateSupplierDto.prototype, "creditLimit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateSupplierDto.prototype, "creditDays", void 0);


/***/ },

/***/ "./libs/common/src/dto/role-permission.dto.ts"
/*!****************************************************!*\
  !*** ./libs/common/src/dto/role-permission.dto.ts ***!
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
exports.RemoveRolePermissionDto = exports.AssignRolePermissionDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AssignRolePermissionDto {
    roleId;
    permissionId;
}
exports.AssignRolePermissionDto = AssignRolePermissionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_ROLE_ID_REQUIRED' }),
    __metadata("design:type", Number)
], AssignRolePermissionDto.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_PERMISSION_ID_REQUIRED' }),
    __metadata("design:type", Number)
], AssignRolePermissionDto.prototype, "permissionId", void 0);
class RemoveRolePermissionDto {
    roleId;
    permissionId;
}
exports.RemoveRolePermissionDto = RemoveRolePermissionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_ROLE_ID_REQUIRED' }),
    __metadata("design:type", Number)
], RemoveRolePermissionDto.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_PERMISSION_ID_REQUIRED' }),
    __metadata("design:type", Number)
], RemoveRolePermissionDto.prototype, "permissionId", void 0);


/***/ },

/***/ "./libs/common/src/dto/role.dto.ts"
/*!*****************************************!*\
  !*** ./libs/common/src/dto/role.dto.ts ***!
  \*****************************************/
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
exports.UpdateRoleDto = exports.CreateRoleDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateRoleDto {
    companyId;
    name;
    description;
}
exports.CreateRoleDto = CreateRoleDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_COMPANY_ID_REQUIRED' }),
    __metadata("design:type", Number)
], CreateRoleDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_ROLE_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "description", void 0);
class UpdateRoleDto {
    name;
    description;
}
exports.UpdateRoleDto = UpdateRoleDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "description", void 0);


/***/ },

/***/ "./libs/common/src/dto/users.dto.ts"
/*!******************************************!*\
  !*** ./libs/common/src/dto/users.dto.ts ***!
  \******************************************/
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
exports.LoginUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
    firstName;
    lastName;
    email;
    password;
    phNumber;
    userType;
    fcmToken;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_FIRST_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_LAST_NAME_REQUIRED' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'DTO_INVALID_EMAIL' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_EMAIL_REQUIRED' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_PASSWORD_REQUIRED' }),
    (0, class_validator_1.MinLength)(6, { message: 'DTO_PASSWORD_MIN_LENGTH' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_PHONE_NUMBER_REQUIRED' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['admin', 'customer'], { message: 'DTO_INVALID_USER_TYPE' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fcmToken", void 0);
class LoginUserDto {
    email;
    password;
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'DTO_INVALID_EMAIL' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_EMAIL_REQUIRED' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'DTO_PASSWORD_REQUIRED' }),
    (0, class_validator_1.MinLength)(6, { message: 'DTO_PASSWORD_MIN_LENGTH' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);


/***/ },

/***/ "./libs/common/src/exceptions/api.exeptions.ts"
/*!*****************************************************!*\
  !*** ./libs/common/src/exceptions/api.exeptions.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiException = void 0;
class ApiException extends Error {
    message;
    statusCode;
    constructor(message, statusCode = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ApiException = ApiException;


/***/ },

/***/ "./libs/common/src/filters/http-exception.filters.ts"
/*!***********************************************************!*\
  !*** ./libs/common/src/filters/http-exception.filters.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const language_1 = __webpack_require__(/*! ../language */ "./libs/common/src/language/index.ts");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const rawLang = request.headers['accept-language'] || 'en';
        const lang = rawLang.split(',')[0].split('-')[0].toLowerCase();
        const rawMessage = Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message[0]
            : exceptionResponse.message || exception.message;
        const translatedMessage = language_1.LANGUAGES[lang]?.[rawMessage] || rawMessage;
        response.status(status).json({
            success: false,
            message: translatedMessage,
            data: null,
            error: language_1.LANGUAGES[lang][exceptionResponse.error] || language_1.LANGUAGES[lang]['INTERNAL_SERVER_ERROR'],
            timestamp: new Date().toISOString(),
            statusCode: status
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);


/***/ },

/***/ "./libs/common/src/filters/rpc-exection.filters.ts"
/*!*********************************************************!*\
  !*** ./libs/common/src/filters/rpc-exection.filters.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HyperRpcFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let HyperRpcFilter = class HyperRpcFilter {
    catch(exception, host) {
        return (0, rxjs_1.throwError)(() => exception.getError());
    }
};
exports.HyperRpcFilter = HyperRpcFilter;
exports.HyperRpcFilter = HyperRpcFilter = __decorate([
    (0, common_1.Catch)(microservices_1.RpcException)
], HyperRpcFilter);


/***/ },

/***/ "./libs/common/src/index.ts"
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./common.module */ "./libs/common/src/common.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/users.dto */ "./libs/common/src/dto/users.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/notification.dto */ "./libs/common/src/dto/notification.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/lookup.dto */ "./libs/common/src/dto/lookup.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/permission.dto */ "./libs/common/src/dto/permission.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/role.dto */ "./libs/common/src/dto/role.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/role-permission.dto */ "./libs/common/src/dto/role-permission.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/transform.interceptors */ "./libs/common/src/interceptors/transform.interceptors.ts"), exports);
__exportStar(__webpack_require__(/*! ./filters/http-exception.filters */ "./libs/common/src/filters/http-exception.filters.ts"), exports);
__exportStar(__webpack_require__(/*! ./filters/rpc-exection.filters */ "./libs/common/src/filters/rpc-exection.filters.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions/api.exeptions */ "./libs/common/src/exceptions/api.exeptions.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/logging.interceptors */ "./libs/common/src/interceptors/logging.interceptors.ts"), exports);
__exportStar(__webpack_require__(/*! ./services/email.service */ "./libs/common/src/services/email.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./services/fcm.service */ "./libs/common/src/services/fcm.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./language/en */ "./libs/common/src/language/en.ts"), exports);
__exportStar(__webpack_require__(/*! ./constants/pos-patterns */ "./libs/common/src/constants/pos-patterns.ts"), exports);
__exportStar(__webpack_require__(/*! ./interfaces/pos.interface */ "./libs/common/src/interfaces/pos.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/pos-user.dto */ "./libs/common/src/dto/pos/pos-user.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/category.dto */ "./libs/common/src/dto/pos/category.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/product.dto */ "./libs/common/src/dto/pos/product.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/customer.dto */ "./libs/common/src/dto/pos/customer.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/supplier.dto */ "./libs/common/src/dto/pos/supplier.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/sale.dto */ "./libs/common/src/dto/pos/sale.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/purchase.dto */ "./libs/common/src/dto/pos/purchase.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/sale-return.dto */ "./libs/common/src/dto/pos/sale-return.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/stock-adjustment.dto */ "./libs/common/src/dto/pos/stock-adjustment.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/pos/expense.dto */ "./libs/common/src/dto/pos/expense.dto.ts"), exports);


/***/ },

/***/ "./libs/common/src/interceptors/logging.interceptors.ts"
/*!**************************************************************!*\
  !*** ./libs/common/src/interceptors/logging.interceptors.ts ***!
  \**************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const winston = __importStar(__webpack_require__(/*! winston */ "winston"));
__webpack_require__(/*! winston-daily-rotate-file */ "winston-daily-rotate-file");
let LoggingInterceptor = class LoggingInterceptor {
    logger;
    maskSensitiveData(data) {
        if (!data)
            return data;
        const masked = JSON.parse(JSON.stringify(data));
        const sensitiveFields = ['password', 'cardNumber', 'token', 'secret'];
        const mask = (obj) => {
            for (const key in obj) {
                if (sensitiveFields.includes(key)) {
                    obj[key] = '***';
                }
                else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    mask(obj[key]);
                }
            }
        };
        mask(masked);
        return masked;
    }
    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: 'logs/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '14d',
                }),
                new winston.transports.Console(),
            ],
        });
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const { method, url, body, query, headers } = request;
        const now = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)({
            next: (data) => {
                this.logRequest(method, url, body, query, data, now, null);
            },
            error: (err) => {
                this.logRequest(method, url, body, query, null, now, err);
            },
        }));
    }
    logRequest(method, url, reqData, query, resData, startTime, error) {
        const duration = `${Date.now() - startTime}ms`;
        const maskedReqData = this.maskSensitiveData(reqData);
        const maskedResData = this.maskSensitiveData(resData);
        const logEntry = {
            timestamp: new Date().toISOString(),
            method,
            url,
            metadata: {
                query,
                duration,
                userAgent: 'system-logger',
            },
            request: maskedReqData,
            response: maskedResData || null,
            error: error ? { message: error.message, stack: error.stack } : null,
        };
        if (error) {
            this.logger.error('Request Failed', logEntry);
        }
        else {
            this.logger.info('Request Success', logEntry);
        }
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggingInterceptor);


/***/ },

/***/ "./libs/common/src/interceptors/transform.interceptors.ts"
/*!****************************************************************!*\
  !*** ./libs/common/src/interceptors/transform.interceptors.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const language_1 = __webpack_require__(/*! ../language */ "./libs/common/src/language/index.ts");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const rawLang = request.headers['accept-language'] || 'en';
        const lang = rawLang.split(',')[0].split('-')[0].toLowerCase();
        return next.handle().pipe((0, operators_1.map)((data) => {
            const rawMessage = data?.message || 'REQUEST_SUCCESS';
            const translatedMessage = language_1.LANGUAGES[lang]?.[rawMessage] || rawMessage;
            return {
                success: true,
                message: translatedMessage,
                data: data?.result || data,
                timestamp: new Date().toISOString(),
                statusCode: data?.statusCode || 200
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ },

/***/ "./libs/common/src/interfaces/pos.interface.ts"
/*!*****************************************************!*\
  !*** ./libs/common/src/interfaces/pos.interface.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./libs/common/src/language/en.ts"
/*!****************************************!*\
  !*** ./libs/common/src/language/en.ts ***!
  \****************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.en = void 0;
exports.en = {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    REQUEST_SUCCESS: 'Request successful',
    LOGIN_EMAIL_AND_PASSWORD_REQUIRED: 'Email and password are required',
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Login failed',
    LOGIN_INVALID_CREDENTIALS: 'Invalid credentials',
    LOGIN_INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    LOGIN_INVALID_PASSWORD: 'Invalid password',
    LOGIN_INVALID_USER: 'Invalid user',
    LOGIN_INVALID_USER_TYPE: 'Invalid user type',
    LOGIN_USER_NOT_FOUND: 'User not found',
    CREATE_USER_EMAIL_AND_PASSWORD_REQUIRED: 'Email and password are required',
    CREATE_USER_ALREADY_EXISTS: 'User already exists',
    GET_USER_NOT_FOUND: 'User not found',
    CHANGE_PASSWORD_USER_NOT_FOUND: 'User not found',
    CHANGE_PASSWORD_INVALID_CURRENT_PASSWORD: 'Current password is incorrect',
    PASSWORD_VALIDATION_ERROR: 'Password must be at least 6 characters long',
    CREATE_COMPANY_NAME_REQUIRED: 'Company name is required',
    GET_COMPANY_NOT_FOUND: 'Company not found',
    CREATE_ONBOARDING_COMPANY_NAME_AND_USER_REQUIRED: 'Company name and User ID are required',
    GET_ONBOARDING_COMPANY_NOT_FOUND: 'Onboarding company not found',
    CREATE_ATTACHMENT_REQUIRED_FIELDS_MISSING: 'Onboarding ID, document name and URL are required',
    BULK_CREATE_ATTACHMENT_DATA_REQUIRED: 'Attachment data is required',
    CREATE_VERIFICATION_REQUIRED_FIELDS_MISSING: 'Onboarding ID and column name are required',
    BULK_CREATE_VERIFICATION_DATA_REQUIRED: 'Verification data is required',
    CREATE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED: 'Company ID and User ID are required',
    GET_COMPANY_USER_NOT_FOUND: 'Company-user mapping not found',
    REMOVE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED: 'Company ID and User ID are required',
    CREATE_PERMISSION_NAME_RESOURCE_AND_ACTION_REQUIRED: 'Permission name, resource and action are required',
    GET_PERMISSION_NOT_FOUND: 'Permission not found',
    CREATE_ROLE_NAME_AND_COMPANY_ID_REQUIRED: 'Role name and Company ID are required',
    GET_ROLE_NOT_FOUND: 'Role not found',
    ASSIGN_PERMISSION_ROLE_ID_AND_PERMISSION_ID_REQUIRED: 'Role ID and Permission ID are required',
    ASSIGN_ROLE_COMPANY_USER_ID_AND_ROLE_ID_REQUIRED: 'Company User ID and Role ID are required',
    REPOSITORY_USER_NOT_FOUND: 'User not found in database',
    REPOSITORY_COMPANY_NOT_FOUND: 'Company not found in database',
    REPOSITORY_COMPANY_USER_NOT_FOUND: 'Company-user mapping not found in database',
    REPOSITORY_PERMISSION_NOT_FOUND: 'Permission not found in database',
    REPOSITORY_ROLE_NOT_FOUND: 'Role not found in database',
    REPOSITORY_ROLE_PERMISSION_NOT_FOUND: 'Role-permission mapping not found in database',
    REPOSITORY_USER_ROLE_NOT_FOUND: 'User-role mapping not found in database',
    REPOSITORY_LEAD_NOT_FOUND: 'Lead not found in database',
    REPOSITORY_LOOKUP_NOT_FOUND: 'Lookup not found in database',
    REPOSITORY_NOTIFICATION_NOT_FOUND: 'Notification not found in database',
    REPOSITORY_USER_MAP_NOTIFICATION_NOT_FOUND: 'User-notification mapping not found in database',
    REPOSITORY_ONBOARDING_COMPANY_NOT_FOUND: 'Onboarding company not found in database',
    REPOSITORY_ONBOARDING_ATTACHMENT_NOT_FOUND: 'Onboarding attachment not found in database',
    REPOSITORY_ONBOARDING_VERIFICATION_NOT_FOUND: 'Onboarding verification not found in database',
    DTO_FIRST_NAME_REQUIRED: 'First name is required',
    DTO_LAST_NAME_REQUIRED: 'Last name is required',
    DTO_EMAIL_REQUIRED: 'Email is required',
    DTO_INVALID_EMAIL: 'Please enter a valid email address',
    DTO_PASSWORD_REQUIRED: 'Password is required',
    DTO_PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters long',
    DTO_PHONE_NUMBER_REQUIRED: 'Phone number is required',
    DTO_INVALID_USER_TYPE: 'User type must be either admin or customer',
    DTO_COMPANY_NAME_REQUIRED: 'Company name is required',
    DTO_DESCRIPTION_REQUIRED: 'Description is required',
    DTO_COMPANY_ID_REQUIRED: 'Company ID is required',
    DTO_USER_ID_REQUIRED: 'User ID is required',
    DTO_ROLE_NAME_REQUIRED: 'Role name is required',
    DTO_ROLE_ID_REQUIRED: 'Role ID is required',
    DTO_PERMISSION_NAME_REQUIRED: 'Permission name is required',
    DTO_RESOURCE_REQUIRED: 'Resource is required',
    DTO_ACTION_REQUIRED: 'Action is required',
    DTO_PERMISSION_ID_REQUIRED: 'Permission ID is required',
    DTO_COMPANY_USER_ID_REQUIRED: 'Company User ID is required',
    DTO_NOTIFICATION_TITLE_REQUIRED: 'Notification title is required',
    DTO_NOTIFICATION_MESSAGE_REQUIRED: 'Notification message is required',
    DTO_NOTIFICATION_TYPE_REQUIRED: 'Notification type is required',
    DTO_BROADCAST_TITLE_REQUIRED: 'Broadcast title is required',
    DTO_BROADCAST_MESSAGE_REQUIRED: 'Broadcast message is required',
    DTO_BROADCAST_TYPE_REQUIRED: 'Broadcast type is required',
    DTO_NOTIFICATION_ID_REQUIRED: 'Notification ID is required',
    DTO_LOOKUP_NAME_REQUIRED: 'Lookup name is required',
    CREATE_LEAD_NAME_TITLE_AND_SOURCE_REQUIRED: 'Lead name, title and source are required',
    GET_LEAD_NOT_FOUND: 'Lead not found',
    UPDATE_LEAD_NOT_FOUND: 'Lead not found',
    NOTIFICATION_DATA_REQUIRED: 'Notification data is required',
    NOTIFICATION_NOT_FOUND: 'Notification not found',
    BROADCAST_DATA_REQUIRED: 'Broadcast data is required',
    NOTIFICATIONS_DATA_REQUIRED: 'Notifications data is required',
    LOOKUP_PARENT_ID_NOT_FOUND: 'Lookup parent ID not found',
    AUTH_GUARD_USER_NOT_FOUND: 'User not found',
    AUTH_GUARD_USER_NOT_VERIFIED: 'User not verified',
    AUTH_GUARD_NO_TOKEN_PROVIDED: 'No authentication token provided',
    AUTH_GUARD_INVALID_TOKEN_FORMAT: 'Invalid token format',
    AUTH_GUARD_SESSION_EXPIRED_OR_INVALID_TOKEN: 'Session expired or invalid token',
    CONTROLLER_USER_ID_REQUIRED: 'User ID is required',
    CONTROLLER_USER_ONBOARD_ERROR: 'Can not onboard user right now',
    CONTROLLER_ADMIN_ID_REQUIRED: 'Admin ID is required',
    CONTROLLER_VENDOR_ID_REQUIRED: 'Vendor ID is required',
    CONTROLLER_BROADCAST_DATA_REQUIRED: 'Broadcast data is required',
    CONTROLLER_NOTIFICATION_DATA_REQUIRED: 'Notification data is required',
    CONTROLLER_NOTIFICATIONS_DATA_REQUIRED: 'Notifications data is required',
    CONTROLLER_FAILED_TO_GET_NOTIFICATIONS: 'Failed to get notifications',
    CONTROLLER_FAILED_TO_GET_UNREAD_NOTIFICATIONS: 'Failed to get unread notifications',
    CONTROLLER_FAILED_TO_GET_UNREAD_COUNT: 'Failed to get unread count',
    CONTROLLER_FAILED_TO_MARK_AS_READ: 'Failed to mark as read',
    CONTROLLER_FAILED_TO_CREATE_ADMIN_BROADCAST: 'Failed to create admin broadcast',
    CONTROLLER_FAILED_TO_APPROVE_BROADCAST: 'Failed to approve broadcast',
    CONTROLLER_FAILED_TO_GET_VENDOR_BROADCAST_REQUESTS: 'Failed to get vendor broadcast requests',
    CONTROLLER_FAILED_TO_GET_ADMIN_BROADCAST_HISTORY: 'Failed to get admin broadcast history',
    CONTROLLER_FAILED_TO_CREATE_VENDOR_BROADCAST: 'Failed to create vendor broadcast',
    CONTROLLER_FAILED_TO_GET_VENDOR_CUSTOMERS_COUNT: 'Failed to get vendor customers count',
    CONTROLLER_FAILED_TO_GET_VENDOR_BROADCAST_HISTORY: 'Failed to get vendor broadcast history',
    CONTROLLER_FAILED_TO_CREATE_NOTIFICATION: 'Failed to create notification',
    CONTROLLER_FAILED_TO_BULK_CREATE_NOTIFICATIONS: 'Failed to bulk create notifications',
    BROADCAST_APPROVED_SUCCESS: 'Broadcast approved successfully',
    CONTROLLER_USER_CANNOT_BE_CREATED: 'User cannot be created',
    CONTROLLER_USER_CANNOT_BE_LOGGED_IN: 'User cannot be logged in',
    CONTROLLER_USER_INFO_CANNOT_BE_FETCHED: 'User information cannot be fetched',
    CONTROLLER_USERS_CANNOT_BE_FETCHED: 'Users cannot be fetched',
    CONTROLLER_COMPANY_CANNOT_BE_CREATED: 'Company cannot be created',
    CONTROLLER_COMPANY_CANNOT_BE_FETCHED: 'Company cannot be fetched',
    CONTROLLER_COMPANIES_CANNOT_BE_FETCHED: 'Companies cannot be fetched',
    CONTROLLER_COMPANY_CANNOT_BE_UPDATED: 'Company cannot be updated',
    CONTROLLER_COMPANY_CANNOT_BE_DELETED: 'Company cannot be deleted',
    CONTROLLER_COMPANY_USER_MAPPING_CANNOT_BE_CREATED: 'Company-user mapping cannot be created',
    CONTROLLER_COMPANY_USER_MAPPING_CANNOT_BE_FETCHED: 'Company-user mapping cannot be fetched',
    CONTROLLER_COMPANY_USERS_CANNOT_BE_FETCHED: 'Company users cannot be fetched',
    CONTROLLER_USER_COMPANIES_CANNOT_BE_FETCHED: 'User companies cannot be fetched',
    CONTROLLER_COMPANY_USER_MAPPING_CANNOT_BE_REMOVED: 'Company-user mapping cannot be removed',
    CONTROLLER_PERMISSION_CANNOT_BE_CREATED: 'Permission cannot be created',
    CONTROLLER_PERMISSION_CANNOT_BE_FETCHED: 'Permission cannot be fetched',
    CONTROLLER_PERMISSIONS_CANNOT_BE_FETCHED: 'Permissions cannot be fetched',
    CONTROLLER_PERMISSION_CANNOT_BE_UPDATED: 'Permission cannot be updated',
    CONTROLLER_PERMISSION_CANNOT_BE_DELETED: 'Permission cannot be deleted',
    CONTROLLER_ROLE_CANNOT_BE_CREATED: 'Role cannot be created',
    CONTROLLER_ROLE_CANNOT_BE_FETCHED: 'Role cannot be fetched',
    CONTROLLER_ROLES_CANNOT_BE_FETCHED: 'Roles cannot be fetched',
    CONTROLLER_ROLE_CANNOT_BE_UPDATED: 'Role cannot be updated',
    CONTROLLER_ROLE_CANNOT_BE_DELETED: 'Role cannot be deleted',
    CONTROLLER_PERMISSION_CANNOT_BE_ASSIGNED_TO_ROLE: 'Permission cannot be assigned to role',
    CONTROLLER_PERMISSION_CANNOT_BE_REMOVED_FROM_ROLE: 'Permission cannot be removed from role',
    CONTROLLER_PERMISSIONS_CANNOT_BE_LISTED_FOR_ROLE: 'Permissions cannot be listed for role',
    CONTROLLER_ROLE_CANNOT_BE_ASSIGNED_TO_USER: 'Role cannot be assigned to user',
    CONTROLLER_ROLE_CANNOT_BE_REMOVED_FROM_USER: 'Role cannot be removed from user',
    CONTROLLER_ROLES_CANNOT_BE_LISTED_FOR_USER: 'Roles cannot be listed for user',
    CONTROLLER_LEAD_CANNOT_BE_CREATED: 'Lead cannot be created',
    CONTROLLER_LEAD_CANNOT_BE_FETCHED: 'Lead cannot be fetched',
    CONTROLLER_LEADS_CANNOT_BE_FETCHED: 'Leads cannot be fetched',
    CONTROLLER_LEAD_CANNOT_BE_UPDATED: 'Lead cannot be updated',
    CONTROLLER_LEAD_CANNOT_BE_DELETED: 'Lead cannot be deleted',
    CONTROLLER_LOOKUP_CANNOT_BE_CREATED: 'Lookup cannot be created',
    CONTROLLER_LOOKUP_PARENT_NOT_FOUND: 'Lookup parent not found',
    CONTROLLER_LOOKUP_ROW_CANNOT_BE_DELETED: 'Lookup row cannot be deleted',
    CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_CREATED: 'Onboarding company cannot be created',
    CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_FETCHED: 'Onboarding company cannot be fetched',
    CONTROLLER_ONBOARDING_COMPANIES_CANNOT_BE_FETCHED: 'Onboarding companies cannot be fetched',
    CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_UPDATED: 'Onboarding company cannot be updated',
    CONTROLLER_ONBOARDING_COMPANY_CANNOT_BE_DELETED: 'Onboarding company cannot be deleted',
    CONTROLLER_ATTACHMENT_CANNOT_BE_CREATED: 'Attachment cannot be created',
    CONTROLLER_ATTACHMENTS_CANNOT_BE_CREATED: 'Attachments cannot be created',
    CONTROLLER_ATTACHMENTS_CANNOT_BE_FETCHED: 'Attachments cannot be fetched',
    CONTROLLER_ATTACHMENT_CANNOT_BE_DELETED: 'Attachment cannot be deleted',
    CONTROLLER_VERIFICATION_CANNOT_BE_CREATED: 'Verification cannot be created',
    CONTROLLER_VERIFICATIONS_CANNOT_BE_CREATED: 'Verifications cannot be created',
    CONTROLLER_VERIFICATIONS_CANNOT_BE_FETCHED: 'Verifications cannot be fetched',
    CONTROLLER_VERIFICATION_CANNOT_BE_UPDATED: 'Verification cannot be updated',
    CONTROLLER_VERIFICATION_CANNOT_BE_DELETED: 'Verification cannot be deleted'
};


/***/ },

/***/ "./libs/common/src/language/index.ts"
/*!*******************************************!*\
  !*** ./libs/common/src/language/index.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LANGUAGES = void 0;
const en_1 = __webpack_require__(/*! ./en */ "./libs/common/src/language/en.ts");
const urdu_1 = __webpack_require__(/*! ./urdu */ "./libs/common/src/language/urdu.ts");
exports.LANGUAGES = {
    en: en_1.en,
    urdu: urdu_1.urdu,
};


/***/ },

/***/ "./libs/common/src/language/urdu.ts"
/*!******************************************!*\
  !*** ./libs/common/src/language/urdu.ts ***!
  \******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.urdu = void 0;
exports.urdu = {
    INTERNAL_SERVER_ERROR: 'اینٹرنل سرور خرابی',
    REQUEST_SUCCESS: 'درخواست کامیابی',
    LOGIN_EMAIL_AND_PASSWORD_REQUIRED: 'ای میل اور پاس ورڈ درکار ہیں',
    LOGIN_SUCCESS: 'تسلیم ہوا',
    LOGIN_FAILED: 'تسلیم نہیں ہوا',
    LOGIN_INVALID_CREDENTIALS: 'نادرست کریڈنشل',
    LOGIN_INVALID_EMAIL: 'نادرست ای میل',
    LOGIN_INVALID_PASSWORD: 'نادرست پاس ورڈ',
    LOGIN_INVALID_USER: 'نادرست صارف',
    LOGIN_INVALID_USER_TYPE: 'نادرست صارف کا قسم',
    PASSWORD_VALIDATION_ERROR: 'پاس ورڈ 6 حروف سے زیادہ ہونا چاہیے',
};


/***/ },

/***/ "./libs/common/src/services/email.service.ts"
/*!***************************************************!*\
  !*** ./libs/common/src/services/email.service.ts ***!
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
var EmailService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        try {
            const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
            const smtpHost = this.configService.get('SMTP_HOST');
            const smtpPort = this.configService.get('SMTP_PORT');
            const smtpUser = this.configService.get('SMTP_USER');
            const smtpPass = this.configService.get('SMTP_PASS');
            this.logger.log(`Initializing email service with host: ${smtpHost}:${smtpPort}`);
            this.transporter = nodemailer.createTransport({
                host: smtpHost,
                port: parseInt(smtpPort),
                secure: false,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            this.transporter.verify((error) => {
                if (error) {
                    this.logger.error(`SMTP connection failed: ${error.message}`);
                }
                else {
                    this.logger.log('SMTP server is ready to send emails');
                }
            });
        }
        catch (error) {
            this.logger.error(`Failed to initialize email service: ${error.message}`);
        }
    }
    async sendEmail(to, subject, html) {
        try {
            if (!this.transporter) {
                this.logger.warn('Email transporter not initialized');
                return false;
            }
            this.logger.log(`Attempting to send email to ${to} with subject: ${subject}`);
            const mailOptions = {
                from: this.configService.get('SMTP_FROM'),
                to,
                subject,
                html,
            };
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent successfully to ${to}. MessageId: ${info.messageId}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}: ${error.message}`);
            this.logger.error(`Error details: ${JSON.stringify(error)}`);
            return false;
        }
    }
    async sendBulkEmails(recipients) {
        let successCount = 0;
        for (const recipient of recipients) {
            const success = await this.sendEmail(recipient.email, recipient.subject, recipient.html);
            if (success)
                successCount++;
        }
        return successCount;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], EmailService);


/***/ },

/***/ "./libs/common/src/services/fcm.service.ts"
/*!*************************************************!*\
  !*** ./libs/common/src/services/fcm.service.ts ***!
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
var FcmService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let FcmService = FcmService_1 = class FcmService {
    configService;
    logger = new common_1.Logger(FcmService_1.name);
    admin;
    constructor(configService) {
        this.configService = configService;
    }
    async sendPushNotification(fcmToken, title, message, data) {
        try {
            if (!this.admin) {
                this.logger.warn('Firebase Admin not initialized');
                return false;
            }
            const payload = {
                notification: {
                    title,
                    body: message,
                },
                data: data || {},
                token: fcmToken,
            };
            await this.admin.messaging().send(payload);
            this.logger.log(`Push notification sent to ${fcmToken}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send push notification: ${error.message}`);
            return false;
        }
    }
    async sendBulkPushNotifications(tokens, title, message, data) {
        try {
            if (!this.admin || !tokens.length) {
                return 0;
            }
            const payload = {
                notification: {
                    title,
                    body: message,
                },
                data: data || {},
                tokens,
            };
            const response = await this.admin.messaging().sendMulticast(payload);
            this.logger.log(`Sent ${response.successCount} notifications out of ${tokens.length}`);
            return response.successCount;
        }
        catch (error) {
            this.logger.error(`Failed to send bulk push notifications: ${error.message}`);
            return 0;
        }
    }
};
exports.FcmService = FcmService;
exports.FcmService = FcmService = FcmService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], FcmService);


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

/***/ "@nestjs/schedule"
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/schedule");

/***/ },

/***/ "@nestjs/sequelize"
/*!************************************!*\
  !*** external "@nestjs/sequelize" ***!
  \************************************/
(module) {

module.exports = require("@nestjs/sequelize");

/***/ },

/***/ "class-transformer"
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
(module) {

module.exports = require("class-transformer");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "dotenv"
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
(module) {

module.exports = require("dotenv");

/***/ },

/***/ "nodemailer"
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
(module) {

module.exports = require("nodemailer");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

module.exports = require("path");

/***/ },

/***/ "rxjs"
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
(module) {

module.exports = require("rxjs");

/***/ },

/***/ "rxjs/operators"
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
(module) {

module.exports = require("rxjs/operators");

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

/***/ "winston"
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
(module) {

module.exports = require("winston");

/***/ },

/***/ "winston-daily-rotate-file"
/*!********************************************!*\
  !*** external "winston-daily-rotate-file" ***!
  \********************************************/
(module) {

module.exports = require("winston-daily-rotate-file");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/common-services-app/src/main.ts");
/******/ 	
/******/ })()
;