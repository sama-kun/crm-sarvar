import { BaseService } from "@/common/base/BaseService";
import { OrderEntity } from "@/database/entities/Order.entity";
import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { BasketService } from "../basket/basket.service";
import { UserService } from "../users/users.service";
import { RoleEnum } from "@/interfaces/enums";

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
    const owner = await this.userService.findById(Number(data.owner), []);
    const deliveryman = await this.userService.findById(
      Number(data.deliveryman),
      []
    );
    if (owner.role != RoleEnum.CLIENT) {
      throw Error("Owner is not client");
    }
    if (deliveryman.role != RoleEnum.DELIVERYMAN) {
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
        order: { id: Number(order.id) } as OrderEntity,
      });
    }
    console.log(data);
    order.amount = amount;

    return this.repo.save(order);
  }
}
