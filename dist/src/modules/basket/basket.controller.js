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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketController = void 0;
const common_1 = require("@nestjs/common");
const basket_service_1 = require("./basket.service");
const BaseController_1 = require("../../common/base/BaseController");
const update_basket_dto_1 = require("./dto/update-basket.dto");
const basket_entity_1 = require("../../database/entities/basket.entity");
const user_entity_1 = require("../../database/entities/user.entity");
const search_basket_dto_1 = require("./dto/search-basket.dto");
const auth_user_decorator_1 = require("../../common/decorators/auth-user.decorator");
const roles_quard_1 = require("../../common/guards/roles.quard");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../interfaces/enums");
const roles_auth_decorator_1 = require("../../common/decorators/roles-auth.decorator");
const product_service_1 = require("../product/product.service");
let BasketController = class BasketController extends BaseController_1.BaseController {
    constructor(BasketService, productService) {
        super();
        this.BasketService = BasketService;
        this.productService = productService;
        this.dataService = BasketService;
    }
    async create(data, user) {
        const product = await this.productService.findById(Number(data.product), []);
        data.summa = product[product.discountType] * data.quantity;
        return this.dataService.create(data, user);
    }
    update(user, id, updateBasketDto) {
        return this.dataService.update(user, id, updateBasketDto);
    }
    async findAll(query) {
        const { pagination, sort, relations, filter, search } = query;
        return this.dataService.findAll(pagination, sort, relations, filter, search);
    }
    async getOne(id, query) {
        const { relations } = query;
        return this.dataService.findById(id, relations);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create Category" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: basket_entity_1.BasketEntity,
        description: "Basket created successfully",
    }),
    (0, swagger_1.ApiBody)({ type: basket_entity_1.BasketEntity }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basket_entity_1.BasketEntity, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update Basket" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: basket_entity_1.BasketEntity,
        description: "Basket updated successfully",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Basket ID" }),
    (0, swagger_1.ApiBody)({ type: basket_entity_1.BasketEntity }),
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, update_basket_dto_1.UpdateBasketDto]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get all Baskets using query" }),
    (0, swagger_1.ApiQuery)({ type: search_basket_dto_1.SearchBasketDto }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_basket_dto_1.SearchBasketDto]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: "id", description: "Basket ID" }),
    (0, swagger_1.ApiOperation)({ summary: "Get Basket by id" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: basket_entity_1.BasketEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: "relations", required: false, type: Array }),
    (0, common_1.UseGuards)(roles_quard_1.RolesQuard),
    (0, roles_auth_decorator_1.Roles)(enums_1.RoleEnum.ROOT),
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, search_basket_dto_1.SearchBasketDto]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "getOne", null);
BasketController = __decorate([
    (0, swagger_1.ApiTags)("Basket"),
    (0, common_1.Controller)("Basket"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [basket_service_1.BasketService,
        product_service_1.ProductService])
], BasketController);
exports.BasketController = BasketController;
//# sourceMappingURL=basket.controller.js.map