/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const api_gateway_app_module_1 = __webpack_require__(2);
const config_1 = __webpack_require__(5);
const fs = __importStar(__webpack_require__(168));
const path = __importStar(__webpack_require__(169));
const common_1 = __webpack_require__(170);
const common_2 = __webpack_require__(3);
const express_rate_limit_1 = __importDefault(__webpack_require__(205));
async function bootstrap() {
    const appContext = await core_1.NestFactory.createApplicationContext(api_gateway_app_module_1.AppModule);
    const configService = appContext.get(config_1.ConfigService);
    const protocol = configService.get('PROTOCOL') || 'http';
    let httpsOptions = null;
    console.log({ protocol });
    if (protocol === 'https') {
        try {
            httpsOptions = {
                key: fs.readFileSync(path.resolve(configService.get('SSL_KEY_PATH') || '')),
                cert: fs.readFileSync(path.resolve(configService.get('SSL_CERT_PATH') || '')),
                ca: fs.readFileSync(path.resolve(configService.get('SSL_CA_PATH') || '')),
                requestCert: false,
                rejectUnauthorized: false,
            };
        }
        catch (error) {
            console.error('❌ Failed to load SSL certificates:', error.message);
        }
    }
    await appContext.close();
    const app = await core_1.NestFactory.create(api_gateway_app_module_1.AppModule, { httpsOptions });
    app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalInterceptors(new common_1.TransformInterceptor());
    app.useGlobalFilters(new common_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new common_1.LoggingInterceptor());
    app.set('query parser', 'extended');
    app.use((0, express_rate_limit_1.default)({
        windowMs: 60 * 1000,
        max: Number(process.env.RATE_LIMIT_MAX ?? 200),
        standardHeaders: true,
        legacyHeaders: false,
        message: { success: false, message: 'Too many requests, please try again later.' },
        skip: (req) => req.path === '/health' || req.path === '/',
    }));
    app.use(['/pos/users/v1/login', '/super-admin/v1/login'], (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: Number(process.env.RATE_LIMIT_AUTH_MAX ?? 20),
        standardHeaders: true,
        legacyHeaders: false,
        message: { success: false, message: 'Too many login attempts, please try again in 15 minutes.' },
    }));
    const port = configService.get('API_GATEWAY_SERVICE_PORT') || 3000;
    app.useGlobalPipes(new common_2.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const allowedOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',')
        : ['http://localhost:5173', 'http://localhost:3000'];
    app.enableCors({
        origin: process.env.NODE_ENV === 'production' ? allowedOrigins : '*',
        credentials: true,
    });
    await app.listen(port);
    console.log(`🚀 API Gateway is running on: ${protocol}://localhost:${port}`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const config_module_1 = __webpack_require__(4);
const pos_module_1 = __webpack_require__(6);
const super_admin_module_1 = __webpack_require__(162);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.CommonConfigModule,
            pos_module_1.PosModule,
            super_admin_module_1.SuperAdminModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonConfigModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(5);
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


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosModule = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(7);
const config_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(8);
const core_1 = __webpack_require__(1);
const database_module_1 = __webpack_require__(9);
const pos_user_repository_1 = __webpack_require__(68);
const pos_service_1 = __webpack_require__(117);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_users_controller_1 = __webpack_require__(121);
const pos_categories_controller_1 = __webpack_require__(125);
const pos_units_controller_1 = __webpack_require__(126);
const pos_products_controller_1 = __webpack_require__(127);
const pos_suppliers_controller_1 = __webpack_require__(131);
const pos_purchases_controller_1 = __webpack_require__(132);
const pos_customers_controller_1 = __webpack_require__(133);
const pos_sales_controller_1 = __webpack_require__(134);
const pos_sale_returns_controller_1 = __webpack_require__(135);
const pos_stock_controller_1 = __webpack_require__(136);
const pos_expenses_controller_1 = __webpack_require__(137);
const pos_reports_controller_1 = __webpack_require__(138);
const pos_discount_rules_controller_1 = __webpack_require__(139);
const pos_settings_controller_1 = __webpack_require__(140);
const pos_notifications_controller_1 = __webpack_require__(141);
const pos_supplier_payments_controller_1 = __webpack_require__(142);
const pos_purchase_returns_controller_1 = __webpack_require__(143);
const pos_roles_controller_1 = __webpack_require__(144);
const pos_permissions_controller_1 = __webpack_require__(145);
const pos_user_roles_controller_1 = __webpack_require__(146);
const pos_audit_logs_controller_1 = __webpack_require__(147);
const pos_loyalty_controller_1 = __webpack_require__(148);
const pos_brands_controller_1 = __webpack_require__(149);
const pos_product_variants_controller_1 = __webpack_require__(150);
const pos_inventory_forecast_controller_1 = __webpack_require__(151);
const pos_supplier_orders_controller_1 = __webpack_require__(152);
const pos_projects_controller_1 = __webpack_require__(153);
const pos_services_controller_1 = __webpack_require__(154);
const pos_quotations_controller_1 = __webpack_require__(155);
const pos_delivery_orders_controller_1 = __webpack_require__(156);
const pos_companies_controller_1 = __webpack_require__(157);
const pos_ledger_controller_1 = __webpack_require__(158);
const pos_fbr_controller_1 = __webpack_require__(159);
const pos_offline_sync_controller_1 = __webpack_require__(160);
const pos_payment_gateway_controller_1 = __webpack_require__(161);
let PosModule = class PosModule {
};
exports.PosModule = PosModule;
exports.PosModule = PosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'USER_SERVICE',
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('USER_SERVICE_HOST'),
                            port: configService.get('USER_SERVICE_PORT'),
                        },
                    }),
                },
                {
                    name: 'POS_SERVICE',
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('POS_SERVICE_HOST'),
                            port: configService.get('POS_SERVICE_PORT'),
                        },
                    }),
                },
            ]),
            database_module_1.DatabaseModule,
        ],
        providers: [pos_service_1.PosService, config_1.ConfigService, jwt_1.JwtService, pos_user_repository_1.PosUserRepository, pos_roles_guard_1.PosRolesGuard, core_1.Reflector],
        controllers: [
            pos_users_controller_1.PosUsersController,
            pos_categories_controller_1.PosCategoriesController,
            pos_units_controller_1.PosUnitsController,
            pos_products_controller_1.PosProductsController,
            pos_suppliers_controller_1.PosSuppliersController,
            pos_purchases_controller_1.PosPurchasesController,
            pos_customers_controller_1.PosCustomersController,
            pos_sales_controller_1.PosSalesController,
            pos_sale_returns_controller_1.PosSaleReturnsController,
            pos_stock_controller_1.PosStockController,
            pos_expenses_controller_1.PosExpensesController,
            pos_reports_controller_1.PosReportsController,
            pos_discount_rules_controller_1.PosDiscountRulesController,
            pos_settings_controller_1.PosSettingsController,
            pos_notifications_controller_1.PosNotificationsController,
            pos_supplier_payments_controller_1.PosSupplierPaymentsController,
            pos_purchase_returns_controller_1.PosPurchaseReturnsController,
            pos_roles_controller_1.PosRolesController,
            pos_permissions_controller_1.PosPermissionsController,
            pos_user_roles_controller_1.PosUserRolesController,
            pos_audit_logs_controller_1.PosAuditLogsController,
            pos_loyalty_controller_1.PosLoyaltyController,
            pos_brands_controller_1.PosBrandsController,
            pos_product_variants_controller_1.PosProductVariantsController,
            pos_inventory_forecast_controller_1.PosInventoryForecastController,
            pos_supplier_orders_controller_1.PosSupplierOrdersController,
            pos_projects_controller_1.PosProjectsController,
            pos_services_controller_1.PosServicesController,
            pos_quotations_controller_1.PosQuotationsController,
            pos_delivery_orders_controller_1.PosDeliveryOrdersController,
            pos_companies_controller_1.PosCompaniesController,
            pos_ledger_controller_1.PosLedgerController,
            pos_fbr_controller_1.PosFbrController,
            pos_offline_sync_controller_1.PosOfflineSyncController,
            pos_payment_gateway_controller_1.PosPaymentGatewayController,
        ],
    })
], PosModule);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const config_1 = __webpack_require__(5);
const config_module_1 = __webpack_require__(4);
const model_1 = __webpack_require__(11);
const repository_1 = __webpack_require__(66);
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
                    sync: { alter: false },
                    define: {
                        freezeTableName: true,
                    },
                    timezone: '+05:00',
                    dialectOptions: {
                        dateStrings: true,
                        typeCast: true,
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


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_MODELS = void 0;
const pos_user_model_1 = __webpack_require__(12);
const category_model_1 = __webpack_require__(15);
const unit_model_1 = __webpack_require__(16);
const brand_model_1 = __webpack_require__(17);
const product_model_1 = __webpack_require__(18);
const product_variant_model_1 = __webpack_require__(23);
const product_price_model_1 = __webpack_require__(24);
const supplier_model_1 = __webpack_require__(20);
const batch_model_1 = __webpack_require__(19);
const purchase_model_1 = __webpack_require__(21);
const purchase_item_model_1 = __webpack_require__(22);
const purchase_return_model_1 = __webpack_require__(26);
const supplier_payment_model_1 = __webpack_require__(27);
const customer_model_1 = __webpack_require__(28);
const customer_payment_model_1 = __webpack_require__(38);
const udhaar_transaction_model_1 = __webpack_require__(36);
const sale_model_1 = __webpack_require__(29);
const sale_item_model_1 = __webpack_require__(30);
const sale_return_model_1 = __webpack_require__(35);
const stock_adjustment_model_1 = __webpack_require__(39);
const expense_model_1 = __webpack_require__(40);
const audit_log_model_1 = __webpack_require__(41);
const fbr_invoice_log_model_1 = __webpack_require__(42);
const tax_setting_model_1 = __webpack_require__(43);
const sale_payment_model_1 = __webpack_require__(34);
const discount_rule_model_1 = __webpack_require__(31);
const loyalty_points_log_model_1 = __webpack_require__(37);
const supplier_ledger_transaction_model_1 = __webpack_require__(44);
const store_setting_model_1 = __webpack_require__(45);
const terminal_model_1 = __webpack_require__(46);
const sms_whatsapp_log_model_1 = __webpack_require__(47);
const cron_job_log_model_1 = __webpack_require__(48);
const pos_role_model_1 = __webpack_require__(49);
const pos_permission_model_1 = __webpack_require__(50);
const pos_role_permission_model_1 = __webpack_require__(51);
const pos_user_role_model_1 = __webpack_require__(52);
const pos_notification_model_1 = __webpack_require__(53);
const product_image_model_1 = __webpack_require__(25);
const reorder_alert_model_1 = __webpack_require__(54);
const supplier_order_model_1 = __webpack_require__(55);
const project_model_1 = __webpack_require__(33);
const service_model_1 = __webpack_require__(32);
const quotation_model_1 = __webpack_require__(56);
const currency_setting_model_1 = __webpack_require__(58);
const delivery_order_model_1 = __webpack_require__(59);
const company_model_1 = __webpack_require__(57);
const chart_of_account_model_1 = __webpack_require__(60);
const journal_entry_model_1 = __webpack_require__(61);
const journal_line_model_1 = __webpack_require__(62);
const store_model_1 = __webpack_require__(14);
const super_admin_model_1 = __webpack_require__(63);
const payment_gateway_log_model_1 = __webpack_require__(65);
exports.ALL_MODELS = [
    store_model_1.Store,
    super_admin_model_1.SuperAdmin,
    payment_gateway_log_model_1.PaymentGatewayLog,
    pos_user_model_1.PosUser,
    category_model_1.Category,
    unit_model_1.Unit,
    brand_model_1.Brand,
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
    terminal_model_1.Terminal,
    sms_whatsapp_log_model_1.SmsWhatsappLog,
    cron_job_log_model_1.CronJobLog,
    pos_role_model_1.PosRole,
    pos_permission_model_1.PosPermission,
    pos_role_permission_model_1.PosRolePermission,
    pos_user_role_model_1.PosUserRole,
    pos_notification_model_1.PosNotification,
    product_image_model_1.ProductImage,
    reorder_alert_model_1.ReorderAlert,
    supplier_order_model_1.SupplierOrder,
    supplier_order_model_1.SupplierOrderItem,
    project_model_1.Project,
    service_model_1.Service,
    quotation_model_1.Quotation,
    quotation_model_1.QuotationItem,
    quotation_model_1.QuotationPaymentTransaction,
    quotation_model_1.QuotationStatusLog,
    currency_setting_model_1.CurrencySetting,
    delivery_order_model_1.DeliveryOrder,
    delivery_order_model_1.DeliveryOrderItem,
    company_model_1.Company,
    chart_of_account_model_1.ChartOfAccount,
    journal_entry_model_1.JournalEntry,
    journal_line_model_1.JournalLine,
];


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosUser = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let PosUser = class PosUser extends sequelize_typescript_1.Model {
    store;
};
exports.PosUser = PosUser;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PosUser.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], PosUser.prototype, "store", void 0);
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


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Store = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let Store = class Store extends sequelize_typescript_1.Model {
};
exports.Store = Store;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: true }),
    __metadata("design:type", String)
], Store.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Store.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], Store.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], Store.prototype, "timezone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Store.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "isHeadOffice", void 0);
exports.Store = Store = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'stores', timestamps: true, underscored: true })
], Store);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Category = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let Category = class Category extends sequelize_typescript_1.Model {
    parent;
    children;
    store;
};
exports.Category = Category;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Category.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TINYINT, allowNull: false, defaultValue: 0 }),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], Category.prototype, "store", void 0);
exports.Category = Category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'categories', timestamps: true, underscored: true })
], Category);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Unit = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let Unit = class Unit extends sequelize_typescript_1.Model {
    store;
};
exports.Unit = Unit;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Unit.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: false }),
    __metadata("design:type", String)
], Unit.prototype, "shortCode", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], Unit.prototype, "store", void 0);
exports.Unit = Unit = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'units', timestamps: false, underscored: true })
], Unit);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Brand = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(18);
const store_model_1 = __webpack_require__(14);
let Brand = class Brand extends sequelize_typescript_1.Model {
    products;
    store;
};
exports.Brand = Brand;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Brand.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(150), allowNull: false }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: true }),
    __metadata("design:type", String)
], Brand.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Brand.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.Product, 'brandId'),
    __metadata("design:type", Array)
], Brand.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], Brand.prototype, "store", void 0);
exports.Brand = Brand = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'brands',
        timestamps: true,
        underscored: true,
        indexes: [{ unique: true, fields: ['name', 'store_id'], name: 'uq_brand_name_store' }],
    })
], Brand);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Product = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const category_model_1 = __webpack_require__(15);
const unit_model_1 = __webpack_require__(16);
const batch_model_1 = __webpack_require__(19);
const product_variant_model_1 = __webpack_require__(23);
const product_price_model_1 = __webpack_require__(24);
const product_image_model_1 = __webpack_require__(25);
const brand_model_1 = __webpack_require__(17);
const store_model_1 = __webpack_require__(14);
let Product = class Product extends sequelize_typescript_1.Model {
    category;
    unit;
    brand;
    batches;
    variants;
    priceHistory;
    images;
    store;
};
exports.Product = Product;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.ForeignKey)(() => brand_model_1.Brand),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Product.prototype, "brandId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
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
    (0, sequelize_typescript_1.BelongsTo)(() => brand_model_1.Brand, 'brandId'),
    __metadata("design:type", typeof (_c = typeof brand_model_1.Brand !== "undefined" && brand_model_1.Brand) === "function" ? _c : Object)
], Product.prototype, "brand", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], Product.prototype, "store", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({ where: { isActive: true } })),
    (0, sequelize_typescript_1.Scopes)(() => ({ withInactive: {}, active: { where: { isActive: true } } })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'products',
        timestamps: true,
        underscored: true,
        indexes: [{ unique: true, fields: ['barcode', 'store_id'], name: 'uq_product_barcode_store' }],
    })
], Product);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Batch = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(18);
const supplier_model_1 = __webpack_require__(20);
const purchase_model_1 = __webpack_require__(21);
const store_model_1 = __webpack_require__(14);
let Batch = class Batch extends sequelize_typescript_1.Model {
    product;
    supplier;
    purchase;
    store;
};
exports.Batch = Batch;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Batch.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Object)
], Batch.prototype, "salePrice", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('active', 'expired', 'returned', 'depleted'), allowNull: false, defaultValue: 'active' }),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], Batch.prototype, "store", void 0);
exports.Batch = Batch = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'batches', timestamps: true, underscored: true })
], Batch);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Supplier = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let Supplier = class Supplier extends sequelize_typescript_1.Model {
    store;
};
exports.Supplier = Supplier;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Supplier.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('percentage', 'fixed'), allowNull: false, defaultValue: 'percentage' }),
    __metadata("design:type", String)
], Supplier.prototype, "discountType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Supplier.prototype, "discountValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], Supplier.prototype, "store", void 0);
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


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Purchase = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(20);
const pos_user_model_1 = __webpack_require__(12);
const purchase_item_model_1 = __webpack_require__(22);
const store_model_1 = __webpack_require__(14);
let Purchase = class Purchase extends sequelize_typescript_1.Model {
    supplier;
    createdByUser;
    purchaseItems;
    store;
};
exports.Purchase = Purchase;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Purchase.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], Purchase.prototype, "store", void 0);
exports.Purchase = Purchase = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchases',
        timestamps: true,
        underscored: true,
    })
], Purchase);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PurchaseItem = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const purchase_model_1 = __webpack_require__(21);
const product_model_1 = __webpack_require__(18);
const batch_model_1 = __webpack_require__(19);
const product_variant_model_1 = __webpack_require__(23);
const store_model_1 = __webpack_require__(14);
let PurchaseItem = class PurchaseItem extends sequelize_typescript_1.Model {
    purchase;
    product;
    batch;
    variant;
    store;
};
exports.PurchaseItem = PurchaseItem;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PurchaseItem.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.ForeignKey)(() => product_variant_model_1.ProductVariant),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], PurchaseItem.prototype, "variantId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_variant_model_1.ProductVariant, 'variantId'),
    __metadata("design:type", typeof (_d = typeof product_variant_model_1.ProductVariant !== "undefined" && product_variant_model_1.ProductVariant) === "function" ? _d : Object)
], PurchaseItem.prototype, "variant", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_e = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _e : Object)
], PurchaseItem.prototype, "store", void 0);
exports.PurchaseItem = PurchaseItem = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchase_items',
        timestamps: false,
        underscored: true,
    })
], PurchaseItem);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ProductVariant = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(18);
const unit_model_1 = __webpack_require__(16);
const store_model_1 = __webpack_require__(14);
let ProductVariant = class ProductVariant extends sequelize_typescript_1.Model {
    product;
    unit;
    store;
};
exports.ProductVariant = ProductVariant;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], ProductVariant.prototype, "store", void 0);
exports.ProductVariant = ProductVariant = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({ where: { isActive: true } })),
    (0, sequelize_typescript_1.Table)({ tableName: 'product_variants', timestamps: true, underscored: true })
], ProductVariant);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ProductPrice = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(18);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let ProductPrice = class ProductPrice extends sequelize_typescript_1.Model {
    product;
    changedByUser;
    store;
};
exports.ProductPrice = ProductPrice;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], ProductPrice.prototype, "store", void 0);
exports.ProductPrice = ProductPrice = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'product_prices',
        timestamps: false,
        underscored: true,
    })
], ProductPrice);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ProductImage = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(18);
const store_model_1 = __webpack_require__(14);
let ProductImage = class ProductImage extends sequelize_typescript_1.Model {
    product;
    store;
};
exports.ProductImage = ProductImage;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ProductImage.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ProductImage.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT('long'), allowNull: false }),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], ProductImage.prototype, "store", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'product_images',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], ProductImage);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PurchaseReturn = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const purchase_model_1 = __webpack_require__(21);
const supplier_model_1 = __webpack_require__(20);
const product_model_1 = __webpack_require__(18);
const batch_model_1 = __webpack_require__(19);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let PurchaseReturn = class PurchaseReturn extends sequelize_typescript_1.Model {
    purchase;
    supplier;
    product;
    batch;
    processedByUser;
    store;
};
exports.PurchaseReturn = PurchaseReturn;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PurchaseReturn.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_f = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _f : Object)
], PurchaseReturn.prototype, "store", void 0);
exports.PurchaseReturn = PurchaseReturn = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchase_returns',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PurchaseReturn);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SupplierPayment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(20);
const purchase_model_1 = __webpack_require__(21);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let SupplierPayment = class SupplierPayment extends sequelize_typescript_1.Model {
    supplier;
    purchase;
    recordedByUser;
    store;
};
exports.SupplierPayment = SupplierPayment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierPayment.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], SupplierPayment.prototype, "store", void 0);
exports.SupplierPayment = SupplierPayment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'supplier_payments',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], SupplierPayment);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Customer = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(29);
const udhaar_transaction_model_1 = __webpack_require__(36);
const loyalty_points_log_model_1 = __webpack_require__(37);
const store_model_1 = __webpack_require__(14);
let Customer = class Customer extends sequelize_typescript_1.Model {
    sales;
    udhaarTransactions;
    loyaltyLogs;
    store;
};
exports.Customer = Customer;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Customer.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "advanceBalance", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], Customer.prototype, "store", void 0);
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


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Sale = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(28);
const pos_user_model_1 = __webpack_require__(12);
const sale_item_model_1 = __webpack_require__(30);
const sale_payment_model_1 = __webpack_require__(34);
const sale_return_model_1 = __webpack_require__(35);
const store_model_1 = __webpack_require__(14);
let Sale = class Sale extends sequelize_typescript_1.Model {
    customer;
    createdByUser;
    saleItems;
    salePayments;
    saleReturns;
    store;
};
exports.Sale = Sale;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Sale.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('cash', 'easypaisa', 'jazzcash', 'card', 'udhaar', 'advance', 'split', 'mixed'), allowNull: false, defaultValue: 'cash' }),
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('pending', 'synced', 'failed'), allowNull: false, defaultValue: 'pending' }),
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "serviceCharge", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "deliveryCharge", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "loyaltyPointsEarned", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "loyaltyPointsRedeemed", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Object)
], Sale.prototype, "fbrSyncTimestamp", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_b = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _b : Object)
], Sale.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_c = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _c : Object)
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], Sale.prototype, "store", void 0);
exports.Sale = Sale = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sales', timestamps: true, underscored: true })
], Sale);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleItem = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(29);
const product_model_1 = __webpack_require__(18);
const product_variant_model_1 = __webpack_require__(23);
const batch_model_1 = __webpack_require__(19);
const discount_rule_model_1 = __webpack_require__(31);
const service_model_1 = __webpack_require__(32);
const project_model_1 = __webpack_require__(33);
const store_model_1 = __webpack_require__(14);
let SaleItem = class SaleItem extends sequelize_typescript_1.Model {
    sale;
    product;
    variant;
    batch;
    discountRule;
    service;
    project;
    store;
};
exports.SaleItem = SaleItem;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleItem.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('product', 'service'), allowNull: false, defaultValue: 'product' }),
    __metadata("design:type", String)
], SaleItem.prototype, "itemType", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleItem.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => service_model_1.Service),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "serviceId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => project_model_1.Project),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "projectId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "costPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "costAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "profitAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "profitMarginPercent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('percentage', 'fixed', 'loyalty', 'promotional', 'manual'), allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "discountType", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => discount_rule_model_1.DiscountRule),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], SaleItem.prototype, "discountRuleId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => discount_rule_model_1.DiscountRule, 'discountRuleId'),
    __metadata("design:type", typeof (_e = typeof discount_rule_model_1.DiscountRule !== "undefined" && discount_rule_model_1.DiscountRule) === "function" ? _e : Object)
], SaleItem.prototype, "discountRule", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => service_model_1.Service, 'serviceId'),
    __metadata("design:type", typeof (_f = typeof service_model_1.Service !== "undefined" && service_model_1.Service) === "function" ? _f : Object)
], SaleItem.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => project_model_1.Project, 'projectId'),
    __metadata("design:type", typeof (_g = typeof project_model_1.Project !== "undefined" && project_model_1.Project) === "function" ? _g : Object)
], SaleItem.prototype, "project", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_h = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _h : Object)
], SaleItem.prototype, "store", void 0);
exports.SaleItem = SaleItem = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sale_items', timestamps: false, underscored: true })
], SaleItem);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DiscountRule = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let DiscountRule = class DiscountRule extends sequelize_typescript_1.Model {
    createdByUser;
    store;
};
exports.DiscountRule = DiscountRule;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DiscountRule.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], DiscountRule.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('percentage', 'fixed'), allowNull: false }),
    __metadata("design:type", String)
], DiscountRule.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('all', 'product', 'category', 'order', 'bundle'), allowNull: false, defaultValue: 'all' }),
    __metadata("design:type", String)
], DiscountRule.prototype, "appliesTo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, allowNull: true }),
    __metadata("design:type", Object)
], DiscountRule.prototype, "bundleItems", void 0);
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
    __metadata("design:type", typeof (_b = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _b : Object)
], DiscountRule.prototype, "createdByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], DiscountRule.prototype, "store", void 0);
exports.DiscountRule = DiscountRule = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'discount_rules', timestamps: true, underscored: true })
], DiscountRule);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Service = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(20);
const store_model_1 = __webpack_require__(14);
let Service = class Service extends sequelize_typescript_1.Model {
    supplier;
    store;
};
exports.Service = Service;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Service.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Service.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_a = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _a : Object)
], Service.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "unitPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "vatPercent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Service.prototype, "unitOfMeasure", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Service.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Service.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], Service.prototype, "store", void 0);
exports.Service = Service = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'services', timestamps: true, underscored: true })
], Service);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Project = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(28);
const supplier_model_1 = __webpack_require__(20);
const store_model_1 = __webpack_require__(14);
let Project = class Project extends sequelize_typescript_1.Model {
    customer;
    supplier;
    store;
};
exports.Project = Project;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Project.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: true }),
    __metadata("design:type", Number)
], Project.prototype, "estimatedCost", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_model_1.Customer),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Project.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Project.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Project.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Project.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_a = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _a : Object)
], Project.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_b = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _b : Object)
], Project.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], Project.prototype, "store", void 0);
exports.Project = Project = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'projects', timestamps: true, underscored: true })
], Project);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SalePayment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(29);
const store_model_1 = __webpack_require__(14);
let SalePayment = class SalePayment extends sequelize_typescript_1.Model {
    sale;
    store;
};
exports.SalePayment = SalePayment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SalePayment.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SalePayment.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('cash', 'easypaisa', 'jazzcash', 'card', 'udhaar', 'advance'), allowNull: false }),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], SalePayment.prototype, "store", void 0);
exports.SalePayment = SalePayment = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sale_payments', timestamps: true, underscored: true, updatedAt: false })
], SalePayment);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleReturn = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(29);
const sale_item_model_1 = __webpack_require__(30);
const product_model_1 = __webpack_require__(18);
const product_variant_model_1 = __webpack_require__(23);
const batch_model_1 = __webpack_require__(19);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let SaleReturn = class SaleReturn extends sequelize_typescript_1.Model {
    sale;
    saleItem;
    product;
    variant;
    batch;
    processedByUser;
    store;
};
exports.SaleReturn = SaleReturn;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SaleReturn.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Object)
], SaleReturn.prototype, "originalCostPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Object)
], SaleReturn.prototype, "profitLost", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_g = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _g : Object)
], SaleReturn.prototype, "store", void 0);
exports.SaleReturn = SaleReturn = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sale_returns',
        timestamps: true,
        underscored: true,
    })
], SaleReturn);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UdhaarTransaction = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(28);
const sale_model_1 = __webpack_require__(29);
const store_model_1 = __webpack_require__(14);
let UdhaarTransaction = class UdhaarTransaction extends sequelize_typescript_1.Model {
    customer;
    sale;
    store;
};
exports.UdhaarTransaction = UdhaarTransaction;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], UdhaarTransaction.prototype, "storeId", void 0);
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
        type: sequelize_typescript_1.DataType.ENUM('debit', 'credit', 'advance'),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], UdhaarTransaction.prototype, "store", void 0);
