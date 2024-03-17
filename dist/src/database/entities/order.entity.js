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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const BaseModel_1 = require("../../common/base/BaseModel");
const basket_entity_1 = require("./basket.entity");
const user_entity_1 = require("./user.entity");
const enums_1 = require("../../interfaces/enums");
let OrderEntity = class OrderEntity extends BaseModel_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)("float", { nullable: true }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.PaymentTypeEnum }),
    __metadata("design:type", String)
], OrderEntity.prototype, "paymentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => basket_entity_1.BasketEntity, (basket) => basket.order),
    __metadata("design:type", Array)
], OrderEntity.prototype, "baskets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_entity_1.UserEntity }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.ordersAsClient),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrderEntity.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.ordersAsDeliveryman),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrderEntity.prototype, "deliveryman", void 0);
OrderEntity = __decorate([
    (0, typeorm_1.Entity)("order")
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map