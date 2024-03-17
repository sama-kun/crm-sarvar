"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../database/entities/user.entity");
const search_query_dto_1 = require("../../../common/base/dto/search-query.dto");
class SearchUserDto extends (0, swagger_1.PartialType)((0, swagger_1.IntersectionType)(user_entity_1.UserEntity, search_query_dto_1.SearchQueryDto)) {
}
exports.SearchUserDto = SearchUserDto;
//# sourceMappingURL=search-user.dto.js.map