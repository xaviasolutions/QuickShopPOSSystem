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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const dotenv = __importStar(__webpack_require__(2));
const path_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(4);
const pos_service_app_module_1 = __webpack_require__(5);
dotenv.config({ path: (0, path_1.join)(process.cwd(), `.env.${process.env.NODE_ENV}`) });
async function bootstrap() {
    const app = await core_1.NestFactory.create(pos_service_app_module_1.PosServiceAppModule);
    const allowedOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',')
        : ['http://localhost:5173', 'http://localhost:3000'];
    app.enableCors({
        origin: process.env.NODE_ENV === 'production' ? allowedOrigins : '*',
        credentials: true,
    });
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.DEFAULT_HOST || '0.0.0.0',
            port: parseInt(process.env.POS_SERVICE_PORT || '3004'),
        },
    });
    await app.startAllMicroservices();
    const wsPort = parseInt(process.env.POS_WS_PORT || '3005');
    await app.listen(wsPort);
    console.log(`POS TCP Microservice listening on port ${process.env.POS_SERVICE_PORT || 3004}`);
    console.log(`POS WebSocket server listening on port ${wsPort}`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosServiceAppModule = void 0;
const common_1 = __webpack_require__(6);
const database_module_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const schedule_1 = __webpack_require__(97);
const model_1 = __webpack_require__(11);
const cron_module_1 = __webpack_require__(98);
const pos_brands_module_1 = __webpack_require__(113);
const pos_gateway_module_1 = __webpack_require__(106);
const pos_users_module_1 = __webpack_require__(116);
const pos_categories_module_1 = __webpack_require__(121);
const pos_units_module_1 = __webpack_require__(124);
const pos_products_module_1 = __webpack_require__(127);
const pos_suppliers_module_1 = __webpack_require__(130);
const pos_purchases_module_1 = __webpack_require__(133);
const pos_customers_module_1 = __webpack_require__(136);
const pos_sales_module_1 = __webpack_require__(139);
const pos_sale_returns_module_1 = __webpack_require__(148);
const pos_stock_module_1 = __webpack_require__(151);
const pos_expenses_module_1 = __webpack_require__(154);
const pos_reports_module_1 = __webpack_require__(157);
const pos_discount_rules_module_1 = __webpack_require__(162);
const pos_settings_module_1 = __webpack_require__(144);
const pos_notifications_module_1 = __webpack_require__(107);
const pos_supplier_payments_module_1 = __webpack_require__(165);
const pos_purchase_returns_module_1 = __webpack_require__(168);
const pos_loyalty_module_1 = __webpack_require__(171);
const pos_audit_logs_module_1 = __webpack_require__(174);
const pos_roles_module_1 = __webpack_require__(177);
const pos_permissions_module_1 = __webpack_require__(180);
const pos_role_permissions_module_1 = __webpack_require__(183);
const pos_user_roles_module_1 = __webpack_require__(186);
const pos_product_variants_module_1 = __webpack_require__(189);
const pos_inventory_forecast_module_1 = __webpack_require__(111);
const pos_supplier_orders_module_1 = __webpack_require__(192);
const pos_projects_module_1 = __webpack_require__(195);
const pos_services_module_1 = __webpack_require__(198);
const pos_quotations_module_1 = __webpack_require__(201);
const pos_delivery_orders_module_1 = __webpack_require__(204);
const pos_companies_module_1 = __webpack_require__(207);
let PosServiceAppModule = class PosServiceAppModule {
};
exports.PosServiceAppModule = PosServiceAppModule;
exports.PosServiceAppModule = PosServiceAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            sequelize_1.SequelizeModule.forFeature(model_1.ALL_MODELS),
            schedule_1.ScheduleModule.forRoot(),
            pos_gateway_module_1.PosGatewayModule,
            cron_module_1.CronModule,
            pos_brands_module_1.PosBrandsModule,
            pos_users_module_1.PosUsersModule,
            pos_categories_module_1.PosCategoriesModule,
            pos_units_module_1.PosUnitsModule,
            pos_products_module_1.PosProductsModule,
            pos_suppliers_module_1.PosSuppliersModule,
            pos_purchases_module_1.PosPurchasesModule,
            pos_customers_module_1.PosCustomersModule,
            pos_sales_module_1.PosSalesModule,
            pos_sale_returns_module_1.PosSaleReturnsModule,
            pos_stock_module_1.PosStockModule,
            pos_expenses_module_1.PosExpensesModule,
            pos_reports_module_1.PosReportsModule,
            pos_discount_rules_module_1.PosDiscountRulesModule,
            pos_settings_module_1.PosSettingsModule,
            pos_notifications_module_1.PosNotificationsModule,
            pos_supplier_payments_module_1.PosSupplierPaymentsModule,
            pos_purchase_returns_module_1.PosPurchaseReturnsModule,
            pos_loyalty_module_1.PosLoyaltyModule,
            pos_audit_logs_module_1.PosAuditLogsModule,
            pos_roles_module_1.PosRolesModule,
            pos_permissions_module_1.PosPermissionsModule,
            pos_role_permissions_module_1.PosRolePermissionsModule,
            pos_user_roles_module_1.PosUserRolesModule,
            pos_product_variants_module_1.PosProductVariantsModule,
            pos_inventory_forecast_module_1.PosInventoryForecastModule,
            pos_supplier_orders_module_1.PosSupplierOrdersModule,
            pos_projects_module_1.PosProjectsModule,
            pos_services_module_1.PosServicesModule,
            pos_quotations_module_1.PosQuotationsModule,
            pos_delivery_orders_module_1.PosDeliveryOrdersModule,
            pos_companies_module_1.PosCompaniesModule,
        ],
        controllers: [],
        providers: [],
    })
], PosServiceAppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const config_module_1 = __webpack_require__(10);
const model_1 = __webpack_require__(11);
const repository_1 = __webpack_require__(59);
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
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonConfigModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(9);
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
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_MODELS = void 0;
const pos_user_model_1 = __webpack_require__(12);
const category_model_1 = __webpack_require__(14);
const unit_model_1 = __webpack_require__(15);
const brand_model_1 = __webpack_require__(16);
const product_model_1 = __webpack_require__(17);
const product_variant_model_1 = __webpack_require__(22);
const product_price_model_1 = __webpack_require__(23);
const supplier_model_1 = __webpack_require__(19);
const batch_model_1 = __webpack_require__(18);
const purchase_model_1 = __webpack_require__(20);
const purchase_item_model_1 = __webpack_require__(21);
const purchase_return_model_1 = __webpack_require__(25);
const supplier_payment_model_1 = __webpack_require__(26);
const customer_model_1 = __webpack_require__(27);
const customer_payment_model_1 = __webpack_require__(35);
const udhaar_transaction_model_1 = __webpack_require__(33);
const sale_model_1 = __webpack_require__(28);
const sale_item_model_1 = __webpack_require__(29);
const sale_return_model_1 = __webpack_require__(32);
const stock_adjustment_model_1 = __webpack_require__(36);
const expense_model_1 = __webpack_require__(37);
const audit_log_model_1 = __webpack_require__(38);
const fbr_invoice_log_model_1 = __webpack_require__(39);
const tax_setting_model_1 = __webpack_require__(40);
const sale_payment_model_1 = __webpack_require__(31);
const discount_rule_model_1 = __webpack_require__(30);
const loyalty_points_log_model_1 = __webpack_require__(34);
const supplier_ledger_transaction_model_1 = __webpack_require__(41);
const store_setting_model_1 = __webpack_require__(42);
const terminal_model_1 = __webpack_require__(43);
const sms_whatsapp_log_model_1 = __webpack_require__(44);
const cron_job_log_model_1 = __webpack_require__(45);
const pos_role_model_1 = __webpack_require__(46);
const pos_permission_model_1 = __webpack_require__(47);
const pos_role_permission_model_1 = __webpack_require__(48);
const pos_user_role_model_1 = __webpack_require__(49);
const pos_notification_model_1 = __webpack_require__(50);
const product_image_model_1 = __webpack_require__(24);
const reorder_alert_model_1 = __webpack_require__(51);
const supplier_order_model_1 = __webpack_require__(52);
const project_model_1 = __webpack_require__(53);
const service_model_1 = __webpack_require__(54);
const quotation_model_1 = __webpack_require__(55);
const currency_setting_model_1 = __webpack_require__(57);
const delivery_order_model_1 = __webpack_require__(58);
const company_model_1 = __webpack_require__(56);
exports.ALL_MODELS = [
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUser = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let PosUser = class PosUser extends sequelize_typescript_1.Model {
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
exports.Category = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let Category = class Category extends sequelize_typescript_1.Model {
    parent;
    children;
};
exports.Category = Category;
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
exports.Category = Category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'categories', timestamps: true, underscored: true })
], Category);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Unit = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let Unit = class Unit extends sequelize_typescript_1.Model {
};
exports.Unit = Unit;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: false }),
    __metadata("design:type", String)
], Unit.prototype, "shortCode", void 0);
exports.Unit = Unit = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'units', timestamps: false, underscored: true })
], Unit);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Brand = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(17);
let Brand = class Brand extends sequelize_typescript_1.Model {
    products;
};
exports.Brand = Brand;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(150), allowNull: false, unique: true }),
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
exports.Brand = Brand = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'brands', timestamps: true, underscored: true })
], Brand);


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const category_model_1 = __webpack_require__(14);
const unit_model_1 = __webpack_require__(15);
const batch_model_1 = __webpack_require__(18);
const product_variant_model_1 = __webpack_require__(22);
const product_price_model_1 = __webpack_require__(23);
const product_image_model_1 = __webpack_require__(24);
const brand_model_1 = __webpack_require__(16);
let Product = class Product extends sequelize_typescript_1.Model {
    category;
    unit;
    brand;
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
    (0, sequelize_typescript_1.ForeignKey)(() => brand_model_1.Brand),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], Product.prototype, "brandId", void 0);
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
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({ where: { isActive: true } })),
    (0, sequelize_typescript_1.Scopes)(() => ({ withInactive: {}, active: { where: { isActive: true } } })),
    (0, sequelize_typescript_1.Table)({ tableName: 'products', timestamps: true, underscored: true })
], Product);


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Batch = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(17);
const supplier_model_1 = __webpack_require__(19);
const purchase_model_1 = __webpack_require__(20);
let Batch = class Batch extends sequelize_typescript_1.Model {
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
exports.Batch = Batch = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'batches', timestamps: true, underscored: true })
], Batch);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Supplier = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let Supplier = class Supplier extends sequelize_typescript_1.Model {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Purchase = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(19);
const pos_user_model_1 = __webpack_require__(12);
const purchase_item_model_1 = __webpack_require__(21);
let Purchase = class Purchase extends sequelize_typescript_1.Model {
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseItem = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const purchase_model_1 = __webpack_require__(20);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const product_variant_model_1 = __webpack_require__(22);
let PurchaseItem = class PurchaseItem extends sequelize_typescript_1.Model {
    purchase;
    product;
    batch;
    variant;
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
exports.PurchaseItem = PurchaseItem = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchase_items',
        timestamps: false,
        underscored: true,
    })
], PurchaseItem);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductVariant = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(17);
const unit_model_1 = __webpack_require__(15);
let ProductVariant = class ProductVariant extends sequelize_typescript_1.Model {
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
    (0, sequelize_typescript_1.DefaultScope)(() => ({ where: { isActive: true } })),
    (0, sequelize_typescript_1.Table)({ tableName: 'product_variants', timestamps: true, underscored: true })
], ProductVariant);


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
exports.ProductPrice = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(17);
const pos_user_model_1 = __webpack_require__(12);
let ProductPrice = class ProductPrice extends sequelize_typescript_1.Model {
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductImage = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(17);
let ProductImage = class ProductImage extends sequelize_typescript_1.Model {
    product;
};
exports.ProductImage = ProductImage;
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
exports.ProductImage = ProductImage = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'product_images',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], ProductImage);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseReturn = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const purchase_model_1 = __webpack_require__(20);
const supplier_model_1 = __webpack_require__(19);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const pos_user_model_1 = __webpack_require__(12);
let PurchaseReturn = class PurchaseReturn extends sequelize_typescript_1.Model {
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierPayment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(19);
const purchase_model_1 = __webpack_require__(20);
const pos_user_model_1 = __webpack_require__(12);
let SupplierPayment = class SupplierPayment extends sequelize_typescript_1.Model {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(28);
const udhaar_transaction_model_1 = __webpack_require__(33);
const loyalty_points_log_model_1 = __webpack_require__(34);
let Customer = class Customer extends sequelize_typescript_1.Model {
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sale = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(27);
const pos_user_model_1 = __webpack_require__(12);
const sale_item_model_1 = __webpack_require__(29);
const sale_payment_model_1 = __webpack_require__(31);
const sale_return_model_1 = __webpack_require__(32);
let Sale = class Sale extends sequelize_typescript_1.Model {
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
exports.Sale = Sale = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sales', timestamps: true, underscored: true })
], Sale);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleItem = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(17);
const product_variant_model_1 = __webpack_require__(22);
const batch_model_1 = __webpack_require__(18);
const discount_rule_model_1 = __webpack_require__(30);
let SaleItem = class SaleItem extends sequelize_typescript_1.Model {
    sale;
    product;
    variant;
    batch;
    discountRule;
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
exports.SaleItem = SaleItem = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sale_items', timestamps: false, underscored: true })
], SaleItem);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscountRule = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
let DiscountRule = class DiscountRule extends sequelize_typescript_1.Model {
    createdByUser;
};
exports.DiscountRule = DiscountRule;
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
exports.DiscountRule = DiscountRule = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'discount_rules', timestamps: true, underscored: true })
], DiscountRule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalePayment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(28);
let SalePayment = class SalePayment extends sequelize_typescript_1.Model {
    sale;
};
exports.SalePayment = SalePayment;
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
exports.SalePayment = SalePayment = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sale_payments', timestamps: true, underscored: true, updatedAt: false })
], SalePayment);


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleReturn = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(28);
const sale_item_model_1 = __webpack_require__(29);
const product_model_1 = __webpack_require__(17);
const product_variant_model_1 = __webpack_require__(22);
const batch_model_1 = __webpack_require__(18);
const pos_user_model_1 = __webpack_require__(12);
let SaleReturn = class SaleReturn extends sequelize_typescript_1.Model {
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
exports.SaleReturn = SaleReturn = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sale_returns',
        timestamps: true,
        underscored: true,
    })
], SaleReturn);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UdhaarTransaction = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(27);
const sale_model_1 = __webpack_require__(28);
let UdhaarTransaction = class UdhaarTransaction extends sequelize_typescript_1.Model {
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
exports.UdhaarTransaction = UdhaarTransaction = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'udhaar_transactions',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], UdhaarTransaction);


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoyaltyPointsLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(27);
const sale_model_1 = __webpack_require__(28);
const pos_user_model_1 = __webpack_require__(12);
let LoyaltyPointsLog = class LoyaltyPointsLog extends sequelize_typescript_1.Model {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerPayment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(27);
const pos_user_model_1 = __webpack_require__(12);
let CustomerPayment = class CustomerPayment extends sequelize_typescript_1.Model {
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
exports.StockAdjustment = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const pos_user_model_1 = __webpack_require__(12);
let StockAdjustment = class StockAdjustment extends sequelize_typescript_1.Model {
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Expense = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
let Expense = class Expense extends sequelize_typescript_1.Model {
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
let AuditLog = class AuditLog extends sequelize_typescript_1.Model {
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
    (0, sequelize_typescript_1.Table)({ tableName: 'audit_logs', timestamps: true, underscored: true, updatedAt: false })
], AuditLog);


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
exports.FbrInvoiceLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const sale_model_1 = __webpack_require__(28);
let FbrInvoiceLog = class FbrInvoiceLog extends sequelize_typescript_1.Model {
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
exports.FbrInvoiceLog = FbrInvoiceLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'fbr_invoices_log', timestamps: true, underscored: true, updatedAt: false })
], FbrInvoiceLog);


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaxSetting = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const category_model_1 = __webpack_require__(14);
const product_model_1 = __webpack_require__(17);
const pos_user_model_1 = __webpack_require__(12);
let TaxSetting = class TaxSetting extends sequelize_typescript_1.Model {
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierLedgerTransaction = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(19);
const purchase_model_1 = __webpack_require__(20);
const supplier_payment_model_1 = __webpack_require__(26);
let SupplierLedgerTransaction = class SupplierLedgerTransaction extends sequelize_typescript_1.Model {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreSetting = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
let StoreSetting = class StoreSetting extends sequelize_typescript_1.Model {
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Terminal = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let Terminal = class Terminal extends sequelize_typescript_1.Model {
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
exports.Terminal = Terminal = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'terminals',
        timestamps: true,
        underscored: true,
        updatedAt: false,
    })
], Terminal);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmsWhatsappLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let SmsWhatsappLog = class SmsWhatsappLog extends sequelize_typescript_1.Model {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronJobLog = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let CronJobLog = class CronJobLog extends sequelize_typescript_1.Model {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRole = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let PosRole = class PosRole extends sequelize_typescript_1.Model {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPermission = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let PosPermission = class PosPermission extends sequelize_typescript_1.Model {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolePermission = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_role_model_1 = __webpack_require__(46);
const pos_permission_model_1 = __webpack_require__(47);
let PosRolePermission = class PosRolePermission extends sequelize_typescript_1.Model {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRole = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
const pos_role_model_1 = __webpack_require__(46);
let PosUserRole = class PosUserRole extends sequelize_typescript_1.Model {
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
exports.PosNotification = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const pos_user_model_1 = __webpack_require__(12);
let PosNotification = class PosNotification extends sequelize_typescript_1.Model {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReorderAlert = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const product_model_1 = __webpack_require__(17);
let ReorderAlert = class ReorderAlert extends sequelize_typescript_1.Model {
    product;
};
exports.ReorderAlert = ReorderAlert;
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
exports.ReorderAlert = ReorderAlert = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'reorder_alerts', timestamps: true, underscored: true })
], ReorderAlert);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierOrderItem = exports.SupplierOrder = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(19);
const pos_user_model_1 = __webpack_require__(12);
let SupplierOrder = class SupplierOrder extends sequelize_typescript_1.Model {
    supplier;
    createdByUser;
    items;
};
exports.SupplierOrder = SupplierOrder;
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
exports.Project = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(27);
const supplier_model_1 = __webpack_require__(19);
let Project = class Project extends sequelize_typescript_1.Model {
    customer;
    supplier;
};
exports.Project = Project;
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
exports.Project = Project = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'projects', timestamps: true, underscored: true })
], Project);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Service = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_model_1 = __webpack_require__(19);
let Service = class Service extends sequelize_typescript_1.Model {
    supplier;
};
exports.Service = Service;
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
exports.Service = Service = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'services', timestamps: true, underscored: true })
], Service);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotationStatusLog = exports.QuotationPaymentTransaction = exports.QuotationItem = exports.Quotation = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(27);
const pos_user_model_1 = __webpack_require__(12);
const company_model_1 = __webpack_require__(56);
let Quotation = class Quotation extends sequelize_typescript_1.Model {
    customer;
    company;
    createdByUser;
    items;
    paymentTransactions;
    statusLogs;
};
exports.Quotation = Quotation;
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
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
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
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], QuotationStatusLog.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Quotation, 'quotationId'),
    __metadata("design:type", Quotation)
], QuotationStatusLog.prototype, "quotation", void 0);
exports.QuotationStatusLog = QuotationStatusLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'quotation_status_logs', timestamps: false, underscored: true })
], QuotationStatusLog);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Company = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let Company = class Company extends sequelize_typescript_1.Model {
};
exports.Company = Company;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrencySetting = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
let CurrencySetting = class CurrencySetting extends sequelize_typescript_1.Model {
};
exports.CurrencySetting = CurrencySetting;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: false, unique: true }),
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
exports.CurrencySetting = CurrencySetting = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'currency_settings', timestamps: true, underscored: true })
], CurrencySetting);


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeliveryOrderItem = exports.DeliveryOrder = void 0;
const sequelize_typescript_1 = __webpack_require__(13);
const customer_model_1 = __webpack_require__(27);
const supplier_model_1 = __webpack_require__(19);
const quotation_model_1 = __webpack_require__(55);
const pos_user_model_1 = __webpack_require__(12);
let DeliveryOrder = class DeliveryOrder extends sequelize_typescript_1.Model {
    quotation;
    customer;
    supplier;
    createdByUser;
    items;
};
exports.DeliveryOrder = DeliveryOrder;
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
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_REPOSITORY = void 0;
const brand_repository_1 = __webpack_require__(60);
const pos_user_repository_1 = __webpack_require__(61);
const category_repository_1 = __webpack_require__(62);
const unit_repository_1 = __webpack_require__(63);
const product_repository_1 = __webpack_require__(64);
const batch_repository_1 = __webpack_require__(65);
const supplier_repository_1 = __webpack_require__(66);
const purchase_repository_1 = __webpack_require__(67);
const purchase_item_repository_1 = __webpack_require__(68);
const customer_repository_1 = __webpack_require__(69);
const customer_payment_repository_1 = __webpack_require__(70);
const udhaar_transaction_repository_1 = __webpack_require__(71);
const sale_repository_1 = __webpack_require__(72);
const sale_item_repository_1 = __webpack_require__(73);
const sale_return_repository_1 = __webpack_require__(74);
const stock_adjustment_repository_1 = __webpack_require__(75);
const expense_repository_1 = __webpack_require__(76);
const audit_log_repository_1 = __webpack_require__(77);
const fbr_invoice_log_repository_1 = __webpack_require__(78);
const sale_payment_repository_1 = __webpack_require__(79);
const discount_rule_repository_1 = __webpack_require__(80);
const loyalty_points_log_repository_1 = __webpack_require__(81);
const supplier_ledger_transaction_repository_1 = __webpack_require__(82);
const supplier_payment_repository_1 = __webpack_require__(83);
const purchase_return_repository_1 = __webpack_require__(84);
const pos_role_repository_1 = __webpack_require__(85);
const pos_permission_repository_1 = __webpack_require__(86);
const pos_role_permission_repository_1 = __webpack_require__(87);
const pos_user_role_repository_1 = __webpack_require__(88);
const product_variant_repository_1 = __webpack_require__(89);
const supplier_order_repository_1 = __webpack_require__(90);
const project_repository_1 = __webpack_require__(91);
const service_repository_1 = __webpack_require__(92);
const quotation_repository_1 = __webpack_require__(93);
const currency_setting_repository_1 = __webpack_require__(94);
const delivery_order_repository_1 = __webpack_require__(95);
const company_repository_1 = __webpack_require__(96);
exports.ALL_REPOSITORY = [
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
];


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BrandRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const brand_model_1 = __webpack_require__(16);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
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
};
exports.PosUserRepository = PosUserRepository;
exports.PosUserRepository = PosUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_user_model_1.PosUser)),
    __metadata("design:paramtypes", [Object])
], PosUserRepository);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const category_model_1 = __webpack_require__(14);
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
/* 63 */
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
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const unit_model_1 = __webpack_require__(15);
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
/* 64 */
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
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const product_model_1 = __webpack_require__(17);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const batch_model_1 = __webpack_require__(18);
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
/* 66 */
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
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const supplier_model_1 = __webpack_require__(19);
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
exports.PurchaseRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const purchase_model_1 = __webpack_require__(20);
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
exports.PurchaseItemRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const purchase_item_model_1 = __webpack_require__(21);
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
exports.CustomerRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const customer_model_1 = __webpack_require__(27);
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
exports.CustomerPaymentRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const customer_payment_model_1 = __webpack_require__(35);
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
exports.UdhaarTransactionRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const udhaar_transaction_model_1 = __webpack_require__(33);
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
exports.SaleRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const sale_model_1 = __webpack_require__(28);
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
exports.SaleItemRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const sale_item_model_1 = __webpack_require__(29);
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
exports.SaleReturnRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const sale_return_model_1 = __webpack_require__(32);
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
exports.StockAdjustmentRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const stock_adjustment_model_1 = __webpack_require__(36);
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
exports.ExpenseRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const expense_model_1 = __webpack_require__(37);
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
exports.AuditLogRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const audit_log_model_1 = __webpack_require__(38);
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
exports.FbrInvoiceLogRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const fbr_invoice_log_model_1 = __webpack_require__(39);
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
exports.SalePaymentRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const sale_payment_model_1 = __webpack_require__(31);
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
exports.DiscountRuleRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const discount_rule_model_1 = __webpack_require__(30);
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
exports.LoyaltyPointsLogRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const loyalty_points_log_model_1 = __webpack_require__(34);
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
exports.SupplierLedgerTransactionRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const supplier_ledger_transaction_model_1 = __webpack_require__(41);
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
exports.SupplierPaymentRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const supplier_payment_model_1 = __webpack_require__(26);
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
exports.PurchaseReturnRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const purchase_return_model_1 = __webpack_require__(25);
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
exports.PosRoleRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_role_model_1 = __webpack_require__(46);
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
exports.PosPermissionRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_permission_model_1 = __webpack_require__(47);
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
exports.PosRolePermissionRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_role_permission_model_1 = __webpack_require__(48);
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
exports.PosUserRoleRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_user_role_model_1 = __webpack_require__(49);
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
exports.ProductVariantRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const product_variant_model_1 = __webpack_require__(22);
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
exports.SupplierOrderItemRepository = exports.SupplierOrderRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const supplier_order_model_1 = __webpack_require__(52);
const supplier_order_model_2 = __webpack_require__(52);
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
exports.ProjectRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const project_model_1 = __webpack_require__(53);
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
exports.ServiceRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const service_model_1 = __webpack_require__(54);
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
exports.QuotationStatusLogRepository = exports.QuotationPaymentTransactionRepository = exports.QuotationItemRepository = exports.QuotationRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const quotation_model_1 = __webpack_require__(55);
const quotation_model_2 = __webpack_require__(55);
const quotation_model_3 = __webpack_require__(55);
const quotation_model_4 = __webpack_require__(55);
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
exports.CurrencySettingRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const currency_setting_model_1 = __webpack_require__(57);
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
exports.DeliveryOrderItemRepository = exports.DeliveryOrderRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const delivery_order_model_1 = __webpack_require__(58);
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
exports.CompanyRepository = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const company_model_1 = __webpack_require__(56);
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
/* 97 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const cron_user_service_1 = __webpack_require__(99);
const batch_model_1 = __webpack_require__(18);
const product_model_1 = __webpack_require__(17);
const customer_model_1 = __webpack_require__(27);
const sale_model_1 = __webpack_require__(28);
const expense_model_1 = __webpack_require__(37);
const sms_whatsapp_log_model_1 = __webpack_require__(44);
const udhaar_transaction_model_1 = __webpack_require__(33);
const supplier_model_1 = __webpack_require__(19);
const purchase_model_1 = __webpack_require__(20);
const reorder_alert_model_1 = __webpack_require__(51);
const store_setting_model_1 = __webpack_require__(42);
const pos_gateway_module_1 = __webpack_require__(106);
const pos_notifications_module_1 = __webpack_require__(107);
const pos_inventory_forecast_module_1 = __webpack_require__(111);
let CronModule = class CronModule {
};
exports.CronModule = CronModule;
exports.CronModule = CronModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                batch_model_1.Batch, product_model_1.Product, customer_model_1.Customer, sale_model_1.Sale, expense_model_1.Expense,
                sms_whatsapp_log_model_1.SmsWhatsappLog, udhaar_transaction_model_1.UdhaarTransaction,
                supplier_model_1.Supplier, purchase_model_1.Purchase, reorder_alert_model_1.ReorderAlert, store_setting_model_1.StoreSetting,
            ]),
            pos_gateway_module_1.PosGatewayModule,
            pos_notifications_module_1.PosNotificationsModule,
            pos_inventory_forecast_module_1.PosInventoryForecastModule,
        ],
        providers: [cron_user_service_1.CronService],
    })
], CronModule);


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
var CronService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronService = void 0;
const common_1 = __webpack_require__(6);
const schedule_1 = __webpack_require__(97);
const sequelize_1 = __webpack_require__(100);
const sequelize_2 = __webpack_require__(8);
const batch_model_1 = __webpack_require__(18);
const product_model_1 = __webpack_require__(17);
const customer_model_1 = __webpack_require__(27);
const sale_model_1 = __webpack_require__(28);
const expense_model_1 = __webpack_require__(37);
const sms_whatsapp_log_model_1 = __webpack_require__(44);
const udhaar_transaction_model_1 = __webpack_require__(33);
const supplier_model_1 = __webpack_require__(19);
const purchase_model_1 = __webpack_require__(20);
const reorder_alert_model_1 = __webpack_require__(51);
const store_setting_model_1 = __webpack_require__(42);
const pos_gateway_1 = __webpack_require__(101);
const sms_service_1 = __webpack_require__(104);
const pos_inventory_forecast_service_1 = __webpack_require__(105);
let CronService = CronService_1 = class CronService {
    batchModel;
    productModel;
    customerModel;
    saleModel;
    expenseModel;
    smsLogModel;
    udhaarTransactionModel;
    posGateway;
    smsService;
    supplierModel;
    purchaseModel;
    reorderAlertModel;
    storeSettingModel;
    forecastService;
    logger = new common_1.Logger(CronService_1.name);
    constructor(batchModel, productModel, customerModel, saleModel, expenseModel, smsLogModel, udhaarTransactionModel, posGateway, smsService, supplierModel, purchaseModel, reorderAlertModel, storeSettingModel, forecastService) {
        this.batchModel = batchModel;
        this.productModel = productModel;
        this.customerModel = customerModel;
        this.saleModel = saleModel;
        this.expenseModel = expenseModel;
        this.smsLogModel = smsLogModel;
        this.udhaarTransactionModel = udhaarTransactionModel;
        this.posGateway = posGateway;
        this.smsService = smsService;
        this.supplierModel = supplierModel;
        this.purchaseModel = purchaseModel;
        this.reorderAlertModel = reorderAlertModel;
        this.storeSettingModel = storeSettingModel;
        this.forecastService = forecastService;
    }
    async getOwnerPhone() {
        try {
            const setting = await this.storeSettingModel.findOne({ attributes: ['phone'] });
            if (setting?.phone)
                return setting.phone;
        }
        catch { }
        return process.env.OWNER_PHONE || '';
    }
    async handleDailySummary() {
        this.logger.log('[CRON] Running daily summary...');
        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const dateStr = yesterday.toISOString().split('T')[0];
            const sales = await this.saleModel.findAll({
                where: {
                    isHeld: false,
                    createdAt: { [sequelize_1.Op.between]: [`${dateStr} 00:00:00`, `${dateStr} 23:59:59`] },
                },
            });
            const expenses = await this.expenseModel.findAll({ where: { expenseDate: dateStr } });
            const totalRevenue = sales.reduce((s, r) => s + Number(r.total), 0);
            const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
            this.logger.log(`[CRON] Daily Summary ${dateStr}: Sales=${sales.length}, Revenue=PKR ${totalRevenue}, Expenses=PKR ${totalExpenses}, Net=PKR ${totalRevenue - totalExpenses}`);
            const ownerPhone = await this.getOwnerPhone();
            if (ownerPhone) {
                await this.smsService.send({
                    channel: 'whatsapp',
                    to: ownerPhone,
                    message: `Daily Summary ${dateStr}\nSales: ${sales.length}\nRevenue: PKR ${totalRevenue.toFixed(2)}\nExpenses: PKR ${totalExpenses.toFixed(2)}\nNet Profit: PKR ${(totalRevenue - totalExpenses).toFixed(2)}`,
                    refType: 'daily_summary',
                });
            }
        }
        catch (err) {
            this.logger.error('[CRON] Daily summary failed', err);
        }
    }
    async handleMorningAlerts() {
        this.logger.log('[CRON] Running morning alerts...');
        await this.checkExpiryAlerts();
        await this.checkLowStockAlerts();
        await this.checkUdhaarOverdue();
        await this.checkSupplierCreditDue();
    }
    async checkExpiryAlerts() {
        try {
            const days = Number(process.env.EXPIRY_ALERT_DAYS || 30);
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + days);
            const batches = await this.batchModel.findAll({
                where: {
                    status: 'active',
                    expiryDate: { [sequelize_1.Op.lte]: targetDate.toISOString().split('T')[0] },
                },
                include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] }],
            });
            for (const batch of batches) {
                const expiryDate = batch.expiryDate;
                const daysLeft = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                this.posGateway.broadcastExpiryAlert({
                    product_id: batch.productId,
                    batch_id: batch.id,
                    expiry_date: expiryDate,
                    days_left: daysLeft,
                });
                this.logger.warn(`[CRON] Expiry alert: Product ${batch.productId}, Batch ${batch.id}, Days left: ${daysLeft}`);
            }
            if (batches.length > 0) {
                const itemList = batches
                    .map(b => `- ${b.product?.name || `Product #${b.productId}`} (Batch ${b.id}, Expiry: ${b.expiryDate})`)
                    .join('\n');
                const ownerPhone = await this.getOwnerPhone();
                if (ownerPhone) {
                    await this.smsService.send({
                        channel: 'whatsapp',
                        to: ownerPhone,
                        message: `Expiry Alert: ${batches.length} batch(es) expiring within ${days} days:\n${itemList}`,
                        refType: 'expiry_alert',
                    });
                }
            }
        }
        catch (err) {
            this.logger.error('[CRON] Expiry check failed', err);
        }
    }
    async checkLowStockAlerts() {
        try {
            const products = await this.productModel.findAll({
                include: [{ model: batch_model_1.Batch, where: { status: 'active' }, required: false }],
            });
            const lowStockProducts = [];
            for (const product of products) {
                const batches = product.batches || [];
                const totalStock = batches.reduce((sum, b) => sum + Number(b.remainingQty), 0);
                const threshold = Number(product.lowStockThreshold || 0);
                if (totalStock <= threshold) {
                    this.posGateway.broadcastLowStockAlert({
                        product_id: product.id,
                        product_name: product.name,
                        current_stock: totalStock,
                        threshold,
                    });
                    this.logger.warn(`[CRON] Low stock: ${product.name} — ${totalStock} remaining (threshold: ${threshold})`);
                    lowStockProducts.push({ name: product.name, stock: totalStock, threshold });
                }
            }
            if (lowStockProducts.length > 0) {
                const itemList = lowStockProducts
                    .map(p => `- ${p.name}: ${p.stock} left (min: ${p.threshold})`)
                    .join('\n');
                const ownerPhone = await this.getOwnerPhone();
                if (ownerPhone) {
                    await this.smsService.send({
                        channel: 'whatsapp',
                        to: ownerPhone,
                        message: `Low Stock Alert: ${lowStockProducts.length} product(s) below threshold:\n${itemList}`,
                        refType: 'low_stock_alert',
                    });
                }
            }
        }
        catch (err) {
            this.logger.error('[CRON] Low stock check failed', err);
        }
    }
    async checkUdhaarOverdue() {
        try {
            const overdueDays = Number(process.env.UDHAAR_OVERDUE_DAYS || 7);
            const customers = await this.customerModel.findAll({
                where: { udhaarBalance: { [sequelize_1.Op.gt]: 0 } },
            });
            for (const customer of customers) {
                const lastDebit = await this.udhaarTransactionModel.findOne({
                    where: { customerId: customer.id, type: 'debit' },
                    order: [['createdAt', 'DESC']],
                });
                const lastActivityDate = lastDebit
                    ? new Date(lastDebit.createdAt)
                    : new Date(customer.createdAt);
                const overdueDaysActual = Math.ceil((Date.now() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));
                if (overdueDaysActual < overdueDays)
                    continue;
                this.posGateway.broadcastUdhaarOverdue({
                    customer_id: customer.id,
                    name: customer.name,
                    balance: Number(customer.udhaarBalance),
                    overdue_days: overdueDaysActual,
                });
                await this.smsService.send({
                    channel: 'sms',
                    to: customer.phone,
                    message: `Dear ${customer.name}, your outstanding balance is PKR ${customer.udhaarBalance}. Please clear at your earliest. - Zohaib General Store`,
                    refId: customer.id,
                    refType: 'udhaar_reminder',
                });
            }
            this.logger.log(`[CRON] Udhaar overdue: ${customers.length} customers checked`);
        }
        catch (err) {
            this.logger.error('[CRON] Udhaar overdue check failed', err);
        }
    }
    async checkSupplierCreditDue() {
        try {
            const suppliers = await this.supplierModel.unscoped().findAll({
                where: { outstandingBalance: { [sequelize_1.Op.gt]: 0 }, creditDays: { [sequelize_1.Op.gt]: 0 } },
            });
            const overdue = [];
            for (const supplier of suppliers) {
                const oldestPurchase = await this.purchaseModel.findOne({
                    where: {
                        supplierId: supplier.id,
                        status: { [sequelize_1.Op.in]: ['pending', 'partial'] },
                    },
                    order: [['purchaseDate', 'ASC']],
                });
                if (!oldestPurchase)
                    continue;
                const purchaseDate = new Date(oldestPurchase.purchaseDate || oldestPurchase.createdAt);
                const dueDate = new Date(purchaseDate);
                dueDate.setDate(dueDate.getDate() + supplier.creditDays);
                const daysOverdue = Math.ceil((Date.now() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                if (daysOverdue >= 0) {
                    const msg = `${supplier.name}: PKR ${supplier.outstandingBalance} due (${daysOverdue} days overdue)`;
                    overdue.push(msg);
                    this.logger.warn(`[CRON] Supplier credit overdue: ${msg}`);
                    this.posGateway.broadcast('supplier_credit_overdue', {
                        supplierId: supplier.id,
                        name: supplier.name,
                        outstandingBalance: supplier.outstandingBalance,
                        daysOverdue,
                        dueDate: dueDate.toISOString().split('T')[0],
                    });
                }
            }
            if (overdue.length > 0) {
                const ownerPhone = await this.getOwnerPhone();
                if (ownerPhone) {
                    await this.smsService.send({
                        channel: 'whatsapp',
                        to: ownerPhone,
                        message: `Supplier Credit Due Alert:\n${overdue.join('\n')}`,
                        refType: 'supplier_credit_due',
                    });
                }
            }
        }
        catch (err) {
            this.logger.error('[CRON] Supplier credit due check failed', err);
        }
    }
    async handleInventoryReorder() {
        this.logger.log('[CRON] Running inventory reorder forecast...');
        try {
            const { alerts, needsReorder } = await this.forecastService.runForecast(Number(process.env.REORDER_LEAD_TIME_DAYS || 7), Number(process.env.REORDER_SAFETY_STOCK_DAYS || 3));
            if (needsReorder > 0) {
                const itemList = alerts.slice(0, 10)
                    .map(a => `- ${a.productName}: ${a.currentStock} left, suggest order ${a.suggestedQty}`)
                    .join('\n');
                const more = alerts.length > 10 ? `\n...and ${alerts.length - 10} more` : '';
                const ownerPhone = await this.getOwnerPhone();
                if (ownerPhone) {
                    await this.smsService.send({
                        channel: 'whatsapp',
                        to: ownerPhone,
                        message: `Reorder Alert: ${needsReorder} product(s) need restocking:\n${itemList}${more}`,
                        refType: 'reorder_alert',
                    });
                }
                this.posGateway.broadcastReorderAlerts({ count: needsReorder, alerts: alerts.slice(0, 5) });
            }
        }
        catch (err) {
            this.logger.error('[CRON] Inventory reorder forecast failed', err);
        }
    }
    async handleWeeklyCleanup() {
        this.logger.log('[CRON] Running weekly cleanup...');
        try {
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - 90);
            const deleted = await this.smsLogModel.destroy({ where: { createdAt: { [sequelize_1.Op.lt]: cutoff } } });
            this.logger.log(`[CRON] Cleaned ${deleted} old SMS logs`);
        }
        catch (err) {
            this.logger.error('[CRON] Weekly cleanup failed', err);
        }
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)('5 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleDailySummary", null);
__decorate([
    (0, schedule_1.Cron)('0 8 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleMorningAlerts", null);
__decorate([
    (0, schedule_1.Cron)('0 9 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleInventoryReorder", null);
__decorate([
    (0, schedule_1.Cron)('0 2 * * 0'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleWeeklyCleanup", null);
exports.CronService = CronService = CronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_2.InjectModel)(batch_model_1.Batch)),
    __param(1, (0, sequelize_2.InjectModel)(product_model_1.Product)),
    __param(2, (0, sequelize_2.InjectModel)(customer_model_1.Customer)),
    __param(3, (0, sequelize_2.InjectModel)(sale_model_1.Sale)),
    __param(4, (0, sequelize_2.InjectModel)(expense_model_1.Expense)),
    __param(5, (0, sequelize_2.InjectModel)(sms_whatsapp_log_model_1.SmsWhatsappLog)),
    __param(6, (0, sequelize_2.InjectModel)(udhaar_transaction_model_1.UdhaarTransaction)),
    __param(9, (0, sequelize_2.InjectModel)(supplier_model_1.Supplier)),
    __param(10, (0, sequelize_2.InjectModel)(purchase_model_1.Purchase)),
    __param(11, (0, sequelize_2.InjectModel)(reorder_alert_model_1.ReorderAlert)),
    __param(12, (0, sequelize_2.InjectModel)(store_setting_model_1.StoreSetting)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, typeof (_a = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _a : Object, typeof (_b = typeof sms_service_1.SmsService !== "undefined" && sms_service_1.SmsService) === "function" ? _b : Object, Object, Object, Object, Object, typeof (_c = typeof pos_inventory_forecast_service_1.PosInventoryForecastService !== "undefined" && pos_inventory_forecast_service_1.PosInventoryForecastService) === "function" ? _c : Object])
], CronService);


/***/ }),
/* 100 */
/***/ ((module) => {

module.exports = require("sequelize");

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
var PosGateway_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosGateway = void 0;
const websockets_1 = __webpack_require__(102);
const socket_io_1 = __webpack_require__(103);
const common_1 = __webpack_require__(6);
let PosGateway = PosGateway_1 = class PosGateway {
    server;
    logger = new common_1.Logger(PosGateway_1.name);
    handleConnection(client) {
        this.logger.log(`POS terminal connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`POS terminal disconnected: ${client.id}`);
    }
    handleJoinTerminal(terminalId, client) {
        client.join(`terminal_${terminalId}`);
        this.logger.log(`Client ${client.id} joined terminal room: ${terminalId}`);
        return { joined: terminalId };
    }
    handleScaleReading(data, _client) {
        this.logger.log(`[SCALE] Terminal ${data.terminalId}: ${data.weight}${data.unit} for product ${data.productId ?? 'unknown'}`);
        this.server.to(`terminal_${data.terminalId}`).emit('scale_update', {
            productId: data.productId,
            weight: data.weight,
            unit: data.unit,
            timestamp: Date.now(),
        });
        return { received: true };
    }
    broadcastStockUpdate(data) {
        this.server.emit('stock_update', data);
    }
    broadcastSaleProcessed(data) {
        this.server.emit('sale_processed', data);
    }
    broadcastReturnProcessed(data) {
        this.server.emit('return_processed', data);
    }
    broadcastExpiryAlert(data) {
        this.server.emit('expiry_alert', data);
    }
    broadcastLowStockAlert(data) {
        this.server.emit('low_stock_alert', data);
    }
    broadcastUdhaarOverdue(data) {
        this.server.emit('udhaar_overdue', data);
    }
    broadcast(event, data) {
        this.server.emit(event, data);
    }
    broadcastReorderAlerts(data) {
        this.server.emit('reorder_alerts', data);
    }
    broadcastSupplierCreditOverdue(data) {
        this.server.emit('supplier_credit_overdue', data);
    }
};
exports.PosGateway = PosGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], PosGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_terminal'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PosGateway.prototype, "handleJoinTerminal", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('scale_reading'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], PosGateway.prototype, "handleScaleReading", null);
exports.PosGateway = PosGateway = PosGateway_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        namespace: '/pos',
    })
], PosGateway);


/***/ }),
/* 102 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 103 */
/***/ ((module) => {

module.exports = require("socket.io");

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
var SmsService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const sms_whatsapp_log_model_1 = __webpack_require__(44);
let SmsService = SmsService_1 = class SmsService {
    logModel;
    logger = new common_1.Logger(SmsService_1.name);
    constructor(logModel) {
        this.logModel = logModel;
    }
    async send(opts) {
        const log = await this.logModel.create({
            channel: opts.channel,
            recipientPhone: opts.to,
            message: opts.message,
            status: 'pending',
            refId: opts.refId,
            refType: opts.refType,
        });
        try {
            if (opts.channel === 'whatsapp') {
                await this.sendWhatsApp(opts.to, opts.message);
            }
            else {
                await this.sendSms(opts.to, opts.message);
            }
            await log.update({ status: 'sent', sentAt: new Date() });
            this.logger.log(`[SMS] ✓ ${opts.channel} sent to ${opts.to}`);
        }
        catch (err) {
            await log.update({ status: 'failed', errorMessage: err.message });
            this.logger.error(`[SMS] ✗ ${opts.channel} failed to ${opts.to}: ${err.message}`);
        }
    }
    async sendSms(to, body) {
        const provider = process.env.SMS_PROVIDER || 'twilio';
        if (provider === 'jazz') {
            await this.sendJazzSms(to, body);
            return;
        }
        const sid = process.env.TWILIO_ACCOUNT_SID;
        const token = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_FROM_NUMBER;
        if (!sid || !token || !from) {
            this.logger.warn('[SMS] Twilio credentials not configured — skipping send');
            return;
        }
        const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
        const params = new URLSearchParams({ To: to, From: from, Body: body });
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Twilio SMS error ${response.status}: ${err}`);
        }
    }
    async sendJazzSms(to, message) {
        const apiUrl = process.env.JAZZ_SMS_URL;
        const username = process.env.JAZZ_SMS_USERNAME;
        const password = process.env.JAZZ_SMS_PASSWORD;
        const mask = process.env.JAZZ_SMS_MASK || 'QuickShop';
        if (!apiUrl || !username || !password) {
            this.logger.warn('[SMS] Jazz SMS credentials not configured — skipping send');
            return;
        }
        const params = new URLSearchParams({ username, password, to, message, mask });
        const response = await fetch(`${apiUrl}?${params.toString()}`, { method: 'GET' });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Jazz SMS error ${response.status}: ${err}`);
        }
    }
    async sendWhatsApp(to, body) {
        const sid = process.env.TWILIO_ACCOUNT_SID;
        const token = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
        if (!sid || !token) {
            this.logger.warn('[WhatsApp] Twilio credentials not configured — skipping send');
            return;
        }
        const whatsappTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
        const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
        const params = new URLSearchParams({ To: whatsappTo, From: from, Body: body });
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Twilio WhatsApp error ${response.status}: ${err}`);
        }
    }
    async retryPending() {
        const pending = await this.logModel.findAll({ where: { status: 'pending' }, limit: 50 });
        for (const log of pending) {
            await this.send({
                channel: log.channel,
                to: log.recipientPhone,
                message: log.message,
                refId: log.refId,
                refType: log.refType,
            });
        }
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = SmsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sms_whatsapp_log_model_1.SmsWhatsappLog)),
    __metadata("design:paramtypes", [Object])
], SmsService);


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
var PosInventoryForecastService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosInventoryForecastService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const sequelize_2 = __webpack_require__(100);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const sale_item_model_1 = __webpack_require__(29);
const sale_model_1 = __webpack_require__(28);
const reorder_alert_model_1 = __webpack_require__(51);
let PosInventoryForecastService = PosInventoryForecastService_1 = class PosInventoryForecastService {
    productModel;
    batchModel;
    saleModel;
    reorderAlertModel;
    logger = new common_1.Logger(PosInventoryForecastService_1.name);
    constructor(productModel, batchModel, saleModel, reorderAlertModel) {
        this.productModel = productModel;
        this.batchModel = batchModel;
        this.saleModel = saleModel;
        this.reorderAlertModel = reorderAlertModel;
    }
    async getAvgDailySales(productId, days = 30) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const sales = await this.saleModel.findAll({
            where: { isHeld: false, createdAt: { [sequelize_2.Op.gte]: fromDate } },
            include: [{
                    model: sale_item_model_1.SaleItem,
                    where: { productId },
                    required: true,
                }],
        });
        const totalQty = sales.reduce((sum, sale) => {
            const items = sale.saleItems || [];
            return sum + items.reduce((s, i) => s + Number(i.qty), 0);
        }, 0);
        return totalQty / days;
    }
    async getCurrentStock(productId) {
        const batches = await this.batchModel.findAll({
            where: { productId, status: 'active' },
            attributes: ['remainingQty'],
        });
        return batches.reduce((sum, b) => sum + Number(b.remainingQty), 0);
    }
    async runForecast(leadTimeDays = 7, safetyStockDays = 3) {
        try {
            const products = await this.productModel.findAll({ where: { isActive: true } });
            const alerts = [];
            for (const product of products) {
                const currentStock = await this.getCurrentStock(product.id);
                const avgDailySales = await this.getAvgDailySales(product.id, 30);
                if (avgDailySales <= 0)
                    continue;
                const reorderPoint = avgDailySales * (leadTimeDays + safetyStockDays);
                const suggestedQty = Math.ceil(avgDailySales * 30);
                if (currentStock <= reorderPoint) {
                    const existing = await this.reorderAlertModel.findOne({
                        where: { productId: product.id, status: 'pending' },
                    });
                    if (!existing) {
                        const alert = await this.reorderAlertModel.create({
                            productId: product.id,
                            currentStock,
                            reorderPoint,
                            suggestedQty,
                            avgDailySales,
                            leadTimeDays,
                            status: 'pending',
                        });
                        alerts.push({ ...alert.toJSON(), productName: product.name, barcode: product.barcode });
                    }
                    else {
                        await existing.update({ currentStock, reorderPoint, suggestedQty, avgDailySales });
                        alerts.push({ ...existing.toJSON(), productName: product.name, barcode: product.barcode });
                    }
                }
            }
            this.logger.log(`[FORECAST] ${alerts.length} products need reorder out of ${products.length}`);
            return { alerts, totalProducts: products.length, needsReorder: alerts.length };
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async getPendingAlerts() {
        return this.reorderAlertModel.findAll({
            include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] }],
            order: [['createdAt', 'DESC']],
        });
    }
    async acknowledgeAlert(alertId, status) {
        const alert = await this.reorderAlertModel.findByPk(alertId);
        if (!alert)
            throw new common_1.BadRequestException('ALERT_NOT_FOUND');
        await alert.update({ status, acknowledgedAt: new Date() });
        return alert;
    }
    async getProductForecast(productId) {
        const currentStock = await this.getCurrentStock(productId);
        const avgDailySales = await this.getAvgDailySales(productId, 30);
        const daysOfStockLeft = avgDailySales > 0 ? Math.floor(currentStock / avgDailySales) : 999;
        const reorderPoint = avgDailySales * 10;
        return {
            productId,
            currentStock,
            avgDailySales: Math.round(avgDailySales * 100) / 100,
            daysOfStockLeft,
            reorderPoint,
            needsReorder: currentStock <= reorderPoint,
        };
    }
    async getFifoValuation() {
        try {
            const products = await this.productModel.findAll({
                where: { isActive: true },
                include: [{
                        model: batch_model_1.Batch,
                        where: { status: 'active' },
                        required: false,
                        order: [['createdAt', 'ASC']],
                    }],
            });
            let totalInventoryValue = 0;
            let totalUnits = 0;
            const result = [];
            for (const product of products) {
                const batches = product.batches || [];
                if (batches.length === 0)
                    continue;
                let productValue = 0;
                let productUnits = 0;
                const batchBreakdown = [];
                for (const batch of batches) {
                    const qty = Number(batch.remainingQty);
                    const cost = Number(batch.purchasePrice);
                    const value = qty * cost;
                    productValue += value;
                    productUnits += qty;
                    batchBreakdown.push({
                        batchId: batch.id,
                        batchNumber: batch.batchNumber,
                        qty,
                        purchasePrice: cost,
                        value,
                        expiryDate: batch.expiryDate,
                    });
                }
                totalInventoryValue += productValue;
                totalUnits += productUnits;
                result.push({
                    productId: product.id,
                    name: product.name,
                    barcode: product.barcode,
                    totalUnits: productUnits,
                    totalValue: productValue,
                    avgCost: productUnits > 0 ? productValue / productUnits : 0,
                    batches: batchBreakdown,
                });
            }
            return {
                products: result.sort((a, b) => b.totalValue - a.totalValue),
                totalInventoryValue,
                totalUnits,
            };
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
};
exports.PosInventoryForecastService = PosInventoryForecastService;
exports.PosInventoryForecastService = PosInventoryForecastService = PosInventoryForecastService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(1, (0, sequelize_1.InjectModel)(batch_model_1.Batch)),
    __param(2, (0, sequelize_1.InjectModel)(sale_model_1.Sale)),
    __param(3, (0, sequelize_1.InjectModel)(reorder_alert_model_1.ReorderAlert)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], PosInventoryForecastService);


