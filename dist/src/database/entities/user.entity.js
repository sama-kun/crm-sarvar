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
var UserEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const enums_1 = require("../../interfaces/enums");
const BaseModel_1 = require("../../common/base/BaseModel");
const order_entity_1 = require("./order.entity");
let UserEntity = UserEntity_1 = class UserEntity extends BaseModel_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.RoleEnum, default: enums_1.RoleEnum.USER }),
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.RoleEnum, default: enums_1.RoleEnum.USER }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "carNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserEntity_1 }),
    (0, typeorm_1.ManyToOne)(() => UserEntity_1, (user) => user.clientsAsDeliveryman, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], UserEntity.prototype, "deliverymanAsClient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserEntity_1, (user) => user.deliverymanAsClient, {
        nullable: true,
    }),
    (0, swagger_1.ApiProperty)({ type: UserEntity_1, isArray: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "clientsAsDeliveryman", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.owner),
    (0, swagger_1.ApiProperty)({ type: order_entity_1.OrderEntity, isArray: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "ordersAsClient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.deliveryman),
    (0, swagger_1.ApiProperty)({ type: order_entity_1.OrderEntity, isArray: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "ordersAsDeliveryman", void 0);
UserEntity = UserEntity_1 = __decorate([
    (0, typeorm_1.Entity)("user")
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map