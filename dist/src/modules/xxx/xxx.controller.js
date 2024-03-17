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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.XxxController = void 0;
const common_1 = require("@nestjs/common");
const xxx_service_1 = require("./xxx.service");
const BaseController_1 = require("../../common/base/BaseController");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../interfaces/enums");
const auth_user_decorator_1 = require("../../common/decorators/auth-user.decorator");
const user_entity_1 = require("../../database/entities/user.entity");
const xxx_entity_1 = require("@/database/entities/xxx.entity");
const roles_quard_1 = require("../../common/guards/roles.quard");
const roles_auth_decorator_1 = require("../../common/decorators/roles-auth.decorator");
let XxxController = class XxxController extends BaseController_1.BaseController {
    constructor(dataService) {
        super();
        this.dataService = dataService;
    }
    create(data, user) {
        return this.dataService.create(data, user);
    }
    update(user, id, data) {
        return this.dataService.update(user, id, data);
    }
    async remove(user, id) {
        console.log(user);
        return this.dataService.delete(user, id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create Xxx" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: xxx_entity_1.XxxEntity,
        description: "Xxx created successfully",
    }),
    (0, swagger_1.ApiBody)({ type: xxx_entity_1.XxxEntity }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER, enums_1.RoleEnum.USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], XxxController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update Xxx" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: xxx_entity_1.XxxEntity,
        description: "Xxx updated successfully",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Xxx ID" }),
    (0, swagger_1.ApiBody)({ type: xxx_entity_1.XxxEntity }),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER, enums_1.RoleEnum.USER),
    (0, common_1.Patch)(":id"),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, typeof (_b = typeof xxx_entity_1.XxxEntity !== "undefined" && xxx_entity_1.XxxEntity) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], XxxController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Xxx ID" }),
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.USER, enums_1.RoleEnum.USER),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], XxxController.prototype, "remove", null);
XxxController = __decorate([
    (0, swagger_1.ApiTags)("Xxx"),
    (0, common_1.Controller)("xxx"),
    __metadata("design:paramtypes", [xxx_service_1.XxxService])
], XxxController);
exports.XxxController = XxxController;
//# sourceMappingURL=xxx.controller.js.map