/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosGatewayModule = void 0;
const common_1 = __webpack_require__(6);
const pos_gateway_1 = __webpack_require__(101);
let PosGatewayModule = class PosGatewayModule {
};
exports.PosGatewayModule = PosGatewayModule;
exports.PosGatewayModule = PosGatewayModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [pos_gateway_1.PosGateway],
        exports: [pos_gateway_1.PosGateway],
    })
], PosGatewayModule);


/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosNotificationsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_notification_model_1 = __webpack_require__(50);
const sms_whatsapp_log_model_1 = __webpack_require__(44);
const pos_notifications_controller_1 = __webpack_require__(108);
const pos_notifications_service_1 = __webpack_require__(109);
const sms_service_1 = __webpack_require__(104);
let PosNotificationsModule = class PosNotificationsModule {
};
exports.PosNotificationsModule = PosNotificationsModule;
exports.PosNotificationsModule = PosNotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([pos_notification_model_1.PosNotification, sms_whatsapp_log_model_1.SmsWhatsappLog])],
        controllers: [pos_notifications_controller_1.PosNotificationsController],
        providers: [pos_notifications_service_1.PosNotificationsService, sms_service_1.SmsService],
        exports: [sms_service_1.SmsService],
    })
], PosNotificationsModule);


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosNotificationsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_notifications_service_1 = __webpack_require__(109);
const pos_patterns_1 = __webpack_require__(110);
let PosNotificationsController = class PosNotificationsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'NOTIFICATION_GET_ALL_ERROR', status: 400 });
        }
    }
    async markRead(id) {
        try {
            return await this.service.markRead(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'NOTIFICATION_MARK_READ_ERROR', status: 400 });
        }
    }
    async markAllRead(userId) {
        try {
            return await this.service.markAllRead(userId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'NOTIFICATION_MARK_ALL_READ_ERROR', status: 400 });
        }
    }
};
exports.PosNotificationsController = PosNotificationsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.NOTIFICATION.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosNotificationsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.NOTIFICATION.MARK_READ),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosNotificationsController.prototype, "markRead", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.NOTIFICATION.MARK_ALL_READ),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosNotificationsController.prototype, "markAllRead", null);
exports.PosNotificationsController = PosNotificationsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_notifications_service_1.PosNotificationsService !== "undefined" && pos_notifications_service_1.PosNotificationsService) === "function" ? _a : Object])
], PosNotificationsController);


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
exports.PosNotificationsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_notification_model_1 = __webpack_require__(50);
let PosNotificationsService = class PosNotificationsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async getAll(data) {
        try {
            const where = { userId: data.userId };
            if (data.isRead !== undefined)
                where.isRead = data.isRead;
            const limit = data.size || 20;
            const offset = ((data.page || 1) - 1) * limit;
            const result = await this.model.findAndCountAll({ where, limit, offset, order: [['createdAt', 'DESC']] });
            return {
                data: result.rows.map(r => r.toJSON()),
                page: data.page || 1,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async markRead(id) {
        try {
            const notif = await this.model.findByPk(id);
            if (!notif)
                throw new common_1.BadRequestException('NOTIFICATION_NOT_FOUND');
            await notif.update({ isRead: true });
            return { id, isRead: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async markAllRead(userId) {
        try {
            await this.model.update({ isRead: true }, { where: { userId, isRead: false } });
            return { updated: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosNotificationsService = PosNotificationsService;
exports.PosNotificationsService = PosNotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pos_notification_model_1.PosNotification)),
    __metadata("design:paramtypes", [Object])
], PosNotificationsService);


/***/ }),
/* 110 */
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
    },
    PURCHASE_RETURN: {
        CREATE: { cmd: 'purchase_return_create' },
        GET_ALL: { cmd: 'purchase_return_get_all' },
        UPDATE_STATUS: { cmd: 'purchase_return_update_status' },
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
        GET_INVOICE: { cmd: 'quotation_get_invoice' },
        RECORD_PAYMENT: { cmd: 'quotation_record_payment' },
        RETURN_PAYMENT: { cmd: 'quotation_return_payment' },
    },
    DELIVERY_ORDER: {
        CREATE: { cmd: 'delivery_order_create' },
        GET_ALL: { cmd: 'delivery_order_get_all' },
        GET_ONE: { cmd: 'delivery_order_get_one' },
        GENERATE_INVOICE: { cmd: 'delivery_order_generate_invoice' },
        DELETE: { cmd: 'delivery_order_delete' },
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
};


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosInventoryForecastModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const sale_model_1 = __webpack_require__(28);
const reorder_alert_model_1 = __webpack_require__(51);
const pos_inventory_forecast_service_1 = __webpack_require__(105);
const pos_inventory_forecast_controller_1 = __webpack_require__(112);
let PosInventoryForecastModule = class PosInventoryForecastModule {
};
exports.PosInventoryForecastModule = PosInventoryForecastModule;
exports.PosInventoryForecastModule = PosInventoryForecastModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([product_model_1.Product, batch_model_1.Batch, sale_model_1.Sale, reorder_alert_model_1.ReorderAlert])],
        controllers: [pos_inventory_forecast_controller_1.PosInventoryForecastController],
        providers: [pos_inventory_forecast_service_1.PosInventoryForecastService],
        exports: [pos_inventory_forecast_service_1.PosInventoryForecastService],
    })
], PosInventoryForecastModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosInventoryForecastController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_inventory_forecast_service_1 = __webpack_require__(105);
const pos_patterns_1 = __webpack_require__(110);
let PosInventoryForecastController = class PosInventoryForecastController {
    service;
    constructor(service) {
        this.service = service;
    }
    async runForecast(data) {
        try {
            return await this.service.runForecast(data?.leadTimeDays, data?.safetyStockDays);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message, status: 400 });
        }
    }
    async getPendingAlerts() {
        try {
            return await this.service.getPendingAlerts();
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message, status: 400 });
        }
    }
    async acknowledgeAlert(data) {
        try {
            return await this.service.acknowledgeAlert(data.alertId, data.status);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message, status: 400 });
        }
    }
    async getProductForecast(productId) {
        try {
            return await this.service.getProductForecast(productId);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message, status: 400 });
        }
    }
    async getFifoValuation() {
        try {
            return await this.service.getFifoValuation();
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message, status: 400 });
        }
    }
};
exports.PosInventoryForecastController = PosInventoryForecastController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.RUN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PosInventoryForecastController.prototype, "runForecast", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.GET_REORDER_ALERTS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PosInventoryForecastController.prototype, "getPendingAlerts", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.ACKNOWLEDGE_ALERT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PosInventoryForecastController.prototype, "acknowledgeAlert", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.PRODUCT_FORECAST),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PosInventoryForecastController.prototype, "getProductForecast", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.INVENTORY_FORECAST.FIFO_VALUATION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PosInventoryForecastController.prototype, "getFifoValuation", null);
exports.PosInventoryForecastController = PosInventoryForecastController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_inventory_forecast_service_1.PosInventoryForecastService !== "undefined" && pos_inventory_forecast_service_1.PosInventoryForecastService) === "function" ? _a : Object])
], PosInventoryForecastController);


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosBrandsModule = void 0;
const common_1 = __webpack_require__(6);
const database_module_1 = __webpack_require__(7);
const pos_brands_controller_1 = __webpack_require__(114);
const pos_brands_service_1 = __webpack_require__(115);
let PosBrandsModule = class PosBrandsModule {
};
exports.PosBrandsModule = PosBrandsModule;
exports.PosBrandsModule = PosBrandsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_brands_controller_1.PosBrandsController],
        providers: [pos_brands_service_1.PosBrandsService],
        exports: [pos_brands_service_1.PosBrandsService],
    })
], PosBrandsModule);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosBrandsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_brands_service_1 = __webpack_require__(115);
const pos_patterns_1 = __webpack_require__(110);
let PosBrandsController = class PosBrandsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'BRAND_CREATE_ERROR', status: 400 });
        }
    }
    async getAll() {
        try {
            return await this.service.getAll();
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'BRAND_GET_ALL_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            const { id, ...rest } = data;
            return await this.service.update(id, rest);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'BRAND_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'BRAND_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosBrandsController = PosBrandsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.BRAND.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosBrandsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.BRAND.GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosBrandsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.BRAND.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosBrandsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.BRAND.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosBrandsController.prototype, "delete", null);
exports.PosBrandsController = PosBrandsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_brands_service_1.PosBrandsService !== "undefined" && pos_brands_service_1.PosBrandsService) === "function" ? _a : Object])
], PosBrandsController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosBrandsService = void 0;
const common_1 = __webpack_require__(6);
const brand_repository_1 = __webpack_require__(60);
let PosBrandsService = class PosBrandsService {
    brandRepository;
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    async create(data) {
        try {
            const brand = await this.brandRepository.create(data);
            return brand.toJSON();
        }
        catch (error) {
            const msg = error?.errors?.[0]?.message || error?.message || 'BRAND_CREATE_ERROR';
            throw new common_1.BadRequestException(msg);
        }
    }
    async getAll() {
        try {
            const brands = await this.brandRepository.findAll({
                order: [['name', 'ASC']],
            });
            return brands.map(b => b.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            const brand = await this.brandRepository.update({ where: { id } }, data);
            return brand.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            return await this.brandRepository.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosBrandsService = PosBrandsService;
exports.PosBrandsService = PosBrandsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof brand_repository_1.BrandRepository !== "undefined" && brand_repository_1.BrandRepository) === "function" ? _a : Object])
], PosBrandsService);


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUsersModule = void 0;
const common_1 = __webpack_require__(6);
const pos_users_controller_1 = __webpack_require__(117);
const pos_users_service_1 = __webpack_require__(118);
const jwt_1 = __webpack_require__(119);
const database_module_1 = __webpack_require__(7);
let PosUsersModule = class PosUsersModule {
};
exports.PosUsersModule = PosUsersModule;
exports.PosUsersModule = PosUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_users_controller_1.PosUsersController],
        providers: [pos_users_service_1.PosUsersService, jwt_1.JwtService],
    })
], PosUsersModule);


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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUsersController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_users_service_1 = __webpack_require__(118);
const pos_patterns_1 = __webpack_require__(110);
let PosUsersController = class PosUsersController {
    posUsersService;
    constructor(posUsersService) {
        this.posUsersService = posUsersService;
    }
    async create(data) {
        try {
            return await this.posUsersService.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async login(data) {
        try {
            return await this.posUsersService.login(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_LOGIN_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.posUsersService.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.posUsersService.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.posUsersService.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.posUsersService.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async refreshToken(refreshToken) {
        try {
            return await this.posUsersService.refreshToken(refreshToken);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'INVALID_REFRESH_TOKEN', status: 401 });
        }
    }
};
exports.PosUsersController = PosUsersController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosUsersController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER.LOGIN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosUsersController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosUsersController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosUsersController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosUsersController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosUsersController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER.REFRESH_TOKEN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PosUsersController.prototype, "refreshToken", null);
exports.PosUsersController = PosUsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_users_service_1.PosUsersService !== "undefined" && pos_users_service_1.PosUsersService) === "function" ? _a : Object])
], PosUsersController);


/***/ }),
/* 118 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUsersService = void 0;
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(119);
const bcrypt = __importStar(__webpack_require__(120));
const dotenv = __importStar(__webpack_require__(2));
const path_1 = __webpack_require__(3);
const pos_user_repository_1 = __webpack_require__(61);
dotenv.config({ path: (0, path_1.join)(process.cwd(), `.env.${process.env.NODE_ENV}`) });
let PosUsersService = class PosUsersService {
    posUserRepository;
    jwtService;
    constructor(posUserRepository, jwtService) {
        this.posUserRepository = posUserRepository;
        this.jwtService = jwtService;
    }
    async create(data) {
        try {
            const exists = await this.posUserRepository.findOne({ where: { email: data.email } });
            if (exists)
                throw new common_1.BadRequestException('POS_USER_ALREADY_EXISTS');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hashSync(data.password, salt);
            const user = await this.posUserRepository.create({ ...data, password: hashedPassword });
            return { id: user.id, email: user.email, name: user.name, role: user.role };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async login(data) {
        try {
            const options = {
                where: { email: data.email },
                raw: true,
            };
            const user = await this.posUserRepository.findOne(options);
            if (!user)
                throw new common_1.UnauthorizedException('POS_USER_NOT_FOUND');
            const isMatch = await bcrypt.compare(data.password, user.password);
            if (!isMatch)
                throw new common_1.UnauthorizedException('POS_USER_INVALID_CREDENTIALS');
            const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '1d', secret: `${process.env.JWT_ACCESS_SECRET}` });
            const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d', secret: `${process.env.JWT_REFRESH_SECRET || process.env.JWT_ACCESS_SECRET}` });
            return { id: user.id, name: user.name, email: user.email, role: user.role, token, refreshToken };
        }
        catch (error) {
            throw error;
        }
    }
    async getOne(id) {
        try {
            const user = await this.posUserRepository.findOne({
                where: { id },
                attributes: ['id', 'name', 'email', 'role', 'isActive'],
                raw: true,
            });
            if (!user)
                throw new common_1.BadRequestException('POS_USER_NOT_FOUND');
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const result = await this.posUserRepository.findAndCountAll({
                attributes: ['id', 'name', 'email', 'role', 'isActive'],
                raw: true,
                offset,
                limit,
            });
            return {
                data: result.rows,
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            if (data.password) {
                const salt = await bcrypt.genSalt(10);
                data.password = bcrypt.hashSync(data.password, salt);
            }
            const updated = await this.posUserRepository.update({ where: { id } }, data);
            return { id: updated.id, name: updated.name, role: updated.role };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            return await this.posUserRepository.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_ACCESS_SECRET,
            });
            const user = await this.posUserRepository.findOne({
                where: { id: payload.sub },
                attributes: ['id', 'email', 'role', 'isActive'],
                raw: true,
            });
            if (!user)
                throw new common_1.UnauthorizedException('POS_USER_NOT_FOUND');
            if (!user.isActive)
                throw new common_1.UnauthorizedException('POS_USER_INACTIVE');
            const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '1d', secret: process.env.JWT_ACCESS_SECRET });
            return { token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('INVALID_REFRESH_TOKEN');
        }
    }
};
exports.PosUsersService = PosUsersService;
exports.PosUsersService = PosUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_user_repository_1.PosUserRepository !== "undefined" && pos_user_repository_1.PosUserRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], PosUsersService);


/***/ }),
/* 119 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 120 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosCategoriesModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_categories_controller_1 = __webpack_require__(122);
const pos_categories_service_1 = __webpack_require__(123);
const database_module_1 = __webpack_require__(7);
const product_model_1 = __webpack_require__(17);
let PosCategoriesModule = class PosCategoriesModule {
};
exports.PosCategoriesModule = PosCategoriesModule;
exports.PosCategoriesModule = PosCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([product_model_1.Product])],
        controllers: [pos_categories_controller_1.PosCategoriesController],
        providers: [pos_categories_service_1.PosCategoriesService],
    })
], PosCategoriesModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosCategoriesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_categories_service_1 = __webpack_require__(123);
const pos_patterns_1 = __webpack_require__(110);
let PosCategoriesController = class PosCategoriesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CATEGORY_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CATEGORY_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CATEGORY_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getTree() {
        try {
            return await this.service.getTree();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CATEGORY_GET_TREE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CATEGORY_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CATEGORY_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosCategoriesController = PosCategoriesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CATEGORY.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosCategoriesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CATEGORY.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosCategoriesController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CATEGORY.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosCategoriesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CATEGORY.GET_TREE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosCategoriesController.prototype, "getTree", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CATEGORY.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosCategoriesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CATEGORY.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosCategoriesController.prototype, "delete", null);
exports.PosCategoriesController = PosCategoriesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_categories_service_1.PosCategoriesService !== "undefined" && pos_categories_service_1.PosCategoriesService) === "function" ? _a : Object])
], PosCategoriesController);


/***/ }),
/* 123 */
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
exports.PosCategoriesService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_typescript_1 = __webpack_require__(13);
const sequelize_1 = __webpack_require__(8);
const category_repository_1 = __webpack_require__(62);
const product_model_1 = __webpack_require__(17);
const pos_gateway_1 = __webpack_require__(101);
let PosCategoriesService = class PosCategoriesService {
    categoryRepository;
    posGateway;
    productModel;
    constructor(categoryRepository, posGateway, productModel) {
        this.categoryRepository = categoryRepository;
        this.posGateway = posGateway;
        this.productModel = productModel;
    }
    async create(data) {
        try {
            let level = 0;
            if (data.parentId) {
                const parent = await this.categoryRepository.findOne({ where: { id: data.parentId } });
                if (!parent)
                    throw new common_1.BadRequestException('CATEGORY_PARENT_NOT_FOUND');
                level = (parent.level || 0) + 1;
            }
            const category = await this.categoryRepository.create({ ...data, level });
            this.posGateway.broadcast('category_created', category.toJSON());
            return category.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getOne(id) {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category)
                throw new common_1.BadRequestException('CATEGORY_NOT_FOUND');
            return category.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 50;
            const offset = (page - 1) * limit;
            const result = await this.categoryRepository.findAndCountAll({ raw: true, offset, limit });
            const categoryIds = result.rows.map((c) => c.id);
            let countMap = {};
            if (categoryIds.length > 0) {
                const counts = await this.productModel.findAll({
                    attributes: ['categoryId', [sequelize_typescript_1.Sequelize.fn('COUNT', sequelize_typescript_1.Sequelize.col('id')), 'count']],
                    where: { categoryId: categoryIds },
                    group: ['categoryId'],
                    raw: true,
                });
                for (const row of counts) {
                    countMap[row.categoryId] = Number(row.count);
                }
            }
            return {
                data: result.rows.map((c) => ({ ...c, productCount: countMap[c.id] ?? 0 })),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getTree() {
        try {
            const all = await this.categoryRepository.findAll({});
            return this.buildTree(all.map(c => c.toJSON()), null);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    buildTree(items, parentId) {
        return items
            .filter(item => (item.parentId ?? null) === parentId)
            .map(item => ({
            ...item,
            children: this.buildTree(items, item.id),
        }));
    }
    async update(id, data) {
        try {
            const updated = await this.categoryRepository.update({ where: { id } }, data);
            this.posGateway.broadcast('category_updated', updated.toJSON());
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            const result = await this.categoryRepository.delete({ where: { id } });
            this.posGateway.broadcast('category_deleted', { id });
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosCategoriesService = PosCategoriesService;
exports.PosCategoriesService = PosCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof category_repository_1.CategoryRepository !== "undefined" && category_repository_1.CategoryRepository) === "function" ? _a : Object, typeof (_b = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _b : Object, Object])
], PosCategoriesService);


/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUnitsModule = void 0;
const common_1 = __webpack_require__(6);
const pos_units_controller_1 = __webpack_require__(125);
const pos_units_service_1 = __webpack_require__(126);
const database_module_1 = __webpack_require__(7);
let PosUnitsModule = class PosUnitsModule {
};
exports.PosUnitsModule = PosUnitsModule;
exports.PosUnitsModule = PosUnitsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_units_controller_1.PosUnitsController],
        providers: [pos_units_service_1.PosUnitsService],
    })
], PosUnitsModule);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUnitsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_units_service_1 = __webpack_require__(126);
const pos_patterns_1 = __webpack_require__(110);
let PosUnitsController = class PosUnitsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'UNIT_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll() {
        try {
            return await this.service.getAll();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'UNIT_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'UNIT_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'UNIT_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosUnitsController = PosUnitsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.UNIT.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosUnitsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.UNIT.GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosUnitsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.UNIT.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosUnitsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.UNIT.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosUnitsController.prototype, "delete", null);
exports.PosUnitsController = PosUnitsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_units_service_1.PosUnitsService !== "undefined" && pos_units_service_1.PosUnitsService) === "function" ? _a : Object])
], PosUnitsController);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUnitsService = void 0;
const common_1 = __webpack_require__(6);
const unit_repository_1 = __webpack_require__(63);
const pos_gateway_1 = __webpack_require__(101);
let PosUnitsService = class PosUnitsService {
    unitRepository;
    posGateway;
    constructor(unitRepository, posGateway) {
        this.unitRepository = unitRepository;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            const unit = await this.unitRepository.create(data);
            this.posGateway.broadcast('unit_created', unit.toJSON());
            return unit.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll() {
        try {
            const units = await this.unitRepository.findAll({ raw: true });
            return units;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            const updated = await this.unitRepository.update({ where: { id } }, data);
            this.posGateway.broadcast('unit_updated', updated.toJSON());
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            const result = await this.unitRepository.delete({ where: { id } });
            this.posGateway.broadcast('unit_deleted', { id });
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosUnitsService = PosUnitsService;
exports.PosUnitsService = PosUnitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof unit_repository_1.UnitRepository !== "undefined" && unit_repository_1.UnitRepository) === "function" ? _a : Object, typeof (_b = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _b : Object])
], PosUnitsService);


