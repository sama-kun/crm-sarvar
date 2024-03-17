"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesQuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const roles_auth_decorator_1 = require("../decorators/roles-auth.decorator");
const enums_1 = require("../../interfaces/enums");
const console = new common_1.Logger('RolesQuard');
let RolesQuard = class RolesQuard {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        try {
            const requiredRoles = this.reflector.get(roles_auth_decorator_1.ROLES_KEY, context.getHandler());
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' && !token) {
                throw new common_1.UnauthorizedException({ message: "User don't authorized" });
            }
            const user = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET_KEY,
            });
            req.user = user;
            if (user.role === enums_1.RoleEnum.ROOT)
                return true;
            return requiredRoles.includes(user.role);
        }
        catch (error) {
            throw new common_1.HttpException('Method Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
RolesQuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, core_1.Reflector])
], RolesQuard);
exports.RolesQuard = RolesQuard;
//# sourceMappingURL=roles.quard.js.map