exports.UdhaarTransaction = UdhaarTransaction = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'udhaar_transactions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], UdhaarTransaction);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.LoyaltyPointsLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(28);
const sale_model_1 = __webpack_require__(29);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let LoyaltyPointsLog = class LoyaltyPointsLog extends sequelize_typescript_1.Model {
    customer;
    sale;
    adjustedByUser;
    store;
};
exports.LoyaltyPointsLog = LoyaltyPointsLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], LoyaltyPointsLog.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], LoyaltyPointsLog.prototype, "store", void 0);
exports.LoyaltyPointsLog = LoyaltyPointsLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'loyalty_points_log',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], LoyaltyPointsLog);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CustomerPayment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(28);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let CustomerPayment = class CustomerPayment extends sequelize_typescript_1.Model {
    customer;
    recordedByUser;
    store;
};
exports.CustomerPayment = CustomerPayment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], CustomerPayment.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], CustomerPayment.prototype, "store", void 0);
exports.CustomerPayment = CustomerPayment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'customer_payments',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], CustomerPayment);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.StockAdjustment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(18);
const batch_model_1 = __webpack_require__(19);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let StockAdjustment = class StockAdjustment extends sequelize_typescript_1.Model {
    product;
    batch;
    adjustedByUser;
    store;
};
exports.StockAdjustment = StockAdjustment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], StockAdjustment.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], StockAdjustment.prototype, "store", void 0);
exports.StockAdjustment = StockAdjustment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'stock_adjustments',
        timestamps: true,
        underscored: true,
    })
], StockAdjustment);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Expense = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let Expense = class Expense extends sequelize_typescript_1.Model {
    createdByUser;
    store;
};
exports.Expense = Expense;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Expense.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], Expense.prototype, "store", void 0);
exports.Expense = Expense = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'expenses',
        timestamps: true,
        underscored: true,
    })
], Expense);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.AuditLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let AuditLog = class AuditLog extends sequelize_typescript_1.Model {
    user;
    store;
};
exports.AuditLog = AuditLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], AuditLog.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], AuditLog.prototype, "store", void 0);
exports.AuditLog = AuditLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'audit_logs', timestamps: true, underscored: true, updatedAt: false })
], AuditLog);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.FbrInvoiceLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(29);
const store_model_1 = __webpack_require__(14);
let FbrInvoiceLog = class FbrInvoiceLog extends sequelize_typescript_1.Model {
    sale;
    store;
};
exports.FbrInvoiceLog = FbrInvoiceLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], FbrInvoiceLog.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('pending', 'synced', 'failed'), allowNull: false, defaultValue: 'pending' }),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_e = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _e : Object)
], FbrInvoiceLog.prototype, "store", void 0);
exports.FbrInvoiceLog = FbrInvoiceLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'fbr_invoices_log', timestamps: true, underscored: true, updatedAt: false })
], FbrInvoiceLog);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TaxSetting = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const category_model_1 = __webpack_require__(15);
const product_model_1 = __webpack_require__(18);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let TaxSetting = class TaxSetting extends sequelize_typescript_1.Model {
    store;
    category;
    product;
    updatedByUser;
};
exports.TaxSetting = TaxSetting;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], TaxSetting.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], TaxSetting.prototype, "store", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_model_1.Category, 'categoryId'),
    __metadata("design:type", typeof (_b = typeof category_model_1.Category !== "undefined" && category_model_1.Category) === "function" ? _b : Object)
], TaxSetting.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_c = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _c : Object)
], TaxSetting.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'updatedBy'),
    __metadata("design:type", typeof (_d = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _d : Object)
], TaxSetting.prototype, "updatedByUser", void 0);
exports.TaxSetting = TaxSetting = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'tax_settings',
        timestamps: true,
        underscored: true,
        createdAt: false,
    })
], TaxSetting);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SupplierLedgerTransaction = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(20);
const purchase_model_1 = __webpack_require__(21);
const supplier_payment_model_1 = __webpack_require__(27);
const store_model_1 = __webpack_require__(14);
let SupplierLedgerTransaction = class SupplierLedgerTransaction extends sequelize_typescript_1.Model {
    supplier;
    purchase;
    payment;
    store;
};
exports.SupplierLedgerTransaction = SupplierLedgerTransaction;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierLedgerTransaction.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], SupplierLedgerTransaction.prototype, "store", void 0);
exports.SupplierLedgerTransaction = SupplierLedgerTransaction = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'supplier_ledger_transactions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], SupplierLedgerTransaction);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.StoreSetting = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let StoreSetting = class StoreSetting extends sequelize_typescript_1.Model {
    updatedByUser;
    store;
};
exports.StoreSetting = StoreSetting;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "storeId", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "serviceChargePercent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "deliveryCharge", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "smsApiKey", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: true }),
    __metadata("design:type", String)
], StoreSetting.prototype, "whatsappApiKey", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureDashboard", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureInventory", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featurePurchasing", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureSales", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureQuotationsB2b", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureReports", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureExpenses", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureDiscounts", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureLoyalty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureLedger", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureInventoryForecast", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureSupplierOrders", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureSupplierLedger", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureRolesPermissions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featurePosScreen", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureSettings", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featurePaymentGateway", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureFbr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureAuditLogs", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], StoreSetting.prototype, "featureOfflineSync", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], StoreSetting.prototype, "store", void 0);
exports.StoreSetting = StoreSetting = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'store_settings',
        timestamps: false,
        underscored: true,
    })
], StoreSetting);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Terminal = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let Terminal = class Terminal extends sequelize_typescript_1.Model {
    store;
};
exports.Terminal = Terminal;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Terminal.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], Terminal.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false, unique: true }),
    __metadata("design:type", String)
], Terminal.prototype, "identifier", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: true }),
    __metadata("design:type", String)
], Terminal.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Terminal.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Terminal.prototype, "lastSeenAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], Terminal.prototype, "store", void 0);
exports.Terminal = Terminal = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'terminals',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], Terminal);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SmsWhatsappLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let SmsWhatsappLog = class SmsWhatsappLog extends sequelize_typescript_1.Model {
    store;
};
exports.SmsWhatsappLog = SmsWhatsappLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SmsWhatsappLog.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], SmsWhatsappLog.prototype, "store", void 0);
exports.SmsWhatsappLog = SmsWhatsappLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sms_whatsapp_logs',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], SmsWhatsappLog);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CronJobLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let CronJobLog = class CronJobLog extends sequelize_typescript_1.Model {
    store;
};
exports.CronJobLog = CronJobLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], CronJobLog.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], CronJobLog.prototype, "store", void 0);
exports.CronJobLog = CronJobLog = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'cron_job_logs',
        timestamps: false,
        underscored: true,
    })
], CronJobLog);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosRole = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let PosRole = class PosRole extends sequelize_typescript_1.Model {
    store;
};
exports.PosRole = PosRole;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], PosRole.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], PosRole.prototype, "store", void 0);
exports.PosRole = PosRole = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_roles',
        timestamps: true,
        underscored: true,
    })
], PosRole);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosPermission = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let PosPermission = class PosPermission extends sequelize_typescript_1.Model {
    store;
};
exports.PosPermission = PosPermission;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], PosPermission.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], PosPermission.prototype, "store", void 0);
exports.PosPermission = PosPermission = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_permissions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosPermission);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosRolePermission = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_role_model_1 = __webpack_require__(49);
const pos_permission_model_1 = __webpack_require__(50);
const store_model_1 = __webpack_require__(14);
let PosRolePermission = class PosRolePermission extends sequelize_typescript_1.Model {
    role;
    permission;
    store;
};
exports.PosRolePermission = PosRolePermission;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], PosRolePermission.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], PosRolePermission.prototype, "store", void 0);
exports.PosRolePermission = PosRolePermission = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_role_permissions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosRolePermission);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosUserRole = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const pos_role_model_1 = __webpack_require__(49);
const store_model_1 = __webpack_require__(14);
let PosUserRole = class PosUserRole extends sequelize_typescript_1.Model {
    user;
    role;
    store;
};
exports.PosUserRole = PosUserRole;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], PosUserRole.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], PosUserRole.prototype, "store", void 0);
exports.PosUserRole = PosUserRole = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_user_roles',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosUserRole);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosNotification = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let PosNotification = class PosNotification extends sequelize_typescript_1.Model {
    user;
    store;
};
exports.PosNotification = PosNotification;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PosNotification.prototype, "storeId", void 0);
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
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], PosNotification.prototype, "store", void 0);
exports.PosNotification = PosNotification = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pos_notifications',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], PosNotification);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ReorderAlert = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(18);
const store_model_1 = __webpack_require__(14);
let ReorderAlert = class ReorderAlert extends sequelize_typescript_1.Model {
    product;
    store;
};
exports.ReorderAlert = ReorderAlert;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ReorderAlert.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReorderAlert.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ReorderAlert.prototype, "currentStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ReorderAlert.prototype, "reorderPoint", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ReorderAlert.prototype, "suggestedQty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Number)
], ReorderAlert.prototype, "avgDailySales", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ReorderAlert.prototype, "leadTimeDays", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'acknowledged', 'ordered'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], ReorderAlert.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ReorderAlert.prototype, "acknowledgedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product, 'productId'),
    __metadata("design:type", typeof (_b = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _b : Object)
], ReorderAlert.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], ReorderAlert.prototype, "store", void 0);
exports.ReorderAlert = ReorderAlert = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'reorder_alerts', timestamps: true, underscored: true })
], ReorderAlert);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SupplierOrderItem = exports.SupplierOrder = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(20);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let SupplierOrder = class SupplierOrder extends sequelize_typescript_1.Model {
    supplier;
    createdByUser;
    items;
    store;
};
exports.SupplierOrder = SupplierOrder;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierOrder.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SupplierOrder.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], SupplierOrder.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], SupplierOrder.prototype, "orderRef", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], SupplierOrder.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('draft', 'sent', 'confirmed', 'received', 'cancelled'),
        allowNull: false,
        defaultValue: 'draft',
    }),
    __metadata("design:type", String)
], SupplierOrder.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], SupplierOrder.prototype, "expectedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_a = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _a : Object)
], SupplierOrder.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_b = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _b : Object)
], SupplierOrder.prototype, "createdByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SupplierOrderItem, 'orderId'),
    __metadata("design:type", Array)
], SupplierOrder.prototype, "items", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], SupplierOrder.prototype, "store", void 0);
exports.SupplierOrder = SupplierOrder = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'supplier_orders', timestamps: true, underscored: true })
], SupplierOrder);
let SupplierOrderItem = class SupplierOrderItem extends sequelize_typescript_1.Model {
    order;
};
exports.SupplierOrderItem = SupplierOrderItem;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SupplierOrder),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SupplierOrderItem.prototype, "orderId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], SupplierOrderItem.prototype, "productName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], SupplierOrderItem.prototype, "variantInfo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], SupplierOrderItem.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], SupplierOrderItem.prototype, "unit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: true }),
    __metadata("design:type", Number)
], SupplierOrderItem.prototype, "expectedPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], SupplierOrderItem.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SupplierOrder, 'orderId'),
    __metadata("design:type", SupplierOrder)
], SupplierOrderItem.prototype, "order", void 0);
exports.SupplierOrderItem = SupplierOrderItem = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'supplier_order_items', timestamps: false, underscored: true })
], SupplierOrderItem);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.QuotationStatusLog = exports.QuotationPaymentTransaction = exports.QuotationItem = exports.Quotation = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(28);
const pos_user_model_1 = __webpack_require__(12);
const company_model_1 = __webpack_require__(57);
const store_model_1 = __webpack_require__(14);
let Quotation = class Quotation extends sequelize_typescript_1.Model {
    customer;
    company;
    createdByUser;
    items;
    paymentTransactions;
    statusLogs;
    store;
};
exports.Quotation = Quotation;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Quotation.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_model_1.Customer),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "companyId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Quotation.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Retail', 'Wholesale', 'Other'),
        allowNull: false,
        defaultValue: 'Retail',
    }),
    __metadata("design:type", String)
], Quotation.prototype, "quotationType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], Quotation.prototype, "validUntil", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Quotation.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Quotation.prototype, "termsConditions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "subTotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "vatAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "discountAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "totalAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: true, defaultValue: 'PKR' }),
    __metadata("design:type", String)
], Quotation.prototype, "currencyCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Draft', 'Sent', 'Approved', 'Rejected', 'Converted'),
        allowNull: false,
        defaultValue: 'Draft',
    }),
    __metadata("design:type", String)
], Quotation.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "paidAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Quotation.prototype, "convertedSaleId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_a = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _a : Object)
], Quotation.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_model_1.Company, 'companyId'),
    __metadata("design:type", typeof (_b = typeof company_model_1.Company !== "undefined" && company_model_1.Company) === "function" ? _b : Object)
], Quotation.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_c = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _c : Object)
], Quotation.prototype, "createdByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => QuotationItem, 'quotationId'),
    __metadata("design:type", Array)
], Quotation.prototype, "items", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => QuotationPaymentTransaction, 'quotationId'),
    __metadata("design:type", Array)
], Quotation.prototype, "paymentTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => QuotationStatusLog, 'quotationId'),
    __metadata("design:type", Array)
], Quotation.prototype, "statusLogs", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_d = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _d : Object)
], Quotation.prototype, "store", void 0);
exports.Quotation = Quotation = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'quotations', timestamps: true, underscored: true })
], Quotation);
let QuotationItem = class QuotationItem extends sequelize_typescript_1.Model {
    quotation;
};
exports.QuotationItem = QuotationItem;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Quotation),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "quotationId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('product', 'service', 'project'),
        allowNull: false,
        defaultValue: 'product',
    }),
    __metadata("design:type", String)
], QuotationItem.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "refId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], QuotationItem.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], QuotationItem.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "unitPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "vatPercent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], QuotationItem.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true }),
    __metadata("design:type", String)
], QuotationItem.prototype, "unit", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Quotation, 'quotationId'),
    __metadata("design:type", Quotation)
], QuotationItem.prototype, "quotation", void 0);
exports.QuotationItem = QuotationItem = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'quotation_items', timestamps: false, underscored: true })
], QuotationItem);
let QuotationPaymentTransaction = class QuotationPaymentTransaction extends sequelize_typescript_1.Model {
    quotation;
};
exports.QuotationPaymentTransaction = QuotationPaymentTransaction;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Quotation),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], QuotationPaymentTransaction.prototype, "quotationId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('payment', 'return'),
        allowNull: false,
        defaultValue: 'payment',
    }),
    __metadata("design:type", String)
], QuotationPaymentTransaction.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], QuotationPaymentTransaction.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: true, defaultValue: 'Cash' }),
    __metadata("design:type", String)
], QuotationPaymentTransaction.prototype, "method", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: true }),
    __metadata("design:type", String)
], QuotationPaymentTransaction.prototype, "paymentDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], QuotationPaymentTransaction.prototype, "bankName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], QuotationPaymentTransaction.prototype, "chequeNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], QuotationPaymentTransaction.prototype, "reason", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], QuotationPaymentTransaction.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], QuotationPaymentTransaction.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Quotation, 'quotationId'),
    __metadata("design:type", Quotation)
], QuotationPaymentTransaction.prototype, "quotation", void 0);
exports.QuotationPaymentTransaction = QuotationPaymentTransaction = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'quotation_payment_transactions', timestamps: false, underscored: true })
], QuotationPaymentTransaction);
let QuotationStatusLog = class QuotationStatusLog extends sequelize_typescript_1.Model {
    quotation;
};
exports.QuotationStatusLog = QuotationStatusLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Quotation),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], QuotationStatusLog.prototype, "quotationId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], QuotationStatusLog.prototype, "fromStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], QuotationStatusLog.prototype, "toStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], QuotationStatusLog.prototype, "note", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], QuotationStatusLog.prototype, "changedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], QuotationStatusLog.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Quotation, 'quotationId'),
    __metadata("design:type", Quotation)
], QuotationStatusLog.prototype, "quotation", void 0);
exports.QuotationStatusLog = QuotationStatusLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'quotation_status_logs', timestamps: false, underscored: true })
], QuotationStatusLog);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.Company = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let Company = class Company extends sequelize_typescript_1.Model {
    store;
};
exports.Company = Company;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Company.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], Company.prototype, "store", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "registrationNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "taxId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "industry", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "website", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "contactPerson", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: true, defaultValue: 'PKR' }),
    __metadata("design:type", String)
], Company.prototype, "currencyCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Company.prototype, "creditLimit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Company.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Company.prototype, "isActive", void 0);
exports.Company = Company = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'companies', timestamps: true, underscored: true })
], Company);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CurrencySetting = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let CurrencySetting = class CurrencySetting extends sequelize_typescript_1.Model {
    store;
};
exports.CurrencySetting = CurrencySetting;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], CurrencySetting.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: false }),
    __metadata("design:type", String)
], CurrencySetting.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: false }),
    __metadata("design:type", String)
], CurrencySetting.prototype, "symbol", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], CurrencySetting.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], CurrencySetting.prototype, "isDefault", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], CurrencySetting.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], CurrencySetting.prototype, "sortOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], CurrencySetting.prototype, "store", void 0);
exports.CurrencySetting = CurrencySetting = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'currency_settings', timestamps: true, underscored: true })
], CurrencySetting);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeliveryOrderItem = exports.DeliveryOrder = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(28);
const supplier_model_1 = __webpack_require__(20);
const quotation_model_1 = __webpack_require__(56);
const pos_user_model_1 = __webpack_require__(12);
const store_model_1 = __webpack_require__(14);
let DeliveryOrder = class DeliveryOrder extends sequelize_typescript_1.Model {
    quotation;
    customer;
    supplier;
    createdByUser;
    items;
    store;
};
exports.DeliveryOrder = DeliveryOrder;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DeliveryOrder.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(30), allowNull: false, unique: true }),
    __metadata("design:type", String)
], DeliveryOrder.prototype, "doNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => quotation_model_1.Quotation),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], DeliveryOrder.prototype, "quotationId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_model_1.Customer),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], DeliveryOrder.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => supplier_model_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], DeliveryOrder.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DeliveryOrder.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Pending', 'Forwarded', 'Invoiced', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Pending',
    }),
    __metadata("design:type", String)
], DeliveryOrder.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], DeliveryOrder.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => quotation_model_1.Quotation, 'quotationId'),
    __metadata("design:type", typeof (_a = typeof quotation_model_1.Quotation !== "undefined" && quotation_model_1.Quotation) === "function" ? _a : Object)
], DeliveryOrder.prototype, "quotation", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_model_1.Customer, 'customerId'),
    __metadata("design:type", typeof (_b = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" ? _b : Object)
], DeliveryOrder.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => supplier_model_1.Supplier, 'supplierId'),
    __metadata("design:type", typeof (_c = typeof supplier_model_1.Supplier !== "undefined" && supplier_model_1.Supplier) === "function" ? _c : Object)
], DeliveryOrder.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, { foreignKey: 'createdBy', as: 'createdByUser' }),
    __metadata("design:type", typeof (_d = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _d : Object)
], DeliveryOrder.prototype, "createdByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => DeliveryOrderItem, 'deliveryOrderId'),
    __metadata("design:type", Array)
], DeliveryOrder.prototype, "items", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_e = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _e : Object)
], DeliveryOrder.prototype, "store", void 0);
exports.DeliveryOrder = DeliveryOrder = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'delivery_orders', timestamps: true, underscored: true })
], DeliveryOrder);
let DeliveryOrderItem = class DeliveryOrderItem extends sequelize_typescript_1.Model {
    deliveryOrder;
};
exports.DeliveryOrderItem = DeliveryOrderItem;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => DeliveryOrder),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], DeliveryOrderItem.prototype, "deliveryOrderId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => quotation_model_1.QuotationItem),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DeliveryOrderItem.prototype, "quotationItemId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('product', 'service', 'project'), allowNull: false, defaultValue: 'product' }),
    __metadata("design:type", String)
], DeliveryOrderItem.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false }),
    __metadata("design:type", String)
], DeliveryOrderItem.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], DeliveryOrderItem.prototype, "unitPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 3), allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], DeliveryOrderItem.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], DeliveryOrderItem.prototype, "vatPercent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], DeliveryOrderItem.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => DeliveryOrder, 'deliveryOrderId'),
    __metadata("design:type", DeliveryOrder)
], DeliveryOrderItem.prototype, "deliveryOrder", void 0);
exports.DeliveryOrderItem = DeliveryOrderItem = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'delivery_order_items', timestamps: false, underscored: true })
], DeliveryOrderItem);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ChartOfAccount = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const store_model_1 = __webpack_require__(14);
let ChartOfAccount = class ChartOfAccount extends sequelize_typescript_1.Model {
    store;
};
exports.ChartOfAccount = ChartOfAccount;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], ChartOfAccount.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: false }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('asset', 'liability', 'equity', 'revenue', 'expense'), allowNull: false }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], ChartOfAccount.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_a = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _a : Object)
], ChartOfAccount.prototype, "store", void 0);
exports.ChartOfAccount = ChartOfAccount = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'chart_of_accounts',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['code', 'store_id'],
                name: 'unique_code_store'
            }
        ]
    })
], ChartOfAccount);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.JournalEntry = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const journal_line_model_1 = __webpack_require__(62);
const store_model_1 = __webpack_require__(14);
let JournalEntry = class JournalEntry extends sequelize_typescript_1.Model {
    createdByUser;
    lines;
    store;
};
exports.JournalEntry = JournalEntry;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], JournalEntry.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(60), allowNull: false, unique: true }),
    __metadata("design:type", String)
], JournalEntry.prototype, "journalId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false }),
    __metadata("design:type", String)
], JournalEntry.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('sale', 'purchase', 'payment', 'expense', 'adjustment', 'manual'), allowNull: false, defaultValue: 'manual' }),
    __metadata("design:type", String)
], JournalEntry.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], JournalEntry.prototype, "reference", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], JournalEntry.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('draft', 'posted', 'reversed'), allowNull: false, defaultValue: 'posted' }),
    __metadata("design:type", String)
], JournalEntry.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pos_user_model_1.PosUser),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], JournalEntry.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pos_user_model_1.PosUser, 'createdBy'),
    __metadata("design:type", typeof (_a = typeof pos_user_model_1.PosUser !== "undefined" && pos_user_model_1.PosUser) === "function" ? _a : Object)
], JournalEntry.prototype, "createdByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => journal_line_model_1.JournalLine, 'entryId'),
    __metadata("design:type", Array)
], JournalEntry.prototype, "lines", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_b = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _b : Object)
], JournalEntry.prototype, "store", void 0);
exports.JournalEntry = JournalEntry = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'journal_entries', timestamps: true, underscored: true })
], JournalEntry);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.JournalLine = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const journal_entry_model_1 = __webpack_require__(61);
const chart_of_account_model_1 = __webpack_require__(60);
const store_model_1 = __webpack_require__(14);
let JournalLine = class JournalLine extends sequelize_typescript_1.Model {
    entry;
    account;
    store;
};
exports.JournalLine = JournalLine;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], JournalLine.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => journal_entry_model_1.JournalEntry),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], JournalLine.prototype, "entryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chart_of_account_model_1.ChartOfAccount),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], JournalLine.prototype, "accountId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(14, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], JournalLine.prototype, "debit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(14, 2), allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], JournalLine.prototype, "credit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], JournalLine.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => journal_entry_model_1.JournalEntry, 'entryId'),
    __metadata("design:type", typeof (_a = typeof journal_entry_model_1.JournalEntry !== "undefined" && journal_entry_model_1.JournalEntry) === "function" ? _a : Object)
], JournalLine.prototype, "entry", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => chart_of_account_model_1.ChartOfAccount, 'accountId'),
    __metadata("design:type", typeof (_b = typeof chart_of_account_model_1.ChartOfAccount !== "undefined" && chart_of_account_model_1.ChartOfAccount) === "function" ? _b : Object)
], JournalLine.prototype, "account", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], JournalLine.prototype, "store", void 0);
exports.JournalLine = JournalLine = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'journal_lines', timestamps: false, underscored: true })
], JournalLine);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuperAdmin = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const bcrypt = __importStar(__webpack_require__(64));
let SuperAdmin = class SuperAdmin extends sequelize_typescript_1.Model {
    static async hashPasswordBeforeCreate(instance) {
        if (instance.password) {
            instance.password = await bcrypt.hash(instance.password, 10);
        }
    }
    static async hashPasswordBeforeUpdate(instance) {
        if (instance.changed('password')) {
            instance.password = await bcrypt.hash(instance.password, 10);
        }
    }
    async validatePassword(password) {
        return bcrypt.compare(password, this.password);
    }
};
exports.SuperAdmin = SuperAdmin;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false, unique: true }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: false }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: true }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], SuperAdmin.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SuperAdmin.prototype, "lastLoginAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(45), allowNull: true }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "lastLoginIp", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SuperAdmin]),
    __metadata("design:returntype", Promise)
], SuperAdmin, "hashPasswordBeforeCreate", null);
__decorate([
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SuperAdmin]),
    __metadata("design:returntype", Promise)
], SuperAdmin, "hashPasswordBeforeUpdate", null);
exports.SuperAdmin = SuperAdmin = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'super_admins', timestamps: true, underscored: true })
], SuperAdmin);