/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProductsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_products_controller_1 = __webpack_require__(128);
const pos_products_service_1 = __webpack_require__(129);
const database_module_1 = __webpack_require__(7);
const product_price_model_1 = __webpack_require__(23);
const product_image_model_1 = __webpack_require__(24);
let PosProductsModule = class PosProductsModule {
};
exports.PosProductsModule = PosProductsModule;
exports.PosProductsModule = PosProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([product_price_model_1.ProductPrice, product_image_model_1.ProductImage])],
        controllers: [pos_products_controller_1.PosProductsController],
        providers: [pos_products_service_1.PosProductsService],
    })
], PosProductsModule);


/***/ }),
/* 128 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProductsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_products_service_1 = __webpack_require__(129);
const pos_patterns_1 = __webpack_require__(110);
let PosProductsController = class PosProductsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async search(query) {
        try {
            return await this.service.search(query);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_SEARCH_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getLowStock() {
        try {
            return await this.service.getLowStock();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_LOW_STOCK_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getExpiring(days) {
        try {
            return await this.service.getExpiring(days);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_EXPIRING_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getBatchesByProduct(productId) {
        try {
            return await this.service.getBatchesByProduct(productId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'BATCH_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getPriceHistory(productId) {
        try {
            return await this.service.getPriceHistory(productId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_PRICE_HISTORY_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async deletePriceHistory(priceId) {
        try {
            return await this.service.deletePriceHistory(priceId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_DELETE_PRICE_HISTORY_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async bulkImport(data) {
        try {
            return await this.service.bulkImport(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_BULK_IMPORT_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async addImage(data) {
        try {
            return await this.service.addImage(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_ADD_IMAGE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getImages(productId) {
        try {
            return await this.service.getImages(productId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_GET_IMAGES_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async deleteImage(imageId) {
        try {
            return await this.service.deleteImage(imageId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PRODUCT_DELETE_IMAGE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosProductsController = PosProductsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosProductsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosProductsController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosProductsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.SEARCH),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosProductsController.prototype, "search", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_LOW_STOCK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosProductsController.prototype, "getLowStock", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_EXPIRING),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosProductsController.prototype, "getExpiring", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.BATCH.GET_BY_PRODUCT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PosProductsController.prototype, "getBatchesByProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PosProductsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], PosProductsController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_PRICE_HISTORY),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], PosProductsController.prototype, "getPriceHistory", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.DELETE_PRICE_HISTORY),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], PosProductsController.prototype, "deletePriceHistory", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.BULK_IMPORT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], PosProductsController.prototype, "bulkImport", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.ADD_IMAGE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], PosProductsController.prototype, "addImage", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.GET_IMAGES),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], PosProductsController.prototype, "getImages", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT.DELETE_IMAGE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], PosProductsController.prototype, "deleteImage", null);
exports.PosProductsController = PosProductsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_products_service_1.PosProductsService !== "undefined" && pos_products_service_1.PosProductsService) === "function" ? _a : Object])
], PosProductsController);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProductsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const sequelize_2 = __webpack_require__(8);
const product_repository_1 = __webpack_require__(64);
const batch_repository_1 = __webpack_require__(65);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const category_model_1 = __webpack_require__(14);
const unit_model_1 = __webpack_require__(15);
const brand_model_1 = __webpack_require__(16);
const product_variant_model_1 = __webpack_require__(22);
const product_price_model_1 = __webpack_require__(23);
const product_image_model_1 = __webpack_require__(24);
const pos_user_model_1 = __webpack_require__(12);
const pos_gateway_1 = __webpack_require__(101);
let PosProductsService = class PosProductsService {
    productRepository;
    batchRepository;
    posGateway;
    productPriceModel;
    productImageModel;
    constructor(productRepository, batchRepository, posGateway, productPriceModel, productImageModel) {
        this.productRepository = productRepository;
        this.batchRepository = batchRepository;
        this.posGateway = posGateway;
        this.productPriceModel = productPriceModel;
        this.productImageModel = productImageModel;
    }
    withStock(p) {
        const batches = p.batches ?? [];
        const today = new Date().toISOString().split('T')[0];
        const usableBatches = batches.filter((b) => Number(b.remainingQty) > 0 && (!b.expiryDate || b.expiryDate >= today));
        const totalStock = usableBatches.reduce((s, b) => s + Number(b.remainingQty ?? 0), 0);
        const activeBatches = usableBatches.length;
        const unit = p.unit ?? null;
        const fifoBatch = usableBatches.length > 0 ? usableBatches[0] : null;
        const effectiveSalePrice = (fifoBatch?.salePrice != null && Number(fifoBatch.salePrice) > 0)
            ? Number(fifoBatch.salePrice)
            : Number(p.salePrice ?? 0);
        return {
            ...p,
            salePrice: effectiveSalePrice,
            totalStock,
            activeBatches,
            unitLabel: unit ? `${unit.name} (${unit.shortCode})` : null,
            stockDisplay: unit ? `${totalStock} ${unit.shortCode}` : String(totalStock),
            isLowStock: totalStock > 0 && totalStock <= Number(p.lowStockThreshold ?? 0),
            isOutOfStock: totalStock === 0,
        };
    }
    async create(data) {
        try {
            if (!data.barcode) {
                data.barcode = `POS${Date.now()}`;
            }
            const { openingStock, expiryDate, batchNumber, ...productData } = data;
            const product = await this.productRepository.create(productData);
            const productJson = product.toJSON();
            await this.productPriceModel.create({
                productId: productJson.id,
                salePrice: productJson.salePrice ?? productData.salePrice,
                purchasePrice: productJson.purchasePrice ?? productData.purchasePrice ?? 0,
                effectiveFrom: new Date(),
                changedBy: data.changedBy || null,
            });
            if (openingStock && Number(openingStock) > 0) {
                await this.batchRepository.create({
                    productId: productJson.id,
                    qty: Number(openingStock),
                    remainingQty: Number(openingStock),
                    purchasePrice: productJson.purchasePrice ?? productData.purchasePrice ?? 0,
                    batchNumber: batchNumber || `OPEN-${productJson.id}`,
                    expiryDate: expiryDate || null,
                    receivedDate: new Date().toISOString().split('T')[0],
                    status: 'active',
                });
            }
            this.posGateway.broadcast('product_created', productJson);
            return productJson;
        }
        catch (error) {
            const msg = error?.errors?.[0]?.message || error?.message || 'PRODUCT_CREATE_ERROR';
            throw new common_1.BadRequestException(msg);
        }
    }
    async getOne(id) {
        try {
            const product = await this.productRepository.findOne({
                where: { id },
                include: [
                    { model: category_model_1.Category, attributes: ['id', 'name'] },
                    { model: unit_model_1.Unit, attributes: ['id', 'name', 'shortCode'] },
                    { model: brand_model_1.Brand, attributes: ['id', 'name'], required: false },
                    {
                        model: batch_model_1.Batch,
                        where: { status: 'active' },
                        required: false,
                        separate: true,
                        order: [['createdAt', 'ASC']],
                    },
                    { model: product_variant_model_1.ProductVariant, required: false, attributes: ['id', 'size', 'barcode', 'salePrice', 'purchasePrice', 'stockQty', 'unitId'],
                        include: [{ model: unit_model_1.Unit, as: 'unit', attributes: ['id', 'name', 'shortCode'] }] },
                ],
            });
            if (!product)
                throw new common_1.BadRequestException('PRODUCT_NOT_FOUND');
            return this.withStock(product.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = {};
            if (filters?.search) {
                where[sequelize_1.Op.or] = [
                    { name: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                    { barcode: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                ];
            }
            if (filters?.categoryId)
                where.categoryId = filters.categoryId;
            if (filters?.isActive !== undefined)
                where.isActive = filters.isActive;
            const result = await this.productRepository.findAndCountAll({
                where,
                include: [
                    { model: category_model_1.Category, attributes: ['id', 'name'] },
                    { model: unit_model_1.Unit, attributes: ['id', 'name', 'shortCode'] },
                    { model: brand_model_1.Brand, attributes: ['id', 'name'], required: false },
                    {
                        model: batch_model_1.Batch,
                        where: { status: 'active' },
                        required: false,
                        attributes: ['id', 'remainingQty', 'expiryDate', 'batchNumber', 'status', 'salePrice', 'purchasePrice'],
                        separate: true,
                        order: [['createdAt', 'ASC']],
                    },
                    { model: product_variant_model_1.ProductVariant, required: false, attributes: ['id', 'size', 'barcode', 'salePrice', 'purchasePrice', 'stockQty', 'unitId'],
                        include: [{ model: unit_model_1.Unit, as: 'unit', attributes: ['id', 'name', 'shortCode'] }] },
                ],
                offset,
                limit,
            });
            return {
                data: result.rows.map(r => this.withStock(r.toJSON())),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async search(query) {
        try {
            const products = await this.productRepository.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { name: { [sequelize_1.Op.like]: `%${query}%` } },
                        { barcode: query },
                    ],
                },
                include: [
                    {
                        model: batch_model_1.Batch,
                        where: { status: 'active' },
                        required: false,
                        separate: true,
                        order: [['createdAt', 'ASC']],
                        attributes: ['id', 'remainingQty', 'expiryDate', 'batchNumber', 'status', 'salePrice', 'purchasePrice'],
                    },
                    { model: unit_model_1.Unit, attributes: ['id', 'name', 'shortCode'] },
                    { model: product_variant_model_1.ProductVariant, required: false, attributes: ['id', 'size', 'barcode', 'salePrice', 'purchasePrice', 'stockQty', 'unitId'],
                        include: [{ model: unit_model_1.Unit, as: 'unit', attributes: ['id', 'name', 'shortCode'] }] },
                ],
                limit: 20,
            });
            return products.map(p => this.withStock(p.toJSON()));
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getLowStock() {
        try {
            const products = await this.productRepository.findAll({
                include: [
                    { model: batch_model_1.Batch, where: { status: 'active' }, required: false },
                    { model: unit_model_1.Unit, attributes: ['id', 'name', 'shortCode'] },
                ],
            });
            return products
                .filter(p => {
                const totalStock = p.batches?.reduce((sum, b) => sum + Number(b.remainingQty), 0) || 0;
                return totalStock <= Number(p.lowStockThreshold);
            })
                .map(p => this.withStock(p.toJSON()));
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getExpiring(days = 30) {
        try {
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + days);
            const batches = await this.batchRepository.findAll({
                where: {
                    status: 'active',
                    expiryDate: { [sequelize_1.Op.lte]: targetDate.toISOString().split('T')[0] },
                },
                include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] }],
            });
            return batches.map(b => b.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getBatchesByProduct(productId) {
        try {
            const batches = await this.batchRepository.findAll({
                where: { productId, status: 'active' },
                order: [['createdAt', 'ASC']],
                attributes: ['id', 'batchNumber', 'remainingQty', 'expiryDate', 'purchasePrice', 'salePrice', 'status'],
            });
            return batches.map(b => b.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            const existing = await this.productRepository.findOne({ where: { id } });
            if (!existing)
                throw new common_1.BadRequestException('PRODUCT_NOT_FOUND');
            const priceChanged = (data.salePrice !== undefined && Number(data.salePrice) !== Number(existing.salePrice)) ||
                (data.purchasePrice !== undefined && Number(data.purchasePrice) !== Number(existing.purchasePrice));
            if (priceChanged) {
                await this.productPriceModel.create({
                    productId: id,
                    salePrice: data.salePrice ?? existing.salePrice,
                    purchasePrice: data.purchasePrice ?? existing.purchasePrice,
                    effectiveFrom: new Date(),
                    changedBy: data.changedBy || null,
                });
            }
            const updated = await this.productRepository.update({ where: { id } }, data);
            this.posGateway.broadcast('product_updated', updated.toJSON());
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getPriceHistory(productId) {
        try {
            const history = await this.productPriceModel.findAll({
                where: { productId },
                include: [{ model: pos_user_model_1.PosUser, as: 'changedByUser', attributes: ['id', 'name'], required: false }],
                order: [['effectiveFrom', 'DESC']],
            });
            return history.map(h => h.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deletePriceHistory(priceId) {
        try {
            const record = await this.productPriceModel.findByPk(priceId);
            if (!record)
                throw new common_1.BadRequestException('PRICE_HISTORY_NOT_FOUND');
            await record.destroy();
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            await this.productRepository.update({ where: { id } }, { isActive: false });
            this.posGateway.broadcast('product_deleted', { id });
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async bulkImport(data) {
        let rows = data.rows || [];
        if (data.fileBuffer && data.fileType) {
            rows = await this.parseImportFile(Buffer.from(data.fileBuffer), data.fileType);
        }
        const results = { created: 0, skipped: 0, errors: [] };
        for (const row of rows) {
            try {
                if (!row.name || !row.salePrice) {
                    results.errors.push(`Skipped row — missing name or salePrice: ${JSON.stringify(row)}`);
                    results.skipped++;
                    continue;
                }
                if (!row.barcode)
                    row.barcode = `POS${Date.now()}${Math.floor(Math.random() * 1000)}`;
                const exists = await this.productRepository.findOne({ where: { barcode: row.barcode } });
                if (exists) {
                    results.skipped++;
                    continue;
                }
                const product = await this.productRepository.create(row);
                await this.productPriceModel.create({
                    productId: product.id,
                    salePrice: row.salePrice,
                    purchasePrice: row.purchasePrice || 0,
                    effectiveFrom: new Date(),
                    changedBy: data.importedBy || null,
                });
                results.created++;
            }
            catch (err) {
                results.errors.push(`Row error: ${err.message}`);
                results.skipped++;
            }
        }
        return results;
    }
    async parseImportFile(buffer, fileType) {
        if (fileType === 'xlsx') {
            const XLSX = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 210, 23));
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawRows = XLSX.utils.sheet_to_json(sheet);
            return rawRows.map(r => this.normalizeImportRow(r));
        }
        else {
            const { parse } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 211, 23));
            const rawRows = parse(buffer, { columns: true, skip_empty_lines: true, trim: true });
            return rawRows.map(r => this.normalizeImportRow(r));
        }
    }
    normalizeImportRow(r) {
        return {
            name: r.name || r.Name || r.product_name,
            barcode: r.barcode || r.Barcode || undefined,
            salePrice: parseFloat(r.sale_price || r.salePrice || r['Sale Price'] || 0),
            purchasePrice: parseFloat(r.purchase_price || r.purchasePrice || r['Purchase Price'] || 0),
            categoryId: r.category_id || r.categoryId ? Number(r.category_id || r.categoryId) : undefined,
            unitId: r.unit_id || r.unitId ? Number(r.unit_id || r.unitId) : undefined,
            lowStockThreshold: parseFloat(r.low_stock_threshold || r.lowStockThreshold || 0),
        };
    }
    async addImage(data) {
        try {
            if (data.isPrimary) {
                await this.productImageModel.update({ isPrimary: false }, { where: { productId: data.productId, isPrimary: true } });
            }
            const image = await this.productImageModel.create({
                productId: data.productId,
                url: data.url,
                isPrimary: data.isPrimary ?? false,
            });
            return image.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getImages(productId) {
        try {
            const images = await this.productImageModel.findAll({
                where: { productId },
                order: [['isPrimary', 'DESC'], ['createdAt', 'ASC']],
            });
            return images.map(i => i.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteImage(imageId) {
        try {
            await this.productImageModel.destroy({ where: { id: imageId } });
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosProductsService = PosProductsService;
exports.PosProductsService = PosProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, sequelize_2.InjectModel)(product_price_model_1.ProductPrice)),
    __param(4, (0, sequelize_2.InjectModel)(product_image_model_1.ProductImage)),
    __metadata("design:paramtypes", [typeof (_a = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _a : Object, typeof (_b = typeof batch_repository_1.BatchRepository !== "undefined" && batch_repository_1.BatchRepository) === "function" ? _b : Object, typeof (_c = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _c : Object, Object, Object])
], PosProductsService);


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSuppliersModule = void 0;
const common_1 = __webpack_require__(6);
const pos_suppliers_controller_1 = __webpack_require__(131);
const pos_suppliers_service_1 = __webpack_require__(132);
const database_module_1 = __webpack_require__(7);
let PosSuppliersModule = class PosSuppliersModule {
};
exports.PosSuppliersModule = PosSuppliersModule;
exports.PosSuppliersModule = PosSuppliersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_suppliers_controller_1.PosSuppliersController],
        providers: [pos_suppliers_service_1.PosSuppliersService],
    })
], PosSuppliersModule);


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSuppliersController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_suppliers_service_1 = __webpack_require__(132);
const pos_patterns_1 = __webpack_require__(110);
let PosSuppliersController = class PosSuppliersController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SUPPLIER_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SUPPLIER_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SUPPLIER_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SUPPLIER_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SUPPLIER_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosSuppliersController = PosSuppliersController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosSuppliersController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosSuppliersController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosSuppliersController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosSuppliersController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosSuppliersController.prototype, "delete", null);
exports.PosSuppliersController = PosSuppliersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_suppliers_service_1.PosSuppliersService !== "undefined" && pos_suppliers_service_1.PosSuppliersService) === "function" ? _a : Object])
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSuppliersService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const supplier_repository_1 = __webpack_require__(66);
const pos_gateway_1 = __webpack_require__(101);
const VALID_DISCOUNT_TYPES = ['percentage', 'fixed'];
function resolveDiscount(discountType, discountValue) {
    const type = VALID_DISCOUNT_TYPES.includes(discountType) ? discountType : 'percentage';
    const value = Math.max(0, Number(discountValue) || 0);
    if (type === 'percentage' && value > 100) {
        throw new common_1.BadRequestException('Discount percentage cannot exceed 100');
    }
    return { discountType: type, discountValue: value };
}
let PosSuppliersService = class PosSuppliersService {
    supplierRepository;
    posGateway;
    constructor(supplierRepository, posGateway) {
        this.supplierRepository = supplierRepository;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            const discount = resolveDiscount(data.discountType, data.discountValue);
            const supplier = await this.supplierRepository.create({
                name: data.name,
                phone: data.phone ?? undefined,
                email: data.email ?? undefined,
                address: data.address ?? undefined,
                creditLimit: Number(data.creditLimit) || 0,
                creditDays: Number(data.creditDays) || 0,
                discountType: discount.discountType,
                discountValue: discount.discountValue,
            });
            this.posGateway.broadcast('supplier_created', supplier.toJSON());
            return supplier.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message || error);
        }
    }
    async getOne(id) {
        try {
            const supplier = await this.supplierRepository.findOne({ where: { id } });
            if (!supplier)
                throw new common_1.BadRequestException('SUPPLIER_NOT_FOUND');
            return supplier.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message || error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = {};
            if (filters?.search) {
                where[sequelize_1.Op.or] = [
                    { name: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                    { phone: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                ];
            }
            const result = await this.supplierRepository.findAndCountAll({ where, raw: true, offset, limit });
            return {
                data: result.rows,
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message || error);
        }
    }
    async update(id, data) {
        try {
            const patch = {};
            if (data.name !== undefined)
                patch.name = data.name;
            if (data.phone !== undefined)
                patch.phone = data.phone;
            if (data.email !== undefined)
                patch.email = data.email;
            if (data.address !== undefined)
                patch.address = data.address;
            if (data.creditLimit !== undefined)
                patch.creditLimit = Number(data.creditLimit) || 0;
            if (data.creditDays !== undefined)
                patch.creditDays = Number(data.creditDays) || 0;
            if (data.discountType !== undefined || data.discountValue !== undefined) {
                const existing = await this.supplierRepository.findOne({ where: { id } });
                if (!existing)
                    throw new common_1.BadRequestException('SUPPLIER_NOT_FOUND');
                const currentType = data.discountType ?? existing.discountType;
                const currentValue = data.discountValue ?? existing.discountValue;
                const discount = resolveDiscount(currentType, currentValue);
                patch.discountType = discount.discountType;
                patch.discountValue = discount.discountValue;
            }
            const updated = await this.supplierRepository.update({ where: { id } }, patch);
            this.posGateway.broadcast('supplier_updated', updated.toJSON());
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message || error);
        }
    }
    async delete(id) {
        try {
            await this.supplierRepository.update({ where: { id } }, { isActive: false });
            this.posGateway.broadcast('supplier_deleted', { id });
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message || error);
        }
    }
};
exports.PosSuppliersService = PosSuppliersService;
exports.PosSuppliersService = PosSuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _a : Object, typeof (_b = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _b : Object])
], PosSuppliersService);


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPurchasesModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_purchases_controller_1 = __webpack_require__(134);
const pos_purchases_service_1 = __webpack_require__(135);
const database_module_1 = __webpack_require__(7);
const product_variant_model_1 = __webpack_require__(22);
const product_model_1 = __webpack_require__(17);
const product_price_model_1 = __webpack_require__(23);
let PosPurchasesModule = class PosPurchasesModule {
};
exports.PosPurchasesModule = PosPurchasesModule;
exports.PosPurchasesModule = PosPurchasesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([product_variant_model_1.ProductVariant, product_model_1.Product, product_price_model_1.ProductPrice])],
        controllers: [pos_purchases_controller_1.PosPurchasesController],
        providers: [pos_purchases_service_1.PosPurchasesService],
    })
], PosPurchasesModule);


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPurchasesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_purchases_service_1 = __webpack_require__(135);
const pos_patterns_1 = __webpack_require__(110);
let PosPurchasesController = class PosPurchasesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosPurchasesController = PosPurchasesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosPurchasesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosPurchasesController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosPurchasesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosPurchasesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosPurchasesController.prototype, "delete", null);
exports.PosPurchasesController = PosPurchasesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_purchases_service_1.PosPurchasesService !== "undefined" && pos_purchases_service_1.PosPurchasesService) === "function" ? _a : Object])
], PosPurchasesController);


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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPurchasesService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_typescript_1 = __webpack_require__(13);
const sequelize_1 = __webpack_require__(8);
const purchase_repository_1 = __webpack_require__(67);
const purchase_item_repository_1 = __webpack_require__(68);
const batch_repository_1 = __webpack_require__(65);
const supplier_repository_1 = __webpack_require__(66);
const supplier_ledger_transaction_repository_1 = __webpack_require__(82);
const purchase_item_model_1 = __webpack_require__(21);
const batch_model_1 = __webpack_require__(18);
const supplier_model_1 = __webpack_require__(19);
const product_model_1 = __webpack_require__(17);
const brand_model_1 = __webpack_require__(16);
const product_variant_model_1 = __webpack_require__(22);
const product_price_model_1 = __webpack_require__(23);
const pos_gateway_1 = __webpack_require__(101);
let PosPurchasesService = class PosPurchasesService {
    purchaseRepository;
    purchaseItemRepository;
    batchRepository;
    supplierRepository;
    supplierLedgerRepository;
    sequelize;
    posGateway;
    variantModel;
    productModel;
    productPriceModel;
    batchModel;
    constructor(purchaseRepository, purchaseItemRepository, batchRepository, supplierRepository, supplierLedgerRepository, sequelize, posGateway, variantModel, productModel, productPriceModel, batchModel) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseItemRepository = purchaseItemRepository;
        this.batchRepository = batchRepository;
        this.supplierRepository = supplierRepository;
        this.supplierLedgerRepository = supplierLedgerRepository;
        this.sequelize = sequelize;
        this.posGateway = posGateway;
        this.variantModel = variantModel;
        this.productModel = productModel;
        this.productPriceModel = productPriceModel;
        this.batchModel = batchModel;
    }
    async create(data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            const updateOldBatchPrices = input.updateOldBatchPrices ?? {};
            let totalAmount = 0;
            for (const item of input.items) {
                totalAmount += item.qty * item.purchasePrice;
            }
            const discountAmount = input.discountAmount || 0;
            const paidAmount = input.paidAmount || 0;
            const netTotal = totalAmount - discountAmount;
            const purchaseStatus = paidAmount <= 0 ? 'pending' : paidAmount < netTotal ? 'partial' : 'received';
            const purchase = await this.purchaseRepository.create({
                supplierId: input.supplierId,
                createdBy: Number(data.userId),
                totalAmount: netTotal,
                paidAmount,
                discountAmount,
                status: purchaseStatus,
                invoiceRef: input.invoiceRef,
                purchaseDate: input.purchaseDate || new Date().toISOString().split('T')[0],
            });
            for (const item of input.items) {
                const decision = updateOldBatchPrices[item.productId];
                if (decision === 'new' && item.salePrice) {
                    await this.batchModel.update({ salePrice: item.salePrice }, { where: { productId: item.productId, status: 'active' } });
                    if (item.variantId) {
                        await this.variantModel.update({ salePrice: item.salePrice, purchasePrice: item.purchasePrice }, { where: { id: item.variantId } });
                    }
                }
                const batch = await this.batchRepository.create({
                    productId: item.productId,
                    supplierId: input.supplierId,
                    purchaseId: purchase.id,
                    qty: item.qty,
                    remainingQty: item.qty,
                    purchasePrice: item.purchasePrice,
                    salePrice: item.salePrice ?? null,
                    expiryDate: item.expiryDate,
                    batchNumber: item.batchNumber || `BATCH-${Date.now()}`,
                    receivedDate: input.purchaseDate || new Date().toISOString().split('T')[0],
                    status: 'active',
                });
                await this.purchaseItemRepository.bulkCreate([{
                        purchaseId: purchase.id,
                        productId: item.productId,
                        variantId: item.variantId ?? null,
                        batchId: batch.id,
                        qty: item.qty,
                        purchasePrice: item.purchasePrice,
                        total: item.qty * item.purchasePrice,
                    }]);
                const priceUpdate = { purchasePrice: item.purchasePrice };
                if (item.salePrice)
                    priceUpdate.salePrice = item.salePrice;
                await this.productModel.update(priceUpdate, { where: { id: item.productId } });
                const updatedProduct = await this.productModel.findByPk(item.productId);
                if (updatedProduct) {
                    await this.productPriceModel.create({
                        productId: item.productId,
                        purchasePrice: item.purchasePrice,
                        salePrice: item.salePrice ?? Number(updatedProduct.salePrice),
                        effectiveFrom: new Date(),
                        changedBy: Number(data.userId) || null,
                    });
                }
                const allBatches = await this.batchRepository.findAll({
                    where: { productId: item.productId, status: 'active' },
                });
                const totalStock = allBatches.reduce((sum, b) => sum + Number(b.remainingQty), 0);
                this.posGateway.broadcastStockUpdate({
                    product_id: item.productId,
                    batch_id: batch.id,
                    quantity: totalStock,
                    reason: 'purchase',
                });
                if (item.variantId) {
                    const variant = await this.variantModel.findByPk(item.variantId);
                    if (variant) {
                        const variantUpdate = { stockQty: Number(variant.stockQty) + Number(item.qty), purchasePrice: item.purchasePrice };
                        const decision = updateOldBatchPrices[item.productId];
                        if (item.salePrice && decision !== 'old')
                            variantUpdate.salePrice = item.salePrice;
                        await this.variantModel.update(variantUpdate, { where: { id: item.variantId } });
                    }
                }
            }
            const outstanding = netTotal - paidAmount;
            const supplier = await this.supplierRepository.findOne({ where: { id: input.supplierId } });
            if (supplier) {
                const newBalance = Number(supplier.outstandingBalance) + outstanding;
                await this.supplierRepository.update({ where: { id: input.supplierId } }, { outstandingBalance: newBalance });
                await this.supplierLedgerRepository.create({
                    supplierId: input.supplierId,
                    purchaseId: purchase.id,
                    type: 'debit',
                    amount: netTotal,
                    balanceAfter: newBalance,
                    notes: `Purchase #${purchase.id}${input.invoiceRef ? ` — Inv: ${input.invoiceRef}` : ''}`,
                });
            }
            await t.commit();
            this.posGateway.broadcast('purchase_created', { id: purchase.id, totalAmount: purchase.totalAmount, status: purchase.status });
            return { id: purchase.id, totalAmount: purchase.totalAmount, status: purchase.status };
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
    async getOne(id) {
        try {
            const purchase = await this.purchaseRepository.findOne({
                where: { id },
                include: [
                    { model: supplier_model_1.Supplier, attributes: ['id', 'name', 'phone'] },
                    {
                        model: purchase_item_model_1.PurchaseItem,
                        include: [
                            { model: product_model_1.Product, attributes: ['id', 'name', 'barcode'], include: [{ model: brand_model_1.Brand, attributes: ['id', 'name'] }] },
                            { model: batch_model_1.Batch, attributes: ['id', 'salePrice', 'purchasePrice', 'batchNumber', 'expiryDate'] },
                        ],
                    },
                ],
            });
            if (!purchase)
                throw new common_1.BadRequestException('PURCHASE_NOT_FOUND');
            return purchase.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = {};
            if (filters?.supplierId)
                where.supplierId = filters.supplierId;
            if (filters?.status)
                where.status = filters.status;
            const result = await this.purchaseRepository.findAndCountAll({
                where,
                include: [
                    { model: supplier_model_1.Supplier, attributes: ['id', 'name'] },
                    {
                        model: purchase_item_model_1.PurchaseItem,
                        attributes: ['id', 'productId', 'qty', 'purchasePrice'],
                        include: [
                            { model: product_model_1.Product, attributes: ['id', 'name'], include: [{ model: brand_model_1.Brand, attributes: ['id', 'name'] }] },
                        ],
                    },
                ],
                offset,
                limit,
                order: [['createdAt', 'DESC']],
                distinct: true,
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            const updateOldBatchPrices = input.updateOldBatchPrices ?? {};
            const purchase = await this.purchaseRepository.findOne({ where: { id } });
            if (!purchase)
                throw new common_1.BadRequestException('PURCHASE_NOT_FOUND');
            const oldItems = await this.purchaseItemRepository.findAll({ where: { purchaseId: id } });
            for (const oldItem of oldItems) {
                if (oldItem.batchId) {
                    const batch = await this.batchRepository.findOne({ where: { id: oldItem.batchId } });
                    if (batch) {
                        const reversedQty = Math.max(0, Number(batch.remainingQty) - Number(oldItem.qty));
                        await this.batchRepository.update({ where: { id: oldItem.batchId } }, { remainingQty: reversedQty, status: reversedQty <= 0 ? 'depleted' : 'active' });
                    }
                }
                if (oldItem.variantId) {
                    const variant = await this.variantModel.findByPk(oldItem.variantId);
                    if (variant) {
                        const reversedVariantQty = Math.max(0, Number(variant.stockQty) - Number(oldItem.qty));
                        await this.variantModel.update({ stockQty: reversedVariantQty }, { where: { id: oldItem.variantId } });
                    }
                }
            }
            await this.purchaseItemRepository.destroyWhere({ purchaseId: id });
            let totalAmount = 0;
            for (const item of input.items) {
                totalAmount += item.qty * item.purchasePrice;
            }
            const discountAmount = input.discountAmount || 0;
            const paidAmount = input.paidAmount ?? Number(purchase.paidAmount);
            const netTotal = totalAmount - discountAmount;
            const purchaseStatus = paidAmount <= 0 ? 'pending' : paidAmount < netTotal ? 'partial' : 'received';
            await this.purchaseRepository.update({ where: { id } }, {
                supplierId: input.supplierId ?? purchase.supplierId,
                totalAmount: netTotal,
                paidAmount,
                discountAmount,
                status: purchaseStatus,
                invoiceRef: input.invoiceRef ?? purchase.invoiceRef,
                purchaseDate: input.purchaseDate ?? purchase.purchaseDate,
            });
            for (const item of input.items) {
                const batch = await this.batchRepository.create({
                    productId: item.productId,
                    supplierId: input.supplierId ?? purchase.supplierId,
                    purchaseId: id,
                    qty: item.qty,
                    remainingQty: item.qty,
                    purchasePrice: item.purchasePrice,
                    salePrice: item.salePrice ?? null,
                    expiryDate: item.expiryDate,
                    batchNumber: item.batchNumber || `BATCH-${Date.now()}`,
                    receivedDate: input.purchaseDate || new Date().toISOString().split('T')[0],
                    status: 'active',
                });
                await this.purchaseItemRepository.bulkCreate([{
                        purchaseId: id,
                        productId: item.productId,
                        variantId: item.variantId ?? null,
                        batchId: batch.id,
                        qty: item.qty,
                        purchasePrice: item.purchasePrice,
                        total: item.qty * item.purchasePrice,
                    }]);
                const priceUpdate = { purchasePrice: item.purchasePrice };
                if (item.salePrice)
                    priceUpdate.salePrice = item.salePrice;
                await this.productModel.update(priceUpdate, { where: { id: item.productId } });
                const updatedProduct = await this.productModel.findByPk(item.productId);
                if (updatedProduct) {
                    await this.productPriceModel.create({
                        productId: item.productId,
                        purchasePrice: item.purchasePrice,
                        salePrice: item.salePrice ?? Number(updatedProduct.salePrice),
                        effectiveFrom: new Date(),
                        changedBy: Number(data.userId) || null,
                    });
                }
                const allBatches = await this.batchRepository.findAll({
                    where: { productId: item.productId, status: 'active' },
                });
                const totalStock = allBatches.reduce((sum, b) => sum + Number(b.remainingQty), 0);
                this.posGateway.broadcastStockUpdate({
                    product_id: item.productId,
                    batch_id: batch.id,
                    quantity: totalStock,
                    reason: 'purchase_updated',
                });
                if (item.variantId) {
                    const variant = await this.variantModel.findByPk(item.variantId);
                    if (variant) {
                        const variantUpdate = { stockQty: Number(variant.stockQty) + Number(item.qty), purchasePrice: item.purchasePrice };
                        const decision = updateOldBatchPrices[item.productId];
                        if (item.salePrice && decision !== 'old')
                            variantUpdate.salePrice = item.salePrice;
                        await this.variantModel.update(variantUpdate, { where: { id: item.variantId } });
                    }
                }
            }
            await t.commit();
            this.posGateway.broadcast('purchase_updated', { id, success: true });
            return { id, success: true };
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        const t = await this.sequelize.transaction();
        try {
            const purchase = await this.purchaseRepository.findOne({ where: { id } });
            if (!purchase)
                throw new common_1.BadRequestException('PURCHASE_NOT_FOUND');
            const oldItems = await this.purchaseItemRepository.findAll({ where: { purchaseId: id } });
            for (const oldItem of oldItems) {
                if (oldItem.batchId) {
                    await this.batchRepository.update({ where: { id: oldItem.batchId } }, { remainingQty: 0, status: 'depleted' });
                    this.posGateway.broadcastStockUpdate({
                        product_id: oldItem.productId,
                        batch_id: oldItem.batchId,
                        quantity: 0,
                        reason: 'purchase_deleted',
                    });
                }
                if (oldItem.variantId) {
                    const variant = await this.variantModel.findByPk(oldItem.variantId);
                    if (variant) {
                        const reversedQty = Math.max(0, Number(variant.stockQty) - Number(oldItem.qty));
                        await this.variantModel.update({ stockQty: reversedQty }, { where: { id: oldItem.variantId } });
                    }
                }
            }
            await this.purchaseItemRepository.destroyWhere({ purchaseId: id });
            await this.purchaseRepository.delete({ where: { id } });
            await t.commit();
            this.posGateway.broadcast('purchase_deleted', { id });
            return { success: true };
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosPurchasesService = PosPurchasesService;
exports.PosPurchasesService = PosPurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(7, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __param(8, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(9, (0, sequelize_1.InjectModel)(product_price_model_1.ProductPrice)),
    __param(10, (0, sequelize_1.InjectModel)(batch_model_1.Batch)),
    __metadata("design:paramtypes", [typeof (_a = typeof purchase_repository_1.PurchaseRepository !== "undefined" && purchase_repository_1.PurchaseRepository) === "function" ? _a : Object, typeof (_b = typeof purchase_item_repository_1.PurchaseItemRepository !== "undefined" && purchase_item_repository_1.PurchaseItemRepository) === "function" ? _b : Object, typeof (_c = typeof batch_repository_1.BatchRepository !== "undefined" && batch_repository_1.BatchRepository) === "function" ? _c : Object, typeof (_d = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _d : Object, typeof (_e = typeof supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository !== "undefined" && supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository) === "function" ? _e : Object, typeof (_f = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _f : Object, typeof (_g = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _g : Object, Object, Object, Object, Object])
], PosPurchasesService);


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosCustomersModule = void 0;
const common_1 = __webpack_require__(6);
const pos_customers_controller_1 = __webpack_require__(137);
const pos_customers_service_1 = __webpack_require__(138);
const database_module_1 = __webpack_require__(7);
let PosCustomersModule = class PosCustomersModule {
};
exports.PosCustomersModule = PosCustomersModule;
exports.PosCustomersModule = PosCustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_customers_controller_1.PosCustomersController],
        providers: [pos_customers_service_1.PosCustomersService],
    })
], PosCustomersModule);


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosCustomersController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_customers_service_1 = __webpack_require__(138);
const pos_patterns_1 = __webpack_require__(110);
let PosCustomersController = class PosCustomersController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getUdhaar(customerId) {
        try {
            return await this.service.getUdhaar(customerId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_UDHAAR_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async recordPayment(data) {
        try {
            return await this.service.recordPayment(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_PAYMENT_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async addAdvance(data) {
        try {
            return await this.service.addAdvance(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_ADVANCE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CUSTOMER_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosCustomersController = PosCustomersController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosCustomersController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosCustomersController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosCustomersController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.GET_UDHAAR),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosCustomersController.prototype, "getUdhaar", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.RECORD_PAYMENT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosCustomersController.prototype, "recordPayment", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.ADD_ADVANCE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosCustomersController.prototype, "addAdvance", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PosCustomersController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.CUSTOMER.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PosCustomersController.prototype, "delete", null);
exports.PosCustomersController = PosCustomersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_customers_service_1.PosCustomersService !== "undefined" && pos_customers_service_1.PosCustomersService) === "function" ? _a : Object])
], PosCustomersController);


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosCustomersService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const customer_repository_1 = __webpack_require__(69);
const customer_payment_repository_1 = __webpack_require__(70);
const udhaar_transaction_repository_1 = __webpack_require__(71);
const pos_gateway_1 = __webpack_require__(101);
let PosCustomersService = class PosCustomersService {
    customerRepository;
    customerPaymentRepository;
    udhaarRepository;
    posGateway;
    constructor(customerRepository, customerPaymentRepository, udhaarRepository, posGateway) {
        this.customerRepository = customerRepository;
        this.customerPaymentRepository = customerPaymentRepository;
        this.udhaarRepository = udhaarRepository;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            const exists = await this.customerRepository.findOne({ where: { phone: data.phone } });
            if (exists)
                throw new common_1.BadRequestException('CUSTOMER_PHONE_ALREADY_EXISTS');
            const customer = await this.customerRepository.create(data);
            this.posGateway.broadcast('customer_created', customer.toJSON());
            return customer.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getOne(id) {
        try {
            const customer = await this.customerRepository.findOne({ where: { id } });
            if (!customer)
                throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
            return customer.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = {};
            if (filters?.search) {
                where[sequelize_1.Op.or] = [
                    { name: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                    { phone: { [sequelize_1.Op.like]: `%${filters.search}%` } },
                ];
            }
            if (filters?.hasUdhaar)
                where.udhaarBalance = { [sequelize_1.Op.gt]: 0 };
            const result = await this.customerRepository.findAndCountAll({ where, raw: true, offset, limit });
            return {
                data: result.rows,
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getUdhaar(customerId) {
        try {
            const customer = await this.customerRepository.findOne({ where: { id: customerId }, raw: true });
            if (!customer)
                throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
            const transactions = await this.udhaarRepository.findAll({
                where: { customerId },
                order: [['createdAt', 'DESC']],
                limit: 50,
            });
            return { customer, transactions: transactions.map(t => t.toJSON()) };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async addAdvance(data) {
        try {
            const input = data.data;
            const customer = await this.customerRepository.findOne({ where: { id: input.customerId } });
            if (!customer)
                throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
            const newBalance = Number(customer.advanceBalance) + Number(input.amount);
            await this.customerRepository.update({ where: { id: input.customerId } }, { advanceBalance: newBalance });
            await this.udhaarRepository.create({
                customerId: input.customerId,
                type: 'advance',
                amount: input.amount,
                balanceAfter: newBalance,
                notes: input.notes || `Advance payment received (${input.paymentMethod || 'cash'})`,
            });
            this.posGateway.broadcast('customer_updated', { id: input.customerId, advanceBalance: newBalance });
            return { advanceBalance: newBalance };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async recordPayment(data) {
        try {
            const input = data.data;
            const customer = await this.customerRepository.findOne({ where: { id: input.customerId } });
            if (!customer)
                throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
            const payment = await this.customerPaymentRepository.create({
                customerId: input.customerId,
                recordedBy: Number(data.userId),
                amount: input.amount,
                paymentMethod: input.paymentMethod || 'cash',
                referenceNo: input.referenceNo,
                paymentDate: input.paymentDate || new Date().toISOString().split('T')[0],
                notes: input.notes,
            });
            const newBalance = Math.max(0, Number(customer.udhaarBalance) - Number(input.amount));
            await this.customerRepository.update({ where: { id: input.customerId } }, { udhaarBalance: newBalance });
            await this.udhaarRepository.create({
                customerId: input.customerId,
                paymentId: payment.id,
                type: 'credit',
                amount: input.amount,
                balanceAfter: newBalance,
                notes: `Payment received`,
            });
            this.posGateway.broadcast('customer_payment_recorded', {
                customerId: input.customerId,
                paymentId: payment.id,
                amount: input.amount,
                newBalance,
            });
            return { paymentId: payment.id, newBalance };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            const updated = await this.customerRepository.update({ where: { id } }, data);
            this.posGateway.broadcast('customer_updated', updated.toJSON());
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            await this.customerRepository.update({ where: { id } }, { isActive: false });
            this.posGateway.broadcast('customer_deleted', { id });
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosCustomersService = PosCustomersService;
exports.PosCustomersService = PosCustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_repository_1.CustomerRepository !== "undefined" && customer_repository_1.CustomerRepository) === "function" ? _a : Object, typeof (_b = typeof customer_payment_repository_1.CustomerPaymentRepository !== "undefined" && customer_payment_repository_1.CustomerPaymentRepository) === "function" ? _b : Object, typeof (_c = typeof udhaar_transaction_repository_1.UdhaarTransactionRepository !== "undefined" && udhaar_transaction_repository_1.UdhaarTransactionRepository) === "function" ? _c : Object, typeof (_d = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _d : Object])
], PosCustomersService);


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSalesModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_sales_controller_1 = __webpack_require__(140);
const pos_sales_service_1 = __webpack_require__(141);
const database_module_1 = __webpack_require__(7);
const pos_gateway_module_1 = __webpack_require__(106);
const discount_rule_model_1 = __webpack_require__(30);
const sale_model_1 = __webpack_require__(28);
const sale_item_model_1 = __webpack_require__(29);
const store_setting_model_1 = __webpack_require__(42);
const product_variant_model_1 = __webpack_require__(22);
const pos_settings_module_1 = __webpack_require__(144);
let PosSalesModule = class PosSalesModule {
};
exports.PosSalesModule = PosSalesModule;
exports.PosSalesModule = PosSalesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            pos_gateway_module_1.PosGatewayModule,
            pos_settings_module_1.PosSettingsModule,
            sequelize_1.SequelizeModule.forFeature([discount_rule_model_1.DiscountRule, sale_model_1.Sale, sale_item_model_1.SaleItem, store_setting_model_1.StoreSetting, product_variant_model_1.ProductVariant]),
        ],
        controllers: [pos_sales_controller_1.PosSalesController],
        providers: [pos_sales_service_1.PosSalesService],
    })
], PosSalesModule);


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSalesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_sales_service_1 = __webpack_require__(141);
const pos_patterns_1 = __webpack_require__(110);
let PosSalesController = class PosSalesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async holdSale(data) {
        try {
            return await this.service.holdSale(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_HOLD_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getHeld() {
        try {
            return await this.service.getHeld();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_GET_HELD_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async deleteHeld(id) {
        try {
            return await this.service.deleteHeld(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_DELETE_HELD_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async resumeHeldSale(data) {
        try {
            return await this.service.resumeHeldSale(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_RESUME_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getReceipt(saleId) {
        try {
            return await this.service.getReceipt(saleId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_RECEIPT_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosSalesController = PosSalesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosSalesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.HOLD),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosSalesController.prototype, "holdSale", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosSalesController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosSalesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.GET_HELD),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosSalesController.prototype, "getHeld", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.DELETE_HELD),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosSalesController.prototype, "deleteHeld", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.RESUME),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PosSalesController.prototype, "resumeHeldSale", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE.GET_RECEIPT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PosSalesController.prototype, "getReceipt", null);
exports.PosSalesController = PosSalesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_sales_service_1.PosSalesService !== "undefined" && pos_sales_service_1.PosSalesService) === "function" ? _a : Object])
], PosSalesController);


/***/ }),
/* 141 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSalesService = void 0;
const common_1 = __webpack_require__(6);
const QRCode = __importStar(__webpack_require__(142));
const sequelize_typescript_1 = __webpack_require__(13);
const sequelize_1 = __webpack_require__(8);
const sale_repository_1 = __webpack_require__(72);
const sale_item_repository_1 = __webpack_require__(73);
const sale_payment_repository_1 = __webpack_require__(79);
const batch_repository_1 = __webpack_require__(65);
const customer_repository_1 = __webpack_require__(69);
const udhaar_transaction_repository_1 = __webpack_require__(71);
const fbr_invoice_log_repository_1 = __webpack_require__(78);
const audit_log_repository_1 = __webpack_require__(77);
const loyalty_points_log_repository_1 = __webpack_require__(81);
const sale_item_model_1 = __webpack_require__(29);
const sale_model_1 = __webpack_require__(28);
const sale_payment_model_1 = __webpack_require__(31);
const customer_model_1 = __webpack_require__(27);
const product_model_1 = __webpack_require__(17);
const product_variant_model_1 = __webpack_require__(22);
const store_setting_model_1 = __webpack_require__(42);
const discount_rule_model_1 = __webpack_require__(30);
const pos_gateway_1 = __webpack_require__(101);
const pos_tax_settings_service_1 = __webpack_require__(143);
let PosSalesService = class PosSalesService {
    saleRepository;
    saleItemRepository;
    salePaymentRepository;
    batchRepository;
    customerRepository;
    udhaarRepository;
    fbrLogRepository;
    auditLogRepository;
    loyaltyLogRepository;
    sequelize;
    posGateway;
    taxSettingsService;
    variantModel;
    saleModel;
    saleItemModel;
    storeSettingModel;
    discountRuleModel;
    constructor(saleRepository, saleItemRepository, salePaymentRepository, batchRepository, customerRepository, udhaarRepository, fbrLogRepository, auditLogRepository, loyaltyLogRepository, sequelize, posGateway, taxSettingsService, variantModel, saleModel, saleItemModel, storeSettingModel, discountRuleModel) {
        this.saleRepository = saleRepository;
        this.saleItemRepository = saleItemRepository;
        this.salePaymentRepository = salePaymentRepository;
        this.batchRepository = batchRepository;
        this.customerRepository = customerRepository;
        this.udhaarRepository = udhaarRepository;
        this.fbrLogRepository = fbrLogRepository;
        this.auditLogRepository = auditLogRepository;
        this.loyaltyLogRepository = loyaltyLogRepository;
        this.sequelize = sequelize;
        this.posGateway = posGateway;
        this.taxSettingsService = taxSettingsService;
        this.variantModel = variantModel;
        this.saleModel = saleModel;
        this.saleItemModel = saleItemModel;
        this.storeSettingModel = storeSettingModel;
        this.discountRuleModel = discountRuleModel;
    }
    async create(data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            const today = new Date().toISOString().split('T')[0];
            const activeRules = await this.discountRuleModel.findAll({
                where: { isActive: true },
            });
            const resolveItemDiscount = (productId, categoryId, itemSubtotal, qty) => {
                const productRule = activeRules.find(r => r.appliesTo === 'product' && r.appliesToId === productId &&
                    (!r.validFrom || r.validFrom <= today) && (!r.validTo || r.validTo >= today) &&
                    (!r.minQty || qty >= Number(r.minQty)));
                const categoryRule = !productRule && categoryId
                    ? activeRules.find(r => r.appliesTo === 'category' && r.appliesToId === categoryId &&
                        (!r.validFrom || r.validFrom <= today) && (!r.validTo || r.validTo >= today) &&
                        (!r.minQty || qty >= Number(r.minQty)))
                    : undefined;
                const rule = productRule || categoryRule;
                if (!rule)
                    return 0;
                return rule.type === 'percentage'
                    ? (itemSubtotal * Number(rule.value)) / 100
                    : Math.min(Number(rule.value), itemSubtotal);
            };
            const orderRules = activeRules.filter(r => r.appliesTo === 'order' &&
                (!r.validFrom || r.validFrom <= today) && (!r.validTo || r.validTo >= today));
            let subtotal = 0;
            let totalItemDiscount = 0;
            let totalTax = 0;
            const itemsToCreate = [];
            const taxRateMap = await this.taxSettingsService.batchResolveRates(input.items.map(i => ({ productId: i.productId, categoryId: i.categoryId })));
            const batchIds = input.items.map(i => i.batchId).filter(id => id && id > 0);
            const batchMap = new Map();
            if (batchIds.length > 0) {
                const batches = await this.batchRepository.findAll({ where: { id: batchIds } });
                batches.forEach(b => batchMap.set(b.id, b));
            }
            for (const item of input.items) {
                const qty = Number(item.qty);
                const unitPrice = Number(item.unitPrice);
                const itemSubtotal = qty * unitPrice;
                const autoDiscount = resolveItemDiscount(item.productId, item.categoryId, itemSubtotal, qty);
                const itemDiscount = item.discount !== undefined ? Number(item.discount) : autoDiscount;
                const taxRate = item.taxRate !== undefined
                    ? Number(item.taxRate)
                    : (taxRateMap.get(item.productId) ?? 0);
                const taxAmount = ((itemSubtotal - itemDiscount) * taxRate) / 100;
                const itemTotal = itemSubtotal - itemDiscount + taxAmount;
                subtotal += itemSubtotal;
                totalItemDiscount += itemDiscount;
                totalTax += taxAmount;
                const batchId = item.batchId && item.batchId > 0 ? item.batchId : null;
                const costBatch = batchId ? batchMap.get(batchId) : null;
                const costPrice = costBatch ? Number(costBatch.purchasePrice) : null;
                const costAmount = costPrice !== null ? costPrice * qty : null;
                const profitAmount = costAmount !== null ? itemTotal - costAmount : null;
                const profitMarginPercent = profitAmount !== null && itemTotal > 0
                    ? Number(((profitAmount / itemTotal) * 100).toFixed(2))
                    : null;
                itemsToCreate.push({
                    productId: item.productId,
                    variantId: item.variantId,
                    batchId: batchId ?? undefined,
                    qty,
                    unitPrice,
                    discount: itemDiscount,
                    taxRate,
                    taxAmount,
                    total: itemTotal,
                    costPrice,
                    costAmount,
                    profitAmount,
                    profitMarginPercent,
                });
            }
            let discountAmount = input.discountAmount || 0;
            for (const orderRule of orderRules) {
                if (subtotal >= Number(orderRule.minOrderAmount)) {
                    const ruleDiscount = orderRule.type === 'percentage'
                        ? (subtotal * Number(orderRule.value)) / 100
                        : Number(orderRule.value);
                    discountAmount = Math.max(discountAmount, ruleDiscount);
                }
            }
            const bundleRules = activeRules.filter(r => r.appliesTo === 'bundle');
            for (const rule of bundleRules) {
                const bundleItems = rule.bundleItems || [];
                if (!bundleItems.length)
                    continue;
                if (rule.validFrom && today < rule.validFrom)
                    continue;
                if (rule.validTo && today > rule.validTo)
                    continue;
                const qualifies = bundleItems.every(bi => {
                    const cartItem = input.items.find(c => c.productId === bi.productId);
                    return cartItem && Number(cartItem.qty) >= bi.qty;
                });
                if (!qualifies)
                    continue;
                const bundleDiscount = rule.type === 'fixed'
                    ? Number(rule.value)
                    : (subtotal * Number(rule.value)) / 100;
                discountAmount = Math.max(discountAmount, bundleDiscount);
            }
            const storeSetting = await this.storeSettingModel.findOne();
            const defaultServiceChargePercent = Number(storeSetting?.serviceChargePercent ?? 0);
            const defaultDeliveryCharge = Number(storeSetting?.deliveryCharge ?? 0);
            const serviceChargePercent = input.serviceChargePercent !== undefined
                ? Number(input.serviceChargePercent)
                : defaultServiceChargePercent;
            const deliveryCharge = input.deliveryCharge !== undefined
                ? Number(input.deliveryCharge)
                : defaultDeliveryCharge;
            const taxableBase = subtotal - totalItemDiscount - discountAmount + totalTax;
            const serviceCharge = (taxableBase * serviceChargePercent) / 100;
            const total = taxableBase + serviceCharge + deliveryCharge;
            const payments = input.payments?.length
                ? input.payments
                : [{ method: input.paymentType, amount: input.paidAmount }];
            const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
            const changeAmount = Math.max(0, totalPaid - total);
            const primaryPayment = payments.reduce((max, p) => (Number(p.amount) > Number(max.amount) ? p : max), payments[0]);
            const sale = await this.saleRepository.create({
                customerId: input.customerId,
                createdBy: Number(data.userId),
                subtotal,
                discountAmount: totalItemDiscount + discountAmount,
                taxAmount: totalTax,
                serviceCharge,
                deliveryCharge,
                total,
                paidAmount: totalPaid,
                changeAmount,
                paymentType: primaryPayment.method,
                isHeld: false,
                fbrSyncStatus: 'pending',
                terminalId: input.terminalId,
                buyerNtn: input.buyerNtn || null,
                buyerCnic: input.buyerCnic || null,
            });
            const saleItemsWithSaleId = itemsToCreate.map(item => ({ ...item, saleId: sale.id }));
            await this.saleItemRepository.bulkCreate(saleItemsWithSaleId);
            for (const p of payments) {
                await this.salePaymentRepository.create({
                    saleId: sale.id,
                    paymentMethod: p.method,
                    amount: p.amount,
                    referenceNo: p.referenceNo,
                });
            }
            for (const item of input.items) {
                let resolvedBatchId = item.batchId && item.batchId > 0 ? item.batchId : null;
                if (!resolvedBatchId) {
                    const activeBatch = await this.batchRepository.findOne({
                        where: { productId: item.productId, status: 'active' },
                        order: [['createdAt', 'ASC']],
                    });
                    resolvedBatchId = activeBatch?.id ?? null;
                }
                if (resolvedBatchId) {
                    const batch = await this.batchRepository.findOne({ where: { id: resolvedBatchId } });
                    if (batch) {
                        const newQty = Number(batch.remainingQty) - Number(item.qty);
                        await this.batchRepository.update({ where: { id: resolvedBatchId } }, { remainingQty: Math.max(0, newQty), status: newQty <= 0 ? 'depleted' : 'active' });
                        this.posGateway.broadcastStockUpdate({
                            product_id: item.productId,
                            batch_id: resolvedBatchId,
                            quantity: Math.max(0, newQty),
                            reason: 'sale',
                        });
                    }
                }
                if (item.variantId) {
                    const variant = await this.variantModel.findByPk(item.variantId);
                    if (variant) {
                        const newVariantQty = Math.max(0, Number(variant.stockQty) - Number(item.qty));
                        await this.variantModel.update({ stockQty: newVariantQty }, { where: { id: item.variantId } });
                    }
                }
            }
            const udhaarPayment = payments.find(p => p.method === 'udhaar');
            if (udhaarPayment && input.customerId) {
                const customer = await this.customerRepository.findOne({ where: { id: input.customerId } });
                if (customer) {
                    const udhaarAmount = Number(udhaarPayment.amount);
                    const currentBalance = Number(customer.udhaarBalance);
                    const creditLimit = Number(customer.creditLimit);
                    if (creditLimit > 0 && currentBalance + udhaarAmount > creditLimit) {
                        throw new common_1.BadRequestException(`CREDIT_LIMIT_EXCEEDED: customer limit is ${creditLimit}, current balance ${currentBalance}, requested ${udhaarAmount}`);
                    }
                    const newBalance = currentBalance + udhaarAmount;
                    await this.customerRepository.update({ where: { id: input.customerId } }, { udhaarBalance: newBalance });
                    await this.udhaarRepository.create({
                        customerId: input.customerId,
                        saleId: sale.id,
                        type: 'debit',
                        amount: udhaarAmount,
                        balanceAfter: newBalance,
                        notes: `Sale #${sale.id}`,
                    });
                }
            }
            const advancePayment = payments.find(p => p.method === 'advance');
            if (advancePayment && input.customerId) {
                const freshCustomer = await this.customerRepository.findOne({ where: { id: input.customerId } });
                const advBal = Number(freshCustomer?.advanceBalance ?? 0);
                if (freshCustomer && advBal > 0) {
                    const deduct = Math.min(advBal, Number(advancePayment.amount));
                    if (deduct > 0) {
                        const newAdvBal = advBal - deduct;
                        await this.customerRepository.update({ where: { id: input.customerId } }, { advanceBalance: newAdvBal });
                        await this.udhaarRepository.create({
                            customerId: input.customerId,
                            saleId: sale.id,
                            type: 'advance',
                            amount: deduct,
                            balanceAfter: newAdvBal,
                            notes: `Advance used for Sale #${sale.id}`,
                        });
                    }
                }
            }
            await this.fbrLogRepository.create({ saleId: sale.id, syncStatus: 'pending', retryCount: 0 });
            await this.auditLogRepository.create({
                userId: Number(data.userId),
                module: 'sales',
                action: 'create',
                newValue: { saleId: sale.id, total, paymentType: primaryPayment.method, terminalId: input.terminalId },
                terminal: input.terminalId ?? undefined,
            });
            let loyaltyPointsEarned = 0;
            if (input.customerId) {
                const customer = await this.customerRepository.findOne({ where: { id: input.customerId } });
                if (customer) {
                    const loyaltyEnabled = storeSetting?.loyaltyEnabled ?? false;
                    const pointsPerRupee = storeSetting?.loyaltyPointsPerRupee ?? 1;
                    loyaltyPointsEarned = loyaltyEnabled ? Math.floor(total * pointsPerRupee) : 0;
                    if (loyaltyPointsEarned > 0) {
                        const newPoints = Number(customer.loyaltyPoints) + loyaltyPointsEarned;
                        await this.customerRepository.update({ where: { id: input.customerId } }, { loyaltyPoints: newPoints });
                        await this.loyaltyLogRepository.create({
                            customerId: input.customerId,
                            saleId: sale.id,
                            type: 'earn',
                            points: loyaltyPointsEarned,
                            balanceAfter: newPoints,
                            notes: `Earned on Sale #${sale.id}`,
                        });
                    }
                }
            }
            if (loyaltyPointsEarned > 0) {
                await this.saleRepository.update({ where: { id: sale.id } }, { loyaltyPointsEarned });
            }
            await t.commit();
            this.posGateway.broadcastSaleProcessed({
                sale_id: sale.id,
                total,
                payment_type: primaryPayment.method,
                items: input.items.map(i => ({ product_id: i.productId, qty: i.qty, batch_id: i.batchId })),
            });
            return { id: sale.id, total, changeAmount, paidAmount: totalPaid, fbrSyncStatus: 'pending', loyaltyPointsEarned };
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
    async holdSale(data) {
        try {
            const input = data.data;
            const subtotal = (input.items ?? []).reduce((sum, item) => {
                return sum + (Number(item.unitPrice) * Number(item.qty));
            }, 0);
            const sale = await this.saleRepository.create({
                customerId: input.customerId ?? null,
                createdBy: Number(data.userId),
                subtotal,
                discountAmount: 0,
                taxAmount: 0,
                total: subtotal,
                paidAmount: 0,
                changeAmount: 0,
                paymentType: 'cash',
                isHeld: true,
                holdLabel: input.holdLabel || 'Held Sale',
                fbrSyncStatus: 'pending',
            });
            const items = (input.items ?? []).map((item) => ({
                saleId: sale.id,
                productId: item.productId,
                variantId: item.variantId ?? null,
                batchId: item.batchId ?? null,
                qty: Number(item.qty),
                unitPrice: Number(item.unitPrice),
                discount: Number(item.discount ?? 0),
                taxRate: Number(item.taxRate ?? 0),
                taxAmount: Number(item.taxAmount ?? 0),
                total: Number(item.unitPrice) * Number(item.qty),
            }));
            await this.saleItemRepository.bulkCreate(items);
            return { id: sale.id, isHeld: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async resumeHeldSale(data) {
        try {
            const heldSaleId = data.data.heldSaleId;
            const held = await this.saleModel.findOne({ where: { id: heldSaleId, isHeld: true } });
            if (!held)
                throw new common_1.BadRequestException('HELD_SALE_NOT_FOUND');
            await this.saleItemModel.destroy({ where: { saleId: heldSaleId } });
            await this.saleModel.destroy({ where: { id: heldSaleId } });
            return this.create(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getOne(id) {
        try {
            const sale = await this.saleRepository.findOne({
                where: { id },
                include: [
                    { model: sale_item_model_1.SaleItem, include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] }] },
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name', 'phone'] },
                ],
            });
            if (!sale)
                throw new common_1.BadRequestException('SALE_NOT_FOUND');
            return sale.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = { isHeld: false };
            if (filters?.customerId)
                where.customerId = filters.customerId;
            if (filters?.paymentType)
                where.paymentType = filters.paymentType;
            if (filters?.isHeld !== undefined)
                where.isHeld = filters.isHeld;
            const result = await this.saleRepository.findAndCountAll({
                where,
                include: [
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name', 'phone'] },
                    { model: sale_item_model_1.SaleItem, attributes: ['id'] },
                ],
                offset,
                limit,
                order: [['createdAt', 'DESC']],
                distinct: true,
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getHeld() {
        try {
            const sales = await this.saleRepository.findAll({
                where: { isHeld: true },
                include: [{ model: sale_item_model_1.SaleItem, include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'salePrice', 'barcode'] }] }],
            });
            return sales.map(s => s.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteHeld(id) {
        try {
            const held = await this.saleModel.findOne({ where: { id, isHeld: true } });
            if (!held)
                throw new common_1.BadRequestException('HELD_SALE_NOT_FOUND');
            await this.saleItemModel.destroy({ where: { saleId: id } });
            await this.saleModel.destroy({ where: { id } });
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getReceipt(saleId) {
        try {
            const sale = await this.saleRepository.findOne({
                where: { id: saleId },
                include: [
                    { model: sale_item_model_1.SaleItem, include: [{ model: product_model_1.Product, attributes: ['id', 'name'] }] },
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name', 'phone'] },
                    { model: sale_payment_model_1.SalePayment },
                ],
            });
            if (!sale)
                throw new common_1.BadRequestException('SALE_NOT_FOUND');
            const saleJson = sale.toJSON();
            const store = await this.storeSettingModel.findOne({ raw: true });
            const storeName = store?.storeName || 'QuickShop POS';
            const storeAddress = store?.address || '';
            const storePhone = store?.phone || '';
            const saleDate = new Date(saleJson.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
            const line = '─'.repeat(41);
            const saleItems = saleJson.saleItems || [];
            const items = saleItems.map((item) => {
                const name = (item.product?.name || 'Item').substring(0, 16).padEnd(16);
                const qty = String(Number(item.qty)).padStart(4);
                const rate = Number(item.unitPrice).toFixed(2).padStart(8);
                const amount = Number(item.total).toFixed(2).padStart(10);
                return `${name}${qty}  ${rate}  ${amount}`;
            });
            const customerLine = saleJson.customer
                ? `Customer: ${saleJson.customer.name} (${saleJson.customer.phone})`
                : 'Customer: Walk-in';
            let fbrQrBase64 = null;
            if (sale.fbrIrn) {
                const qrUrl = `https://e.fbr.gov.pk/verify?irn=${sale.fbrIrn}`;
                fbrQrBase64 = await QRCode.toDataURL(qrUrl, { width: 200, margin: 1 });
            }
            const lines = [
                storeName.padStart(Math.floor((41 + storeName.length) / 2)),
                storeAddress ? storeAddress.substring(0, 41) : null,
                storePhone ? `Phone: ${storePhone}`.padEnd(20) + `Date: ${saleDate}` : `Date: ${saleDate}`,
                customerLine,
                line,
                'Item            Qty      Rate      Amount',
                line,
                ...items,
                line,
                `Subtotal:`.padEnd(31) + Number(saleJson.subtotal).toFixed(2).padStart(10),
                Number(saleJson.discountAmount) > 0
                    ? `Discount:`.padEnd(31) + `-${Number(saleJson.discountAmount).toFixed(2)}`.padStart(10)
                    : null,
                Number(saleJson.taxAmount) > 0
                    ? `Tax (GST):`.padEnd(31) + Number(saleJson.taxAmount).toFixed(2).padStart(10)
                    : null,
                Number(saleJson.serviceCharge) > 0
                    ? `Service Charge:`.padEnd(31) + Number(saleJson.serviceCharge).toFixed(2).padStart(10)
                    : null,
                Number(saleJson.deliveryCharge) > 0
                    ? `Delivery Charge:`.padEnd(31) + Number(saleJson.deliveryCharge).toFixed(2).padStart(10)
                    : null,
                `Total Sale:`.padEnd(31) + Number(saleJson.total).toFixed(2).padStart(10),
                ...(() => {
                    const salePayments = saleJson.salePayments ?? [];
                    if (salePayments.length > 1) {
                        return salePayments.map((p) => `  Paid (${p.paymentMethod}):`.padEnd(31) + Number(p.amount).toFixed(2).padStart(10));
                    }
                    return [`Paid (${saleJson.paymentType}):`.padEnd(31) + Number(saleJson.paidAmount).toFixed(2).padStart(10)];
                })(),
                Number(saleJson.changeAmount) > 0
                    ? `Balance Return:`.padEnd(31) + Number(saleJson.changeAmount).toFixed(2).padStart(10)
                    : null,
                line,
                saleJson.fbrIrn ? `FBR Invoice #: ${saleJson.fbrIrn}` : `FBR Status: ${saleJson.fbrSyncStatus ?? 'pending'}`,
                fbrQrBase64 ? `[QR:${fbrQrBase64}]` : null,
                line,
                'Thank you — Come again!'.padStart(32),
            ].filter(Boolean);
            return { text: lines.join('\n'), fbrQrBase64, fbrIrn: saleJson.fbrIrn || null };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosSalesService = PosSalesService;
exports.PosSalesService = PosSalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(12, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __param(13, (0, sequelize_1.InjectModel)(sale_model_1.Sale)),
    __param(14, (0, sequelize_1.InjectModel)(sale_item_model_1.SaleItem)),
    __param(15, (0, sequelize_1.InjectModel)(store_setting_model_1.StoreSetting)),
    __param(16, (0, sequelize_1.InjectModel)(discount_rule_model_1.DiscountRule)),
    __metadata("design:paramtypes", [typeof (_a = typeof sale_repository_1.SaleRepository !== "undefined" && sale_repository_1.SaleRepository) === "function" ? _a : Object, typeof (_b = typeof sale_item_repository_1.SaleItemRepository !== "undefined" && sale_item_repository_1.SaleItemRepository) === "function" ? _b : Object, typeof (_c = typeof sale_payment_repository_1.SalePaymentRepository !== "undefined" && sale_payment_repository_1.SalePaymentRepository) === "function" ? _c : Object, typeof (_d = typeof batch_repository_1.BatchRepository !== "undefined" && batch_repository_1.BatchRepository) === "function" ? _d : Object, typeof (_e = typeof customer_repository_1.CustomerRepository !== "undefined" && customer_repository_1.CustomerRepository) === "function" ? _e : Object, typeof (_f = typeof udhaar_transaction_repository_1.UdhaarTransactionRepository !== "undefined" && udhaar_transaction_repository_1.UdhaarTransactionRepository) === "function" ? _f : Object, typeof (_g = typeof fbr_invoice_log_repository_1.FbrInvoiceLogRepository !== "undefined" && fbr_invoice_log_repository_1.FbrInvoiceLogRepository) === "function" ? _g : Object, typeof (_h = typeof audit_log_repository_1.AuditLogRepository !== "undefined" && audit_log_repository_1.AuditLogRepository) === "function" ? _h : Object, typeof (_j = typeof loyalty_points_log_repository_1.LoyaltyPointsLogRepository !== "undefined" && loyalty_points_log_repository_1.LoyaltyPointsLogRepository) === "function" ? _j : Object, typeof (_k = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _k : Object, typeof (_l = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _l : Object, typeof (_m = typeof pos_tax_settings_service_1.PosTaxSettingsService !== "undefined" && pos_tax_settings_service_1.PosTaxSettingsService) === "function" ? _m : Object, Object, Object, Object, Object, Object])
], PosSalesService);


/***/ }),
/* 142 */
/***/ ((module) => {

module.exports = require("qrcode");

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosTaxSettingsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const tax_setting_model_1 = __webpack_require__(40);
const category_model_1 = __webpack_require__(14);
const product_model_1 = __webpack_require__(17);
let PosTaxSettingsService = class PosTaxSettingsService {
    model;
    constructor(model) {
        this.model = model;
    }
    async getAll() {
        try {
            const settings = await this.model.findAll({
                include: [
                    { model: category_model_1.Category, attributes: ['id', 'name'], required: false },
                    { model: product_model_1.Product, attributes: ['id', 'name'], required: false },
                ],
                order: [['updatedAt', 'DESC']],
            });
            return settings.map(s => s.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async upsert(data) {
        try {
            const where = {};
            if (data.productId)
                where.productId = data.productId;
            else if (data.categoryId)
                where.categoryId = data.categoryId;
            else
                throw new common_1.BadRequestException('TAX_SETTING_REQUIRES_PRODUCT_OR_CATEGORY');
            const existing = await this.model.findOne({ where });
            if (existing) {
                await existing.update({ gstRate: data.gstRate, isActive: true, updatedBy: data.updatedBy });
                return existing.toJSON();
            }
            const created = await this.model.create({
                categoryId: data.categoryId || null,
                productId: data.productId || null,
                gstRate: data.gstRate,
                isActive: true,
                updatedBy: data.updatedBy || null,
            });
            return created.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            const setting = await this.model.findByPk(id);
            if (!setting)
                throw new common_1.BadRequestException('TAX_SETTING_NOT_FOUND');
            await setting.update({ isActive: false });
            return { deleted: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async resolveRate(productId, categoryId) {
        try {
            const productRule = await this.model.findOne({ where: { productId, isActive: true } });
            if (productRule)
                return Number(productRule.gstRate);
            if (categoryId) {
                const categoryRule = await this.model.findOne({ where: { categoryId, isActive: true } });
                if (categoryRule)
                    return Number(categoryRule.gstRate);
            }
            return 0;
        }
        catch {
            return 0;
        }
    }
    async batchResolveRates(items) {
        try {
            const allRules = await this.model.findAll({ where: { isActive: true }, raw: true });
            const productRules = new Map();
            const categoryRules = new Map();
            for (const r of allRules) {
                if (r.product_id)
                    productRules.set(r.product_id, Number(r.gst_rate));
                else if (r.category_id)
                    categoryRules.set(r.category_id, Number(r.gst_rate));
            }
            const result = new Map();
            for (const item of items) {
                if (productRules.has(item.productId)) {
                    result.set(item.productId, productRules.get(item.productId));
                }
                else if (item.categoryId && categoryRules.has(item.categoryId)) {
                    result.set(item.productId, categoryRules.get(item.categoryId));
                }
                else {
                    result.set(item.productId, 0);
                }
            }
            return result;
        }
        catch {
            const result = new Map();
            items.forEach(i => result.set(i.productId, 0));
            return result;
        }
    }
};
exports.PosTaxSettingsService = PosTaxSettingsService;
exports.PosTaxSettingsService = PosTaxSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tax_setting_model_1.TaxSetting)),
    __metadata("design:paramtypes", [Object])
], PosTaxSettingsService);


/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSettingsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const store_setting_model_1 = __webpack_require__(42);
const tax_setting_model_1 = __webpack_require__(40);
const category_model_1 = __webpack_require__(14);
const product_model_1 = __webpack_require__(17);
const pos_settings_controller_1 = __webpack_require__(145);
const pos_settings_service_1 = __webpack_require__(146);
const pos_tax_settings_service_1 = __webpack_require__(143);
const pos_currency_service_1 = __webpack_require__(147);
const currency_setting_model_1 = __webpack_require__(57);
let PosSettingsModule = class PosSettingsModule {
};
exports.PosSettingsModule = PosSettingsModule;
exports.PosSettingsModule = PosSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([store_setting_model_1.StoreSetting, tax_setting_model_1.TaxSetting, category_model_1.Category, product_model_1.Product, currency_setting_model_1.CurrencySetting])],
        controllers: [pos_settings_controller_1.PosSettingsController],
        providers: [pos_settings_service_1.PosSettingsService, pos_tax_settings_service_1.PosTaxSettingsService, pos_currency_service_1.PosCurrencyService],
        exports: [pos_tax_settings_service_1.PosTaxSettingsService, pos_currency_service_1.PosCurrencyService],
    })
], PosSettingsModule);


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSettingsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_settings_service_1 = __webpack_require__(146);
const pos_tax_settings_service_1 = __webpack_require__(143);
const pos_currency_service_1 = __webpack_require__(147);
const pos_patterns_1 = __webpack_require__(110);
let PosSettingsController = class PosSettingsController {
    service;
    taxService;
    currencyService;
    constructor(service, taxService, currencyService) {
        this.service = service;
        this.taxService = taxService;
        this.currencyService = currencyService;
    }
    async getStore() {
        try {
            return await this.service.getStore();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SETTINGS_GET_STORE_ERROR', status: 400 });
        }
    }
    async updateStore(data) {
        try {
            return await this.service.updateStore(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SETTINGS_UPDATE_STORE_ERROR', status: 400 });
        }
    }
    async getTaxSettings() {
        try {
            return await this.taxService.getAll();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'TAX_GET_ALL_ERROR', status: 400 });
        }
    }
    async upsertTaxSetting(data) {
        try {
            return await this.taxService.upsert(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'TAX_UPSERT_ERROR', status: 400 });
        }
    }
    async deleteTaxSetting(id) {
        try {
            return await this.taxService.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'TAX_DELETE_ERROR', status: 400 });
        }
    }
    async resolveTaxRate(data) {
        try {
            return { gstRate: await this.taxService.resolveRate(data.productId, data.categoryId) };
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'TAX_RESOLVE_ERROR', status: 400 });
        }
    }
    async batchResolveTaxRates(items) {
        try {
            const rateMap = await this.taxService.batchResolveRates(items);
            const result = {};
            rateMap.forEach((rate, productId) => { result[productId] = rate; });
            return result;
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'TAX_BATCH_RESOLVE_ERROR', status: 400 });
        }
    }
    async getCurrencies() {
        try {
            return await this.currencyService.getAll();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CURRENCY_GET_ALL_ERROR', status: 400 });
        }
    }
    async createCurrency(data) {
        try {
            return await this.currencyService.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CURRENCY_CREATE_ERROR', status: 400 });
        }
    }
    async updateCurrency(data) {
        try {
            return await this.currencyService.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CURRENCY_UPDATE_ERROR', status: 400 });
        }
    }
    async setCurrencyDefault(id) {
        try {
            return await this.currencyService.setDefault(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CURRENCY_SET_DEFAULT_ERROR', status: 400 });
        }
    }
    async deleteCurrency(id) {
        try {
            return await this.currencyService.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'CURRENCY_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosSettingsController = PosSettingsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.GET_STORE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosSettingsController.prototype, "getStore", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.UPDATE_STORE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosSettingsController.prototype, "updateStore", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosSettingsController.prototype, "getTaxSettings", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_UPSERT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosSettingsController.prototype, "upsertTaxSetting", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PosSettingsController.prototype, "deleteTaxSetting", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_RESOLVE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PosSettingsController.prototype, "resolveTaxRate", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.TAX_BATCH_RESOLVE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof Array !== "undefined" && Array) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], PosSettingsController.prototype, "batchResolveTaxRates", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], PosSettingsController.prototype, "getCurrencies", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], PosSettingsController.prototype, "createCurrency", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], PosSettingsController.prototype, "updateCurrency", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_SET_DEFAULT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], PosSettingsController.prototype, "setCurrencyDefault", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SETTINGS.CURRENCY_DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], PosSettingsController.prototype, "deleteCurrency", null);
exports.PosSettingsController = PosSettingsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_settings_service_1.PosSettingsService !== "undefined" && pos_settings_service_1.PosSettingsService) === "function" ? _a : Object, typeof (_b = typeof pos_tax_settings_service_1.PosTaxSettingsService !== "undefined" && pos_tax_settings_service_1.PosTaxSettingsService) === "function" ? _b : Object, typeof (_c = typeof pos_currency_service_1.PosCurrencyService !== "undefined" && pos_currency_service_1.PosCurrencyService) === "function" ? _c : Object])
], PosSettingsController);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSettingsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const store_setting_model_1 = __webpack_require__(42);
let PosSettingsService = class PosSettingsService {
    storeSettingModel;
    constructor(storeSettingModel) {
        this.storeSettingModel = storeSettingModel;
    }
    async getStore() {
        try {
            let setting = await this.storeSettingModel.findOne();
            if (!setting)
                setting = await this.storeSettingModel.create({ storeName: 'My Store' });
            return setting.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateStore(data) {
        try {
            let setting = await this.storeSettingModel.findOne();
            if (!setting) {
                setting = await this.storeSettingModel.create({ ...data.data, updatedBy: data.userId });
            }
            else {
                await setting.update({ ...data.data, updatedBy: data.userId, updatedAt: new Date() });
            }
            return setting.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosSettingsService = PosSettingsService;
exports.PosSettingsService = PosSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(store_setting_model_1.StoreSetting)),
    __metadata("design:paramtypes", [Object])
], PosSettingsService);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosCurrencyService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const currency_setting_model_1 = __webpack_require__(57);
let PosCurrencyService = class PosCurrencyService {
    model;
    constructor(model) {
        this.model = model;
    }
    async getAll() {
        try {
            const list = await this.model.findAll({ order: [['sortOrder', 'ASC'], ['code', 'ASC']] });
            return list.map(c => c.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'CURRENCY_GET_ALL_ERROR');
        }
    }
    async create(data) {
        try {
            const existing = await this.model.findOne({ where: { code: data.code } });
            if (existing)
                throw new common_1.BadRequestException('CURRENCY_CODE_ALREADY_EXISTS');
            const count = await this.model.count();
            const currency = await this.model.create({
                ...data,
                isDefault: count === 0 ? true : !!data.isDefault,
            });
            return currency.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'CURRENCY_CREATE_ERROR');
        }
    }
    async update(id, data) {
        try {
            const record = await this.model.findOne({ where: { id } });
            if (!record)
                throw new common_1.BadRequestException('CURRENCY_NOT_FOUND');
            await record.update(data);
            return record.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'CURRENCY_UPDATE_ERROR');
        }
    }
    async setDefault(id) {
        try {
            await this.model.update({ isDefault: false }, { where: {} });
            const record = await this.model.findOne({ where: { id } });
            if (!record)
                throw new common_1.BadRequestException('CURRENCY_NOT_FOUND');
            await record.update({ isDefault: true });
            return record.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'CURRENCY_SET_DEFAULT_ERROR');
        }
    }
    async delete(id) {
        try {
            const record = await this.model.findOne({ where: { id } });
            if (!record)
                throw new common_1.BadRequestException('CURRENCY_NOT_FOUND');
            if (record.isDefault)
                throw new common_1.BadRequestException('CANNOT_DELETE_DEFAULT_CURRENCY');
            await record.destroy();
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'CURRENCY_DELETE_ERROR');
        }
    }
};
exports.PosCurrencyService = PosCurrencyService;
exports.PosCurrencyService = PosCurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(currency_setting_model_1.CurrencySetting)),
    __metadata("design:paramtypes", [Object])
], PosCurrencyService);


