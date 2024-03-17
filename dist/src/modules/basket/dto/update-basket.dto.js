"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBasketDto = void 0;
const create_basket_dto_1 = require("./create-basket.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateBasketDto extends (0, swagger_1.PartialType)(create_basket_dto_1.CreateBasketDto) {
}
exports.UpdateBasketDto = UpdateBasketDto;
//# sourceMappingURL=update-basket.dto.js.map