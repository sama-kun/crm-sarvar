"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthUser = (0, common_1.createParamDecorator)((data, context) => {
    var _a;
    return ((_a = context.switchToHttp().getRequest()) === null || _a === void 0 ? void 0 : _a.user) || undefined;
});
//# sourceMappingURL=auth-user.decorator.js.map