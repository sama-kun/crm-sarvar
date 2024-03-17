import { OrderService } from "./order.service";
import { BaseController } from "@/common/base/BaseController";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderEntity } from "@/database/entities/Order.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchOrderDto } from "./dto/search-order.dto";
import { BasketService } from "../basket/basket.service";
export declare class OrderController extends BaseController<OrderEntity, CreateOrderDto, UpdateOrderDto, SearchOrderDto, OrderService> {
    private OrderService;
    private readonly basketService;
    constructor(OrderService: OrderService, basketService: BasketService);
    create(data: OrderEntity, user: UserEntity): Promise<OrderEntity>;
    update(user: UserEntity, id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    findAll(query: SearchOrderDto): Promise<any>;
    getOne(id: number, query: SearchOrderDto): Promise<OrderEntity>;
}
