"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBasketDto = void 0;
const basket_entity_1 = require("../../../database/entities/basket.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateBasketDto extends (0, swagger_1.PartialType)(basket_entity_1.BasketEntity) {
}
exports.CreateBasketDto = CreateBasketDto;
//# sourceMappingURL=create-basket.dto.js.map