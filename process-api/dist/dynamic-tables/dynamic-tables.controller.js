"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicTablesController = void 0;
const common_1 = require("@nestjs/common");
const dynamic_tables_service_1 = require("./dynamic-tables.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DynamicTablesController = exports.DynamicTablesController = class DynamicTablesController {
    constructor(dynamicTablesService) {
        this.dynamicTablesService = dynamicTablesService;
    }
    async createTable({ table_name, columns, ownerId, }) {
        return await this.dynamicTablesService.createTable(table_name, columns, ownerId);
    }
    async dropTable(tableName) {
        return await this.dynamicTablesService.dropTable(tableName);
    }
    async getAllTables() {
        return this.dynamicTablesService.getAllTables();
    }
    async getTablesByOwnerId(ownerId) {
        return this.dynamicTablesService.getTablesByOwnerId(ownerId);
    }
    async getTableRows(tableName) {
        return this.dynamicTablesService.getTable(tableName);
    }
    async insertRow(tableName, { entry, }) {
        return await this.dynamicTablesService.insertRow(tableName, entry);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DynamicTablesController.prototype, "createTable", null);
__decorate([
    (0, common_1.Post)('drop/:tableName'),
    __param(0, (0, common_1.Param)('tableName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DynamicTablesController.prototype, "dropTable", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DynamicTablesController.prototype, "getAllTables", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('get-all/:ownerId'),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DynamicTablesController.prototype, "getTablesByOwnerId", null);
__decorate([
    (0, common_1.Get)(':tableName'),
    __param(0, (0, common_1.Param)('tableName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DynamicTablesController.prototype, "getTableRows", null);
__decorate([
    (0, common_1.Post)('insert/:tableName'),
    __param(0, (0, common_1.Param)('tableName')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DynamicTablesController.prototype, "insertRow", null);
exports.DynamicTablesController = DynamicTablesController = __decorate([
    (0, common_1.Controller)('dynamic-tables'),
    __metadata("design:paramtypes", [dynamic_tables_service_1.DynamicTablesService])
], DynamicTablesController);
//# sourceMappingURL=dynamic-tables.controller.js.map