/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PaymentGatewayLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(29);
const store_model_1 = __webpack_require__(14);
let PaymentGatewayLog = class PaymentGatewayLog extends sequelize_typescript_1.Model {
    sale;
    store;
};
exports.PaymentGatewayLog = PaymentGatewayLog;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PaymentGatewayLog.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sale_model_1.Sale),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], PaymentGatewayLog.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('easypaisa', 'jazzcash', 'nayapay', 'stripe'), allowNull: false }),
    __metadata("design:type", String)
], PaymentGatewayLog.prototype, "provider", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    __metadata("design:type", Number)
], PaymentGatewayLog.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], PaymentGatewayLog.prototype, "transactionId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: true }),
    __metadata("design:type", String)
], PaymentGatewayLog.prototype, "mobileNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'success', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending',
    }),
    __metadata("design:type", String)
], PaymentGatewayLog.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], PaymentGatewayLog.prototype, "gatewayResponse", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: true }),
    __metadata("design:type", String)
], PaymentGatewayLog.prototype, "errorCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PaymentGatewayLog.prototype, "completedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sale_model_1.Sale, 'saleId'),
    __metadata("design:type", typeof (_b = typeof sale_model_1.Sale !== "undefined" && sale_model_1.Sale) === "function" ? _b : Object)
], PaymentGatewayLog.prototype, "sale", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, 'storeId'),
    __metadata("design:type", typeof (_c = typeof store_model_1.Store !== "undefined" && store_model_1.Store) === "function" ? _c : Object)
], PaymentGatewayLog.prototype, "store", void 0);
exports.PaymentGatewayLog = PaymentGatewayLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'payment_gateway_logs', timestamps: true, underscored: true })
], PaymentGatewayLog);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_REPOSITORY = void 0;
const brand_repository_1 = __webpack_require__(67);
const pos_user_repository_1 = __webpack_require__(68);
const category_repository_1 = __webpack_require__(69);
const unit_repository_1 = __webpack_require__(70);
const product_repository_1 = __webpack_require__(71);
const batch_repository_1 = __webpack_require__(72);
const supplier_repository_1 = __webpack_require__(73);
const purchase_repository_1 = __webpack_require__(74);
const purchase_item_repository_1 = __webpack_require__(75);
const customer_repository_1 = __webpack_require__(76);
const customer_payment_repository_1 = __webpack_require__(77);
const udhaar_transaction_repository_1 = __webpack_require__(78);
const sale_repository_1 = __webpack_require__(79);
const sale_item_repository_1 = __webpack_require__(80);
const sale_return_repository_1 = __webpack_require__(81);
const stock_adjustment_repository_1 = __webpack_require__(82);
const expense_repository_1 = __webpack_require__(83);
const audit_log_repository_1 = __webpack_require__(84);
const fbr_invoice_log_repository_1 = __webpack_require__(85);
const sale_payment_repository_1 = __webpack_require__(86);
const discount_rule_repository_1 = __webpack_require__(87);
const loyalty_points_log_repository_1 = __webpack_require__(88);
const supplier_ledger_transaction_repository_1 = __webpack_require__(89);
const supplier_payment_repository_1 = __webpack_require__(90);
const purchase_return_repository_1 = __webpack_require__(91);
const pos_role_repository_1 = __webpack_require__(92);
const pos_permission_repository_1 = __webpack_require__(93);
const pos_role_permission_repository_1 = __webpack_require__(94);
const pos_user_role_repository_1 = __webpack_require__(95);
const product_variant_repository_1 = __webpack_require__(96);
const supplier_order_repository_1 = __webpack_require__(97);
const project_repository_1 = __webpack_require__(98);
const service_repository_1 = __webpack_require__(99);
const quotation_repository_1 = __webpack_require__(100);
const currency_setting_repository_1 = __webpack_require__(101);
const delivery_order_repository_1 = __webpack_require__(102);
const company_repository_1 = __webpack_require__(103);
const chart_of_account_repository_1 = __webpack_require__(104);
const journal_entry_repository_1 = __webpack_require__(105);
const journal_line_repository_1 = __webpack_require__(106);
const super_admin_repository_1 = __webpack_require__(107);
const store_repository_1 = __webpack_require__(108);
const payment_gateway_log_repository_1 = __webpack_require__(109);
const cron_job_log_repository_1 = __webpack_require__(110);
const pos_notification_repository_1 = __webpack_require__(111);
const product_image_repository_1 = __webpack_require__(112);
const product_price_repository_1 = __webpack_require__(113);
const reorder_alert_repository_1 = __webpack_require__(114);
const sms_whatsapp_log_repository_1 = __webpack_require__(115);
const terminal_repository_1 = __webpack_require__(116);
exports.ALL_REPOSITORY = [
    super_admin_repository_1.SuperAdminRepository,
    store_repository_1.StoreRepository,
    payment_gateway_log_repository_1.PaymentGatewayLogRepository,
    brand_repository_1.BrandRepository,
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
    supplier_order_repository_1.SupplierOrderRepository,
    supplier_order_repository_1.SupplierOrderItemRepository,
    project_repository_1.ProjectRepository,
    service_repository_1.ServiceRepository,
    quotation_repository_1.QuotationRepository,
    quotation_repository_1.QuotationItemRepository,
    quotation_repository_1.QuotationPaymentTransactionRepository,
    quotation_repository_1.QuotationStatusLogRepository,
    currency_setting_repository_1.CurrencySettingRepository,
    delivery_order_repository_1.DeliveryOrderRepository,
    delivery_order_repository_1.DeliveryOrderItemRepository,
    company_repository_1.CompanyRepository,
    chart_of_account_repository_1.ChartOfAccountRepository,
    journal_entry_repository_1.JournalEntryRepository,
    journal_line_repository_1.JournalLineRepository,
    cron_job_log_repository_1.CronJobLogRepository,
    pos_notification_repository_1.PosNotificationRepository,
    product_image_repository_1.ProductImageRepository,
    product_price_repository_1.ProductPriceRepository,
    reorder_alert_repository_1.ReorderAlertRepository,
    sms_whatsapp_log_repository_1.SmsWhatsappLogRepository,
    terminal_repository_1.TerminalRepository,
];


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.BrandRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const brand_model_1 = __webpack_require__(17);
let BrandRepository = class BrandRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('BRAND_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('BRAND_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.BrandRepository = BrandRepository;
exports.BrandRepository = BrandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(brand_model_1.Brand)),
    __metadata("design:paramtypes", [Object])
], BrandRepository);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const pos_user_model_1 = __webpack_require__(12);
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
    async count(options) {
        return this.posUserModel.count(options);
    }
};
exports.PosUserRepository = PosUserRepository;
exports.PosUserRepository = PosUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_user_model_1.PosUser)),
    __metadata("design:paramtypes", [Object])
], PosUserRepository);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const category_model_1 = __webpack_require__(15);
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


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const unit_model_1 = __webpack_require__(16);
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


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const product_model_1 = __webpack_require__(18);
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


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const batch_model_1 = __webpack_require__(19);
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


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const supplier_model_1 = __webpack_require__(20);
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


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const purchase_model_1 = __webpack_require__(21);
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
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('REPOSITORY_PURCHASE_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.PurchaseRepository = PurchaseRepository;
exports.PurchaseRepository = PurchaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(purchase_model_1.Purchase)),
    __metadata("design:paramtypes", [Object])
], PurchaseRepository);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const purchase_item_model_1 = __webpack_require__(22);
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
    async destroyWhere(where) {
        return this.purchaseItemModel.destroy({ where });
    }
};
exports.PurchaseItemRepository = PurchaseItemRepository;
exports.PurchaseItemRepository = PurchaseItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(purchase_item_model_1.PurchaseItem)),
    __metadata("design:paramtypes", [Object])
], PurchaseItemRepository);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const customer_model_1 = __webpack_require__(28);
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


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const customer_payment_model_1 = __webpack_require__(38);
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


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const udhaar_transaction_model_1 = __webpack_require__(36);
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


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const sale_model_1 = __webpack_require__(29);
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


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const sale_item_model_1 = __webpack_require__(30);
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


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const sale_return_model_1 = __webpack_require__(35);
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


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const stock_adjustment_model_1 = __webpack_require__(39);
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


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const expense_model_1 = __webpack_require__(40);
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


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const audit_log_model_1 = __webpack_require__(41);
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


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const fbr_invoice_log_model_1 = __webpack_require__(42);
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


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const sale_payment_model_1 = __webpack_require__(34);
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


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const discount_rule_model_1 = __webpack_require__(31);
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


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const loyalty_points_log_model_1 = __webpack_require__(37);
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


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const supplier_ledger_transaction_model_1 = __webpack_require__(44);
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


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const supplier_payment_model_1 = __webpack_require__(27);
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


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const purchase_return_model_1 = __webpack_require__(26);
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
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('PURCHASE_RETURN_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.PurchaseReturnRepository = PurchaseReturnRepository;
exports.PurchaseReturnRepository = PurchaseReturnRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(purchase_return_model_1.PurchaseReturn)),
    __metadata("design:paramtypes", [Object])
], PurchaseReturnRepository);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const pos_role_model_1 = __webpack_require__(49);
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


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const pos_permission_model_1 = __webpack_require__(50);
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


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const pos_role_permission_model_1 = __webpack_require__(51);
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


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const pos_user_role_model_1 = __webpack_require__(52);
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


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const product_variant_model_1 = __webpack_require__(23);
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


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SupplierOrderItemRepository = exports.SupplierOrderRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const supplier_order_model_1 = __webpack_require__(55);
const supplier_order_model_2 = __webpack_require__(55);
let SupplierOrderRepository = class SupplierOrderRepository {
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
            throw new common_1.NotFoundException('SUPPLIER_ORDER_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('SUPPLIER_ORDER_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.SupplierOrderRepository = SupplierOrderRepository;
exports.SupplierOrderRepository = SupplierOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(supplier_order_model_1.SupplierOrder)),
    __metadata("design:paramtypes", [Object])
], SupplierOrderRepository);
let SupplierOrderItemRepository = class SupplierOrderItemRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async bulkCreate(data) {
        return this.model.bulkCreate(data);
    }
    async destroyWhere(where) {
        await this.model.destroy({ where });
    }
};
exports.SupplierOrderItemRepository = SupplierOrderItemRepository;
exports.SupplierOrderItemRepository = SupplierOrderItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(supplier_order_model_2.SupplierOrderItem)),
    __metadata("design:paramtypes", [Object])
], SupplierOrderItemRepository);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ProjectRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const project_model_1 = __webpack_require__(33);
let ProjectRepository = class ProjectRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('PROJECT_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('PROJECT_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(project_model_1.Project)),
    __metadata("design:paramtypes", [Object])
], ProjectRepository);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ServiceRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const service_model_1 = __webpack_require__(32);
let ServiceRepository = class ServiceRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('SERVICE_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('SERVICE_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.ServiceRepository = ServiceRepository;
exports.ServiceRepository = ServiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(service_model_1.Service)),
    __metadata("design:paramtypes", [Object])
], ServiceRepository);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.QuotationStatusLogRepository = exports.QuotationPaymentTransactionRepository = exports.QuotationItemRepository = exports.QuotationRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const quotation_model_1 = __webpack_require__(56);
const quotation_model_2 = __webpack_require__(56);
const quotation_model_3 = __webpack_require__(56);
const quotation_model_4 = __webpack_require__(56);
let QuotationRepository = class QuotationRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('QUOTATION_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('QUOTATION_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.QuotationRepository = QuotationRepository;
exports.QuotationRepository = QuotationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(quotation_model_1.Quotation)),
    __metadata("design:paramtypes", [Object])
], QuotationRepository);
let QuotationItemRepository = class QuotationItemRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async bulkCreate(data) {
        return this.model.bulkCreate(data);
    }
    async destroyWhere(where) {
        await this.model.destroy({ where });
    }
};
exports.QuotationItemRepository = QuotationItemRepository;
exports.QuotationItemRepository = QuotationItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(quotation_model_2.QuotationItem)),
    __metadata("design:paramtypes", [Object])
], QuotationItemRepository);
let QuotationPaymentTransactionRepository = class QuotationPaymentTransactionRepository {
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
};
exports.QuotationPaymentTransactionRepository = QuotationPaymentTransactionRepository;
exports.QuotationPaymentTransactionRepository = QuotationPaymentTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(quotation_model_3.QuotationPaymentTransaction)),
    __metadata("design:paramtypes", [Object])
], QuotationPaymentTransactionRepository);
let QuotationStatusLogRepository = class QuotationStatusLogRepository {
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
};
exports.QuotationStatusLogRepository = QuotationStatusLogRepository;
exports.QuotationStatusLogRepository = QuotationStatusLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(quotation_model_4.QuotationStatusLog)),
    __metadata("design:paramtypes", [Object])
], QuotationStatusLogRepository);


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CurrencySettingRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const currency_setting_model_1 = __webpack_require__(58);
let CurrencySettingRepository = class CurrencySettingRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('CURRENCY_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('CURRENCY_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.CurrencySettingRepository = CurrencySettingRepository;
exports.CurrencySettingRepository = CurrencySettingRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(currency_setting_model_1.CurrencySetting)),
    __metadata("design:paramtypes", [Object])
], CurrencySettingRepository);


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeliveryOrderItemRepository = exports.DeliveryOrderRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const delivery_order_model_1 = __webpack_require__(59);
let DeliveryOrderRepository = class DeliveryOrderRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('DELIVERY_ORDER_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('DELIVERY_ORDER_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.DeliveryOrderRepository = DeliveryOrderRepository;
exports.DeliveryOrderRepository = DeliveryOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(delivery_order_model_1.DeliveryOrder)),
    __metadata("design:paramtypes", [Object])
], DeliveryOrderRepository);
let DeliveryOrderItemRepository = class DeliveryOrderItemRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async bulkCreate(data) { return this.model.bulkCreate(data); }
    async destroyWhere(where) { await this.model.destroy({ where }); }
};
exports.DeliveryOrderItemRepository = DeliveryOrderItemRepository;
exports.DeliveryOrderItemRepository = DeliveryOrderItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(delivery_order_model_1.DeliveryOrderItem)),
    __metadata("design:paramtypes", [Object])
], DeliveryOrderItemRepository);


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const company_model_1 = __webpack_require__(57);
let CompanyRepository = class CompanyRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('COMPANY_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('COMPANY_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.CompanyRepository = CompanyRepository;
exports.CompanyRepository = CompanyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(company_model_1.Company)),
    __metadata("design:paramtypes", [Object])
], CompanyRepository);


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ChartOfAccountRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const chart_of_account_model_1 = __webpack_require__(60);
let ChartOfAccountRepository = class ChartOfAccountRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async findAndCountAll(options) { return this.model.findAndCountAll(options); }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('ACCOUNT_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('ACCOUNT_NOT_FOUND');
        await record.destroy();
        return true;
    }
};
exports.ChartOfAccountRepository = ChartOfAccountRepository;
exports.ChartOfAccountRepository = ChartOfAccountRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(chart_of_account_model_1.ChartOfAccount)),
    __metadata("design:paramtypes", [Object])
], ChartOfAccountRepository);


