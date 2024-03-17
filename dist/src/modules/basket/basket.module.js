"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketModule = void 0;
const common_1 = require("@nestjs/common");
const basket_controller_1 = require("./basket.controller");
const basket_service_1 = require("./basket.service");
const typeorm_1 = require("@nestjs/typeorm");
const basket_entity_1 = require("../../database/entities/basket.entity");
const auth_module_1 = require("../auth/auth.module");
const product_module_1 = require("../product/product.module");
let BasketModule = class BasketModule {
};
BasketModule = __decorate([
    (0, common_1.Module)({
        controllers: [basket_controller_1.BasketController],
        providers: [basket_service_1.BasketService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([basket_entity_1.BasketEntity]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            product_module_1.ProductModule,
        ],
        exports: [basket_service_1.BasketService],
    })
], BasketModule);
exports.BasketModule = BasketModule;
//# sourceMappingURL=basket.module.js.map