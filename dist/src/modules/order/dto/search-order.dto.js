"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_entity_1 = require("../../../database/entities/order.entity");
const search_query_dto_1 = require("../../../common/base/dto/search-query.dto");
class SearchOrderDto extends (0, swagger_1.PartialType)((0, swagger_1.IntersectionType)(order_entity_1.OrderEntity, search_query_dto_1.SearchQueryDto)) {
}
exports.SearchOrderDto = SearchOrderDto;
//# sourceMappingURL=search-order.dto.js.map