/***/ }),
/* 105 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.JournalEntryRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const journal_entry_model_1 = __webpack_require__(61);
let JournalEntryRepository = class JournalEntryRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) { return this.model.create(data); }
    async findOne(options) { return this.model.findOne(options); }
    async findAll(options) { return this.model.findAll(options); }
    async findAndCountAll(options) { return this.model.findAndCountAll(options); }
    async update(options, data) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('JOURNAL_ENTRY_NOT_FOUND');
        return record.update(data);
    }
};
exports.JournalEntryRepository = JournalEntryRepository;
exports.JournalEntryRepository = JournalEntryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(journal_entry_model_1.JournalEntry)),
    __metadata("design:paramtypes", [Object])
], JournalEntryRepository);


/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.JournalLineRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const journal_line_model_1 = __webpack_require__(62);
let JournalLineRepository = class JournalLineRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async bulkCreate(data) { return this.model.bulkCreate(data); }
    async findAll(options) { return this.model.findAll(options); }
    async destroy(options) { return this.model.destroy(options); }
};
exports.JournalLineRepository = JournalLineRepository;
exports.JournalLineRepository = JournalLineRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(journal_line_model_1.JournalLine)),
    __metadata("design:paramtypes", [Object])
], JournalLineRepository);


/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SuperAdminRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const super_admin_model_1 = __webpack_require__(63);
let SuperAdminRepository = class SuperAdminRepository {
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
            throw new common_1.NotFoundException('SUPER_ADMIN_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('SUPER_ADMIN_NOT_FOUND');
        await record.destroy();
        return true;
    }
    async count(options) {
        return this.model.count(options);
    }
};
exports.SuperAdminRepository = SuperAdminRepository;
exports.SuperAdminRepository = SuperAdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(super_admin_model_1.SuperAdmin)),
    __metadata("design:paramtypes", [Object])
], SuperAdminRepository);


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.StoreRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const store_model_1 = __webpack_require__(14);
let StoreRepository = class StoreRepository {
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
            throw new common_1.NotFoundException('STORE_NOT_FOUND');
        return record.update(data);
    }
    async delete(options) {
        const record = await this.findOne(options);
        if (!record)
            throw new common_1.NotFoundException('STORE_NOT_FOUND');
        await record.destroy();
        return true;
    }
    async count(options) {
        return this.model.count(options);
    }
};
exports.StoreRepository = StoreRepository;
exports.StoreRepository = StoreRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(store_model_1.Store)),
    __metadata("design:paramtypes", [Object])
], StoreRepository);


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PaymentGatewayLogRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const payment_gateway_log_model_1 = __webpack_require__(65);
let PaymentGatewayLogRepository = class PaymentGatewayLogRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async findAndCountAll(options) {
        return this.model.findAndCountAll(options);
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async update(id, data) {
        return this.model.update(data, { where: { id } });
    }
};
exports.PaymentGatewayLogRepository = PaymentGatewayLogRepository;
exports.PaymentGatewayLogRepository = PaymentGatewayLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(payment_gateway_log_model_1.PaymentGatewayLog)),
    __metadata("design:paramtypes", [Object])
], PaymentGatewayLogRepository);


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CronJobLogRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const cron_job_log_model_1 = __webpack_require__(48);
let CronJobLogRepository = class CronJobLogRepository {
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
    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record)
            return null;
        return record.update(data);
    }
};
exports.CronJobLogRepository = CronJobLogRepository;
exports.CronJobLogRepository = CronJobLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cron_job_log_model_1.CronJobLog)),
    __metadata("design:paramtypes", [Object])
], CronJobLogRepository);


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosNotificationRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const pos_notification_model_1 = __webpack_require__(53);
let PosNotificationRepository = class PosNotificationRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findByPk(id) {
        return this.model.findByPk(id);
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
    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record)
            return null;
        return record.update(data);
    }
    async updateWhere(where, data) {
        const [affectedCount] = await this.model.update(data, { where: where });
        return affectedCount;
    }
};
exports.PosNotificationRepository = PosNotificationRepository;
exports.PosNotificationRepository = PosNotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_notification_model_1.PosNotification)),
    __metadata("design:paramtypes", [Object])
], PosNotificationRepository);


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ProductImageRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const product_image_model_1 = __webpack_require__(25);
let ProductImageRepository = class ProductImageRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findByPk(id) {
        return this.model.findByPk(id);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record)
            return null;
        return record.update(data);
    }
    async delete(id) {
        const record = await this.model.findByPk(id);
        if (!record)
            return false;
        await record.destroy();
        return true;
    }
};
exports.ProductImageRepository = ProductImageRepository;
exports.ProductImageRepository = ProductImageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_image_model_1.ProductImage)),
    __metadata("design:paramtypes", [Object])
], ProductImageRepository);


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ProductPriceRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const product_price_model_1 = __webpack_require__(24);
let ProductPriceRepository = class ProductPriceRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findByPk(id) {
        return this.model.findByPk(id);
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
    async delete(id) {
        const record = await this.model.findByPk(id);
        if (!record)
            return false;
        await record.destroy();
        return true;
    }
};
exports.ProductPriceRepository = ProductPriceRepository;
exports.ProductPriceRepository = ProductPriceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_price_model_1.ProductPrice)),
    __metadata("design:paramtypes", [Object])
], ProductPriceRepository);


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ReorderAlertRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const reorder_alert_model_1 = __webpack_require__(54);
let ReorderAlertRepository = class ReorderAlertRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findByPk(id) {
        return this.model.findByPk(id);
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
    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record)
            return null;
        return record.update(data);
    }
};
exports.ReorderAlertRepository = ReorderAlertRepository;
exports.ReorderAlertRepository = ReorderAlertRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(reorder_alert_model_1.ReorderAlert)),
    __metadata("design:paramtypes", [Object])
], ReorderAlertRepository);


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SmsWhatsappLogRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const sms_whatsapp_log_model_1 = __webpack_require__(47);
let SmsWhatsappLogRepository = class SmsWhatsappLogRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findByPk(id) {
        return this.model.findByPk(id);
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
    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record)
            return null;
        return record.update(data);
    }
};
exports.SmsWhatsappLogRepository = SmsWhatsappLogRepository;
exports.SmsWhatsappLogRepository = SmsWhatsappLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sms_whatsapp_log_model_1.SmsWhatsappLog)),
    __metadata("design:paramtypes", [Object])
], SmsWhatsappLogRepository);


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TerminalRepository = void 0;
const common_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(10);
const terminal_model_1 = __webpack_require__(46);
let TerminalRepository = class TerminalRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findByPk(id) {
        return this.model.findByPk(id);
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
    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record)
            return null;
        return record.update(data);
    }
    async upsertByIdentifier(identifier, data) {
        const [record] = await this.model.upsert({ identifier, ...data });
        return record;
    }
};
exports.TerminalRepository = TerminalRepository;
exports.TerminalRepository = TerminalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(terminal_model_1.Terminal)),
    __metadata("design:paramtypes", [Object])
], TerminalRepository);


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(7);
const rxjs_1 = __webpack_require__(118);
let PosService = class PosService {
    client;
    constructor(client) {
        this.client = client;
    }
    handleError() {
        return (0, rxjs_1.catchError)((error) => (0, rxjs_1.throwError)(() => new common_1.HttpException(error.message || 'INTERNAL_SERVER_ERROR', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR)));
    }
    send(pattern, data) {
        return this.client.send(pattern, data).pipe(this.handleError());
    }
};
exports.PosService = PosService;
exports.PosService = PosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('POS_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], PosService);


/***/ }),
/* 118 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosRolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const pos_roles_decorator_1 = __webpack_require__(120);
let PosRolesGuard = class PosRolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(pos_roles_decorator_1.POS_ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length === 0)
            return true;
        const request = context.switchToHttp().getRequest();
        const user = request['posUser'];
        if (!user?.role)
            throw new common_1.ForbiddenException('POS_ROLES_NO_ROLE_IN_TOKEN');
        const hasRole = requiredRoles.includes(user.role);
        if (!hasRole)
            throw new common_1.ForbiddenException(`POS_ROLES_FORBIDDEN: requires ${requiredRoles.join(' or ')}`);
        return true;
    }
};
exports.PosRolesGuard = PosRolesGuard;
exports.PosRolesGuard = PosRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], PosRolesGuard);


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRoles = exports.POS_ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.POS_ROLES_KEY = 'pos_roles';
const PosRoles = (...roles) => (0, common_1.SetMetadata)(exports.POS_ROLES_KEY, roles);
exports.PosRoles = PosRoles;


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosUsersController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosUsersController = class PosUsersController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    login(body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.LOGIN, body);
    }
    refreshToken(body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.REFRESH_TOKEN, body.refreshToken);
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.CREATE, { ...body, storeId: ctx.storeId });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: { page: Number(query.page) || 1, size: Number(query.size) || 20 },
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    changePassword(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER.CHANGE_PASSWORD, {
            id: ctx.userId,
            storeId: ctx.storeId,
            oldPassword: body.oldPassword,
            newPassword: body.newPassword,
        });
    }
};
exports.PosUsersController = PosUsersController;
__decorate([
    (0, common_1.Post)('/v1/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/v1/refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "refreshToken", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Post)('/v1/create'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard),
    (0, common_1.Post)('/v1/change-password'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosUsersController.prototype, "changePassword", null);
exports.PosUsersController = PosUsersController = __decorate([
    (0, common_1.Controller)('pos/users'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosUsersController);


/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(8);
const config_1 = __webpack_require__(5);
let PosAuthGuard = class PosAuthGuard {
    jwtService;
    configService;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader)
            throw new common_1.UnauthorizedException('POS_AUTH_NO_TOKEN');
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token)
            throw new common_1.UnauthorizedException('POS_AUTH_INVALID_TOKEN_FORMAT');
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
            }).catch(() => null);
            if (payload) {
                request['posUser'] = {
                    sub: payload.sub,
                    email: payload.email,
                    role: payload.role,
                    storeId: payload.storeId ?? null,
                };
                return true;
            }
            const superAdminPayload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET') || 'super-secret-key',
            }).catch(() => null);
            if (superAdminPayload && superAdminPayload.type === 'super_admin') {
                const storeId = request.headers['x-store-id'];
                if (!storeId)
                    throw new common_1.UnauthorizedException('POS_AUTH_STORE_ID_REQUIRED');
                request['posUser'] = {
                    sub: superAdminPayload.id,
                    email: superAdminPayload.email,
                    role: 'admin',
                    storeId: Number(storeId),
                    isSuperAdmin: true,
                };
                return true;
            }
            throw new common_1.UnauthorizedException('POS_AUTH_SESSION_EXPIRED');
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException)
                throw err;
            throw new common_1.UnauthorizedException('POS_AUTH_SESSION_EXPIRED');
        }
    }
};
exports.PosAuthGuard = PosAuthGuard;
exports.PosAuthGuard = PosAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], PosAuthGuard);


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreContext = void 0;
const common_1 = __webpack_require__(3);
exports.StoreContext = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const posUser = request['posUser'];
    return {
        userId: posUser?.sub,
        storeId: posUser?.storeId,
        role: posUser?.role,
        email: posUser?.email,
    };
});


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.POS_PATTERNS = void 0;
exports.POS_PATTERNS = {
    BRAND: {
        CREATE: { cmd: 'brand_create' },
        GET_ALL: { cmd: 'brand_get_all' },
        UPDATE: { cmd: 'brand_update' },
        DELETE: { cmd: 'brand_delete' },
    },
    POS_USER: {
        CREATE: { cmd: 'pos_user_create' },
        LOGIN: { cmd: 'pos_user_login' },
        REFRESH_TOKEN: { cmd: 'pos_user_refresh_token' },
        GET_ONE: { cmd: 'pos_user_get_one' },
        GET_ALL: { cmd: 'pos_user_get_all' },
        UPDATE: { cmd: 'pos_user_update' },
        DELETE: { cmd: 'pos_user_delete' },
        CHANGE_PASSWORD: { cmd: 'pos_user_change_password' },
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
        BULK_DELETE: { cmd: 'product_bulk_delete' },
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
        GET_ONE: { cmd: 'product_variant_get_one' },
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
        DELETE: { cmd: 'purchase_delete' },
    },
    CUSTOMER: {
        CREATE: { cmd: 'customer_create' },
        GET_ONE: { cmd: 'customer_get_one' },
        GET_ALL: { cmd: 'customer_get_all' },
        UPDATE: { cmd: 'customer_update' },
        DELETE: { cmd: 'customer_delete' },
        GET_UDHAAR: { cmd: 'customer_get_udhaar' },
        RECORD_PAYMENT: { cmd: 'customer_record_payment' },
        ADD_ADVANCE: { cmd: 'customer_add_advance' },
    },
    SALE: {
        CREATE: { cmd: 'sale_create' },
        GET_ONE: { cmd: 'sale_get_one' },
        GET_ALL: { cmd: 'sale_get_all' },
        HOLD: { cmd: 'sale_hold' },
        GET_HELD: { cmd: 'sale_get_held' },
        RESUME: { cmd: 'sale_resume_held' },
        DELETE_HELD: { cmd: 'sale_delete_held' },
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
        SERVICE_WISE_SALES: { cmd: 'report_service_wise_sales' },
        PROJECT_WISE_SALES: { cmd: 'report_project_wise_sales' },
        CUSTOMER_LEDGER: { cmd: 'report_customer_ledger' },
        SUPPLIER_LEDGER: { cmd: 'report_supplier_ledger' },
        EXPORT_SALES_EXCEL: { cmd: 'report_export_sales_excel' },
        EXPORT_EXPENSES_EXCEL: { cmd: 'report_export_expenses_excel' },
        EXPORT_PROFIT_EXCEL: { cmd: 'report_export_profit_excel' },
        EXPORT_SALES_PDF: { cmd: 'report_export_sales_pdf' },
        EXPORT_PROFIT_PDF: { cmd: 'report_export_profit_pdf' },
    },
    DISCOUNT_RULE: {
        CREATE: { cmd: 'discount_rule_create' },
        GET_ALL: { cmd: 'discount_rule_get_all' },
        UPDATE: { cmd: 'discount_rule_update' },
        DELETE: { cmd: 'discount_rule_delete' },
        RESOLVE_BUNDLE: { cmd: 'discount_rule_resolve_bundle' },
    },
    SETTINGS: {
        GET_STORE: { cmd: 'settings_get_store' },
        GET_FEATURES: { cmd: 'settings_get_features' },
        UPDATE_STORE: { cmd: 'settings_update_store' },
        TAX_GET_ALL: { cmd: 'tax_setting_get_all' },
        TAX_UPSERT: { cmd: 'tax_setting_upsert' },
        TAX_DELETE: { cmd: 'tax_setting_delete' },
        TAX_RESOLVE: { cmd: 'tax_setting_resolve' },
        TAX_BATCH_RESOLVE: { cmd: 'tax_setting_batch_resolve' },
        CURRENCY_GET_ALL: { cmd: 'currency_get_all' },
        CURRENCY_CREATE: { cmd: 'currency_create' },
        CURRENCY_UPDATE: { cmd: 'currency_update' },
        CURRENCY_DELETE: { cmd: 'currency_delete' },
        CURRENCY_SET_DEFAULT: { cmd: 'currency_set_default' },
    },
    NOTIFICATION: {
        GET_ALL: { cmd: 'notification_get_all' },
        MARK_READ: { cmd: 'notification_mark_read' },
        MARK_ALL_READ: { cmd: 'notification_mark_all_read' },
    },
    LOYALTY: {
        GET_LOG: { cmd: 'loyalty_get_log' },
        ADJUST: { cmd: 'loyalty_adjust' },
    },
    SUPPLIER_PAYMENT: {
        CREATE: { cmd: 'supplier_payment_create' },
        GET_BY_SUPPLIER: { cmd: 'supplier_payment_get_by_supplier' },
        GET_ALL: { cmd: 'supplier_payment_get_all' },
    },
    PURCHASE_RETURN: {
        CREATE: { cmd: 'purchase_return_create' },
        GET_ALL: { cmd: 'purchase_return_get_all' },
        UPDATE_STATUS: { cmd: 'purchase_return_update_status' },
        DELETE: { cmd: 'purchase_return_delete' },
    },
    POS_ROLE: {
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
    INVENTORY_FORECAST: {
        RUN: { cmd: 'inventory_run_forecast' },
        GET_REORDER_ALERTS: { cmd: 'inventory_get_reorder_alerts' },
        ACKNOWLEDGE_ALERT: { cmd: 'inventory_acknowledge_alert' },
        PRODUCT_FORECAST: { cmd: 'inventory_product_forecast' },
        FIFO_VALUATION: { cmd: 'inventory_fifo_valuation' },
    },
    SUPPLIER_ORDER: {
        CREATE: { cmd: 'supplier_order_create' },
        GET_ALL: { cmd: 'supplier_order_get_all' },
        GET_ONE: { cmd: 'supplier_order_get_one' },
        UPDATE_STATUS: { cmd: 'supplier_order_update_status' },
        UPDATE: { cmd: 'supplier_order_update' },
        DELETE: { cmd: 'supplier_order_delete' },
        CONVERT_TO_PURCHASE: { cmd: 'supplier_order_convert_to_purchase' },
    },
    PROJECT: {
        CREATE: { cmd: 'project_create' },
        GET_ONE: { cmd: 'project_get_one' },
        GET_ALL: { cmd: 'project_get_all' },
        UPDATE: { cmd: 'project_update' },
        DELETE: { cmd: 'project_delete' },
    },
    SERVICE: {
        CREATE: { cmd: 'service_create' },
        GET_ONE: { cmd: 'service_get_one' },
        GET_ALL: { cmd: 'service_get_all' },
        UPDATE: { cmd: 'service_update' },
        DELETE: { cmd: 'service_delete' },
    },
    QUOTATION: {
        CREATE: { cmd: 'quotation_create' },
        GET_ONE: { cmd: 'quotation_get_one' },
        GET_ALL: { cmd: 'quotation_get_all' },
        UPDATE: { cmd: 'quotation_update' },
        DELETE: { cmd: 'quotation_delete' },
        UPDATE_STATUS: { cmd: 'quotation_update_status' },
        CONVERT: { cmd: 'quotation_convert' },
        GET_INVOICE: { cmd: 'quotation_get_invoice' },
        RECORD_PAYMENT: { cmd: 'quotation_record_payment' },
        RETURN_PAYMENT: { cmd: 'quotation_return_payment' },
    },
    DELIVERY_ORDER: {
        CREATE: { cmd: 'delivery_order_create' },
        GET_ALL: { cmd: 'delivery_order_get_all' },
        GET_ONE: { cmd: 'delivery_order_get_one' },
        UPDATE: { cmd: 'delivery_order_update' },
        GENERATE_INVOICE: { cmd: 'delivery_order_generate_invoice' },
        DELETE: { cmd: 'delivery_order_delete' },
    },
    FBR: {
        SYNC: { cmd: 'fbr_sync' },
        GET_PENDING: { cmd: 'fbr_get_pending' },
        RETRY: { cmd: 'fbr_retry' },
        GET_QR: { cmd: 'fbr_get_qr' },
        TEST_CONNECTION: { cmd: 'fbr_test_connection' },
    },
    COMPANY: {
        CREATE: { cmd: 'company_create' },
        GET_ONE: { cmd: 'company_get_one' },
        GET_ALL: { cmd: 'company_get_all' },
        UPDATE: { cmd: 'company_update' },
        DELETE: { cmd: 'company_delete' },
    },
    CURRENCY: {
        GET_ALL: { cmd: 'currency_get_all' },
        CREATE: { cmd: 'currency_create' },
        UPDATE: { cmd: 'currency_update' },
        DELETE: { cmd: 'currency_delete' },
        SET_DEFAULT: { cmd: 'currency_set_default' },
    },
    LEDGER: {
        CHART_GET_ALL: { cmd: 'ledger_chart_get_all' },
        CHART_CREATE: { cmd: 'ledger_chart_create' },
        CHART_UPDATE: { cmd: 'ledger_chart_update' },
        CHART_DELETE: { cmd: 'ledger_chart_delete' },
        JOURNAL_GET_ALL: { cmd: 'ledger_journal_get_all' },
        JOURNAL_GET_ONE: { cmd: 'ledger_journal_get_one' },
        JOURNAL_CREATE: { cmd: 'ledger_journal_create' },
        JOURNAL_SYNC: { cmd: 'ledger_journal_sync' },
        TRIAL_BALANCE: { cmd: 'ledger_trial_balance' },
        ACCOUNT_SUMMARY: { cmd: 'ledger_account_summary' },
    },
    OFFLINE_SYNC: {
        ENQUEUE: { cmd: 'offline_sync_enqueue' },
        GET_PENDING: { cmd: 'offline_sync_get_pending' },
        MARK_SYNCED: { cmd: 'offline_sync_mark_synced' },
        MARK_FAILED: { cmd: 'offline_sync_mark_failed' },
        GET_STATS: { cmd: 'offline_sync_get_stats' },
        CLEANUP: { cmd: 'offline_sync_cleanup' },
    },
    PAYMENT_GATEWAY: {
        GET_LOGS: { cmd: 'payment_gateway_get_logs' },
        GET_STATS: { cmd: 'payment_gateway_get_stats' },
        INITIATE: { cmd: 'payment_gateway_initiate' },
        CHECK_STATUS: { cmd: 'payment_gateway_check_status' },
    },
};


/***/ }),
/* 125 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosCategoriesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosCategoriesController = class PosCategoriesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CATEGORY.CREATE, { ...body, storeId: ctx.storeId });
    }
    getTree(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CATEGORY.GET_TREE, { storeId: ctx.storeId });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CATEGORY.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CATEGORY.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: { page: Number(query.page) || 1, size: Number(query.size) || 50 },
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CATEGORY.UPDATE, { id: Number(id), payload: { ...body, storeId: ctx.storeId } });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CATEGORY.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosCategoriesController = PosCategoriesController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/tree'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosCategoriesController.prototype, "getTree", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosCategoriesController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCategoriesController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosCategoriesController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosCategoriesController.prototype, "delete", null);
exports.PosCategoriesController = PosCategoriesController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/categories'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosCategoriesController);


/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosUnitsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosUnitsController = class PosUnitsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.UNIT.CREATE, { ...body, storeId: ctx.storeId });
    }
    getAll(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.UNIT.GET_ALL, { storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.UNIT.UPDATE, { id: Number(id), payload: { ...body, storeId: ctx.storeId } });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.UNIT.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosUnitsController = PosUnitsController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosUnitsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosUnitsController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosUnitsController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosUnitsController.prototype, "delete", null);
exports.PosUnitsController = PosUnitsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/units'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosUnitsController);


/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProductsController = void 0;
const common_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(128);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
const create_product_dto_1 = __webpack_require__(129);
let PosProductsController = class PosProductsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.CREATE, { ...body, storeId: ctx.storeId });
    }
    search(ctx, q) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.SEARCH, { q, storeId: ctx.storeId });
    }
    getLowStock(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_LOW_STOCK, { storeId: ctx.storeId });
    }
    getExpiring(ctx, days) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_EXPIRING, { days: Number(days) || 30, storeId: ctx.storeId });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    getBatches(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.BATCH.GET_BY_PRODUCT, { productId: Number(id), storeId: ctx.storeId });
    }
    updateBatch(ctx, batchId, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.BATCH.UPDATE, {
            id: Number(batchId),
            storeId: ctx.storeId,
            payload: body,
        });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: { search: query.search, categoryId: query.categoryId ? Number(query.categoryId) : undefined },
            },
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    bulkDelete(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.BULK_DELETE, { ids: body.ids, storeId: ctx.storeId });
    }
    getPriceHistory(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_PRICE_HISTORY, { productId: Number(id), storeId: ctx.storeId });
    }
    deletePriceHistory(priceId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.DELETE_PRICE_HISTORY, Number(priceId));
    }
    bulkImport(ctx, body, file) {
        if (file) {
            const fileType = file.originalname.endsWith('.csv') ? 'csv' : 'xlsx';
            return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.BULK_IMPORT, {
                fileBuffer: file.buffer,
                fileType,
                importedBy: ctx.userId,
                storeId: ctx.storeId,
            });
        }
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.BULK_IMPORT, { rows: body.rows, importedBy: ctx.userId, storeId: ctx.storeId });
    }
    addImage(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.ADD_IMAGE, { productId: Number(id), url: body.url, isPrimary: body.isPrimary, storeId: ctx.storeId });
    }
    getImages(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_IMAGES, { productId: Number(id), storeId: ctx.storeId });
    }
    deleteImage(ctx, imageId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT.DELETE_IMAGE, { imageId: Number(imageId), storeId: ctx.storeId });
    }
};
exports.PosProductsController = PosProductsController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/search'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/v1/low-stock'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "getLowStock", null);
__decorate([
    (0, common_1.Get)('/v1/expiring'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "getExpiring", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/v1/:id/batches'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "getBatches", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/batches/:batchId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('batchId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "updateBatch", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "delete", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Post)('/v1/bulk-delete'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "bulkDelete", null);
__decorate([
    (0, common_1.Get)('/v1/:id/price-history'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "getPriceHistory", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/price-history/:priceId'),
    __param(0, (0, common_1.Param)('priceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "deletePriceHistory", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/bulk-import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "bulkImport", null);
__decorate([
    (0, common_1.Post)('/v1/:id/images'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "addImage", null);
__decorate([
    (0, common_1.Get)('/v1/:id/images'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "getImages", null);
__decorate([
    (0, common_1.Delete)('/v1/images/:imageId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductsController.prototype, "deleteImage", null);
exports.PosProductsController = PosProductsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/products'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosProductsController);


/***/ }),
/* 128 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(130);
class CreateProductDto {
    name;
    barcode;
    categoryId;
    unitId;
    brandId;
    salePrice;
    purchasePrice;
    lowStockThreshold;
    openingStock;
    expiryDate;
    batchNumber;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "barcode", void 0);
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
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "brandId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "salePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
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
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "openingStock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "expiryDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "batchNumber", void 0);


/***/ }),
/* 130 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 131 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosSuppliersController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosSuppliersController = class PosSuppliersController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER.CREATE, { ...body, storeId: ctx.storeId });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: { search: query.search },
            },
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    getLedger(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.SUPPLIER_LEDGER, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosSuppliersController = PosSuppliersController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSuppliersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSuppliersController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSuppliersController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosSuppliersController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSuppliersController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/v1/:id/ledger'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSuppliersController.prototype, "getLedger", null);
exports.PosSuppliersController = PosSuppliersController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/suppliers'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosSuppliersController);


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosPurchasesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosPurchasesController = class PosPurchasesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: { supplierId: query.supplierId ? Number(query.supplierId) : undefined, status: query.status },
            },
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE.UPDATE, {
            id: Number(id),
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: body,
        });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosPurchasesController = PosPurchasesController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPurchasesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosPurchasesController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPurchasesController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosPurchasesController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosPurchasesController.prototype, "delete", null);
exports.PosPurchasesController = PosPurchasesController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/purchases'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosPurchasesController);


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosCustomersController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosCustomersController = class PosCustomersController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.CREATE, { ...body, storeId: ctx.storeId });
    }
    getUdhaar(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.GET_UDHAAR, { id: Number(id), storeId: ctx.storeId });
    }
    recordPayment(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.RECORD_PAYMENT, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    addAdvance(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.ADD_ADVANCE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: { search: query.search, hasUdhaar: query.hasUdhaar === 'true' },
            },
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.CUSTOMER.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosCustomersController = PosCustomersController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/:id/udhaar'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "getUdhaar", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/payment'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "recordPayment", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/advance'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "addAdvance", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosCustomersController.prototype, "delete", null);
exports.PosCustomersController = PosCustomersController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/customers'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosCustomersController);


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosSalesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosSalesController = class PosSalesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    holdSale(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.HOLD, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    resumeHeldSale(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.RESUME, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getHeld(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.GET_HELD, { storeId: ctx.storeId });
    }
    deleteHeld(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.DELETE_HELD, { id: Number(id), storeId: ctx.storeId });
    }
    getReceipt(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.GET_RECEIPT, { id: Number(id), storeId: ctx.storeId });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: {
                    customerId: query.customerId ? Number(query.customerId) : undefined,
                    paymentType: query.paymentType,
                    isHeld: query.isHeld === 'true',
                    fromDate: query.fromDate || undefined,
                    toDate: query.toDate || undefined,
                },
            },
        });
    }
};
exports.PosSalesController = PosSalesController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/v1/hold'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "holdSale", null);
__decorate([
    (0, common_1.Post)('/v1/resume'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "resumeHeldSale", null);
__decorate([
    (0, common_1.Get)('/v1/held'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "getHeld", null);
__decorate([
    (0, common_1.Delete)('/v1/held/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "deleteHeld", null);
__decorate([
    (0, common_1.Get)('/v1/:id/receipt'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "getReceipt", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSalesController.prototype, "getAll", null);
exports.PosSalesController = PosSalesController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard),
    (0, common_1.Controller)('pos/sales'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosSalesController);


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosSaleReturnsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosSaleReturnsController = class PosSaleReturnsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE_RETURN.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getBySale(ctx, saleId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE_RETURN.GET_BY_SALE, { saleId: Number(saleId), storeId: ctx.storeId });
    }
    getReceipt(id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE_RETURN.GET_RECEIPT, Number(id));
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SALE_RETURN.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: { page: Number(query.page) || 1, size: Number(query.size) || 20 },
        });
    }
};
exports.PosSaleReturnsController = PosSaleReturnsController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSaleReturnsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/sale/:saleId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('saleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSaleReturnsController.prototype, "getBySale", null);
__decorate([
    (0, common_1.Get)('/v1/:id/receipt'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PosSaleReturnsController.prototype, "getReceipt", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSaleReturnsController.prototype, "getAll", null);
exports.PosSaleReturnsController = PosSaleReturnsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/sale-returns'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosSaleReturnsController);


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosStockController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosStockController = class PosStockController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    adjust(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.STOCK.ADJUST, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getAdjustments(ctx, productId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.STOCK.GET_ADJUSTMENTS, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: { productId: productId ? Number(productId) : undefined },
        });
    }
};
exports.PosStockController = PosStockController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/adjust'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosStockController.prototype, "adjust", null);
__decorate([
    (0, common_1.Get)('/v1/adjustments'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosStockController.prototype, "getAdjustments", null);
exports.PosStockController = PosStockController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/stock'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosStockController);


/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosExpensesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosExpensesController = class PosExpensesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.EXPENSE.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.EXPENSE.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: { category: query.category, fromDate: query.fromDate, toDate: query.toDate },
            },
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.EXPENSE.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.EXPENSE.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosExpensesController = PosExpensesController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosExpensesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosExpensesController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosExpensesController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosExpensesController.prototype, "delete", null);
exports.PosExpensesController = PosExpensesController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/expenses'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosExpensesController);


/***/ }),
/* 138 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosReportsController = void 0;
const common_1 = __webpack_require__(3);
const rxjs_1 = __webpack_require__(118);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosReportsController = class PosReportsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    getDailySummary(ctx, date) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.DAILY_SUMMARY, {
            storeId: ctx.storeId,
            date: date || new Date().toISOString().split('T')[0],
        });
    }
    getSalesByDate(ctx, fromDate, toDate) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.SALES_BY_DATE, { storeId: ctx.storeId, fromDate, toDate });
    }
    getProfit(ctx, fromDate, toDate) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.PROFIT, { storeId: ctx.storeId, fromDate, toDate });
    }
    getCustomerLedger(ctx, customerId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.CUSTOMER_LEDGER, { customerId: Number(customerId), storeId: ctx.storeId });
    }
    getSupplierLedger(ctx, supplierId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.SUPPLIER_LEDGER, { supplierId: Number(supplierId), storeId: ctx.storeId });
    }
    async exportSales(ctx, fromDate, toDate, res) {
        const result = await (0, rxjs_1.firstValueFrom)(this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_SALES_EXCEL, { storeId: ctx.storeId, fromDate, toDate }));
        const buffer = Buffer.from(result.data, 'base64');
        res.set({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename="${result.filename}"` });
        res.send(buffer);
    }
    async exportExpenses(ctx, fromDate, toDate, res) {
        const result = await (0, rxjs_1.firstValueFrom)(this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_EXPENSES_EXCEL, { storeId: ctx.storeId, fromDate, toDate }));
        const buffer = Buffer.from(result.data, 'base64');
        res.set({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename="${result.filename}"` });
        res.send(buffer);
    }
    async exportProfit(ctx, fromDate, toDate, res) {
        const result = await (0, rxjs_1.firstValueFrom)(this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_PROFIT_EXCEL, { storeId: ctx.storeId, fromDate, toDate }));
        const buffer = Buffer.from(result.data, 'base64');
        res.set({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename="${result.filename}"` });
        res.send(buffer);
    }
    async exportSalesPdf(ctx, fromDate, toDate, res) {
        const result = await (0, rxjs_1.firstValueFrom)(this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_SALES_PDF, { storeId: ctx.storeId, fromDate, toDate }));
        const buffer = Buffer.from(result.data, 'base64');
        res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${result.filename}"` });
        res.send(buffer);
    }
    async exportProfitPdf(ctx, fromDate, toDate, res) {
        const result = await (0, rxjs_1.firstValueFrom)(this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_PROFIT_PDF, { storeId: ctx.storeId, fromDate, toDate }));
        const buffer = Buffer.from(result.data, 'base64');
        res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${result.filename}"` });
        res.send(buffer);
    }
    getStockStatus(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.STOCK_STATUS, { storeId: ctx.storeId });
    }
    getProductWiseSales(ctx, fromDate, toDate) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.PRODUCT_WISE_SALES, { storeId: ctx.storeId, fromDate, toDate });
    }
    getServiceWiseSales(ctx, fromDate, toDate) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.SERVICE_WISE_SALES, { storeId: ctx.storeId, fromDate, toDate });
    }
    getProjectWiseSales(ctx, fromDate, toDate) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.PROJECT_WISE_SALES, { storeId: ctx.storeId, fromDate, toDate });
    }
    getExpiryReport(ctx, days) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.REPORT.EXPIRY_REPORT, { storeId: ctx.storeId, days: Number(days) || 30 });
    }
};
exports.PosReportsController = PosReportsController;
__decorate([
    (0, common_1.Get)('/v1/daily'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getDailySummary", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/sales'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getSalesByDate", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/profit'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getProfit", null);
__decorate([
    (0, common_1.Get)('/v1/customer-ledger/:customerId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getCustomerLedger", null);
__decorate([
    (0, common_1.Get)('/v1/supplier-ledger/:supplierId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('supplierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getSupplierLedger", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/export/sales'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], PosReportsController.prototype, "exportSales", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Get)('/v1/export/expenses'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], PosReportsController.prototype, "exportExpenses", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/export/profit'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], PosReportsController.prototype, "exportProfit", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/export/sales/pdf'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], PosReportsController.prototype, "exportSalesPdf", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/export/profit/pdf'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], PosReportsController.prototype, "exportProfitPdf", null);
__decorate([
    (0, common_1.Get)('/v1/stock-status'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getStockStatus", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/product-wise-sales'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getProductWiseSales", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/service-wise-sales'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getServiceWiseSales", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/project-wise-sales'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getProjectWiseSales", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/expiry'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PosReportsController.prototype, "getExpiryReport", null);
exports.PosReportsController = PosReportsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/reports'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosReportsController);


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosDiscountRulesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosDiscountRulesController = class PosDiscountRulesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.GET_ALL, {
            storeId: ctx.storeId,
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
            isActive: query.isActive !== undefined ? query.isActive === 'true' : undefined,
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    resolveBundle(ctx, cartItems) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.RESOLVE_BUNDLE, { storeId: ctx.storeId, cartItems });
    }
};
exports.PosDiscountRulesController = PosDiscountRulesController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosDiscountRulesController.prototype, "create", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosDiscountRulesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosDiscountRulesController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosDiscountRulesController.prototype, "delete", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Post)('/v1/resolve-bundle'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PosDiscountRulesController.prototype, "resolveBundle", null);
exports.PosDiscountRulesController = PosDiscountRulesController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/discount-rules'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosDiscountRulesController);


/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSettingsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosSettingsController = class PosSettingsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    getStore(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.GET_STORE, { storeId: ctx.storeId });
    }
    getFeatures(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.GET_FEATURES, { storeId: ctx.storeId });
    }
    updateStore(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.UPDATE_STORE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    updateFeatures(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.UPDATE_STORE, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            isSuperAdmin: true,
            data: body,
        });
    }
    getTaxSettings(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_GET_ALL, { storeId: ctx.storeId });
    }
    upsertTaxSetting(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_UPSERT, { ...body, storeId: ctx.storeId, updatedBy: ctx.userId });
    }
    deleteTaxSetting(id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_DELETE, Number(id));
    }
    resolveTaxRate(ctx, productId, categoryId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_RESOLVE, {
            storeId: ctx.storeId,
            productId: Number(productId),
            categoryId: categoryId ? Number(categoryId) : undefined,
        });
    }
    batchResolveTaxRates(ctx, items) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_BATCH_RESOLVE, { storeId: ctx.storeId, items });
    }
    getCurrencies(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_GET_ALL, { storeId: ctx.storeId });
    }
    createCurrency(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_CREATE, { ...body, storeId: ctx.storeId });
    }
    updateCurrency(id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_UPDATE, { id: Number(id), payload: body });
    }
    setCurrencyDefault(id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_SET_DEFAULT, Number(id));
    }
    deleteCurrency(id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_DELETE, Number(id));
    }
};
exports.PosSettingsController = PosSettingsController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Get)('/v1/store'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "getStore", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Get)('/v1/features'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "getFeatures", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Patch)('/v1/store'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "updateStore", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Patch)('/v1/features'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "updateFeatures", null);
__decorate([
    (0, common_1.Get)('/v1/tax'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "getTaxSettings", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Post)('/v1/tax'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "upsertTaxSetting", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/tax/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "deleteTaxSetting", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Get)('/v1/tax/resolve'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('productId')),
    __param(2, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "resolveTaxRate", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Post)('/v1/tax/batch-resolve'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "batchResolveTaxRates", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager', 'cashier'),
    (0, common_1.Get)('/v1/currencies'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "getCurrencies", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Post)('/v1/currencies'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "createCurrency", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Patch)('/v1/currencies/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "updateCurrency", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Patch)('/v1/currencies/:id/default'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "setCurrencyDefault", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/currencies/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PosSettingsController.prototype, "deleteCurrency", null);
exports.PosSettingsController = PosSettingsController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/settings'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosSettingsController);


/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosNotificationsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosNotificationsController = class PosNotificationsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.NOTIFICATION.GET_ALL, {
            userId: ctx.userId,
            storeId: ctx.storeId,
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
            isRead: query.isRead !== undefined ? query.isRead === 'true' : undefined,
        });
    }
    markRead(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.NOTIFICATION.MARK_READ, { id: Number(id), userId: ctx.userId, storeId: ctx.storeId });
    }
    markAllRead(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.NOTIFICATION.MARK_ALL_READ, { userId: ctx.userId, storeId: ctx.storeId });
    }
};
exports.PosNotificationsController = PosNotificationsController;
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosNotificationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('/v1/:id/read'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosNotificationsController.prototype, "markRead", null);
__decorate([
    (0, common_1.Patch)('/v1/read-all'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosNotificationsController.prototype, "markAllRead", null);
exports.PosNotificationsController = PosNotificationsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard),
    (0, common_1.Controller)('pos/notifications'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosNotificationsController);


/***/ }),
/* 142 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosSupplierPaymentsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosSupplierPaymentsController = class PosSupplierPaymentsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_PAYMENT.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getBySupplier(ctx, supplierId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_PAYMENT.GET_BY_SUPPLIER, {
            supplierId: Number(supplierId),
            storeId: ctx.storeId,
        });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_PAYMENT.GET_ALL, {
            storeId: ctx.storeId,
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
        });
    }
};
exports.PosSupplierPaymentsController = PosSupplierPaymentsController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSupplierPaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/supplier/:supplierId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('supplierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSupplierPaymentsController.prototype, "getBySupplier", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSupplierPaymentsController.prototype, "getAll", null);
exports.PosSupplierPaymentsController = PosSupplierPaymentsController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/supplier-payments'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosSupplierPaymentsController);


/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosPurchaseReturnsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosPurchaseReturnsController = class PosPurchaseReturnsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE_RETURN.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE_RETURN.GET_ALL, {
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: {
                    supplierId: query.supplierId ? Number(query.supplierId) : undefined,
                    status: query.status,
                },
            },
        });
    }
    updateStatus(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE_RETURN.UPDATE_STATUS, {
            id: Number(id),
            status: body.status,
            processedBy: ctx.userId,
            storeId: ctx.storeId,
        });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PURCHASE_RETURN.DELETE, {
            id: Number(id),
            storeId: ctx.storeId,
        });
    }
};
exports.PosPurchaseReturnsController = PosPurchaseReturnsController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPurchaseReturnsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPurchaseReturnsController.prototype, "getAll", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id/status'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosPurchaseReturnsController.prototype, "updateStatus", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosPurchaseReturnsController.prototype, "delete", null);
exports.PosPurchaseReturnsController = PosPurchaseReturnsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/purchase-returns'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosPurchaseReturnsController);


/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosRolesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosRolesController = class PosRolesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_ROLE.CREATE, {
            data: body,
            storeId: ctx.storeId,
            userId: ctx.userId,
        });
    }
    getAll(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_ROLE.GET_ALL, {
            storeId: ctx.storeId,
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_ROLE.UPDATE, {
            id: Number(id),
            payload: { ...body, storeId: ctx.storeId },
        });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_ROLE.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    assignPermission(ctx, roleId, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_ROLE_PERMISSION.ASSIGN, {
            roleId: Number(roleId),
            permissionId: body.permissionId,
            storeId: ctx.storeId,
        });
    }
    revokePermission(ctx, roleId, permissionId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_ROLE_PERMISSION.REVOKE, {
            roleId: Number(roleId),
            permissionId: Number(permissionId),
            storeId: ctx.storeId,
        });
    }
    getPermissions(ctx, roleId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_ROLE_PERMISSION.GET_BY_ROLE, {
            roleId: Number(roleId),
            storeId: ctx.storeId,
        });
    }
};
exports.PosRolesController = PosRolesController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosRolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosRolesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosRolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosRolesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/v1/:roleId/permissions'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('roleId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosRolesController.prototype, "assignPermission", null);
__decorate([
    (0, common_1.Delete)('/v1/:roleId/permissions/:permissionId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('roleId')),
    __param(2, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], PosRolesController.prototype, "revokePermission", null);
__decorate([
    (0, common_1.Get)('/v1/:roleId/permissions'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosRolesController.prototype, "getPermissions", null);
exports.PosRolesController = PosRolesController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/roles'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosRolesController);


/***/ }),
/* 145 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosPermissionsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosPermissionsController = class PosPermissionsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_PERMISSION.CREATE, {
            ...body,
            storeId: ctx.storeId,
            userId: ctx.userId,
        });
    }
    getAll(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_PERMISSION.GET_ALL, {
            storeId: ctx.storeId,
        });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_PERMISSION.DELETE, {
            id: Number(id),
            storeId: ctx.storeId,
        });
    }
};
exports.PosPermissionsController = PosPermissionsController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosPermissionsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosPermissionsController.prototype, "delete", null);
exports.PosPermissionsController = PosPermissionsController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/permissions'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosPermissionsController);


/***/ }),
/* 146 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosUserRolesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosUserRolesController = class PosUserRolesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    assign(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER_ROLE.ASSIGN, {
            userId: body.userId,
            roleId: body.roleId,
            storeId: ctx.storeId,
        });
    }
    revoke(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER_ROLE.REVOKE, {
            userId: body.userId,
            roleId: body.roleId,
            storeId: ctx.storeId,
        });
    }
    getByUser(ctx, userId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.POS_USER_ROLE.GET_BY_USER, {
            userId: Number(userId),
            storeId: ctx.storeId,
        });
    }
};
exports.PosUserRolesController = PosUserRolesController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosUserRolesController.prototype, "assign", null);
__decorate([
    (0, common_1.Delete)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosUserRolesController.prototype, "revoke", null);
__decorate([
    (0, common_1.Get)('/v1/user/:userId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosUserRolesController.prototype, "getByUser", null);
exports.PosUserRolesController = PosUserRolesController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/user-roles'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosUserRolesController);


/***/ }),
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosAuditLogsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosAuditLogsController = class PosAuditLogsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.AUDIT_LOG.GET_ALL, {
            storeId: ctx.storeId,
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
            module: query.module,
            action: query.action,
            fromDate: query.fromDate,
            toDate: query.toDate,
        });
    }
    getByUser(ctx, userId, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.AUDIT_LOG.GET_BY_USER, {
            storeId: ctx.storeId,
            userId: Number(userId),
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
        });
    }
};
exports.PosAuditLogsController = PosAuditLogsController;
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosAuditLogsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/v1/user/:userId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosAuditLogsController.prototype, "getByUser", null);
exports.PosAuditLogsController = PosAuditLogsController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/audit-logs'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosAuditLogsController);


