"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const file_entity_1 = require("../../../database/entities/file.entity");
class UpdateFileDto extends (0, swagger_1.PartialType)(file_entity_1.FileEntity) {
}
exports.UpdateFileDto = UpdateFileDto;
//# sourceMappingURL=update-file.dto.js.map