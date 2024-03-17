"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const user_entity_1 = require("../../../database/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto extends (0, swagger_1.PartialType)(user_entity_1.UserEntity) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map