/***/ }),
/* 148 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosLoyaltyController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosLoyaltyController = class PosLoyaltyController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    getLog(ctx, customerId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LOYALTY.GET_LOG, { customerId: Number(customerId), storeId: ctx.storeId });
    }
    adjust(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LOYALTY.ADJUST, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
};
exports.PosLoyaltyController = PosLoyaltyController;
__decorate([
    (0, common_1.Get)('/v1/customer/:customerId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosLoyaltyController.prototype, "getLog", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/adjust'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosLoyaltyController.prototype, "adjust", null);
exports.PosLoyaltyController = PosLoyaltyController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/loyalty'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosLoyaltyController);


/***/ }),
/* 149 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosBrandsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosBrandsController = class PosBrandsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.BRAND.CREATE, { ...body, storeId: ctx.storeId });
    }
    getAll(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.BRAND.GET_ALL, { storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.BRAND.UPDATE, { id: Number(id), storeId: ctx.storeId, ...body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.BRAND.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosBrandsController = PosBrandsController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosBrandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosBrandsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosBrandsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosBrandsController.prototype, "delete", null);
exports.PosBrandsController = PosBrandsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard),
    (0, common_1.Controller)('pos/brands'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosBrandsController);


/***/ }),
/* 150 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosProductVariantsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosProductVariantsController = class PosProductVariantsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.CREATE, {
            ...body,
            storeId: ctx.storeId,
            userId: ctx.userId,
        });
    }
    getByProduct(ctx, productId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.GET_BY_PRODUCT, {
            productId: Number(productId),
            storeId: ctx.storeId,
        });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.UPDATE, {
            id: Number(id),
            payload: { ...body, storeId: ctx.storeId },
        });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosProductVariantsController = PosProductVariantsController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosProductVariantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1/product/:productId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductVariantsController.prototype, "getByProduct", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductVariantsController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosProductVariantsController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProductVariantsController.prototype, "delete", null);
exports.PosProductVariantsController = PosProductVariantsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/product-variants'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosProductVariantsController);


/***/ }),
/* 151 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosInventoryForecastController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosInventoryForecastController = class PosInventoryForecastController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    runForecast(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.RUN, { storeId: ctx.storeId, ...(body || {}) });
    }
    getReorderAlerts(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.GET_REORDER_ALERTS, { storeId: ctx.storeId });
    }
    acknowledgeAlert(alertId, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.ACKNOWLEDGE_ALERT, {
            alertId: Number(alertId),
            status: body.status,
        });
    }
    getProductForecast(ctx, productId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.PRODUCT_FORECAST, { storeId: ctx.storeId, productId: Number(productId) });
    }
    getFifoValuation(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.FIFO_VALUATION, { storeId: ctx.storeId });
    }
};
exports.PosInventoryForecastController = PosInventoryForecastController;
__decorate([
    (0, common_1.Post)('/v1/run'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosInventoryForecastController.prototype, "runForecast", null);
__decorate([
    (0, common_1.Get)('/v1/reorder-alerts'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosInventoryForecastController.prototype, "getReorderAlerts", null);
__decorate([
    (0, common_1.Patch)('/v1/reorder-alerts/:alertId'),
    __param(0, (0, common_1.Param)('alertId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PosInventoryForecastController.prototype, "acknowledgeAlert", null);
__decorate([
    (0, common_1.Get)('/v1/product/:productId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosInventoryForecastController.prototype, "getProductForecast", null);
__decorate([
    (0, common_1.Get)('/v1/fifo-valuation'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosInventoryForecastController.prototype, "getFifoValuation", null);
exports.PosInventoryForecastController = PosInventoryForecastController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/inventory-forecast'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosInventoryForecastController);


/***/ }),
/* 152 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosSupplierOrdersController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosSupplierOrdersController = class PosSupplierOrdersController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.GET_ALL, {
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: {
                    supplierId: query.supplierId ? Number(query.supplierId) : undefined,
                    status: query.status,
                },
            },
        });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    updateStatus(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.UPDATE_STATUS, {
            id: Number(id),
            status: body.status,
            userId: ctx.userId,
            storeId: ctx.storeId,
        });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.UPDATE, { id: Number(id), userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    convertToPurchase(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.CONVERT_TO_PURCHASE, {
            id: Number(id),
            userId: ctx.userId,
            storeId: ctx.storeId,
            paidAmount: body.paidAmount !== undefined ? Number(body.paidAmount) : undefined,
            invoiceRef: body.invoiceRef,
            purchaseDate: body.purchaseDate,
            items: body.items,
        });
    }
};
exports.PosSupplierOrdersController = PosSupplierOrdersController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSupplierOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosSupplierOrdersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSupplierOrdersController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id/status'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosSupplierOrdersController.prototype, "updateStatus", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosSupplierOrdersController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosSupplierOrdersController.prototype, "delete", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/:id/convert-to-purchase'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosSupplierOrdersController.prototype, "convertToPurchase", null);
exports.PosSupplierOrdersController = PosSupplierOrdersController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/supplier-orders'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosSupplierOrdersController);


/***/ }),
/* 153 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosProjectsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosProjectsController = class PosProjectsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PROJECT.CREATE, { ...body, storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PROJECT.GET_ALL, {
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: {
                    search: query.search,
                    customerId: query.customerId ? Number(query.customerId) : undefined,
                },
            },
        });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PROJECT.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PROJECT.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PROJECT.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosProjectsController = PosProjectsController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosProjectsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProjectsController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosProjectsController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosProjectsController.prototype, "delete", null);
exports.PosProjectsController = PosProjectsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/projects'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosProjectsController);


/***/ }),
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosServicesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosServicesController = class PosServicesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SERVICE.CREATE, { ...body, storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SERVICE.GET_ALL, {
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: { search: query.search },
            },
        });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SERVICE.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SERVICE.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.SERVICE.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosServicesController = PosServicesController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosServicesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosServicesController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosServicesController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosServicesController.prototype, "delete", null);