/***/ }),
/* 148 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSaleReturnsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_sale_returns_controller_1 = __webpack_require__(149);
const pos_sale_returns_service_1 = __webpack_require__(150);
const database_module_1 = __webpack_require__(7);
const pos_gateway_module_1 = __webpack_require__(106);
const sale_model_1 = __webpack_require__(28);
const store_setting_model_1 = __webpack_require__(42);
const product_variant_model_1 = __webpack_require__(22);
let PosSaleReturnsModule = class PosSaleReturnsModule {
};
exports.PosSaleReturnsModule = PosSaleReturnsModule;
exports.PosSaleReturnsModule = PosSaleReturnsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, pos_gateway_module_1.PosGatewayModule, sequelize_1.SequelizeModule.forFeature([sale_model_1.Sale, store_setting_model_1.StoreSetting, product_variant_model_1.ProductVariant])],
        controllers: [pos_sale_returns_controller_1.PosSaleReturnsController],
        providers: [pos_sale_returns_service_1.PosSaleReturnsService],
    })
], PosSaleReturnsModule);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSaleReturnsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_sale_returns_service_1 = __webpack_require__(150);
const pos_patterns_1 = __webpack_require__(110);
let PosSaleReturnsController = class PosSaleReturnsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_RETURN_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getBySale(saleId) {
        try {
            return await this.service.getBySale(saleId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_RETURN_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_RETURN_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getReceipt(returnId) {
        try {
            return await this.service.getReceipt(returnId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SALE_RETURN_RECEIPT_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosSaleReturnsController = PosSaleReturnsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE_RETURN.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosSaleReturnsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE_RETURN.GET_BY_SALE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosSaleReturnsController.prototype, "getBySale", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE_RETURN.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosSaleReturnsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SALE_RETURN.GET_RECEIPT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosSaleReturnsController.prototype, "getReceipt", null);
exports.PosSaleReturnsController = PosSaleReturnsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_sale_returns_service_1.PosSaleReturnsService !== "undefined" && pos_sale_returns_service_1.PosSaleReturnsService) === "function" ? _a : Object])
], PosSaleReturnsController);


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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSaleReturnsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const sequelize_typescript_1 = __webpack_require__(13);
const sale_return_repository_1 = __webpack_require__(74);
const sale_item_repository_1 = __webpack_require__(73);
const batch_repository_1 = __webpack_require__(65);
const customer_repository_1 = __webpack_require__(69);
const udhaar_transaction_repository_1 = __webpack_require__(71);
const audit_log_repository_1 = __webpack_require__(77);
const sale_model_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(17);
const product_variant_model_1 = __webpack_require__(22);
const store_setting_model_1 = __webpack_require__(42);
const pos_user_model_1 = __webpack_require__(12);
const pos_gateway_1 = __webpack_require__(101);
let PosSaleReturnsService = class PosSaleReturnsService {
    saleReturnRepository;
    saleItemRepository;
    batchRepository;
    customerRepository;
    udhaarRepository;
    auditLogRepository;
    sequelize;
    posGateway;
    saleModel;
    variantModel;
    storeSettingModel;
    constructor(saleReturnRepository, saleItemRepository, batchRepository, customerRepository, udhaarRepository, auditLogRepository, sequelize, posGateway, saleModel, variantModel, storeSettingModel) {
        this.saleReturnRepository = saleReturnRepository;
        this.saleItemRepository = saleItemRepository;
        this.batchRepository = batchRepository;
        this.customerRepository = customerRepository;
        this.udhaarRepository = udhaarRepository;
        this.auditLogRepository = auditLogRepository;
        this.sequelize = sequelize;
        this.posGateway = posGateway;
        this.saleModel = saleModel;
        this.variantModel = variantModel;
        this.storeSettingModel = storeSettingModel;
    }
    async create(data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            const sale = await this.saleModel.findByPk(input.saleId);
            if (!sale)
                throw new common_1.BadRequestException('SALE_NOT_FOUND');
            const storeSetting = await this.storeSettingModel.findOne();
            const returnWindowDays = storeSetting?.returnWindowDays ?? 7;
            const daysDiff = Math.floor((Date.now() - new Date(sale.createdAt).getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff > returnWindowDays) {
                throw new common_1.BadRequestException(`RETURN_WINDOW_EXPIRED: Return allowed within ${returnWindowDays} days. Sale was ${daysDiff} days ago.`);
            }
            const createdReturns = [];
            let totalRefundAmount = 0;
            const broadcastItems = [];
            for (const item of input.items) {
                let refundAmount = 0;
                const saleItems = await this.saleItemRepository.findAll({
                    where: { saleId: input.saleId, productId: item.productId },
                });
                const saleItem = saleItems[0];
                if (saleItem) {
                    const unitPrice = Number(saleItem.unitPrice);
                    const itemDiscount = Number(saleItem.discount || 0);
                    const taxRate = Number(saleItem.taxRate || 0);
                    const originalQty = Number(saleItem.qty);
                    const perUnitDiscount = originalQty > 0 ? itemDiscount / originalQty : 0;
                    const netUnitPrice = unitPrice - perUnitDiscount;
                    const taxAmount = (netUnitPrice * taxRate) / 100;
                    refundAmount = Number(((netUnitPrice + taxAmount) * Number(item.quantity)).toFixed(2));
                }
                const originalCostPrice = saleItem ? saleItem.costPrice ?? null : null;
                const profitLost = originalCostPrice !== null
                    ? Number((refundAmount - originalCostPrice * Number(item.quantity)).toFixed(2))
                    : null;
                const saleReturn = await this.saleReturnRepository.create({
                    saleId: input.saleId,
                    saleItemId: saleItem?.id ?? undefined,
                    productId: item.productId,
                    variantId: item.variantId ?? undefined,
                    batchId: item.batchId ?? undefined,
                    quantity: item.quantity,
                    reason: item.reason ?? 'other',
                    refundType: input.refundType,
                    refundAmount,
                    originalCostPrice,
                    profitLost,
                    processedBy: Number(data.userId),
                });
                createdReturns.push(saleReturn.toJSON());
                totalRefundAmount += refundAmount;
                if (item.batchId) {
                    const batch = await this.batchRepository.findOne({ where: { id: item.batchId } });
                    if (batch) {
                        const newQty = Number(batch.remainingQty) + Number(item.quantity);
                        await this.batchRepository.update({ where: { id: item.batchId } }, { remainingQty: newQty, status: 'active' });
                        this.posGateway.broadcastStockUpdate({
                            product_id: item.productId,
                            batch_id: item.batchId,
                            quantity: newQty,
                            reason: 'return',
                        });
                    }
                }
                if (item.variantId) {
                    const variant = await this.variantModel.findByPk(item.variantId);
                    if (variant) {
                        const newVariantQty = Number(variant.stockQty) + Number(item.quantity);
                        await this.variantModel.update({ stockQty: newVariantQty }, { where: { id: item.variantId } });
                    }
                }
                broadcastItems.push({ product_id: item.productId, qty: item.quantity, batch_id: item.batchId });
            }
            if (input.refundType === 'udhaar' && totalRefundAmount > 0 && sale.customerId) {
                const customer = await this.customerRepository.findOne({ where: { id: sale.customerId } });
                if (customer) {
                    const newBalance = Math.max(0, Number(customer.udhaarBalance) - totalRefundAmount);
                    await this.customerRepository.update({ where: { id: sale.customerId } }, { udhaarBalance: newBalance });
                    await this.udhaarRepository.create({
                        customerId: sale.customerId,
                        type: 'credit',
                        amount: totalRefundAmount,
                        balanceAfter: newBalance,
                        notes: `Return — Sale #${input.saleId} (${input.items.length} item(s))`,
                    });
                }
            }
            await this.auditLogRepository.create({
                userId: Number(data.userId),
                module: 'sale_returns',
                action: 'create',
                newValue: {
                    saleId: input.saleId,
                    itemCount: input.items.length,
                    totalRefundAmount,
                    refundType: input.refundType,
                    returnIds: createdReturns.map(r => r.id),
                },
                terminal: input.terminalId ?? undefined,
            });
            await t.commit();
            this.posGateway.broadcastReturnProcessed({
                return_id: createdReturns[0]?.id,
                sale_id: input.saleId,
                refund_amount: totalRefundAmount,
                items: broadcastItems,
            });
            return { returns: createdReturns, totalRefundAmount, refundType: input.refundType };
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
    async getBySale(saleId) {
        try {
            const returns = await this.saleReturnRepository.findAll({
                where: { saleId },
                include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] }],
            });
            return returns.map(r => r.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const result = await this.saleReturnRepository.findAndCountAll({
                include: [
                    { model: sale_model_1.Sale, attributes: ['id', 'total'] },
                    { model: product_model_1.Product, attributes: ['id', 'name'] },
                ],
                offset,
                limit,
                order: [['createdAt', 'DESC']],
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getReceipt(returnId) {
        try {
            const ret = await this.saleReturnRepository.findOne({
                where: { id: returnId },
                include: [
                    { model: sale_model_1.Sale, attributes: ['id', 'total', 'createdAt'] },
                    { model: product_model_1.Product, attributes: ['id', 'name'] },
                    { model: pos_user_model_1.PosUser, as: 'processedByUser', attributes: ['id', 'name', 'role'] },
                ],
            });
            if (!ret)
                throw new common_1.BadRequestException('SALE_RETURN_NOT_FOUND');
            const allReturns = await this.saleReturnRepository.findAll({
                where: { saleId: ret.saleId },
                include: [
                    { model: product_model_1.Product, attributes: ['id', 'name'] },
                    { model: pos_user_model_1.PosUser, as: 'processedByUser', attributes: ['id', 'name', 'role'] },
                ],
                order: [['createdAt', 'ASC']],
            });
            const store = await this.storeSettingModel.findOne();
            const storeName = store?.storeName || 'QuickShop POS';
            const storeAddress = store?.address || '';
            const returnDate = new Date(ret.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
            const line = '─'.repeat(45);
            const itemLines = allReturns.map(r => {
                const productName = (r.product?.name || 'Item').substring(0, 16).padEnd(16);
                const qty = String(r.quantity).padStart(4);
                const unitRate = (Number(r.refundAmount) / Number(r.quantity)).toFixed(2).padStart(8);
                const amount = `-${Number(r.refundAmount).toFixed(2)}`.padStart(10);
                return `${productName}${qty}  ${unitRate}  ${amount}`;
            });
            const totalRefund = allReturns.reduce((sum, r) => sum + Number(r.refundAmount), 0);
            const processedByUser = ret.processedByUser;
            const processedByLine = processedByUser
                ? `Processed by: ${processedByUser.name} (${processedByUser.role})`
                : 'Processed by: Staff';
            const lines = [
                storeName.padStart(Math.floor((45 + storeName.length) / 2)),
                storeAddress ? storeAddress.substring(0, 45) : null,
                `Return Invoice #R-${ret.saleId}`.padStart(Math.floor((45 + `Return Invoice #R-${ret.saleId}`.length) / 2)),
                `Original Sale: #${ret.saleId}`.padEnd(22) + `Date: ${returnDate}`,
                line,
                'Item            Qty      Rate      Amount',
                line,
                ...itemLines,
                line,
                `Total Refund (${allReturns.length} item(s)):`.padEnd(35) + `-${totalRefund.toFixed(2)}`.padStart(10),
                `Refund Method: ${ret.refundType}`,
                processedByLine,
                line,
                'Thank you!'.padStart(28),
            ].filter(Boolean);
            return { text: lines.join('\n'), totalRefund, itemCount: allReturns.length };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosSaleReturnsService = PosSaleReturnsService;
exports.PosSaleReturnsService = PosSaleReturnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(8, (0, sequelize_1.InjectModel)(sale_model_1.Sale)),
    __param(9, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __param(10, (0, sequelize_1.InjectModel)(store_setting_model_1.StoreSetting)),
    __metadata("design:paramtypes", [typeof (_a = typeof sale_return_repository_1.SaleReturnRepository !== "undefined" && sale_return_repository_1.SaleReturnRepository) === "function" ? _a : Object, typeof (_b = typeof sale_item_repository_1.SaleItemRepository !== "undefined" && sale_item_repository_1.SaleItemRepository) === "function" ? _b : Object, typeof (_c = typeof batch_repository_1.BatchRepository !== "undefined" && batch_repository_1.BatchRepository) === "function" ? _c : Object, typeof (_d = typeof customer_repository_1.CustomerRepository !== "undefined" && customer_repository_1.CustomerRepository) === "function" ? _d : Object, typeof (_e = typeof udhaar_transaction_repository_1.UdhaarTransactionRepository !== "undefined" && udhaar_transaction_repository_1.UdhaarTransactionRepository) === "function" ? _e : Object, typeof (_f = typeof audit_log_repository_1.AuditLogRepository !== "undefined" && audit_log_repository_1.AuditLogRepository) === "function" ? _f : Object, typeof (_g = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _g : Object, typeof (_h = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _h : Object, Object, Object, Object])
], PosSaleReturnsService);


/***/ }),
/* 151 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosStockModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_stock_controller_1 = __webpack_require__(152);
const pos_stock_service_1 = __webpack_require__(153);
const database_module_1 = __webpack_require__(7);
const pos_gateway_module_1 = __webpack_require__(106);
const product_variant_model_1 = __webpack_require__(22);
let PosStockModule = class PosStockModule {
};
exports.PosStockModule = PosStockModule;
exports.PosStockModule = PosStockModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, pos_gateway_module_1.PosGatewayModule, sequelize_1.SequelizeModule.forFeature([product_variant_model_1.ProductVariant])],
        controllers: [pos_stock_controller_1.PosStockController],
        providers: [pos_stock_service_1.PosStockService],
    })
], PosStockModule);


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosStockController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_stock_service_1 = __webpack_require__(153);
const pos_patterns_1 = __webpack_require__(110);
let PosStockController = class PosStockController {
    service;
    constructor(service) {
        this.service = service;
    }
    async adjust(data) {
        try {
            return await this.service.adjust(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'STOCK_ADJUST_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAdjustments(data) {
        try {
            return await this.service.getAdjustments(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'STOCK_GET_ADJUSTMENTS_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosStockController = PosStockController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.STOCK.ADJUST),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosStockController.prototype, "adjust", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.STOCK.GET_ADJUSTMENTS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosStockController.prototype, "getAdjustments", null);
exports.PosStockController = PosStockController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_stock_service_1.PosStockService !== "undefined" && pos_stock_service_1.PosStockService) === "function" ? _a : Object])
], PosStockController);


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosStockService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const stock_adjustment_repository_1 = __webpack_require__(75);
const batch_repository_1 = __webpack_require__(65);
const product_model_1 = __webpack_require__(17);
const product_variant_model_1 = __webpack_require__(22);
const pos_gateway_1 = __webpack_require__(101);
let PosStockService = class PosStockService {
    stockAdjRepository;
    batchRepository;
    posGateway;
    variantModel;
    constructor(stockAdjRepository, batchRepository, posGateway, variantModel) {
        this.stockAdjRepository = stockAdjRepository;
        this.batchRepository = batchRepository;
        this.posGateway = posGateway;
        this.variantModel = variantModel;
    }
    async adjust(data) {
        try {
            const input = data.data;
            const adjustment = await this.stockAdjRepository.create({
                productId: input.productId,
                batchId: input.batchId,
                qtyChange: input.qtyChange,
                reason: input.reason,
                notes: input.notes,
                adjustedBy: Number(data.userId),
            });
            if (input.batchId) {
                const batch = await this.batchRepository.findOne({ where: { id: input.batchId } });
                if (batch) {
                    const newQty = Math.max(0, Number(batch.remainingQty) + Number(input.qtyChange));
                    await this.batchRepository.update({ where: { id: input.batchId } }, { remainingQty: newQty, status: newQty <= 0 ? 'depleted' : 'active' });
                    this.posGateway.broadcastStockUpdate({
                        product_id: input.productId,
                        batch_id: input.batchId,
                        quantity: newQty,
                        reason: 'adjustment',
                    });
                }
            }
            if (input.variantId) {
                const variant = await this.variantModel.findByPk(input.variantId);
                if (variant) {
                    const newVariantQty = Math.max(0, Number(variant.stockQty) + Number(input.qtyChange));
                    await this.variantModel.update({ stockQty: newVariantQty }, { where: { id: input.variantId } });
                }
            }
            this.posGateway.broadcast('stock_adjustment_created', adjustment.toJSON());
            return adjustment.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAdjustments(data) {
        try {
            const where = {};
            if (data.data?.productId)
                where.productId = data.data.productId;
            const adjustments = await this.stockAdjRepository.findAll({
                where,
                include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] }],
            });
            return adjustments.map(a => a.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosStockService = PosStockService;
exports.PosStockService = PosStockService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __metadata("design:paramtypes", [typeof (_a = typeof stock_adjustment_repository_1.StockAdjustmentRepository !== "undefined" && stock_adjustment_repository_1.StockAdjustmentRepository) === "function" ? _a : Object, typeof (_b = typeof batch_repository_1.BatchRepository !== "undefined" && batch_repository_1.BatchRepository) === "function" ? _b : Object, typeof (_c = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _c : Object, Object])
], PosStockService);


/***/ }),
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosExpensesModule = void 0;
const common_1 = __webpack_require__(6);
const pos_expenses_controller_1 = __webpack_require__(155);
const pos_expenses_service_1 = __webpack_require__(156);
const database_module_1 = __webpack_require__(7);
let PosExpensesModule = class PosExpensesModule {
};
exports.PosExpensesModule = PosExpensesModule;
exports.PosExpensesModule = PosExpensesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_expenses_controller_1.PosExpensesController],
        providers: [pos_expenses_service_1.PosExpensesService],
    })
], PosExpensesModule);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosExpensesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_expenses_service_1 = __webpack_require__(156);
const pos_patterns_1 = __webpack_require__(110);
let PosExpensesController = class PosExpensesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'EXPENSE_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'EXPENSE_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'EXPENSE_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'EXPENSE_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosExpensesController = PosExpensesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.EXPENSE.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosExpensesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.EXPENSE.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosExpensesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.EXPENSE.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosExpensesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.EXPENSE.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosExpensesController.prototype, "delete", null);
exports.PosExpensesController = PosExpensesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_expenses_service_1.PosExpensesService !== "undefined" && pos_expenses_service_1.PosExpensesService) === "function" ? _a : Object])
], PosExpensesController);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosExpensesService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const expense_repository_1 = __webpack_require__(76);
const pos_gateway_1 = __webpack_require__(101);
let PosExpensesService = class PosExpensesService {
    expenseRepository;
    posGateway;
    constructor(expenseRepository, posGateway) {
        this.expenseRepository = expenseRepository;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            const expense = await this.expenseRepository.create({
                ...data.data,
                createdBy: Number(data.userId),
            });
            this.posGateway.broadcast('expense_created', expense.toJSON());
            return expense.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = {};
            if (filters?.category)
                where.category = filters.category;
            if (filters?.fromDate && filters?.toDate) {
                where.expenseDate = { [sequelize_1.Op.between]: [filters.fromDate, filters.toDate] };
            }
            const result = await this.expenseRepository.findAndCountAll({ where, offset, limit, order: [['expenseDate', 'DESC']] });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            const updated = await this.expenseRepository.update({ where: { id } }, data);
            this.posGateway.broadcast('expense_updated', updated.toJSON());
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            const result = await this.expenseRepository.delete({ where: { id } });
            this.posGateway.broadcast('expense_deleted', { id });
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosExpensesService = PosExpensesService;
exports.PosExpensesService = PosExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof expense_repository_1.ExpenseRepository !== "undefined" && expense_repository_1.ExpenseRepository) === "function" ? _a : Object, typeof (_b = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _b : Object])
], PosExpensesService);


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosReportsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_reports_controller_1 = __webpack_require__(158);
const pos_reports_service_1 = __webpack_require__(159);
const database_module_1 = __webpack_require__(7);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const sale_item_model_1 = __webpack_require__(29);
const sale_model_1 = __webpack_require__(28);
let PosReportsModule = class PosReportsModule {
};
exports.PosReportsModule = PosReportsModule;
exports.PosReportsModule = PosReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([product_model_1.Product, batch_model_1.Batch, sale_item_model_1.SaleItem, sale_model_1.Sale])],
        controllers: [pos_reports_controller_1.PosReportsController],
        providers: [pos_reports_service_1.PosReportsService],
    })
], PosReportsModule);


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosReportsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_reports_service_1 = __webpack_require__(159);
const pos_patterns_1 = __webpack_require__(110);
let PosReportsController = class PosReportsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getDailySummary(date) {
        try {
            return await this.service.getDailySummary(date);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_DAILY_SUMMARY_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getSalesByDate(filter) {
        try {
            return await this.service.getSalesByDate(filter);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_SALES_BY_DATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getProfit(filter) {
        try {
            return await this.service.getProfit(filter);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_PROFIT_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getCustomerLedger(customerId) {
        try {
            return await this.service.getCustomerLedger(customerId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_CUSTOMER_LEDGER_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getSupplierLedger(supplierId) {
        try {
            return await this.service.getSupplierLedger(supplierId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_SUPPLIER_LEDGER_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async exportSalesExcel(filter) {
        try {
            const buffer = await this.service.exportSalesExcel(filter);
            return { data: buffer.toString('base64'), filename: `sales_${filter.fromDate}_${filter.toDate}.xlsx` };
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_EXPORT_SALES_ERROR', status: 400 });
        }
    }
    async exportExpensesExcel(filter) {
        try {
            const buffer = await this.service.exportExpensesExcel(filter);
            return { data: buffer.toString('base64'), filename: `expenses_${filter.fromDate}_${filter.toDate}.xlsx` };
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_EXPORT_EXPENSES_ERROR', status: 400 });
        }
    }
    async exportProfitExcel(filter) {
        try {
            const buffer = await this.service.exportProfitExcel(filter);
            return { data: buffer.toString('base64'), filename: `profit_${filter.fromDate}_${filter.toDate}.xlsx` };
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_EXPORT_PROFIT_ERROR', status: 400 });
        }
    }
    async exportSalesPdf(filter) {
        try {
            const buffer = await this.service.exportSalesPdf(filter);
            return { data: buffer.toString('base64'), filename: `sales_${filter.fromDate}_${filter.toDate}.pdf` };
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_EXPORT_SALES_PDF_ERROR', status: 400 });
        }
    }
    async exportProfitPdf(filter) {
        try {
            const buffer = await this.service.exportProfitPdf(filter);
            return { data: buffer.toString('base64'), filename: `profit_${filter.fromDate}_${filter.toDate}.pdf` };
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_EXPORT_PROFIT_PDF_ERROR', status: 400 });
        }
    }
    async getStockStatus() {
        try {
            return await this.service.getStockStatus();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_STOCK_STATUS_ERROR', status: 400 });
        }
    }
    async getProductWiseSales(filter) {
        try {
            return await this.service.getProductWiseSales(filter);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_PRODUCT_WISE_SALES_ERROR', status: 400 });
        }
    }
    async getExpiryReport(days) {
        try {
            return await this.service.getExpiryReport(days || 30);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'REPORT_EXPIRY_ERROR', status: 400 });
        }
    }
};
exports.PosReportsController = PosReportsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.DAILY_SUMMARY),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosReportsController.prototype, "getDailySummary", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.SALES_BY_DATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosReportsController.prototype, "getSalesByDate", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.PROFIT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosReportsController.prototype, "getProfit", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.CUSTOMER_LEDGER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosReportsController.prototype, "getCustomerLedger", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.SUPPLIER_LEDGER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosReportsController.prototype, "getSupplierLedger", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_SALES_EXCEL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosReportsController.prototype, "exportSalesExcel", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_EXPENSES_EXCEL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PosReportsController.prototype, "exportExpensesExcel", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_PROFIT_EXCEL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PosReportsController.prototype, "exportProfitExcel", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_SALES_PDF),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], PosReportsController.prototype, "exportSalesPdf", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.EXPORT_PROFIT_PDF),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], PosReportsController.prototype, "exportProfitPdf", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.STOCK_STATUS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], PosReportsController.prototype, "getStockStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.PRODUCT_WISE_SALES),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], PosReportsController.prototype, "getProductWiseSales", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.REPORT.EXPIRY_REPORT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], PosReportsController.prototype, "getExpiryReport", null);
exports.PosReportsController = PosReportsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_reports_service_1.PosReportsService !== "undefined" && pos_reports_service_1.PosReportsService) === "function" ? _a : Object])
], PosReportsController);


