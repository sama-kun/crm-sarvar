import { BaseService } from "@/common/base/BaseService";
import { OrderEntity } from "@/database/entities/Order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Repository } from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { BasketService } from "../basket/basket.service";
import { UserService } from "../users/users.service";
export declare class OrderService extends BaseService<OrderEntity, CreateOrderDto, UpdateOrderDto> {
    protected repo: Repository<OrderEntity>;
    private readonly basketService;
    private readonly userService;
    constructor(repo: Repository<OrderEntity>, basketService: BasketService, userService: UserService);
    myCreate(data: OrderEntity, user: UserEntity): Promise<OrderEntity>;
}
