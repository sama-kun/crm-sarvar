"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const product_entity_1 = require("../../../database/entities/product.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateProductDto extends (0, swagger_1.PartialType)(product_entity_1.ProductEntity) {
}
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map