/***/ }),
/* 159 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosReportsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const ExcelJS = __importStar(__webpack_require__(160));
const pdfkit_1 = __importDefault(__webpack_require__(161));
const sequelize_2 = __webpack_require__(8);
const sale_repository_1 = __webpack_require__(72);
const expense_repository_1 = __webpack_require__(76);
const sale_return_repository_1 = __webpack_require__(74);
const customer_repository_1 = __webpack_require__(69);
const supplier_repository_1 = __webpack_require__(66);
const udhaar_transaction_repository_1 = __webpack_require__(71);
const supplier_ledger_transaction_repository_1 = __webpack_require__(82);
const sale_item_model_1 = __webpack_require__(29);
const customer_model_1 = __webpack_require__(27);
const product_model_1 = __webpack_require__(17);
const batch_model_1 = __webpack_require__(18);
const supplier_payment_model_1 = __webpack_require__(26);
const purchase_model_1 = __webpack_require__(20);
let PosReportsService = class PosReportsService {
    saleRepository;
    expenseRepository;
    saleReturnRepository;
    customerRepository;
    supplierRepository;
    udhaarRepository;
    supplierLedgerRepository;
    productModel;
    batchModel;
    saleItemModel;
    constructor(saleRepository, expenseRepository, saleReturnRepository, customerRepository, supplierRepository, udhaarRepository, supplierLedgerRepository, productModel, batchModel, saleItemModel) {
        this.saleRepository = saleRepository;
        this.expenseRepository = expenseRepository;
        this.saleReturnRepository = saleReturnRepository;
        this.customerRepository = customerRepository;
        this.supplierRepository = supplierRepository;
        this.udhaarRepository = udhaarRepository;
        this.supplierLedgerRepository = supplierLedgerRepository;
        this.productModel = productModel;
        this.batchModel = batchModel;
        this.saleItemModel = saleItemModel;
    }
    async getDailySummary(date) {
        try {
            const sales = await this.saleRepository.findAll({
                where: { isHeld: false, createdAt: { [sequelize_1.Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`] } },
                include: [{
                        model: sale_item_model_1.SaleItem,
                        include: [{ model: batch_model_1.Batch, attributes: ['id', 'purchasePrice'], required: false }],
                    }],
            });
            const expenses = await this.expenseRepository.findAll({ where: { expenseDate: date } });
            const returns = await this.saleReturnRepository.findAll({
                where: { createdAt: { [sequelize_1.Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`] } },
            });
            let totalRevenue = 0;
            let totalCogs = 0;
            const paymentMap = {};
            for (const sale of sales) {
                totalRevenue += Number(sale.total);
                const method = sale.paymentType || 'cash';
                paymentMap[method] = (paymentMap[method] ?? 0) + Number(sale.total);
                const items = sale.saleItems || [];
                for (const item of items) {
                    const costPrice = item.batch?.purchasePrice != null
                        ? Number(item.batch.purchasePrice)
                        : Number(item.unitPrice);
                    totalCogs += costPrice * Number(item.qty);
                }
            }
            const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
            const totalReturns = returns.reduce((sum, r) => sum + Number(r.refundAmount), 0);
            const grossProfit = totalRevenue - totalCogs - totalReturns;
            const hourlyMap = {};
            for (const sale of sales) {
                const hour = new Date(sale.createdAt).getHours();
                hourlyMap[hour] = (hourlyMap[hour] ?? 0) + Number(sale.total);
            }
            const hourlySales = Array.from({ length: 24 }, (_, h) => ({
                hour: `${String(h).padStart(2, '0')}:00`,
                sales: hourlyMap[h] ?? 0,
            })).filter(h => h.sales > 0);
            const paymentBreakdown = Object.entries(paymentMap).map(([method, amount]) => ({
                method,
                amount,
                count: sales.filter(s => s.paymentType === method).length,
            }));
            return {
                date,
                totalSales: sales.length,
                totalRevenue,
                totalCogs,
                grossProfit,
                totalExpenses,
                netProfit: grossProfit - totalExpenses,
                totalReturns,
                hourlySales,
                paymentBreakdown,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getSalesByDate(filter) {
        try {
            const sales = await this.saleRepository.findAll({
                where: {
                    isHeld: false,
                    createdAt: { [sequelize_1.Op.between]: [`${filter.fromDate} 00:00:00`, `${filter.toDate} 23:59:59`] },
                },
                include: [{ model: sale_item_model_1.SaleItem }, { model: customer_model_1.Customer, attributes: ['id', 'name'] }],
                order: [['createdAt', 'DESC']],
            });
            return sales.map(s => {
                const json = s.toJSON();
                const itemDiscountSum = (json.saleItems ?? []).reduce((sum, i) => sum + Number(i.discount ?? 0), 0);
                json.totalDiscount = Number(json.discountAmount ?? 0) + itemDiscountSum;
                return json;
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getProfit(filter) {
        try {
            const sales = await this.saleRepository.findAll({
                where: {
                    isHeld: false,
                    createdAt: { [sequelize_1.Op.between]: [`${filter.fromDate} 00:00:00`, `${filter.toDate} 23:59:59`] },
                },
                include: [{ model: sale_item_model_1.SaleItem }],
            });
            const expenses = await this.expenseRepository.findAll({
                where: { expenseDate: { [sequelize_1.Op.between]: [filter.fromDate, filter.toDate] } },
            });
            const returns = await this.saleReturnRepository.findAll({
                where: { createdAt: { [sequelize_1.Op.between]: [`${filter.fromDate} 00:00:00`, `${filter.toDate} 23:59:59`] } },
            });
            let totalRevenue = 0;
            let totalCogs = 0;
            for (const sale of sales) {
                totalRevenue += Number(sale.total);
                const items = sale.saleItems || [];
                for (const item of items) {
                    if (item.costAmount != null) {
                        totalCogs += Number(item.costAmount);
                    }
                    else {
                        totalCogs += Number(item.unitPrice) * Number(item.qty);
                    }
                }
            }
            const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
            const totalReturns = returns.reduce((sum, r) => sum + Number(r.refundAmount), 0);
            const grossProfit = totalRevenue - totalCogs - totalReturns;
            const netProfit = grossProfit - totalExpenses;
            return {
                totalRevenue,
                totalCogs,
                grossProfit,
                totalExpenses,
                totalReturns,
                netProfit,
                period: filter,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getCustomerLedger(customerId) {
        try {
            const customer = await this.customerRepository.findOne({ where: { id: customerId } });
            if (!customer)
                throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
            const [transactions, sales] = await Promise.all([
                this.udhaarRepository.findAll({
                    where: { customerId },
                    order: [['createdAt', 'DESC']],
                }),
                this.saleRepository.findAll({
                    where: { customerId, isHeld: false },
                    include: [{ model: sale_item_model_1.SaleItem, include: [{ model: product_model_1.Product, attributes: ['id', 'name'] }] }],
                    order: [['createdAt', 'DESC']],
                    limit: 50,
                }),
            ]);
            return {
                customer: customer.toJSON(),
                transactions: transactions.map(t => t.toJSON()),
                sales: sales.map(s => s.toJSON()),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getSupplierLedger(supplierId) {
        try {
            const supplier = await this.supplierRepository.findOne({ where: { id: supplierId } });
            if (!supplier)
                throw new common_1.BadRequestException('SUPPLIER_NOT_FOUND');
            const transactions = await this.supplierLedgerRepository.findAll({
                where: { supplierId },
                include: [
                    { model: purchase_model_1.Purchase, attributes: ['id', 'invoiceRef', 'purchaseDate'] },
                    { model: supplier_payment_model_1.SupplierPayment, attributes: ['id', 'paymentDate', 'paymentMethod'] },
                ],
                order: [['createdAt', 'DESC']],
            });
            return {
                supplier: supplier.toJSON(),
                transactions: transactions.map(t => t.toJSON()),
                outstandingBalance: supplier.outstandingBalance,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getProductWiseSales(filter) {
        try {
            const sequelize = this.saleItemModel.sequelize;
            const [rows] = await sequelize.query(`SELECT
                    si.product_id AS productId,
                    p.name,
                    p.barcode,
                    SUM(si.qty)           AS totalQty,
                    SUM(si.total)         AS totalRevenue,
                    SUM(si.discount)      AS totalDiscount,
                    SUM(si.tax_amount)    AS totalTax,
                    SUM(COALESCE(si.cost_amount, 0))   AS totalCogs,
                    SUM(COALESCE(si.profit_amount, 0)) AS totalProfit
                FROM sale_items si
                INNER JOIN sales s   ON s.id = si.sale_id
                INNER JOIN products p ON p.id = si.product_id
                WHERE s.is_held = 0
                  AND s.created_at BETWEEN :fromDate AND :toDate
                GROUP BY si.product_id, p.id, p.name, p.barcode
                ORDER BY totalRevenue DESC`, {
                replacements: {
                    fromDate: `${filter.fromDate} 00:00:00`,
                    toDate: `${filter.toDate} 23:59:59`,
                },
            });
            return rows.map(r => ({
                productId: Number(r.productId),
                name: r.name ?? 'Unknown',
                barcode: r.barcode ?? '',
                totalQty: Number(r.totalQty ?? 0),
                totalRevenue: Number(r.totalRevenue ?? 0),
                totalDiscount: Number(r.totalDiscount ?? 0),
                totalTax: Number(r.totalTax ?? 0),
                totalCogs: Number(r.totalCogs ?? 0),
                totalProfit: Number(r.totalProfit ?? 0),
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getStockStatus() {
        try {
            const products = await this.productModel.findAll({
                include: [{ model: batch_model_1.Batch, where: { status: 'active' }, required: false }],
            });
            return products.map(p => {
                const batches = p.batches || [];
                const totalStock = batches.reduce((sum, b) => sum + Number(b.remainingQty), 0);
                const threshold = Number(p.lowStockThreshold || 0);
                return {
                    productId: p.id,
                    name: p.name,
                    barcode: p.barcode,
                    totalStock,
                    threshold,
                    isLowStock: totalStock <= threshold,
                    activeBatches: batches.length,
                    batches: batches.map(b => ({
                        id: b.id,
                        batchNumber: b.batchNumber,
                        remainingQty: b.remainingQty,
                        expiryDate: b.expiryDate,
                        purchasePrice: b.purchasePrice,
                    })),
                };
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async exportSalesExcel(filter) {
        try {
            const sales = await this.getSalesByDate(filter);
            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'QuickShop POS';
            workbook.created = new Date();
            const sheet = workbook.addWorksheet('Sales Report');
            sheet.columns = [
                { header: 'Sale ID', key: 'id', width: 10 },
                { header: 'Date', key: 'createdAt', width: 20 },
                { header: 'Customer', key: 'customer', width: 20 },
                { header: 'Payment Type', key: 'paymentType', width: 15 },
                { header: 'Subtotal (PKR)', key: 'subtotal', width: 15 },
                { header: 'Discount (PKR)', key: 'discountAmount', width: 15 },
                { header: 'Tax (PKR)', key: 'taxAmount', width: 12 },
                { header: 'Total (PKR)', key: 'total', width: 15 },
                { header: 'FBR Status', key: 'fbrSyncStatus', width: 12 },
            ];
            sheet.getRow(1).font = { bold: true };
            sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E79' } };
            sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
            for (const sale of sales) {
                sheet.addRow({
                    id: sale.id,
                    createdAt: new Date(sale.createdAt).toLocaleString('en-PK'),
                    customer: sale.customer?.name || 'Walk-in',
                    paymentType: sale.paymentType,
                    subtotal: Number(sale.subtotal).toFixed(2),
                    discountAmount: Number(sale.totalDiscount ?? sale.discountAmount ?? 0).toFixed(2),
                    taxAmount: Number(sale.taxAmount).toFixed(2),
                    total: Number(sale.total).toFixed(2),
                    fbrSyncStatus: sale.fbrSyncStatus,
                });
            }
            const totalRevenue = sales.reduce((s, r) => s + Number(r.total), 0);
            sheet.addRow({});
            const summaryRow = sheet.addRow({ customer: 'TOTAL', total: totalRevenue.toFixed(2) });
            summaryRow.font = { bold: true };
            const buffer = await workbook.xlsx.writeBuffer();
            return Buffer.from(buffer);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async exportExpensesExcel(filter) {
        try {
            const expenses = await this.expenseRepository.findAll({
                where: { expenseDate: { [sequelize_1.Op.between]: [filter.fromDate, filter.toDate] } },
                order: [['expenseDate', 'DESC']],
            });
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Expenses');
            sheet.columns = [
                { header: 'ID', key: 'id', width: 8 },
                { header: 'Date', key: 'expenseDate', width: 15 },
                { header: 'Category', key: 'category', width: 20 },
                { header: 'Description', key: 'description', width: 30 },
                { header: 'Amount (PKR)', key: 'amount', width: 15 },
            ];
            sheet.getRow(1).font = { bold: true };
            for (const exp of expenses) {
                sheet.addRow(exp.toJSON());
            }
            const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
            sheet.addRow({});
            const summaryRow = sheet.addRow({ category: 'TOTAL', amount: totalExpenses.toFixed(2) });
            summaryRow.font = { bold: true };
            const buffer = await workbook.xlsx.writeBuffer();
            return Buffer.from(buffer);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async exportProfitExcel(filter) {
        try {
            const profit = await this.getProfit(filter);
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Profit Report');
            sheet.columns = [
                { header: 'Metric', key: 'metric', width: 30 },
                { header: 'Amount (PKR)', key: 'amount', width: 20 },
            ];
            sheet.getRow(1).font = { bold: true };
            sheet.addRow({ metric: 'Period From', amount: filter.fromDate });
            sheet.addRow({ metric: 'Period To', amount: filter.toDate });
            sheet.addRow({});
            sheet.addRow({ metric: 'Total Revenue', amount: profit.totalRevenue.toFixed(2) });
            sheet.addRow({ metric: 'Cost of Goods Sold (COGS)', amount: profit.totalCogs.toFixed(2) });
            sheet.addRow({ metric: 'Total Returns (Refunds)', amount: profit.totalReturns.toFixed(2) });
            const grossRow = sheet.addRow({ metric: 'Gross Profit', amount: profit.grossProfit.toFixed(2) });
            grossRow.font = { bold: true };
            sheet.addRow({});
            sheet.addRow({ metric: 'Total Expenses', amount: profit.totalExpenses.toFixed(2) });
            const netRow = sheet.addRow({ metric: 'Net Profit', amount: profit.netProfit.toFixed(2) });
            netRow.font = { bold: true };
            netRow.getCell('amount').font = {
                bold: true,
                color: { argb: profit.netProfit >= 0 ? 'FF00AA00' : 'FFAA0000' },
            };
            const buffer = await workbook.xlsx.writeBuffer();
            return Buffer.from(buffer);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async exportSalesPdf(filter) {
        try {
            const sales = await this.getSalesByDate(filter);
            return new Promise((resolve, reject) => {
                const doc = new pdfkit_1.default({ margin: 40, size: 'A4' });
                const chunks = [];
                doc.on('data', chunk => chunks.push(chunk));
                doc.on('end', () => resolve(Buffer.concat(chunks)));
                doc.on('error', reject);
                doc.fontSize(16).font('Helvetica-Bold').text('Sales Report', { align: 'center' });
                doc.fontSize(10).font('Helvetica').text(`Period: ${filter.fromDate} to ${filter.toDate}`, { align: 'center' });
                doc.moveDown();
                const cols = { id: 40, date: 130, customer: 120, payment: 80, total: 80, fbr: 70 };
                const startX = 40;
                let y = doc.y;
                doc.font('Helvetica-Bold').fontSize(9);
                doc.text('ID', startX, y);
                doc.text('Date', startX + cols.id, y);
                doc.text('Customer', startX + cols.id + cols.date, y);
                doc.text('Payment', startX + cols.id + cols.date + cols.customer, y);
                doc.text('Total (PKR)', startX + cols.id + cols.date + cols.customer + cols.payment, y);
                doc.text('FBR', startX + cols.id + cols.date + cols.customer + cols.payment + cols.total, y);
                doc.moveDown(0.3);
                doc.moveTo(startX, doc.y).lineTo(555, doc.y).stroke();
                doc.moveDown(0.3);
                doc.font('Helvetica').fontSize(8);
                let totalRevenue = 0;
                for (const sale of sales) {
                    if (doc.y > 750) {
                        doc.addPage();
                    }
                    y = doc.y;
                    const dateStr = new Date(sale.createdAt).toLocaleDateString('en-PK');
                    doc.text(String(sale.id), startX, y, { width: cols.id });
                    doc.text(dateStr, startX + cols.id, y, { width: cols.date });
                    doc.text(sale.customer?.name || 'Walk-in', startX + cols.id + cols.date, y, { width: cols.customer });
                    doc.text(sale.paymentType, startX + cols.id + cols.date + cols.customer, y, { width: cols.payment });
                    doc.text(Number(sale.total).toFixed(2), startX + cols.id + cols.date + cols.customer + cols.payment, y, { width: cols.total });
                    doc.text(sale.fbrSyncStatus, startX + cols.id + cols.date + cols.customer + cols.payment + cols.total, y, { width: cols.fbr });
                    doc.moveDown(0.5);
                    totalRevenue += Number(sale.total);
                }
                doc.moveDown();
                doc.moveTo(startX, doc.y).lineTo(555, doc.y).stroke();
                doc.moveDown(0.3);
                doc.font('Helvetica-Bold').fontSize(10)
                    .text(`Total Sales: ${sales.length}   |   Total Revenue: PKR ${totalRevenue.toFixed(2)}`, startX);
                doc.end();
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async exportProfitPdf(filter) {
        try {
            const profit = await this.getProfit(filter);
            return new Promise((resolve, reject) => {
                const doc = new pdfkit_1.default({ margin: 60, size: 'A4' });
                const chunks = [];
                doc.on('data', chunk => chunks.push(chunk));
                doc.on('end', () => resolve(Buffer.concat(chunks)));
                doc.on('error', reject);
                doc.fontSize(18).font('Helvetica-Bold').text('Profit Report', { align: 'center' });
                doc.fontSize(11).font('Helvetica').text(`Period: ${filter.fromDate} to ${filter.toDate}`, { align: 'center' });
                doc.moveDown(2);
                const row = (label, value, bold = false) => {
                    doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(12);
                    doc.text(label, 80, doc.y, { continued: true, width: 280 });
                    doc.text(`PKR ${value}`, { align: 'right' });
                    doc.moveDown(0.5);
                };
                row('Total Revenue', profit.totalRevenue.toFixed(2));
                row('Cost of Goods Sold (COGS)', profit.totalCogs.toFixed(2));
                row('Total Returns (Refunds)', profit.totalReturns.toFixed(2));
                doc.moveTo(80, doc.y).lineTo(520, doc.y).stroke();
                doc.moveDown(0.3);
                row('Gross Profit', profit.grossProfit.toFixed(2), true);
                doc.moveDown(0.5);
                row('Total Expenses', profit.totalExpenses.toFixed(2));
                doc.moveTo(80, doc.y).lineTo(520, doc.y).stroke();
                doc.moveDown(0.3);
                row('Net Profit', profit.netProfit.toFixed(2), true);
                doc.end();
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getExpiryReport(days = 30) {
        try {
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + days);
            const batches = await this.batchModel.findAll({
                where: {
                    status: 'active',
                    expiryDate: { [sequelize_1.Op.lte]: targetDate.toISOString().split('T')[0] },
                },
                include: [{ model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] }],
                order: [['expiryDate', 'ASC']],
            });
            return batches.map(b => b.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosReportsService = PosReportsService;
exports.PosReportsService = PosReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(7, (0, sequelize_2.InjectModel)(product_model_1.Product)),
    __param(8, (0, sequelize_2.InjectModel)(batch_model_1.Batch)),
    __param(9, (0, sequelize_2.InjectModel)(sale_item_model_1.SaleItem)),
    __metadata("design:paramtypes", [typeof (_a = typeof sale_repository_1.SaleRepository !== "undefined" && sale_repository_1.SaleRepository) === "function" ? _a : Object, typeof (_b = typeof expense_repository_1.ExpenseRepository !== "undefined" && expense_repository_1.ExpenseRepository) === "function" ? _b : Object, typeof (_c = typeof sale_return_repository_1.SaleReturnRepository !== "undefined" && sale_return_repository_1.SaleReturnRepository) === "function" ? _c : Object, typeof (_d = typeof customer_repository_1.CustomerRepository !== "undefined" && customer_repository_1.CustomerRepository) === "function" ? _d : Object, typeof (_e = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _e : Object, typeof (_f = typeof udhaar_transaction_repository_1.UdhaarTransactionRepository !== "undefined" && udhaar_transaction_repository_1.UdhaarTransactionRepository) === "function" ? _f : Object, typeof (_g = typeof supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository !== "undefined" && supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository) === "function" ? _g : Object, Object, Object, Object])
], PosReportsService);


/***/ }),
/* 160 */
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),
/* 161 */
/***/ ((module) => {

module.exports = require("pdfkit");

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
exports.PosDiscountRulesModule = void 0;
const common_1 = __webpack_require__(6);
const database_module_1 = __webpack_require__(7);
const pos_discount_rules_controller_1 = __webpack_require__(163);
const pos_discount_rules_service_1 = __webpack_require__(164);
let PosDiscountRulesModule = class PosDiscountRulesModule {
};
exports.PosDiscountRulesModule = PosDiscountRulesModule;
exports.PosDiscountRulesModule = PosDiscountRulesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_discount_rules_controller_1.PosDiscountRulesController],
        providers: [pos_discount_rules_service_1.PosDiscountRulesService],
    })
], PosDiscountRulesModule);


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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosDiscountRulesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_discount_rules_service_1 = __webpack_require__(164);
const pos_patterns_1 = __webpack_require__(110);
let PosDiscountRulesController = class PosDiscountRulesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'DISCOUNT_RULE_CREATE_ERROR', status: 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'DISCOUNT_RULE_GET_ALL_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'DISCOUNT_RULE_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'DISCOUNT_RULE_DELETE_ERROR', status: 400 });
        }
    }
    async resolveBundle(cartItems) {
        try {
            return await this.service.resolveBundleDiscount(cartItems);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'DISCOUNT_RULE_BUNDLE_ERROR', status: 400 });
        }
    }
};
exports.PosDiscountRulesController = PosDiscountRulesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosDiscountRulesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosDiscountRulesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosDiscountRulesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosDiscountRulesController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DISCOUNT_RULE.RESOLVE_BUNDLE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof Array !== "undefined" && Array) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosDiscountRulesController.prototype, "resolveBundle", null);
exports.PosDiscountRulesController = PosDiscountRulesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_discount_rules_service_1.PosDiscountRulesService !== "undefined" && pos_discount_rules_service_1.PosDiscountRulesService) === "function" ? _a : Object])
], PosDiscountRulesController);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosDiscountRulesService = void 0;
const common_1 = __webpack_require__(6);
const discount_rule_repository_1 = __webpack_require__(80);
const pos_gateway_1 = __webpack_require__(101);
let PosDiscountRulesService = class PosDiscountRulesService {
    discountRuleRepository;
    posGateway;
    constructor(discountRuleRepository, posGateway) {
        this.discountRuleRepository = discountRuleRepository;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            const rule = await this.discountRuleRepository.create({ ...data.data, createdBy: data.userId });
            this.posGateway.broadcast('discount_rule_created', rule.toJSON());
            return rule.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const where = {};
            if (data.isActive !== undefined)
                where.isActive = data.isActive;
            const rules = await this.discountRuleRepository.findAll({ where, order: [['createdAt', 'DESC']] });
            return rules.map(r => r.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, payload) {
        try {
            const rule = await this.discountRuleRepository.update({ where: { id } }, payload);
            this.posGateway.broadcast('discount_rule_updated', rule.toJSON());
            return rule.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            await this.discountRuleRepository.delete({ where: { id } });
            this.posGateway.broadcast('discount_rule_deleted', { id });
            return { deleted: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async resolveBundleDiscount(cartItems) {
        try {
            const bundleRules = await this.discountRuleRepository.findAll({
                where: { appliesTo: 'bundle', isActive: true },
            });
            const today = new Date().toISOString().split('T')[0];
            let bestDiscount = null;
            for (const rule of bundleRules) {
                const bundleItems = rule.bundleItems || [];
                if (!bundleItems.length)
                    continue;
                if (rule.validFrom && today < rule.validFrom)
                    continue;
                if (rule.validTo && today > rule.validTo)
                    continue;
                const qualifies = bundleItems.every(bundleItem => {
                    const cartItem = cartItems.find(c => c.productId === bundleItem.productId);
                    return cartItem && cartItem.qty >= bundleItem.qty;
                });
                if (!qualifies)
                    continue;
                const cartTotal = cartItems.reduce((sum, item) => sum + (Number(item.unitPrice ?? 0) * item.qty), 0);
                const discountAmount = rule.type === 'fixed'
                    ? Number(rule.value)
                    : (cartTotal * Number(rule.value)) / 100;
                if (!bestDiscount || discountAmount > bestDiscount.discountAmount) {
                    bestDiscount = { rule, discountAmount };
                }
            }
            return bestDiscount;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosDiscountRulesService = PosDiscountRulesService;
exports.PosDiscountRulesService = PosDiscountRulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof discount_rule_repository_1.DiscountRuleRepository !== "undefined" && discount_rule_repository_1.DiscountRuleRepository) === "function" ? _a : Object, typeof (_b = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _b : Object])
], PosDiscountRulesService);


/***/ }),
/* 165 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSupplierPaymentsModule = void 0;
const common_1 = __webpack_require__(6);
const pos_supplier_payments_controller_1 = __webpack_require__(166);
const pos_supplier_payments_service_1 = __webpack_require__(167);
const database_module_1 = __webpack_require__(7);
let PosSupplierPaymentsModule = class PosSupplierPaymentsModule {
};
exports.PosSupplierPaymentsModule = PosSupplierPaymentsModule;
exports.PosSupplierPaymentsModule = PosSupplierPaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_supplier_payments_controller_1.PosSupplierPaymentsController],
        providers: [pos_supplier_payments_service_1.PosSupplierPaymentsService],
    })
], PosSupplierPaymentsModule);


/***/ }),
/* 166 */
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
exports.PosSupplierPaymentsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_supplier_payments_service_1 = __webpack_require__(167);
const pos_patterns_1 = __webpack_require__(110);
let PosSupplierPaymentsController = class PosSupplierPaymentsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SUPPLIER_PAYMENT_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getBySupplier(supplierId) {
        try {
            return await this.service.getBySupplier(supplierId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'SUPPLIER_PAYMENT_GET_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosSupplierPaymentsController = PosSupplierPaymentsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_PAYMENT.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosSupplierPaymentsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_PAYMENT.GET_BY_SUPPLIER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosSupplierPaymentsController.prototype, "getBySupplier", null);
exports.PosSupplierPaymentsController = PosSupplierPaymentsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_supplier_payments_service_1.PosSupplierPaymentsService !== "undefined" && pos_supplier_payments_service_1.PosSupplierPaymentsService) === "function" ? _a : Object])
], PosSupplierPaymentsController);


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSupplierPaymentsService = void 0;
const common_1 = __webpack_require__(6);
const supplier_payment_repository_1 = __webpack_require__(83);
const supplier_repository_1 = __webpack_require__(66);
const supplier_ledger_transaction_repository_1 = __webpack_require__(82);
const supplier_model_1 = __webpack_require__(19);
const purchase_model_1 = __webpack_require__(20);
const pos_user_model_1 = __webpack_require__(12);
const pos_gateway_1 = __webpack_require__(101);
let PosSupplierPaymentsService = class PosSupplierPaymentsService {
    repo;
    supplierRepository;
    supplierLedgerRepository;
    posGateway;
    constructor(repo, supplierRepository, supplierLedgerRepository, posGateway) {
        this.repo = repo;
        this.supplierRepository = supplierRepository;
        this.supplierLedgerRepository = supplierLedgerRepository;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            const input = data.data;
            const payment = await this.repo.create({
                ...input,
                paymentDate: input.paymentDate ?? new Date().toISOString().split('T')[0],
                paymentMethod: input.paymentMethod ?? input.method ?? 'cash',
                recordedBy: Number(data.userId),
            });
            if (input.supplierId && input.amount) {
                const supplier = await this.supplierRepository.findOne({ where: { id: input.supplierId } });
                if (supplier) {
                    const newBalance = Math.max(0, Number(supplier.outstandingBalance) - Number(input.amount));
                    await this.supplierRepository.update({ where: { id: input.supplierId } }, { outstandingBalance: newBalance });
                    await this.supplierLedgerRepository.create({
                        supplierId: input.supplierId,
                        purchaseId: input.purchaseId ?? undefined,
                        paymentId: payment.id,
                        type: 'credit',
                        amount: Number(input.amount),
                        balanceAfter: newBalance,
                        notes: `Payment #${payment.id}${input.referenceNo ? ` — Ref: ${input.referenceNo}` : ''}`,
                    });
                }
            }
            this.posGateway.broadcast('supplier_payment_created', {
                supplierId: input.supplierId,
                paymentId: payment.id,
                amount: input.amount,
            });
            return payment.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getBySupplier(supplierId) {
        try {
            const payments = await this.repo.findAll({
                where: { supplierId },
                include: [
                    { model: supplier_model_1.Supplier, attributes: ['id', 'name'] },
                    { model: purchase_model_1.Purchase, attributes: ['id', 'invoiceRef'] },
                    { model: pos_user_model_1.PosUser, as: 'recordedByUser', attributes: ['id', 'name'] },
                ],
                order: [['paymentDate', 'DESC']],
            });
            return payments.map(p => p.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosSupplierPaymentsService = PosSupplierPaymentsService;
exports.PosSupplierPaymentsService = PosSupplierPaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_payment_repository_1.SupplierPaymentRepository !== "undefined" && supplier_payment_repository_1.SupplierPaymentRepository) === "function" ? _a : Object, typeof (_b = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _b : Object, typeof (_c = typeof supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository !== "undefined" && supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository) === "function" ? _c : Object, typeof (_d = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _d : Object])
], PosSupplierPaymentsService);


/***/ }),
/* 168 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPurchaseReturnsModule = void 0;
const common_1 = __webpack_require__(6);
const pos_purchase_returns_controller_1 = __webpack_require__(169);
const pos_purchase_returns_service_1 = __webpack_require__(170);
const database_module_1 = __webpack_require__(7);
const purchase_return_repository_1 = __webpack_require__(84);
const batch_repository_1 = __webpack_require__(65);
const supplier_repository_1 = __webpack_require__(66);
const audit_log_repository_1 = __webpack_require__(77);
const supplier_ledger_transaction_repository_1 = __webpack_require__(82);
let PosPurchaseReturnsModule = class PosPurchaseReturnsModule {
};
exports.PosPurchaseReturnsModule = PosPurchaseReturnsModule;
exports.PosPurchaseReturnsModule = PosPurchaseReturnsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_purchase_returns_controller_1.PosPurchaseReturnsController],
        providers: [
            pos_purchase_returns_service_1.PosPurchaseReturnsService,
            purchase_return_repository_1.PurchaseReturnRepository,
            batch_repository_1.BatchRepository,
            supplier_repository_1.SupplierRepository,
            audit_log_repository_1.AuditLogRepository,
            supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository,
        ],
    })
], PosPurchaseReturnsModule);


/***/ }),
/* 169 */
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
exports.PosPurchaseReturnsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_purchase_returns_service_1 = __webpack_require__(170);
const pos_patterns_1 = __webpack_require__(110);
let PosPurchaseReturnsController = class PosPurchaseReturnsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_RETURN_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_RETURN_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async updateStatus(data) {
        try {
            return await this.service.updateStatus(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'PURCHASE_RETURN_UPDATE_STATUS_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosPurchaseReturnsController = PosPurchaseReturnsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE_RETURN.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosPurchaseReturnsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE_RETURN.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosPurchaseReturnsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PURCHASE_RETURN.UPDATE_STATUS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosPurchaseReturnsController.prototype, "updateStatus", null);
exports.PosPurchaseReturnsController = PosPurchaseReturnsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_purchase_returns_service_1.PosPurchaseReturnsService !== "undefined" && pos_purchase_returns_service_1.PosPurchaseReturnsService) === "function" ? _a : Object])
], PosPurchaseReturnsController);