exports.PosServicesController = PosServicesController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/services'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosServicesController);


/***/ }),
/* 155 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosQuotationsController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosQuotationsController = class PosQuotationsController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.CREATE, { userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.GET_ALL, {
            storeId: ctx.storeId,
            data: {
                page: Number(query.page) || 1,
                size: Number(query.size) || 20,
                filters: {
                    customerId: query.customerId ? Number(query.customerId) : undefined,
                    quotationType: query.quotationType,
                },
            },
        });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.UPDATE, { id: Number(id), userId: ctx.userId, storeId: ctx.storeId, data: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    updateStatus(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.UPDATE_STATUS, { id: Number(id), status: body.status, userId: ctx.userId, storeId: ctx.storeId });
    }
    getInvoice(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.GET_INVOICE, { id: Number(id), storeId: ctx.storeId });
    }
    recordPayment(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.RECORD_PAYMENT, { id: Number(id), ...body, userId: ctx.userId, storeId: ctx.storeId });
    }
    returnPayment(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.RETURN_PAYMENT, { id: Number(id), ...body, userId: ctx.userId, storeId: ctx.storeId });
    }
    convert(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.QUOTATION.CONVERT, {
            id: Number(id),
            userId: ctx.userId,
            storeId: ctx.storeId,
            paymentType: body.paymentType,
            paidAmount: body.paidAmount !== undefined ? Number(body.paidAmount) : undefined,
        });
    }
};
exports.PosQuotationsController = PosQuotationsController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "delete", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id/status'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('/v1/:id/invoice'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "getInvoice", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/:id/payment'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "recordPayment", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/:id/return'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "returnPayment", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/:id/convert'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosQuotationsController.prototype, "convert", null);
exports.PosQuotationsController = PosQuotationsController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/quotations'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosQuotationsController);


/***/ }),
/* 156 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosDeliveryOrdersController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosDeliveryOrdersController = class PosDeliveryOrdersController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.CREATE, { ...body, userId: ctx.userId, storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.GET_ALL, {
            storeId: ctx.storeId,
            page: Number(query.page) || 1,
            size: Number(query.size) || 50,
            status: query.status,
        });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.UPDATE, {
            id: Number(id),
            storeId: ctx.storeId,
            status: body.status,
            notes: body.notes,
        });
    }
    generateInvoice(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.GENERATE_INVOICE, { id: Number(id), userId: ctx.userId, storeId: ctx.storeId });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosDeliveryOrdersController = PosDeliveryOrdersController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosDeliveryOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosDeliveryOrdersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosDeliveryOrdersController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosDeliveryOrdersController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/:id/generate-invoice'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosDeliveryOrdersController.prototype, "generateInvoice", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosDeliveryOrdersController.prototype, "delete", null);
exports.PosDeliveryOrdersController = PosDeliveryOrdersController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/delivery-orders'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosDeliveryOrdersController);


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosCompaniesController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosCompaniesController = class PosCompaniesController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    create(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.COMPANY.CREATE, { ...body, storeId: ctx.storeId });
    }
    getAll(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.COMPANY.GET_ALL, {
            storeId: ctx.storeId,
            page: Number(query.page) || 1,
            size: Number(query.size) || 100,
            search: query.search,
        });
    }
    getOne(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.COMPANY.GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    update(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.COMPANY.UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    delete(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.COMPANY.DELETE, { id: Number(id), storeId: ctx.storeId });
    }
};
exports.PosCompaniesController = PosCompaniesController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosCompaniesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosCompaniesController.prototype, "getOne", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosCompaniesController.prototype, "update", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosCompaniesController.prototype, "delete", null);
exports.PosCompaniesController = PosCompaniesController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/companies'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosCompaniesController);


/***/ }),
/* 158 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosLedgerController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosLedgerController = class PosLedgerController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    getChartOfAccounts(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.CHART_GET_ALL, { storeId: ctx.storeId });
    }
    createAccount(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.CHART_CREATE, { ...body, storeId: ctx.storeId });
    }
    updateAccount(ctx, id, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.CHART_UPDATE, { id: Number(id), storeId: ctx.storeId, payload: body });
    }
    deleteAccount(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.CHART_DELETE, { id: Number(id), storeId: ctx.storeId });
    }
    getJournalEntries(ctx, fromDate, toDate, type, page, size) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.JOURNAL_GET_ALL, {
            storeId: ctx.storeId,
            fromDate, toDate, type,
            page: Number(page) || 1,
            size: Number(size) || 50,
        });
    }
    getJournalEntry(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.JOURNAL_GET_ONE, { id: Number(id), storeId: ctx.storeId });
    }
    createJournalEntry(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.JOURNAL_CREATE, {
            ...body, createdBy: ctx.userId, storeId: ctx.storeId,
        });
    }
    syncJournalEntries(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.JOURNAL_SYNC, { storeId: ctx.storeId, ...body });
    }
    getTrialBalance(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.TRIAL_BALANCE, { storeId: ctx.storeId });
    }
    getAccountSummary(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.LEDGER.ACCOUNT_SUMMARY, { storeId: ctx.storeId });
    }
};
exports.PosLedgerController = PosLedgerController;
__decorate([
    (0, common_1.Get)('/v1/chart-of-accounts'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "getChartOfAccounts", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/chart-of-accounts'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "createAccount", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Patch)('/v1/chart-of-accounts/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "updateAccount", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin'),
    (0, common_1.Delete)('/v1/chart-of-accounts/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "deleteAccount", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/journal-entries'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __param(3, (0, common_1.Query)('type')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "getJournalEntries", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/journal-entries/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "getJournalEntry", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/journal-entries'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "createJournalEntry", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/journal-entries/sync'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "syncJournalEntries", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/trial-balance'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "getTrialBalance", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/account-summary'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosLedgerController.prototype, "getAccountSummary", null);
exports.PosLedgerController = PosLedgerController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/ledger'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosLedgerController);


/***/ }),
/* 159 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosFbrController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosFbrController = class PosFbrController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    sync(ctx, saleId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.FBR.SYNC, {
            saleId: Number(saleId),
            storeId: ctx.storeId,
        });
    }
    getPending(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.FBR.GET_PENDING, { storeId: ctx.storeId });
    }
    retry(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.FBR.RETRY, {
            id: Number(id),
            storeId: ctx.storeId,
        });
    }
    getQr(ctx, saleId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.FBR.GET_QR, {
            saleId: Number(saleId),
            storeId: ctx.storeId,
        });
    }
    testConnection() {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.FBR.TEST_CONNECTION, {});
    }
};
exports.PosFbrController = PosFbrController;
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/sync/:saleId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('saleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PosFbrController.prototype, "sync", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/pending'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosFbrController.prototype, "getPending", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Post)('/v1/retry/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PosFbrController.prototype, "retry", null);
__decorate([
    (0, common_1.Get)('/v1/qr/:saleId'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('saleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PosFbrController.prototype, "getQr", null);
__decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.Get)('/v1/test-connection'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PosFbrController.prototype, "testConnection", null);
exports.PosFbrController = PosFbrController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/fbr'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosFbrController);


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosOfflineSyncController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosOfflineSyncController = class PosOfflineSyncController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    enqueue(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.OFFLINE_SYNC.ENQUEUE, {
            ...body,
            storeId: ctx.storeId,
        });
    }
    getPending(ctx, terminalId) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.OFFLINE_SYNC.GET_PENDING, {
            terminalId: Number(terminalId),
            storeId: ctx.storeId,
        });
    }
    markSynced(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.OFFLINE_SYNC.MARK_SYNCED, {
            id: body.id,
            storeId: ctx.storeId,
        });
    }
    markFailed(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.OFFLINE_SYNC.MARK_FAILED, {
            ...body,
            storeId: ctx.storeId,
        });
    }
    getStats(ctx) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.OFFLINE_SYNC.GET_STATS, {
            storeId: ctx.storeId,
        });
    }
};
exports.PosOfflineSyncController = PosOfflineSyncController;
__decorate([
    (0, common_1.Post)('/v1/enqueue'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosOfflineSyncController.prototype, "enqueue", null);
__decorate([
    (0, common_1.Get)('/v1/pending'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)('terminalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosOfflineSyncController.prototype, "getPending", null);
__decorate([
    (0, common_1.Patch)('/v1/mark-synced'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosOfflineSyncController.prototype, "markSynced", null);
__decorate([
    (0, common_1.Patch)('/v1/mark-failed'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosOfflineSyncController.prototype, "markFailed", null);
__decorate([
    (0, common_1.Get)('/v1/stats'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosOfflineSyncController.prototype, "getStats", null);
exports.PosOfflineSyncController = PosOfflineSyncController = __decorate([
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard),
    (0, common_1.Controller)('pos/offline-sync'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosOfflineSyncController);


/***/ }),
/* 161 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PosPaymentGatewayController = void 0;
const common_1 = __webpack_require__(3);
const pos_service_1 = __webpack_require__(117);
const pos_auth_guard_1 = __webpack_require__(122);
const pos_roles_guard_1 = __webpack_require__(119);
const pos_roles_decorator_1 = __webpack_require__(120);
const store_context_decorator_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(124);
let PosPaymentGatewayController = class PosPaymentGatewayController {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    getLogs(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PAYMENT_GATEWAY.GET_LOGS, {
            storeId: ctx.storeId,
            provider: query.provider || undefined,
            status: query.status || undefined,
            fromDate: query.fromDate || undefined,
            toDate: query.toDate || undefined,
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
        });
    }
    getStats(ctx, query) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PAYMENT_GATEWAY.GET_STATS, {
            storeId: ctx.storeId,
            fromDate: query.fromDate || undefined,
            toDate: query.toDate || undefined,
        });
    }
    initiate(ctx, body) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PAYMENT_GATEWAY.INITIATE, {
            storeId: ctx.storeId,
            saleId: body.saleId || undefined,
            provider: body.provider,
            amount: Number(body.amount),
            mobileNumber: body.mobileNumber || undefined,
            description: body.description || undefined,
        });
    }
    checkStatus(ctx, id) {
        return this.posService.send(pos_patterns_1.POS_PATTERNS.PAYMENT_GATEWAY.CHECK_STATUS, {
            id: Number(id),
            storeId: ctx.storeId,
        });
    }
};
exports.PosPaymentGatewayController = PosPaymentGatewayController;
__decorate([
    (0, common_1.Get)('/v1/logs'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPaymentGatewayController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('/v1/stats'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPaymentGatewayController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('/v1/initiate'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PosPaymentGatewayController.prototype, "initiate", null);
__decorate([
    (0, common_1.Get)('/v1/status/:id'),
    __param(0, (0, store_context_decorator_1.StoreContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PosPaymentGatewayController.prototype, "checkStatus", null);
exports.PosPaymentGatewayController = PosPaymentGatewayController = __decorate([
    (0, pos_roles_decorator_1.PosRoles)('admin', 'manager'),
    (0, common_1.UseGuards)(pos_auth_guard_1.PosAuthGuard, pos_roles_guard_1.PosRolesGuard),
    (0, common_1.Controller)('pos/payment-gateway'),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_service_1.PosService !== "undefined" && pos_service_1.PosService) === "function" ? _a : Object])
], PosPaymentGatewayController);


/***/ }),
/* 162 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuperAdminModule = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(7);
const config_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(8);
const core_1 = __webpack_require__(1);
const super_admin_controller_1 = __webpack_require__(163);
const store_management_controller_1 = __webpack_require__(167);
const super_admin_service_1 = __webpack_require__(164);
const super_admin_auth_guard_1 = __webpack_require__(165);
let SuperAdminModule = class SuperAdminModule {
};
exports.SuperAdminModule = SuperAdminModule;
exports.SuperAdminModule = SuperAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'POS_SERVICE',
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('POS_SERVICE_HOST') || 'localhost',
                            port: configService.get('POS_SERVICE_PORT') || 3001,
                        },
                    }),
                },
            ]),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'super-secret-key',
                    signOptions: { expiresIn: '24h' },
                }),
            }),
        ],
        controllers: [super_admin_controller_1.SuperAdminController, store_management_controller_1.StoreManagementController],
        providers: [super_admin_service_1.SuperAdminService, super_admin_auth_guard_1.SuperAdminAuthGuard, config_1.ConfigService, jwt_1.JwtService, core_1.Reflector],
        exports: [super_admin_service_1.SuperAdminService],
    })
], SuperAdminModule);


/***/ }),
/* 163 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuperAdminController = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(8);
const config_1 = __webpack_require__(5);
const super_admin_service_1 = __webpack_require__(164);
const super_admin_auth_guard_1 = __webpack_require__(165);
const super_admin_context_decorator_1 = __webpack_require__(166);
let SuperAdminController = class SuperAdminController {
    superAdminService;
    jwtService;
    configService;
    constructor(superAdminService, jwtService, configService) {
        this.superAdminService = superAdminService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(body) {
        const result = await this.superAdminService.send('super_admin.create', body);
        return result;
    }
    async login(body) {
        const superAdmin = await this.superAdminService.send('super_admin.login', body);
        const token = await this.jwtService.signAsync({
            id: superAdmin.id,
            email: superAdmin.email,
            name: superAdmin.name,
            type: 'super_admin',
        }, {
            secret: this.configService.get('JWT_SECRET') || 'super-secret-key',
        });
        return {
            ...superAdmin,
            token,
        };
    }
    getProfile(superAdmin) {
        return this.superAdminService.send('super_admin.get_one', { id: superAdmin.id });
    }
    getAll(query) {
        return this.superAdminService.send('super_admin.get_all', {
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
            search: query.search,
        });
    }
    getOne(id) {
        return this.superAdminService.send('super_admin.get_one', { id: Number(id) });
    }
    update(id, body) {
        return this.superAdminService.send('super_admin.update', {
            id: Number(id),
            payload: body,
        });
    }
    delete(id) {
        return this.superAdminService.send('super_admin.delete', { id: Number(id) });
    }
    changePassword(superAdmin, body) {
        return this.superAdminService.send('super_admin.change_password', {
            id: superAdmin.id,
            oldPassword: body.oldPassword,
            newPassword: body.newPassword,
        });
    }
    async refreshToken(body) {
        return this.superAdminService.send('super_admin.refresh_token', { refreshToken: body.refreshToken });
    }
};
exports.SuperAdminController = SuperAdminController;
__decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Post)('/v1/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/v1/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Get)('/v1/profile'),
    __param(0, (0, super_admin_context_decorator_1.SuperAdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Get)('/v1'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Post)('/v1/change-password'),
    __param(0, (0, super_admin_context_decorator_1.SuperAdminUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/v1/refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "refreshToken", null);
exports.SuperAdminController = SuperAdminController = __decorate([
    (0, common_1.Controller)('super-admin'),
    __metadata("design:paramtypes", [typeof (_a = typeof super_admin_service_1.SuperAdminService !== "undefined" && super_admin_service_1.SuperAdminService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], SuperAdminController);


/***/ }),
/* 164 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SuperAdminService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(7);
const rxjs_1 = __webpack_require__(118);
let SuperAdminService = class SuperAdminService {
    posService;
    constructor(posService) {
        this.posService = posService;
    }
    send(pattern, data) {
        return (0, rxjs_1.firstValueFrom)(this.posService.send(pattern, data));
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('POS_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], SuperAdminService);


/***/ }),
/* 165 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SuperAdminAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(8);
const config_1 = __webpack_require__(5);
let SuperAdminAuthGuard = class SuperAdminAuthGuard {
    jwtService;
    configService;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('NO_TOKEN_PROVIDED');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET') || 'super-secret-key',
            });
            if (payload.type !== 'super_admin') {
                throw new common_1.UnauthorizedException('INVALID_TOKEN_TYPE');
            }
            request.superAdmin = {
                id: payload.id,
                email: payload.email,
                name: payload.name,
            };
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('INVALID_TOKEN');
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.SuperAdminAuthGuard = SuperAdminAuthGuard;
exports.SuperAdminAuthGuard = SuperAdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], SuperAdminAuthGuard);


/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuperAdminUser = void 0;
const common_1 = __webpack_require__(3);
exports.SuperAdminUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.superAdmin;
});


/***/ }),
/* 167 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.StoreManagementController = void 0;
const common_1 = __webpack_require__(3);
const super_admin_service_1 = __webpack_require__(164);
const super_admin_auth_guard_1 = __webpack_require__(165);
const super_admin_context_decorator_1 = __webpack_require__(166);
let StoreManagementController = class StoreManagementController {
    superAdminService;
    constructor(superAdminService) {
        this.superAdminService = superAdminService;
    }
    createStore(superAdmin, body) {
        return this.superAdminService.send('store.create', {
            ...body,
            createdBy: superAdmin.id,
        });
    }
    getAllStores(query) {
        return this.superAdminService.send('store.get_all', {
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
            search: query.search,
            isActive: query.isActive !== undefined ? query.isActive === 'true' : undefined,
        });
    }
    getStore(id) {
        return this.superAdminService.send('store.get_one', { id: Number(id) });
    }
    updateStore(id, body) {
        return this.superAdminService.send('store.update', {
            id: Number(id),
            payload: body,
        });
    }
    deleteStore(id) {
        return this.superAdminService.send('store.delete', { id: Number(id) });
    }
    getStoreUsers(id, query) {
        return this.superAdminService.send('store.get_users', {
            storeId: Number(id),
            page: Number(query.page) || 1,
            size: Number(query.size) || 20,
            role: query.role,
        });
    }
    getStoreStatistics(id) {
        return this.superAdminService.send('store.get_statistics', { storeId: Number(id) });
    }
    toggleStoreStatus(id) {
        return this.superAdminService.send('store.toggle_status', { id: Number(id) });
    }
    getStoreFeatures(id) {
        return this.superAdminService.send('store.get_features', { storeId: Number(id) });
    }
    updateStoreFeatures(id, body) {
        return this.superAdminService.send('store.update_features', {
            storeId: Number(id),
            features: body,
        });
    }
};
exports.StoreManagementController = StoreManagementController;
__decorate([
    (0, common_1.Post)('/v1'),
    __param(0, (0, super_admin_context_decorator_1.SuperAdminUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "createStore", null);
__decorate([
    (0, common_1.Get)('/v1'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "getAllStores", null);
__decorate([
    (0, common_1.Get)('/v1/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "getStore", null);
__decorate([
    (0, common_1.Patch)('/v1/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "updateStore", null);
__decorate([
    (0, common_1.Delete)('/v1/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "deleteStore", null);
__decorate([
    (0, common_1.Get)('/v1/:id/users'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "getStoreUsers", null);
__decorate([
    (0, common_1.Get)('/v1/:id/statistics'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "getStoreStatistics", null);
__decorate([
    (0, common_1.Post)('/v1/:id/toggle-status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "toggleStoreStatus", null);
__decorate([
    (0, common_1.Get)('/v1/:id/features'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "getStoreFeatures", null);
__decorate([
    (0, common_1.Patch)('/v1/:id/features'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], StoreManagementController.prototype, "updateStoreFeatures", null);
exports.StoreManagementController = StoreManagementController = __decorate([
    (0, common_1.UseGuards)(super_admin_auth_guard_1.SuperAdminAuthGuard),
    (0, common_1.Controller)('super-admin/stores'),
    __metadata("design:paramtypes", [typeof (_a = typeof super_admin_service_1.SuperAdminService !== "undefined" && super_admin_service_1.SuperAdminService) === "function" ? _a : Object])
], StoreManagementController);


/***/ }),
/* 168 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 169 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 170 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
__exportStar(__webpack_require__(171), exports);
__exportStar(__webpack_require__(172), exports);
__exportStar(__webpack_require__(184), exports);
__exportStar(__webpack_require__(185), exports);
__exportStar(__webpack_require__(187), exports);
__exportStar(__webpack_require__(188), exports);
__exportStar(__webpack_require__(189), exports);
__exportStar(__webpack_require__(190), exports);
__exportStar(__webpack_require__(173), exports);
__exportStar(__webpack_require__(178), exports);
__exportStar(__webpack_require__(179), exports);
__exportStar(__webpack_require__(180), exports);
__exportStar(__webpack_require__(181), exports);
__exportStar(__webpack_require__(191), exports);
__exportStar(__webpack_require__(193), exports);
__exportStar(__webpack_require__(176), exports);
__exportStar(__webpack_require__(124), exports);
__exportStar(__webpack_require__(194), exports);
__exportStar(__webpack_require__(195), exports);
__exportStar(__webpack_require__(196), exports);
__exportStar(__webpack_require__(197), exports);
__exportStar(__webpack_require__(198), exports);
__exportStar(__webpack_require__(199), exports);
__exportStar(__webpack_require__(200), exports);
__exportStar(__webpack_require__(201), exports);
__exportStar(__webpack_require__(202), exports);
__exportStar(__webpack_require__(203), exports);
__exportStar(__webpack_require__(204), exports);


/***/ }),
/* 171 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(3);
const common_service_1 = __webpack_require__(172);
const transform_interceptors_1 = __webpack_require__(173);
const http_exception_filters_1 = __webpack_require__(178);
const rpc_exection_filters_1 = __webpack_require__(179);
const api_exeptions_1 = __webpack_require__(180);
const logging_interceptors_1 = __webpack_require__(181);
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [common_service_1.CommonService, transform_interceptors_1.TransformInterceptor, http_exception_filters_1.HttpExceptionFilter, rpc_exection_filters_1.HyperRpcFilter, api_exeptions_1.ApiException, logging_interceptors_1.LoggingInterceptor],
        exports: [common_service_1.CommonService, transform_interceptors_1.TransformInterceptor, http_exception_filters_1.HttpExceptionFilter, rpc_exection_filters_1.HyperRpcFilter, api_exeptions_1.ApiException, logging_interceptors_1.LoggingInterceptor],
    })
], CommonModule);


/***/ }),
/* 172 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(3);
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ }),
/* 173 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(3);
const operators_1 = __webpack_require__(174);
const language_1 = __webpack_require__(175);
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


/***/ }),
/* 174 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LANGUAGES = void 0;
const en_1 = __webpack_require__(176);
const urdu_1 = __webpack_require__(177);
exports.LANGUAGES = {
    en: en_1.en,
    urdu: urdu_1.urdu,
};


/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 178 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(3);
const language_1 = __webpack_require__(175);
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


/***/ }),
/* 179 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HyperRpcFilter = void 0;
const common_1 = __webpack_require__(3);
const rxjs_1 = __webpack_require__(118);
const microservices_1 = __webpack_require__(7);
let HyperRpcFilter = class HyperRpcFilter {
    catch(exception, host) {
        return (0, rxjs_1.throwError)(() => exception.getError());
    }
};
exports.HyperRpcFilter = HyperRpcFilter;
exports.HyperRpcFilter = HyperRpcFilter = __decorate([
    (0, common_1.Catch)(microservices_1.RpcException)
], HyperRpcFilter);


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 181 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const rxjs_1 = __webpack_require__(118);
const winston = __importStar(__webpack_require__(182));
__webpack_require__(183);
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


/***/ }),
/* 182 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 183 */
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 184 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 185 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
const class_transformer_1 = __webpack_require__(186);
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


