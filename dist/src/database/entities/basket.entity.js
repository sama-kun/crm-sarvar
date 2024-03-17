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
exports.BasketEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const BaseModel_1 = require("../../common/base/BaseModel");
const product_entity_1 = require("./product.entity");
const order_entity_1 = require("./order.entity");
let BasketEntity = class BasketEntity extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity),
    (0, swagger_1.ApiProperty)({ type: product_entity_1.ProductEntity }),
    __metadata("design:type", product_entity_1.ProductEntity)
], BasketEntity.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BasketEntity.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)("float", { nullable: true }),
    __metadata("design:type", Number)
], BasketEntity.prototype, "summa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity, (order) => order.baskets, { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: order_entity_1.OrderEntity }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], BasketEntity.prototype, "order", void 0);
BasketEntity = __decorate([
    (0, typeorm_1.Entity)("basket")
], BasketEntity);
exports.BasketEntity = BasketEntity;
//# sourceMappingURL=basket.entity.js.map