/***/ }),
/* 170 */
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
exports.PosPurchaseReturnsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_typescript_1 = __webpack_require__(13);
const purchase_return_repository_1 = __webpack_require__(84);
const batch_repository_1 = __webpack_require__(65);
const supplier_repository_1 = __webpack_require__(66);
const audit_log_repository_1 = __webpack_require__(77);
const supplier_ledger_transaction_repository_1 = __webpack_require__(82);
const supplier_model_1 = __webpack_require__(19);
const product_model_1 = __webpack_require__(17);
const purchase_model_1 = __webpack_require__(20);
const batch_model_1 = __webpack_require__(18);
const pos_gateway_1 = __webpack_require__(101);
let PosPurchaseReturnsService = class PosPurchaseReturnsService {
    repo;
    batchRepository;
    supplierRepository;
    auditLogRepository;
    supplierLedgerRepo;
    sequelize;
    posGateway;
    constructor(repo, batchRepository, supplierRepository, auditLogRepository, supplierLedgerRepo, sequelize, posGateway) {
        this.repo = repo;
        this.batchRepository = batchRepository;
        this.supplierRepository = supplierRepository;
        this.auditLogRepository = auditLogRepository;
        this.supplierLedgerRepo = supplierLedgerRepo;
        this.sequelize = sequelize;
        this.posGateway = posGateway;
    }
    async create(data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            const record = await this.repo.create({
                ...input,
                processedBy: Number(data.userId),
                status: 'pending',
            });
            await this.auditLogRepository.create({
                userId: Number(data.userId),
                module: 'purchase_returns',
                action: 'create',
                newValue: { returnId: record.id, purchaseId: input.purchaseId, qty: input.qty, amount: input.amount },
            });
            await t.commit();
            this.posGateway.broadcast('purchase_return_created', record.toJSON());
            return record.toJSON();
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data?.page) || 1;
            const limit = Number(data.data?.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data?.filters || {};
            const where = {};
            if (filters.supplierId)
                where.supplierId = filters.supplierId;
            if (filters.status)
                where.status = filters.status;
            const result = await this.repo.findAndCountAll({
                where,
                offset,
                limit,
                include: [
                    { model: supplier_model_1.Supplier, attributes: ['id', 'name'] },
                    { model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] },
                    { model: purchase_model_1.Purchase, attributes: ['id', 'invoiceRef', 'purchaseDate'] },
                    { model: batch_model_1.Batch, attributes: ['id', 'batchNumber', 'expiryDate'] },
                ],
                order: [['createdAt', 'DESC']],
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateStatus(data) {
        try {
            const existing = await this.repo.findOne({ where: { id: data.id } });
            if (!existing)
                throw new common_1.BadRequestException('PURCHASE_RETURN_NOT_FOUND');
            if (data.status === 'approved' && existing.status === 'pending' && existing.batchId) {
                const batch = await this.batchRepository.findOne({ where: { id: existing.batchId } });
                if (batch) {
                    const newQty = Math.max(0, Number(batch.remainingQty) - Number(existing.qty));
                    await this.batchRepository.update({ where: { id: existing.batchId } }, { remainingQty: newQty, status: newQty <= 0 ? 'depleted' : 'active' });
                }
                if (existing.supplierId && existing.amount) {
                    const supplier = await this.supplierRepository.findOne({ where: { id: existing.supplierId } });
                    if (supplier) {
                        const newBalance = Math.max(0, Number(supplier.outstandingBalance) - Number(existing.amount));
                        await this.supplierRepository.update({ where: { id: existing.supplierId } }, { outstandingBalance: newBalance });
                        await this.supplierLedgerRepo.create({
                            supplierId: existing.supplierId,
                            purchaseId: existing.purchaseId ?? undefined,
                            type: 'credit',
                            amount: Number(existing.amount),
                            balanceAfter: newBalance,
                            notes: `Purchase Return #${existing.id} — Approved`,
                        });
                    }
                }
            }
            const updated = await this.repo.update({ where: { id: data.id } }, { status: data.status, processedBy: data.processedBy });
            this.posGateway.broadcast('purchase_return_status_updated', { id: data.id, status: data.status });
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosPurchaseReturnsService = PosPurchaseReturnsService;
exports.PosPurchaseReturnsService = PosPurchaseReturnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof purchase_return_repository_1.PurchaseReturnRepository !== "undefined" && purchase_return_repository_1.PurchaseReturnRepository) === "function" ? _a : Object, typeof (_b = typeof batch_repository_1.BatchRepository !== "undefined" && batch_repository_1.BatchRepository) === "function" ? _b : Object, typeof (_c = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _c : Object, typeof (_d = typeof audit_log_repository_1.AuditLogRepository !== "undefined" && audit_log_repository_1.AuditLogRepository) === "function" ? _d : Object, typeof (_e = typeof supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository !== "undefined" && supplier_ledger_transaction_repository_1.SupplierLedgerTransactionRepository) === "function" ? _e : Object, typeof (_f = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _f : Object, typeof (_g = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _g : Object])
], PosPurchaseReturnsService);


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
exports.PosLoyaltyModule = void 0;
const common_1 = __webpack_require__(6);
const pos_loyalty_controller_1 = __webpack_require__(172);
const pos_loyalty_service_1 = __webpack_require__(173);
const database_module_1 = __webpack_require__(7);
const customer_repository_1 = __webpack_require__(69);
let PosLoyaltyModule = class PosLoyaltyModule {
};
exports.PosLoyaltyModule = PosLoyaltyModule;
exports.PosLoyaltyModule = PosLoyaltyModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_loyalty_controller_1.PosLoyaltyController],
        providers: [pos_loyalty_service_1.PosLoyaltyService, customer_repository_1.CustomerRepository],
    })
], PosLoyaltyModule);


