"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const order_entity_1 = require("../../../database/entities/order.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateOrderDto extends (0, swagger_1.PartialType)(order_entity_1.OrderEntity) {
}
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map