/***/ }),
/* 186 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 187 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
const class_transformer_1 = __webpack_require__(186);
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


/***/ }),
/* 188 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 189 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 190 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 191 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(5);
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        try {
            const nodemailer = __webpack_require__(192);
            const smtpHost = this.configService.get('SMTP_HOST');
            const smtpPort = parseInt(this.configService.get('SMTP_PORT') || '587');
            const smtpUser = this.configService.get('SMTP_USER');
            const smtpPass = this.configService.get('SMTP_PASS');
            if (!smtpHost || !smtpUser || !smtpPass) {
                this.logger.warn('SMTP not configured — email service disabled');
                return;
            }
            this.logger.log(`Initializing email service with host: ${smtpHost}:${smtpPort}`);
            const secure = smtpPort === 465;
            this.transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
                tls: {
                    rejectUnauthorized: false,
                },
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


/***/ }),
/* 192 */
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),
/* 193 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(5);
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


/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 195 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 196 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 197 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 198 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 199 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 200 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
const class_transformer_1 = __webpack_require__(186);
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


/***/ }),
/* 201 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
const class_transformer_1 = __webpack_require__(186);
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


/***/ }),
/* 202 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 203 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 204 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(130);
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


/***/ }),
/* 205 */
/***/ ((module) => {

module.exports = require("express-rate-limit");

/***/ })
/******/ 	]);
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
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;