/***/ }),
/* 172 */
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
exports.PosLoyaltyController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_loyalty_service_1 = __webpack_require__(173);
const pos_patterns_1 = __webpack_require__(110);
let PosLoyaltyController = class PosLoyaltyController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getLog(customerId) {
        try {
            return await this.service.getLog(customerId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'LOYALTY_GET_LOG_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async adjust(data) {
        try {
            return await this.service.adjust(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'LOYALTY_ADJUST_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosLoyaltyController = PosLoyaltyController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.LOYALTY.GET_LOG),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosLoyaltyController.prototype, "getLog", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.LOYALTY.ADJUST),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosLoyaltyController.prototype, "adjust", null);
exports.PosLoyaltyController = PosLoyaltyController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_loyalty_service_1.PosLoyaltyService !== "undefined" && pos_loyalty_service_1.PosLoyaltyService) === "function" ? _a : Object])
], PosLoyaltyController);


/***/ }),
/* 173 */
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
exports.PosLoyaltyService = void 0;
const common_1 = __webpack_require__(6);
const loyalty_points_log_repository_1 = __webpack_require__(81);
const customer_repository_1 = __webpack_require__(69);
const customer_model_1 = __webpack_require__(27);
const pos_user_model_1 = __webpack_require__(12);
const pos_gateway_1 = __webpack_require__(101);
let PosLoyaltyService = class PosLoyaltyService {
    repo;
    customerRepository;
    posGateway;
    constructor(repo, customerRepository, posGateway) {
        this.repo = repo;
        this.customerRepository = customerRepository;
        this.posGateway = posGateway;
    }
    async getLog(customerId) {
        try {
            const logs = await this.repo.findAll({
                where: { customerId },
                include: [
                    { model: customer_model_1.Customer, attributes: ['id', 'name'] },
                    { model: pos_user_model_1.PosUser, as: 'adjustedByUser', attributes: ['id', 'name'] },
                ],
                order: [['createdAt', 'DESC']],
            });
            return logs.map(l => l.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async adjust(data) {
        try {
            const input = data.data;
            if (!input.customerId)
                throw new common_1.BadRequestException('LOYALTY_ADJUST_REQUIRES_CUSTOMER_ID');
            const customer = await this.customerRepository.findOne({ where: { id: input.customerId } });
            if (!customer)
                throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
            const delta = Number(input.points) || 0;
            const newBalance = Math.max(0, Number(customer.loyaltyPoints) + delta);
            await this.customerRepository.update({ where: { id: input.customerId } }, { loyaltyPoints: newBalance });
            const log = await this.repo.create({
                customerId: input.customerId,
                points: delta,
                type: delta >= 0 ? 'earn' : 'redeem',
                notes: input.reason ?? input.notes ?? undefined,
                balanceAfter: newBalance,
                adjustedBy: Number(data.userId),
            });
            this.posGateway.broadcast('loyalty_adjusted', {
                customerId: input.customerId,
                points: delta,
                balanceAfter: newBalance,
                log: log.toJSON(),
            });
            return log.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosLoyaltyService = PosLoyaltyService;
exports.PosLoyaltyService = PosLoyaltyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof loyalty_points_log_repository_1.LoyaltyPointsLogRepository !== "undefined" && loyalty_points_log_repository_1.LoyaltyPointsLogRepository) === "function" ? _a : Object, typeof (_b = typeof customer_repository_1.CustomerRepository !== "undefined" && customer_repository_1.CustomerRepository) === "function" ? _b : Object, typeof (_c = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _c : Object])
], PosLoyaltyService);


/***/ }),
/* 174 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosAuditLogsModule = void 0;
const common_1 = __webpack_require__(6);
const pos_audit_logs_controller_1 = __webpack_require__(175);
const pos_audit_logs_service_1 = __webpack_require__(176);
const database_module_1 = __webpack_require__(7);
let PosAuditLogsModule = class PosAuditLogsModule {
};
exports.PosAuditLogsModule = PosAuditLogsModule;
exports.PosAuditLogsModule = PosAuditLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_audit_logs_controller_1.PosAuditLogsController],
        providers: [pos_audit_logs_service_1.PosAuditLogsService],
    })
], PosAuditLogsModule);


/***/ }),
/* 175 */
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
exports.PosAuditLogsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_audit_logs_service_1 = __webpack_require__(176);
const pos_patterns_1 = __webpack_require__(110);
let PosAuditLogsController = class PosAuditLogsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'AUDIT_LOG_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getByUser(data) {
        try {
            return await this.service.getByUser(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'AUDIT_LOG_GET_BY_USER_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosAuditLogsController = PosAuditLogsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.AUDIT_LOG.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosAuditLogsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.AUDIT_LOG.GET_BY_USER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosAuditLogsController.prototype, "getByUser", null);
exports.PosAuditLogsController = PosAuditLogsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_audit_logs_service_1.PosAuditLogsService !== "undefined" && pos_audit_logs_service_1.PosAuditLogsService) === "function" ? _a : Object])
], PosAuditLogsController);


/***/ }),
/* 176 */
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
exports.PosAuditLogsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const audit_log_repository_1 = __webpack_require__(77);
const pos_user_model_1 = __webpack_require__(12);
let PosAuditLogsService = class PosAuditLogsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll(data) {
        try {
            const page = Number(data.page) || 1;
            const limit = Number(data.size) || 50;
            const offset = (page - 1) * limit;
            const where = {};
            if (data.module)
                where.module = data.module;
            if (data.action)
                where.action = data.action;
            if (data.fromDate || data.toDate) {
                where.createdAt = {};
                if (data.fromDate)
                    where.createdAt[sequelize_1.Op.gte] = new Date(data.fromDate);
                if (data.toDate)
                    where.createdAt[sequelize_1.Op.lte] = new Date(data.toDate + 'T23:59:59');
            }
            const result = await this.repo.findAndCountAll({
                where,
                offset,
                limit,
                include: [{ model: pos_user_model_1.PosUser, attributes: ['id', 'name'] }],
                order: [['createdAt', 'DESC']],
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getByUser(data) {
        try {
            const page = Number(data.page) || 1;
            const limit = Number(data.size) || 50;
            const offset = (page - 1) * limit;
            const result = await this.repo.findAndCountAll({
                where: { userId: data.userId },
                offset,
                limit,
                order: [['createdAt', 'DESC']],
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosAuditLogsService = PosAuditLogsService;
exports.PosAuditLogsService = PosAuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof audit_log_repository_1.AuditLogRepository !== "undefined" && audit_log_repository_1.AuditLogRepository) === "function" ? _a : Object])
], PosAuditLogsService);


/***/ }),
/* 177 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolesModule = void 0;
const common_1 = __webpack_require__(6);
const pos_roles_controller_1 = __webpack_require__(178);
const pos_roles_service_1 = __webpack_require__(179);
const database_module_1 = __webpack_require__(7);
let PosRolesModule = class PosRolesModule {
};
exports.PosRolesModule = PosRolesModule;
exports.PosRolesModule = PosRolesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_roles_controller_1.PosRolesController],
        providers: [pos_roles_service_1.PosRolesService],
    })
], PosRolesModule);


/***/ }),
/* 178 */
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_roles_service_1 = __webpack_require__(179);
const pos_patterns_1 = __webpack_require__(110);
let PosRolesController = class PosRolesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_ROLE_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll() {
        try {
            return await this.service.getAll();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_ROLE_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_ROLE_UPDATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_ROLE_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosRolesController = PosRolesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_ROLE.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosRolesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_ROLE.GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosRolesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_ROLE.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosRolesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_ROLE.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosRolesController.prototype, "delete", null);
exports.PosRolesController = PosRolesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_roles_service_1.PosRolesService !== "undefined" && pos_roles_service_1.PosRolesService) === "function" ? _a : Object])
], PosRolesController);


/***/ }),
/* 179 */
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
exports.PosRolesService = void 0;
const common_1 = __webpack_require__(6);
const pos_role_repository_1 = __webpack_require__(85);
const pos_gateway_1 = __webpack_require__(101);
let PosRolesService = class PosRolesService {
    repo;
    posGateway;
    constructor(repo, posGateway) {
        this.repo = repo;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            const payload = data?.data ?? data;
            const role = await this.repo.create(payload);
            this.posGateway.broadcast('role_created', role.toJSON());
            return role.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll() {
        try {
            const roles = await this.repo.findAll({ order: [['name', 'ASC']] });
            return roles.map(r => r.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            const updated = await this.repo.update({ where: { id } }, data);
            this.posGateway.broadcast('role_updated', updated.toJSON());
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            const result = await this.repo.delete({ where: { id } });
            this.posGateway.broadcast('role_deleted', { id });
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosRolesService = PosRolesService;
exports.PosRolesService = PosRolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_role_repository_1.PosRoleRepository !== "undefined" && pos_role_repository_1.PosRoleRepository) === "function" ? _a : Object, typeof (_b = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _b : Object])
], PosRolesService);


/***/ }),
/* 180 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosPermissionsModule = void 0;
const common_1 = __webpack_require__(6);
const pos_permissions_controller_1 = __webpack_require__(181);
const pos_permissions_service_1 = __webpack_require__(182);
const database_module_1 = __webpack_require__(7);
let PosPermissionsModule = class PosPermissionsModule {
};
exports.PosPermissionsModule = PosPermissionsModule;
exports.PosPermissionsModule = PosPermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_permissions_controller_1.PosPermissionsController],
        providers: [pos_permissions_service_1.PosPermissionsService],
    })
], PosPermissionsModule);


/***/ }),
/* 181 */
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
exports.PosPermissionsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_permissions_service_1 = __webpack_require__(182);
const pos_patterns_1 = __webpack_require__(110);
let PosPermissionsController = class PosPermissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_PERMISSION_CREATE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getAll() {
        try {
            return await this.service.getAll();
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_PERMISSION_GET_ALL_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_PERMISSION_DELETE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosPermissionsController = PosPermissionsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_PERMISSION.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosPermissionsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_PERMISSION.GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosPermissionsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_PERMISSION.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosPermissionsController.prototype, "delete", null);
exports.PosPermissionsController = PosPermissionsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_permissions_service_1.PosPermissionsService !== "undefined" && pos_permissions_service_1.PosPermissionsService) === "function" ? _a : Object])
], PosPermissionsController);


/***/ }),
/* 182 */
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
exports.PosPermissionsService = void 0;
const common_1 = __webpack_require__(6);
const pos_permission_repository_1 = __webpack_require__(86);
let PosPermissionsService = class PosPermissionsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        try {
            const payload = data?.data ?? data;
            const perm = await this.repo.create(payload);
            return perm.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll() {
        try {
            const perms = await this.repo.findAll({ order: [['resource', 'ASC'], ['action', 'ASC']] });
            return perms.map(p => p.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            return await this.repo.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosPermissionsService = PosPermissionsService;
exports.PosPermissionsService = PosPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_permission_repository_1.PosPermissionRepository !== "undefined" && pos_permission_repository_1.PosPermissionRepository) === "function" ? _a : Object])
], PosPermissionsService);


