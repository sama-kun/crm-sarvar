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
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const BaseModel_1 = require("../../common/base/BaseModel");
const file_entity_1 = require("./file.entity");
const enums_1 = require("../../interfaces/enums");
let ProductEntity = class ProductEntity extends BaseModel_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: file_entity_1.FileEntity }),
    (0, typeorm_1.ManyToOne)(() => file_entity_1.FileEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", file_entity_1.FileEntity)
], ProductEntity.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], ProductEntity.prototype, "standard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, typeorm_1.Column)("float", { nullable: true }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "discount1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, typeorm_1.Column)("float", { nullable: true }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "discount2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "enum",
        enum: enums_1.DiscountTypeEnum,
        default: enums_1.DiscountTypeEnum.standard,
    }),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.DiscountTypeEnum,
        default: enums_1.DiscountTypeEnum.standard,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "discountType", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)("product")
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map