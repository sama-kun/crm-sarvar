"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const product_entity_1 = require("../../../database/entities/product.entity");
const search_query_dto_1 = require("../../../common/base/dto/search-query.dto");
class SearchProductDto extends (0, swagger_1.PartialType)((0, swagger_1.IntersectionType)(product_entity_1.ProductEntity, search_query_dto_1.SearchQueryDto)) {
}
exports.SearchProductDto = SearchProductDto;
//# sourceMappingURL=search-product.dto.js.map