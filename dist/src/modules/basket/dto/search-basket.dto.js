"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBasketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const basket_entity_1 = require("../../../database/entities/basket.entity");
const search_query_dto_1 = require("../../../common/base/dto/search-query.dto");
class SearchBasketDto extends (0, swagger_1.PartialType)((0, swagger_1.IntersectionType)(basket_entity_1.BasketEntity, search_query_dto_1.SearchQueryDto)) {
}
exports.SearchBasketDto = SearchBasketDto;
//# sourceMappingURL=search-basket.dto.js.map