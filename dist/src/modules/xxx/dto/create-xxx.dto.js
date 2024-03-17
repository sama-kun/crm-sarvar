"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateXxxDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const xxx_entity_1 = require("@/database/entities/xxx.entity");
class CreateXxxDto extends (0, swagger_1.PartialType)(xxx_entity_1.XxxEntity) {
}
exports.CreateXxxDto = CreateXxxDto;
//# sourceMappingURL=create-xxx.dto.js.map