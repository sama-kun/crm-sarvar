import { BaseService } from "@/common/base/BaseService";
import { OrderEntity } from "@/database/entities/order.entity";
import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { BasketService } from "../basket/basket.service";
import { UserService } from "../users/users.service";
import { RoleEnum } from "@/interfaces/enums";
import { BasketEntity } from "@/database/entities/basket.entity";

// const console = new Logger('UserService');

@Injectable()
export class OrderService extends BaseService<
  OrderEntity,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    @InjectRepository(OrderEntity) protected repo: Repository<OrderEntity>,
    private readonly basketService: BasketService,
    private readonly userService: UserService
  ) {
    super();
  }
  async myCreate(data: OrderEntity, user: UserEntity): Promise<OrderEntity> {
    const owner = await this.userService.findById(Number(data.owner), [
      "deliverymanAsClient",
    ]);
    if (owner.role != RoleEnum.CLIENT) {
      throw Error("Owner is not client");
    }
    const baskets = data.baskets;
    delete data.baskets;
    const order = await this.create(
      { ...data, deliveryman: owner.deliverymanAsClient as UserEntity },
      user
    );
    for (let basket of baskets) {
      await this.basketService.create(
        { ...basket, order } as BasketEntity,
        user
      );
    }

    return this.repo.save(order);
  }
}