/***/ }),
/* 183 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolePermissionsModule = void 0;
const common_1 = __webpack_require__(6);
const pos_role_permissions_controller_1 = __webpack_require__(184);
const pos_role_permissions_service_1 = __webpack_require__(185);
const database_module_1 = __webpack_require__(7);
let PosRolePermissionsModule = class PosRolePermissionsModule {
};
exports.PosRolePermissionsModule = PosRolePermissionsModule;
exports.PosRolePermissionsModule = PosRolePermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_role_permissions_controller_1.PosRolePermissionsController],
        providers: [pos_role_permissions_service_1.PosRolePermissionsService],
    })
], PosRolePermissionsModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolePermissionsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_role_permissions_service_1 = __webpack_require__(185);
const pos_patterns_1 = __webpack_require__(110);
let PosRolePermissionsController = class PosRolePermissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async assign(data) {
        try {
            return await this.service.assign(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_ROLE_PERMISSION_ASSIGN_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async revoke(data) {
        try {
            return await this.service.revoke(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_ROLE_PERMISSION_REVOKE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getByRole(roleId) {
        try {
            return await this.service.getByRole(roleId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_ROLE_PERMISSION_GET_BY_ROLE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosRolePermissionsController = PosRolePermissionsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_ROLE_PERMISSION.ASSIGN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosRolePermissionsController.prototype, "assign", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_ROLE_PERMISSION.REVOKE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosRolePermissionsController.prototype, "revoke", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_ROLE_PERMISSION.GET_BY_ROLE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosRolePermissionsController.prototype, "getByRole", null);
exports.PosRolePermissionsController = PosRolePermissionsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_role_permissions_service_1.PosRolePermissionsService !== "undefined" && pos_role_permissions_service_1.PosRolePermissionsService) === "function" ? _a : Object])
], PosRolePermissionsController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosRolePermissionsService = void 0;
const common_1 = __webpack_require__(6);
const pos_role_permission_repository_1 = __webpack_require__(87);
const pos_permission_model_1 = __webpack_require__(47);
let PosRolePermissionsService = class PosRolePermissionsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async assign(data) {
        try {
            const record = await this.repo.create(data);
            return record.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async revoke(data) {
        try {
            return await this.repo.delete({ where: { roleId: data.roleId, permissionId: data.permissionId } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getByRole(roleId) {
        try {
            const records = await this.repo.findAll({
                where: { roleId },
                include: [{ model: pos_permission_model_1.PosPermission }],
            });
            return records.map(r => r.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosRolePermissionsService = PosRolePermissionsService;
exports.PosRolePermissionsService = PosRolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_role_permission_repository_1.PosRolePermissionRepository !== "undefined" && pos_role_permission_repository_1.PosRolePermissionRepository) === "function" ? _a : Object])
], PosRolePermissionsService);


/***/ }),
/* 186 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRolesModule = void 0;
const common_1 = __webpack_require__(6);
const pos_user_roles_controller_1 = __webpack_require__(187);
const pos_user_roles_service_1 = __webpack_require__(188);
const database_module_1 = __webpack_require__(7);
let PosUserRolesModule = class PosUserRolesModule {
};
exports.PosUserRolesModule = PosUserRolesModule;
exports.PosUserRolesModule = PosUserRolesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [pos_user_roles_controller_1.PosUserRolesController],
        providers: [pos_user_roles_service_1.PosUserRolesService],
    })
], PosUserRolesModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRolesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_user_roles_service_1 = __webpack_require__(188);
const pos_patterns_1 = __webpack_require__(110);
let PosUserRolesController = class PosUserRolesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async assign(data) {
        try {
            return await this.service.assign(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_ROLE_ASSIGN_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async revoke(data) {
        try {
            return await this.service.revoke(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_ROLE_REVOKE_ERROR', status: error.getStatus?.() || 400 });
        }
    }
    async getByUser(userId) {
        try {
            return await this.service.getByUser(userId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'POS_USER_ROLE_GET_BY_USER_ERROR', status: error.getStatus?.() || 400 });
        }
    }
};
exports.PosUserRolesController = PosUserRolesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER_ROLE.ASSIGN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosUserRolesController.prototype, "assign", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER_ROLE.REVOKE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosUserRolesController.prototype, "revoke", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.POS_USER_ROLE.GET_BY_USER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosUserRolesController.prototype, "getByUser", null);
exports.PosUserRolesController = PosUserRolesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_user_roles_service_1.PosUserRolesService !== "undefined" && pos_user_roles_service_1.PosUserRolesService) === "function" ? _a : Object])
], PosUserRolesController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosUserRolesService = void 0;
const common_1 = __webpack_require__(6);
const pos_user_role_repository_1 = __webpack_require__(88);
const pos_role_model_1 = __webpack_require__(46);
let PosUserRolesService = class PosUserRolesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async assign(data) {
        try {
            const record = await this.repo.create(data);
            return record.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async revoke(data) {
        try {
            return await this.repo.delete({ where: { userId: data.userId, roleId: data.roleId } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getByUser(userId) {
        try {
            const records = await this.repo.findAll({
                where: { userId },
                include: [{ model: pos_role_model_1.PosRole }],
            });
            return records.map(r => r.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosUserRolesService = PosUserRolesService;
exports.PosUserRolesService = PosUserRolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_user_role_repository_1.PosUserRoleRepository !== "undefined" && pos_user_role_repository_1.PosUserRoleRepository) === "function" ? _a : Object])
], PosUserRolesService);


/***/ }),
/* 189 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProductVariantsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const product_variant_model_1 = __webpack_require__(22);
const product_model_1 = __webpack_require__(17);
const pos_product_variants_controller_1 = __webpack_require__(190);
const pos_product_variants_service_1 = __webpack_require__(191);
let PosProductVariantsModule = class PosProductVariantsModule {
};
exports.PosProductVariantsModule = PosProductVariantsModule;
exports.PosProductVariantsModule = PosProductVariantsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([product_variant_model_1.ProductVariant, product_model_1.Product])],
        controllers: [pos_product_variants_controller_1.PosProductVariantsController],
        providers: [pos_product_variants_service_1.PosProductVariantsService],
    })
], PosProductVariantsModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProductVariantsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_product_variants_service_1 = __webpack_require__(191);
const pos_patterns_1 = __webpack_require__(110);
let PosProductVariantsController = class PosProductVariantsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'VARIANT_CREATE_ERROR', status: 400 });
        }
    }
    async getByProduct(productId) {
        try {
            return await this.service.getByProduct(productId);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'VARIANT_GET_ERROR', status: 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'VARIANT_GET_ONE_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'VARIANT_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (error) {
            throw new microservices_1.RpcException({ message: error.message || 'VARIANT_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosProductVariantsController = PosProductVariantsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosProductVariantsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.GET_BY_PRODUCT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosProductVariantsController.prototype, "getByProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosProductVariantsController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosProductVariantsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PRODUCT_VARIANT.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosProductVariantsController.prototype, "delete", null);
exports.PosProductVariantsController = PosProductVariantsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_product_variants_service_1.PosProductVariantsService !== "undefined" && pos_product_variants_service_1.PosProductVariantsService) === "function" ? _a : Object])
], PosProductVariantsController);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProductVariantsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const product_variant_model_1 = __webpack_require__(22);
const product_model_1 = __webpack_require__(17);
const unit_model_1 = __webpack_require__(15);
const pos_gateway_1 = __webpack_require__(101);
let PosProductVariantsService = class PosProductVariantsService {
    model;
    posGateway;
    constructor(model, posGateway) {
        this.model = model;
        this.posGateway = posGateway;
    }
    async create(data) {
        try {
            if (!data.barcode) {
                data.barcode = `VAR${Date.now()}${Math.floor(Math.random() * 1000)}`;
            }
            const variant = await this.model.create(data);
            this.posGateway.broadcast('variant_created', variant.toJSON());
            return variant.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getByProduct(productId) {
        try {
            const variants = await this.model.findAll({
                where: { productId },
                include: [
                    { model: product_model_1.Product, attributes: ['id', 'name', 'barcode'] },
                    { model: unit_model_1.Unit, attributes: ['id', 'name', 'shortCode'] },
                ],
                order: [['size', 'ASC']],
            });
            return variants.map(v => v.toJSON());
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getOne(id) {
        try {
            const variant = await this.model.findByPk(id, {
                include: [
                    { model: product_model_1.Product, attributes: ['id', 'name'] },
                    { model: unit_model_1.Unit, attributes: ['id', 'name', 'shortCode'] },
                ],
            });
            if (!variant)
                throw new common_1.BadRequestException('VARIANT_NOT_FOUND');
            return variant.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        try {
            const variant = await this.model.findByPk(id);
            if (!variant)
                throw new common_1.BadRequestException('VARIANT_NOT_FOUND');
            await variant.update(data);
            this.posGateway.broadcast('variant_updated', variant.toJSON());
            return variant.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            const variant = await this.model.findByPk(id);
            if (!variant)
                throw new common_1.BadRequestException('VARIANT_NOT_FOUND');
            await variant.update({ isActive: false });
            this.posGateway.broadcast('variant_deleted', { id });
            return { deleted: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosProductVariantsService = PosProductVariantsService;
exports.PosProductVariantsService = PosProductVariantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _a : Object])
], PosProductVariantsService);


/***/ }),
/* 192 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSupplierOrdersModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const pos_supplier_orders_controller_1 = __webpack_require__(193);
const pos_supplier_orders_service_1 = __webpack_require__(194);
const database_module_1 = __webpack_require__(7);
const supplier_order_model_1 = __webpack_require__(52);
let PosSupplierOrdersModule = class PosSupplierOrdersModule {
};
exports.PosSupplierOrdersModule = PosSupplierOrdersModule;
exports.PosSupplierOrdersModule = PosSupplierOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([supplier_order_model_1.SupplierOrder, supplier_order_model_1.SupplierOrderItem])],
        controllers: [pos_supplier_orders_controller_1.PosSupplierOrdersController],
        providers: [pos_supplier_orders_service_1.PosSupplierOrdersService],
    })
], PosSupplierOrdersModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosSupplierOrdersController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_supplier_orders_service_1 = __webpack_require__(194);
const pos_patterns_1 = __webpack_require__(110);
let PosSupplierOrdersController = class PosSupplierOrdersController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SUPPLIER_ORDER_CREATE_ERROR', status: 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SUPPLIER_ORDER_GET_ALL_ERROR', status: 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SUPPLIER_ORDER_GET_ONE_ERROR', status: 400 });
        }
    }
    async updateStatus(data) {
        try {
            return await this.service.updateStatus(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SUPPLIER_ORDER_STATUS_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SUPPLIER_ORDER_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SUPPLIER_ORDER_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosSupplierOrdersController = PosSupplierOrdersController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosSupplierOrdersController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosSupplierOrdersController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosSupplierOrdersController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.UPDATE_STATUS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosSupplierOrdersController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosSupplierOrdersController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SUPPLIER_ORDER.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosSupplierOrdersController.prototype, "delete", null);
exports.PosSupplierOrdersController = PosSupplierOrdersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_supplier_orders_service_1.PosSupplierOrdersService !== "undefined" && pos_supplier_orders_service_1.PosSupplierOrdersService) === "function" ? _a : Object])
], PosSupplierOrdersController);


/***/ }),
/* 194 */
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
exports.PosSupplierOrdersService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_typescript_1 = __webpack_require__(13);
const supplier_order_repository_1 = __webpack_require__(90);
const supplier_order_model_1 = __webpack_require__(52);
const supplier_model_1 = __webpack_require__(19);
const pos_user_model_1 = __webpack_require__(12);
const pos_gateway_1 = __webpack_require__(101);
let PosSupplierOrdersService = class PosSupplierOrdersService {
    repo;
    itemRepo;
    sequelize;
    posGateway;
    constructor(repo, itemRepo, sequelize, posGateway) {
        this.repo = repo;
        this.itemRepo = itemRepo;
        this.sequelize = sequelize;
        this.posGateway = posGateway;
    }
    async create(data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            const order = await this.repo.create({
                supplierId: input.supplierId,
                createdBy: Number(data.userId),
                orderRef: input.orderRef,
                notes: input.notes,
                status: 'draft',
                expectedDate: input.expectedDate,
            });
            if (input.items?.length) {
                await this.itemRepo.bulkCreate(input.items.map((it) => ({
                    orderId: order.id,
                    productName: it.productName,
                    variantInfo: it.variantInfo || null,
                    qty: it.qty,
                    unit: it.unit || null,
                    expectedPrice: it.expectedPrice || null,
                    notes: it.notes || null,
                })));
            }
            await t.commit();
            this.posGateway.broadcast('supplier_order_created', { id: order.id });
            return order.toJSON();
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data?.page) || 1;
            const limit = Number(data.data?.size) || 20;
            const offset = (page - 1) * limit;
            const where = {};
            if (data.data?.filters?.supplierId)
                where.supplierId = data.data.filters.supplierId;
            if (data.data?.filters?.status)
                where.status = data.data.filters.status;
            const result = await this.repo.findAndCountAll({
                where,
                include: [
                    { model: supplier_model_1.Supplier, attributes: ['id', 'name', 'phone'] },
                    { model: supplier_order_model_1.SupplierOrderItem },
                    { model: pos_user_model_1.PosUser, as: 'createdByUser', attributes: ['id', 'name'] },
                ],
                offset,
                limit,
                order: [['createdAt', 'DESC']],
                distinct: true,
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getOne(id) {
        try {
            const order = await this.repo.findOne({
                where: { id },
                include: [
                    { model: supplier_model_1.Supplier, attributes: ['id', 'name', 'phone', 'email', 'address'] },
                    { model: supplier_order_model_1.SupplierOrderItem },
                    { model: pos_user_model_1.PosUser, as: 'createdByUser', attributes: ['id', 'name'] },
                ],
            });
            if (!order)
                throw new common_1.BadRequestException('SUPPLIER_ORDER_NOT_FOUND');
            return order.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateStatus(data) {
        try {
            const order = await this.repo.update({ where: { id: data.id } }, { status: data.status });
            this.posGateway.broadcast('supplier_order_status_updated', { id: data.id, status: data.status });
            return order.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            await this.repo.update({ where: { id } }, {
                supplierId: input.supplierId,
                orderRef: input.orderRef,
                notes: input.notes,
                expectedDate: input.expectedDate,
            });
            if (input.items) {
                await this.itemRepo.destroyWhere({ orderId: id });
                await this.itemRepo.bulkCreate(input.items.map((it) => ({
                    orderId: id,
                    productName: it.productName,
                    variantInfo: it.variantInfo || null,
                    qty: it.qty,
                    unit: it.unit || null,
                    expectedPrice: it.expectedPrice || null,
                    notes: it.notes || null,
                })));
            }
            await t.commit();
            this.posGateway.broadcast('supplier_order_updated', { id });
            return { id, success: true };
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        try {
            await this.itemRepo.destroyWhere({ orderId: id });
            await this.repo.delete({ where: { id } });
            this.posGateway.broadcast('supplier_order_deleted', { id });
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PosSupplierOrdersService = PosSupplierOrdersService;
exports.PosSupplierOrdersService = PosSupplierOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_order_repository_1.SupplierOrderRepository !== "undefined" && supplier_order_repository_1.SupplierOrderRepository) === "function" ? _a : Object, typeof (_b = typeof supplier_order_repository_1.SupplierOrderItemRepository !== "undefined" && supplier_order_repository_1.SupplierOrderItemRepository) === "function" ? _b : Object, typeof (_c = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _c : Object, typeof (_d = typeof pos_gateway_1.PosGateway !== "undefined" && pos_gateway_1.PosGateway) === "function" ? _d : Object])
], PosSupplierOrdersService);


/***/ }),
/* 195 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProjectsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(7);
const project_model_1 = __webpack_require__(53);
const pos_projects_controller_1 = __webpack_require__(196);
const pos_projects_service_1 = __webpack_require__(197);
let PosProjectsModule = class PosProjectsModule {
};
exports.PosProjectsModule = PosProjectsModule;
exports.PosProjectsModule = PosProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([project_model_1.Project])],
        controllers: [pos_projects_controller_1.PosProjectsController],
        providers: [pos_projects_service_1.PosProjectsService],
    })
], PosProjectsModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProjectsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_projects_service_1 = __webpack_require__(197);
const pos_patterns_1 = __webpack_require__(110);
let PosProjectsController = class PosProjectsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'PROJECT_CREATE_ERROR', status: 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'PROJECT_GET_ERROR', status: 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'PROJECT_GET_ALL_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'PROJECT_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'PROJECT_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosProjectsController = PosProjectsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PROJECT.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosProjectsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PROJECT.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosProjectsController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PROJECT.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosProjectsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PROJECT.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosProjectsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.PROJECT.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosProjectsController.prototype, "delete", null);
exports.PosProjectsController = PosProjectsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_projects_service_1.PosProjectsService !== "undefined" && pos_projects_service_1.PosProjectsService) === "function" ? _a : Object])
], PosProjectsController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosProjectsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const project_repository_1 = __webpack_require__(91);
const customer_model_1 = __webpack_require__(27);
const supplier_model_1 = __webpack_require__(19);
let PosProjectsService = class PosProjectsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        try {
            const project = await this.repo.create(data);
            return project.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'PROJECT_CREATE_ERROR');
        }
    }
    async getOne(id) {
        try {
            const project = await this.repo.findOne({
                where: { id },
                include: [
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name', 'phone'], required: false },
                    { model: supplier_model_1.Supplier.unscoped(), attributes: ['id', 'name'], required: false },
                ],
            });
            if (!project)
                throw new common_1.BadRequestException('PROJECT_NOT_FOUND');
            return project.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'PROJECT_GET_ERROR');
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = { isActive: true };
            if (filters?.search) {
                where.name = { [sequelize_1.Op.like]: `%${filters.search}%` };
            }
            if (filters?.customerId)
                where.customerId = filters.customerId;
            if (filters?.supplierId)
                where.supplierId = filters.supplierId;
            const result = await this.repo.findAndCountAll({
                where,
                include: [
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name'], required: false },
                    { model: supplier_model_1.Supplier.unscoped(), attributes: ['id', 'name'], required: false },
                ],
                offset,
                limit,
                order: [['createdAt', 'DESC']],
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'PROJECT_GET_ALL_ERROR');
        }
    }
    async update(id, data) {
        try {
            const updated = await this.repo.update({ where: { id } }, data);
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'PROJECT_UPDATE_ERROR');
        }
    }
    async delete(id) {
        try {
            return await this.repo.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'PROJECT_DELETE_ERROR');
        }
    }
};
exports.PosProjectsService = PosProjectsService;
exports.PosProjectsService = PosProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof project_repository_1.ProjectRepository !== "undefined" && project_repository_1.ProjectRepository) === "function" ? _a : Object])
], PosProjectsService);


/***/ }),
/* 198 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosServicesModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(7);
const service_model_1 = __webpack_require__(54);
const pos_services_controller_1 = __webpack_require__(199);
const pos_services_service_1 = __webpack_require__(200);
let PosServicesModule = class PosServicesModule {
};
exports.PosServicesModule = PosServicesModule;
exports.PosServicesModule = PosServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([service_model_1.Service])],
        controllers: [pos_services_controller_1.PosServicesController],
        providers: [pos_services_service_1.PosServicesService],
    })
], PosServicesModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosServicesController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_services_service_1 = __webpack_require__(200);
const pos_patterns_1 = __webpack_require__(110);
let PosServicesController = class PosServicesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SERVICE_CREATE_ERROR', status: 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SERVICE_GET_ERROR', status: 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SERVICE_GET_ALL_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SERVICE_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'SERVICE_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosServicesController = PosServicesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SERVICE.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosServicesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SERVICE.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosServicesController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SERVICE.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosServicesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SERVICE.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosServicesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.SERVICE.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosServicesController.prototype, "delete", null);
exports.PosServicesController = PosServicesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_services_service_1.PosServicesService !== "undefined" && pos_services_service_1.PosServicesService) === "function" ? _a : Object])
], PosServicesController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosServicesService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const service_repository_1 = __webpack_require__(92);
const supplier_model_1 = __webpack_require__(19);
let PosServicesService = class PosServicesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        try {
            const service = await this.repo.create(data);
            return service.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'SERVICE_CREATE_ERROR');
        }
    }
    async getOne(id) {
        try {
            const service = await this.repo.findOne({
                where: { id },
                include: [{ model: supplier_model_1.Supplier.unscoped(), attributes: ['id', 'name'], required: false }],
            });
            if (!service)
                throw new common_1.BadRequestException('SERVICE_NOT_FOUND');
            return service.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'SERVICE_GET_ERROR');
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = { isActive: true };
            if (filters?.search) {
                where.name = { [sequelize_1.Op.like]: `%${filters.search}%` };
            }
            if (filters?.supplierId)
                where.supplierId = filters.supplierId;
            const result = await this.repo.findAndCountAll({
                where,
                include: [{ model: supplier_model_1.Supplier.unscoped(), attributes: ['id', 'name'], required: false }],
                offset,
                limit,
                order: [['name', 'ASC']],
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'SERVICE_GET_ALL_ERROR');
        }
    }
    async update(id, data) {
        try {
            const updated = await this.repo.update({ where: { id } }, data);
            return updated.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'SERVICE_UPDATE_ERROR');
        }
    }
    async delete(id) {
        try {
            return await this.repo.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'SERVICE_DELETE_ERROR');
        }
    }
};
exports.PosServicesService = PosServicesService;
exports.PosServicesService = PosServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof service_repository_1.ServiceRepository !== "undefined" && service_repository_1.ServiceRepository) === "function" ? _a : Object])
], PosServicesService);


/***/ }),
/* 201 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosQuotationsModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(7);
const quotation_model_1 = __webpack_require__(55);
const quotation_repository_1 = __webpack_require__(93);
const pos_quotations_controller_1 = __webpack_require__(202);
const pos_quotations_service_1 = __webpack_require__(203);
let PosQuotationsModule = class PosQuotationsModule {
};
exports.PosQuotationsModule = PosQuotationsModule;
exports.PosQuotationsModule = PosQuotationsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([quotation_model_1.Quotation, quotation_model_1.QuotationItem, quotation_model_1.QuotationPaymentTransaction, quotation_model_1.QuotationStatusLog])],
        controllers: [pos_quotations_controller_1.PosQuotationsController],
        providers: [pos_quotations_service_1.PosQuotationsService, quotation_repository_1.QuotationRepository, quotation_repository_1.QuotationItemRepository, quotation_repository_1.QuotationPaymentTransactionRepository, quotation_repository_1.QuotationStatusLogRepository],
    })
], PosQuotationsModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosQuotationsController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_quotations_service_1 = __webpack_require__(203);
const pos_patterns_1 = __webpack_require__(110);
let PosQuotationsController = class PosQuotationsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_CREATE_ERROR', status: 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_GET_ERROR', status: 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_GET_ALL_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, { userId: data.userId, data: data.data });
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_DELETE_ERROR', status: 400 });
        }
    }
    async updateStatus(data) {
        try {
            return await this.service.updateStatus(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_STATUS_UPDATE_ERROR', status: 400 });
        }
    }
    async getInvoice(id) {
        try {
            return await this.service.getInvoice(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_INVOICE_ERROR', status: 400 });
        }
    }
    async recordPayment(data) {
        try {
            return await this.service.recordPayment(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_PAYMENT_ERROR', status: 400 });
        }
    }
    async returnPayment(data) {
        try {
            return await this.service.returnPayment(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'QUOTATION_RETURN_ERROR', status: 400 });
        }
    }
};
exports.PosQuotationsController = PosQuotationsController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosQuotationsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosQuotationsController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosQuotationsController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosQuotationsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosQuotationsController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.UPDATE_STATUS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PosQuotationsController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.GET_INVOICE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PosQuotationsController.prototype, "getInvoice", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.RECORD_PAYMENT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PosQuotationsController.prototype, "recordPayment", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.QUOTATION.RETURN_PAYMENT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], PosQuotationsController.prototype, "returnPayment", null);
exports.PosQuotationsController = PosQuotationsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_quotations_service_1.PosQuotationsService !== "undefined" && pos_quotations_service_1.PosQuotationsService) === "function" ? _a : Object])
], PosQuotationsController);


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosQuotationsService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_typescript_1 = __webpack_require__(13);
const quotation_repository_1 = __webpack_require__(93);
const quotation_model_1 = __webpack_require__(55);
const customer_model_1 = __webpack_require__(27);
const company_model_1 = __webpack_require__(56);
const pos_user_model_1 = __webpack_require__(12);
let PosQuotationsService = class PosQuotationsService {
    repo;
    itemRepo;
    txRepo;
    statusLogRepo;
    sequelize;
    constructor(repo, itemRepo, txRepo, statusLogRepo, sequelize) {
        this.repo = repo;
        this.itemRepo = itemRepo;
        this.txRepo = txRepo;
        this.statusLogRepo = statusLogRepo;
        this.sequelize = sequelize;
    }
    async create(data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            if (!input.customerId && !input.companyId) {
                throw new common_1.BadRequestException('Either customerId or companyId is required');
            }
            const quotation = await this.repo.create({
                customerId: input.customerId || null,
                companyId: input.companyId || null,
                createdBy: Number(data.userId),
                quotationType: input.quotationType || 'Retail',
                validUntil: input.validUntil || null,
                notes: input.notes || null,
                termsConditions: input.termsConditions || null,
                subTotal: input.subTotal || 0,
                vatAmount: input.vatAmount || 0,
                discountAmount: input.discountAmount || 0,
                totalAmount: input.totalAmount || 0,
                currencyCode: input.currencyCode || 'PKR',
            });
            if (input.items?.length) {
                await this.itemRepo.bulkCreate(input.items.map((it) => ({
                    quotationId: quotation.id,
                    type: it.type || 'product',
                    refId: it.refId || null,
                    name: it.name,
                    description: it.description || null,
                    unitPrice: it.unitPrice || 0,
                    qty: it.qty || 1,
                    vatPercent: it.vatPercent || 0,
                    discount: it.discount || 0,
                    unit: it.unit || null,
                })));
            }
            await t.commit();
            return quotation.toJSON();
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error.message || 'QUOTATION_CREATE_ERROR');
        }
    }
    async getOne(id) {
        try {
            const quotation = await this.repo.findOne({
                where: { id },
                include: [
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name', 'phone', 'email', 'address'], required: false },
                    { model: company_model_1.Company, attributes: ['id', 'name', 'contactPerson', 'phone', 'email', 'address', 'taxId'], required: false },
                    { model: quotation_model_1.QuotationItem, required: false },
                    { model: pos_user_model_1.PosUser, as: 'createdByUser', attributes: ['id', 'name'], required: false },
                ],
            });
            if (!quotation)
                throw new common_1.BadRequestException('QUOTATION_NOT_FOUND');
            return quotation.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'QUOTATION_GET_ERROR');
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.data.page) || 1;
            const limit = Number(data.data.size) || 20;
            const offset = (page - 1) * limit;
            const filters = data.data.filters;
            const where = {};
            if (filters?.customerId)
                where.customerId = filters.customerId;
            if (filters?.companyId)
                where.companyId = filters.companyId;
            if (filters?.quotationType)
                where.quotationType = filters.quotationType;
            const result = await this.repo.findAndCountAll({
                where,
                include: [
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name'], required: false },
                    { model: company_model_1.Company, attributes: ['id', 'name'], required: false },
                    { model: quotation_model_1.QuotationItem, required: false },
                ],
                offset,
                limit,
                order: [['createdAt', 'DESC']],
                distinct: true,
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'QUOTATION_GET_ALL_ERROR');
        }
    }
    async update(id, data) {
        const t = await this.sequelize.transaction();
        try {
            const input = data.data;
            const quotation = await this.repo.update({ where: { id } }, {
                customerId: input.customerId || null,
                companyId: input.companyId || null,
                quotationType: input.quotationType,
                validUntil: input.validUntil || null,
                notes: input.notes || null,
                termsConditions: input.termsConditions || null,
                subTotal: input.subTotal || 0,
                vatAmount: input.vatAmount || 0,
                discountAmount: input.discountAmount || 0,
                totalAmount: input.totalAmount || 0,
                currencyCode: input.currencyCode || 'PKR',
            });
            if (input.items) {
                await this.itemRepo.destroyWhere({ quotationId: id });
                await this.itemRepo.bulkCreate(input.items.map((it) => ({
                    quotationId: id,
                    type: it.type || 'product',
                    refId: it.refId || null,
                    name: it.name,
                    description: it.description || null,
                    unitPrice: it.unitPrice || 0,
                    qty: it.qty || 1,
                    vatPercent: it.vatPercent || 0,
                    discount: it.discount || 0,
                    unit: it.unit || null,
                })));
            }
            await t.commit();
            return quotation.toJSON();
        }
        catch (error) {
            await t.rollback();
            throw new common_1.BadRequestException(error.message || 'QUOTATION_UPDATE_ERROR');
        }
    }
    async delete(id) {
        try {
            await this.itemRepo.destroyWhere({ quotationId: id });
            return await this.repo.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'QUOTATION_DELETE_ERROR');
        }
    }
    async updateStatus(data) {
        const VALID = ['Draft', 'Sent', 'Approved', 'Rejected', 'Converted'];
        if (!VALID.includes(data.status)) {
            throw new common_1.BadRequestException(`Invalid status. Must be one of: ${VALID.join(', ')}`);
        }
        try {
            const existing = await this.repo.findOne({ where: { id: data.id } });
            if (!existing)
                throw new common_1.BadRequestException('QUOTATION_NOT_FOUND');
            const fromStatus = existing.toJSON().status ?? 'Draft';
            const quotation = await this.repo.update({ where: { id: data.id } }, { status: data.status });
            await this.statusLogRepo.create({
                quotationId: data.id,
                fromStatus,
                toStatus: data.status,
                changedBy: data.userId || undefined,
            });
            return quotation.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'QUOTATION_STATUS_UPDATE_ERROR');
        }
    }
    async getInvoice(id) {
        try {
            const quotation = await this.repo.findOne({
                where: { id },
                include: [
                    { model: customer_model_1.Customer.unscoped(), attributes: ['id', 'name', 'phone', 'email', 'address'], required: false },
                    { model: company_model_1.Company, attributes: ['id', 'name', 'contactPerson', 'phone', 'email', 'address', 'taxId'], required: false },
                    { model: quotation_model_1.QuotationItem, required: false },
                    { model: pos_user_model_1.PosUser, as: 'createdByUser', attributes: ['id', 'name'], required: false },
                ],
            });
            if (!quotation)
                throw new common_1.BadRequestException('QUOTATION_NOT_FOUND');
            const q = quotation.toJSON();
            const paid = Number(q.paidAmount ?? 0);
            const total = Number(q.totalAmount ?? 0);
            const transactions = await this.txRepo.findAll({ where: { quotationId: id }, order: [['createdAt', 'DESC']] });
            const statusLogs = await this.statusLogRepo.findAll({ where: { quotationId: id }, order: [['createdAt', 'ASC']] });
            return {
                ...q,
                invoiceNumber: `INV-${String(q.id).padStart(6, '0')}`,
                paidAmount: paid,
                balanceDue: Math.max(0, total - paid),
                paymentStatus: paid >= total ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid',
                transactions: transactions.map((t) => t.toJSON()),
                statusLogs: statusLogs.map((s) => s.toJSON()),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'QUOTATION_INVOICE_ERROR');
        }
    }
    async recordPayment(data) {
        try {
            const quotation = await this.repo.findOne({ where: { id: data.id } });
            if (!quotation)
                throw new common_1.BadRequestException('QUOTATION_NOT_FOUND');
            const q = quotation.toJSON();
            const newPaid = Math.min(Number(q.totalAmount), Number(q.paidAmount ?? 0) + Number(data.amount));
            const newStatus = newPaid >= Number(q.totalAmount) ? 'Converted' : q.status;
            await this.repo.update({ where: { id: data.id } }, { paidAmount: newPaid, status: newStatus });
            await this.txRepo.create({
                quotationId: data.id,
                type: 'payment',
                amount: Number(data.amount),
                method: data.method || 'Cash',
                paymentDate: data.date || new Date().toISOString().split('T')[0],
                bankName: data.bankName || undefined,
                chequeNo: data.chequeNo || undefined,
                createdBy: data.userId || undefined,
            });
            if (newStatus !== q.status) {
                await this.statusLogRepo.create({
                    quotationId: data.id,
                    fromStatus: q.status,
                    toStatus: newStatus,
                    note: 'Auto: fully paid',
                    changedBy: data.userId || undefined,
                });
            }
            return { success: true, paidAmount: newPaid, status: newStatus };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'QUOTATION_PAYMENT_ERROR');
        }
    }
    async returnPayment(data) {
        try {
            const quotation = await this.repo.findOne({ where: { id: data.id } });
            if (!quotation)
                throw new common_1.BadRequestException('QUOTATION_NOT_FOUND');
            const q = quotation.toJSON();
            const currentPaid = Number(q.paidAmount ?? 0);
            if (currentPaid <= 0)
                throw new common_1.BadRequestException('No payment to return');
            const returnAmt = Math.min(Number(data.amount), currentPaid);
            const newPaid = currentPaid - returnAmt;
            const newStatus = newPaid <= 0 ? 'Approved' : q.status;
            await this.repo.update({ where: { id: data.id } }, { paidAmount: newPaid, status: newStatus });
            await this.txRepo.create({
                quotationId: data.id,
                type: 'return',
                amount: returnAmt,
                reason: data.reason || undefined,
                createdBy: data.userId || undefined,
            });
            if (newStatus !== q.status) {
                await this.statusLogRepo.create({
                    quotationId: data.id,
                    fromStatus: q.status,
                    toStatus: newStatus,
                    note: 'Auto: payment fully returned',
                    changedBy: data.userId || undefined,
                });
            }
            return { success: true, returnedAmount: returnAmt, paidAmount: newPaid, status: newStatus };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'QUOTATION_RETURN_ERROR');
        }
    }
};
exports.PosQuotationsService = PosQuotationsService;
exports.PosQuotationsService = PosQuotationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof quotation_repository_1.QuotationRepository !== "undefined" && quotation_repository_1.QuotationRepository) === "function" ? _a : Object, typeof (_b = typeof quotation_repository_1.QuotationItemRepository !== "undefined" && quotation_repository_1.QuotationItemRepository) === "function" ? _b : Object, typeof (_c = typeof quotation_repository_1.QuotationPaymentTransactionRepository !== "undefined" && quotation_repository_1.QuotationPaymentTransactionRepository) === "function" ? _c : Object, typeof (_d = typeof quotation_repository_1.QuotationStatusLogRepository !== "undefined" && quotation_repository_1.QuotationStatusLogRepository) === "function" ? _d : Object, typeof (_e = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _e : Object])
], PosQuotationsService);


/***/ }),
/* 204 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosDeliveryOrdersModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(7);
const delivery_order_model_1 = __webpack_require__(58);
const quotation_model_1 = __webpack_require__(55);
const company_model_1 = __webpack_require__(56);
const supplier_model_1 = __webpack_require__(19);
const delivery_order_repository_1 = __webpack_require__(95);
const quotation_repository_1 = __webpack_require__(93);
const pos_delivery_orders_controller_1 = __webpack_require__(205);
const pos_delivery_orders_service_1 = __webpack_require__(206);
let PosDeliveryOrdersModule = class PosDeliveryOrdersModule {
};
exports.PosDeliveryOrdersModule = PosDeliveryOrdersModule;
exports.PosDeliveryOrdersModule = PosDeliveryOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([delivery_order_model_1.DeliveryOrder, delivery_order_model_1.DeliveryOrderItem, quotation_model_1.Quotation, quotation_model_1.QuotationItem, company_model_1.Company, supplier_model_1.Supplier])],
        controllers: [pos_delivery_orders_controller_1.PosDeliveryOrdersController],
        providers: [pos_delivery_orders_service_1.PosDeliveryOrdersService, delivery_order_repository_1.DeliveryOrderRepository, delivery_order_repository_1.DeliveryOrderItemRepository, quotation_repository_1.QuotationRepository, quotation_repository_1.QuotationItemRepository],
    })
], PosDeliveryOrdersModule);


/***/ }),
/* 205 */
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosDeliveryOrdersController = void 0;
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_delivery_orders_service_1 = __webpack_require__(206);
const pos_patterns_1 = __webpack_require__(110);
let PosDeliveryOrdersController = class PosDeliveryOrdersController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'DO_CREATE_ERROR', status: 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'DO_GET_ALL_ERROR', status: 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'DO_GET_ERROR', status: 400 });
        }
    }
    async generateInvoice(data) {
        try {
            return await this.service.generateInvoice(data.id, data.userId);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'DO_INVOICE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'DO_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosDeliveryOrdersController = PosDeliveryOrdersController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PosDeliveryOrdersController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PosDeliveryOrdersController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PosDeliveryOrdersController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.GENERATE_INVOICE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PosDeliveryOrdersController.prototype, "generateInvoice", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.DELIVERY_ORDER.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PosDeliveryOrdersController.prototype, "delete", null);
exports.PosDeliveryOrdersController = PosDeliveryOrdersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_delivery_orders_service_1.PosDeliveryOrdersService !== "undefined" && pos_delivery_orders_service_1.PosDeliveryOrdersService) === "function" ? _a : Object])
], PosDeliveryOrdersController);


/***/ }),
/* 206 */
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
exports.PosDeliveryOrdersService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_typescript_1 = __webpack_require__(13);
const sequelize_1 = __webpack_require__(8);
const delivery_order_repository_1 = __webpack_require__(95);
const quotation_repository_1 = __webpack_require__(93);
const delivery_order_model_1 = __webpack_require__(58);
const customer_model_1 = __webpack_require__(27);
const supplier_model_1 = __webpack_require__(19);
const company_model_1 = __webpack_require__(56);
const quotation_model_1 = __webpack_require__(55);
let PosDeliveryOrdersService = class PosDeliveryOrdersService {
    repo;
    itemRepo;
    quotationRepo;
    sequelize;
    doModel;
    doItemModel;
    constructor(repo, itemRepo, quotationRepo, sequelize, doModel, doItemModel) {
        this.repo = repo;
        this.itemRepo = itemRepo;
        this.quotationRepo = quotationRepo;
        this.sequelize = sequelize;
        this.doModel = doModel;
        this.doItemModel = doItemModel;
    }
    generateDoNumber() {
        const now = new Date();
        const pad = (n, l = 2) => String(n).padStart(l, '0');
        const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        const rand = Math.floor(Math.random() * 900 + 100);
        return `DO-${ts}${rand}`;
    }
    async create(data) {
        const t = await this.sequelize.transaction();
        let newOrderId = null;
        let existingOrderId = null;
        let committed = false;
        try {
            const quotation = await this.quotationRepo.findOne({
                where: { id: data.quotationId },
                include: [{ model: quotation_model_1.QuotationItem }],
            });
            if (!quotation)
                throw new common_1.BadRequestException('QUOTATION_NOT_FOUND');
            const q = quotation.toJSON();
            const existing = await this.repo.findOne({ where: { quotationId: data.quotationId } });
            if (existing) {
                existingOrderId = existing.id;
            }
            else {
                const doNumber = this.generateDoNumber();
                const order = await this.doModel.create({
                    doNumber,
                    quotationId: data.quotationId,
                    customerId: q.customerId || null,
                    createdBy: data.userId,
                    status: 'Pending',
                    notes: data.notes || undefined,
                }, { transaction: t });
                if (q.items?.length) {
                    await this.doItemModel.bulkCreate(q.items.map((it) => ({
                        deliveryOrderId: order.id,
                        quotationItemId: it.id,
                        type: it.type || 'product',
                        name: it.name,
                        unitPrice: it.unitPrice || 0,
                        qty: it.qty || 1,
                        vatPercent: it.vatPercent || 0,
                        discount: it.discount || 0,
                    })), { transaction: t });
                }
                newOrderId = order.id;
            }
            await t.commit();
            committed = true;
        }
        catch (error) {
            if (!committed)
                await t.rollback();
            throw new common_1.BadRequestException(error.message || 'DELIVERY_ORDER_CREATE_ERROR');
        }
        return this.getOne((existingOrderId ?? newOrderId));
    }
    async getAll(data) {
        try {
            const page = Number(data.page) || 1;
            const limit = Number(data.size) || 20;
            const offset = (page - 1) * limit;
            const where = {};
            if (data.status)
                where.status = data.status;
            const result = await this.repo.findAndCountAll({
                where,
                include: [
                    { model: customer_model_1.Customer, attributes: ['id', 'name', 'phone'], required: false },
                    { model: supplier_model_1.Supplier, attributes: ['id', 'name', 'phone'], required: false },
                    { model: quotation_model_1.Quotation, attributes: ['id', 'totalAmount', 'currencyCode', 'companyId'], required: false,
                        include: [{ model: company_model_1.Company, attributes: ['id', 'name', 'phone'], required: false }] },
                    { model: delivery_order_model_1.DeliveryOrderItem },
                ],
                offset, limit,
                order: [['createdAt', 'DESC']],
                distinct: true,
            });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'DELIVERY_ORDER_GET_ALL_ERROR');
        }
    }
    async getOne(id) {
        const order = await this.doModel.findOne({
            where: { id },
            include: [
                { model: customer_model_1.Customer, attributes: ['id', 'name', 'phone', 'email', 'address'], required: false },
                { model: supplier_model_1.Supplier, attributes: ['id', 'name', 'phone', 'email', 'address'], required: false },
                { model: quotation_model_1.Quotation, attributes: ['id', 'totalAmount', 'currencyCode', 'subTotal', 'vatAmount', 'discountAmount', 'companyId'], required: false,
                    include: [{ model: company_model_1.Company, attributes: ['id', 'name', 'phone', 'email', 'address'], required: false }] },
                { model: delivery_order_model_1.DeliveryOrderItem, required: false },
            ],
        });
        if (!order)
            throw new common_1.BadRequestException('DELIVERY_ORDER_NOT_FOUND');
        return order.toJSON();
    }
    async generateInvoice(id, userId) {
        const order = await this.repo.findOne({ where: { id } });
        if (!order)
            throw new common_1.BadRequestException('DELIVERY_ORDER_NOT_FOUND');
        if (order.status === 'Invoiced')
            throw new common_1.BadRequestException('Already invoiced');
        await this.repo.update({ where: { id } }, { status: 'Invoiced' });
        await this.quotationRepo.update({ where: { id: order.quotationId } }, { status: 'Converted' });
        return this.getOne(id);
    }
    async delete(id) {
        try {
            await this.itemRepo.destroyWhere({ deliveryOrderId: id });
            return await this.repo.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'DELIVERY_ORDER_DELETE_ERROR');
        }
    }
};
exports.PosDeliveryOrdersService = PosDeliveryOrdersService;
exports.PosDeliveryOrdersService = PosDeliveryOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, sequelize_1.InjectModel)(delivery_order_model_1.DeliveryOrder)),
    __param(5, (0, sequelize_1.InjectModel)(delivery_order_model_1.DeliveryOrderItem)),
    __metadata("design:paramtypes", [typeof (_a = typeof delivery_order_repository_1.DeliveryOrderRepository !== "undefined" && delivery_order_repository_1.DeliveryOrderRepository) === "function" ? _a : Object, typeof (_b = typeof delivery_order_repository_1.DeliveryOrderItemRepository !== "undefined" && delivery_order_repository_1.DeliveryOrderItemRepository) === "function" ? _b : Object, typeof (_c = typeof quotation_repository_1.QuotationRepository !== "undefined" && quotation_repository_1.QuotationRepository) === "function" ? _c : Object, typeof (_d = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _d : Object, Object, Object])
], PosDeliveryOrdersService);


/***/ }),
/* 207 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosCompaniesModule = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(7);
const company_model_1 = __webpack_require__(56);
const company_repository_1 = __webpack_require__(96);
const pos_companies_controller_1 = __webpack_require__(208);
const pos_companies_service_1 = __webpack_require__(209);
let PosCompaniesModule = class PosCompaniesModule {
};
exports.PosCompaniesModule = PosCompaniesModule;
exports.PosCompaniesModule = PosCompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, sequelize_1.SequelizeModule.forFeature([company_model_1.Company])],
        controllers: [pos_companies_controller_1.PosCompaniesController],
        providers: [pos_companies_service_1.PosCompaniesService, company_repository_1.CompanyRepository],
    })
], PosCompaniesModule);


/***/ }),
/* 208 */
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
const common_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const pos_companies_service_1 = __webpack_require__(209);
const pos_patterns_1 = __webpack_require__(110);
let PosCompaniesController = class PosCompaniesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        try {
            return await this.service.create(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'COMPANY_CREATE_ERROR', status: 400 });
        }
    }
    async getOne(id) {
        try {
            return await this.service.getOne(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'COMPANY_GET_ERROR', status: 400 });
        }
    }
    async getAll(data) {
        try {
            return await this.service.getAll(data);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'COMPANY_GET_ALL_ERROR', status: 400 });
        }
    }
    async update(data) {
        try {
            return await this.service.update(data.id, data.payload);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'COMPANY_UPDATE_ERROR', status: 400 });
        }
    }
    async delete(id) {
        try {
            return await this.service.delete(id);
        }
        catch (e) {
            throw new microservices_1.RpcException({ message: e.message || 'COMPANY_DELETE_ERROR', status: 400 });
        }
    }
};
exports.PosCompaniesController = PosCompaniesController;
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.COMPANY.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PosCompaniesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.COMPANY.GET_ONE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PosCompaniesController.prototype, "getOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.COMPANY.GET_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PosCompaniesController.prototype, "getAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.COMPANY.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PosCompaniesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(pos_patterns_1.POS_PATTERNS.COMPANY.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PosCompaniesController.prototype, "delete", null);
exports.PosCompaniesController = PosCompaniesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof pos_companies_service_1.PosCompaniesService !== "undefined" && pos_companies_service_1.PosCompaniesService) === "function" ? _a : Object])
], PosCompaniesController);


/***/ }),
/* 209 */
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
exports.PosCompaniesService = void 0;
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(100);
const company_repository_1 = __webpack_require__(96);
let PosCompaniesService = class PosCompaniesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        try {
            const company = await this.repo.create({
                name: data.name,
                registrationNumber: data.registrationNumber || null,
                taxId: data.taxId || null,
                industry: data.industry || null,
                website: data.website || null,
                contactPerson: data.contactPerson || null,
                phone: data.phone || null,
                email: data.email || null,
                address: data.address || null,
                currencyCode: data.currencyCode || 'PKR',
                creditLimit: data.creditLimit || 0,
                notes: data.notes || null,
            });
            return company.toJSON();
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message || 'COMPANY_CREATE_ERROR');
        }
    }
    async getOne(id) {
        try {
            const c = await this.repo.findOne({ where: { id } });
            if (!c)
                throw new common_1.BadRequestException('COMPANY_NOT_FOUND');
            return c.toJSON();
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message || 'COMPANY_GET_ERROR');
        }
    }
    async getAll(data) {
        try {
            const page = Number(data.page) || 1;
            const limit = Number(data.size) || 100;
            const offset = (page - 1) * limit;
            const where = { isActive: true };
            if (data.search) {
                where[sequelize_1.Op.or] = [
                    { name: { [sequelize_1.Op.like]: `%${data.search}%` } },
                    { contactPerson: { [sequelize_1.Op.like]: `%${data.search}%` } },
                    { phone: { [sequelize_1.Op.like]: `%${data.search}%` } },
                ];
            }
            const result = await this.repo.findAndCountAll({ where, offset, limit, order: [['name', 'ASC']] });
            return {
                data: result.rows.map(r => r.toJSON()),
                page,
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count,
            };
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message || 'COMPANY_GET_ALL_ERROR');
        }
    }
    async update(id, data) {
        try {
            const c = await this.repo.update({ where: { id } }, {
                name: data.name,
                registrationNumber: data.registrationNumber ?? undefined,
                taxId: data.taxId ?? undefined,
                industry: data.industry ?? undefined,
                website: data.website ?? undefined,
                contactPerson: data.contactPerson ?? undefined,
                phone: data.phone ?? undefined,
                email: data.email ?? undefined,
                address: data.address ?? undefined,
                currencyCode: data.currencyCode ?? undefined,
                creditLimit: data.creditLimit ?? undefined,
                notes: data.notes ?? undefined,
            });
            return c.toJSON();
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message || 'COMPANY_UPDATE_ERROR');
        }
    }
    async delete(id) {
        try {
            await this.repo.update({ where: { id } }, { isActive: false });
            return true;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message || 'COMPANY_DELETE_ERROR');
        }
    }
};
exports.PosCompaniesService = PosCompaniesService;
exports.PosCompaniesService = PosCompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof company_repository_1.CompanyRepository !== "undefined" && company_repository_1.CompanyRepository) === "function" ? _a : Object])
], PosCompaniesService);


/***/ }),
/* 210 */
/***/ ((module) => {

module.exports = require("xlsx");

/***/ }),
/* 211 */
/***/ ((module) => {

module.exports = require("csv-parse/sync");

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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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