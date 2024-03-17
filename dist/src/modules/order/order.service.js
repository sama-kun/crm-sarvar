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
exports.OrderService = void 0;
const BaseService_1 = require("../../common/base/BaseService");
const Order_entity_1 = require("../../database/entities/Order.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const basket_service_1 = require("../basket/basket.service");
const users_service_1 = require("../users/users.service");
const enums_1 = require("../../interfaces/enums");
let OrderService = class OrderService extends BaseService_1.BaseService {
    constructor(repo, basketService, userService) {
        super();
        this.repo = repo;
        this.basketService = basketService;
        this.userService = userService;
    }
    async myCreate(data, user) {
        const owner = await this.userService.findById(Number(data.owner), []);
        const deliveryman = await this.userService.findById(Number(data.deliveryman), []);
        if (owner.role != enums_1.RoleEnum.CLIENT) {
            throw Error("Owner is not client");
        }
        if (deliveryman.role != enums_1.RoleEnum.DELIVERYMAN) {
            throw Error("Deliveryman is not deliveryman");
        }
        const baskets = data.baskets;
        let amount = 0;
        delete data.baskets;
        const order = await this.create(data, user);
        for (let basketId of baskets) {
            const basket = await this.basketService.findById(Number(basketId), []);
            amount += basket.summa;
            await this.basketService.update(user, Number(basketId), {
                order: { id: Number(order.id) },
            });
        }
        console.log(data);
        order.amount = amount;
        return this.repo.save(order);
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        basket_service_1.BasketService,
        users_service_1.UserService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map