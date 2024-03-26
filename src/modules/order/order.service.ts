import { BaseService } from "@/common/base/BaseService";
import { OrderEntity } from "@/database/entities/order.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { BasketService } from "../basket/basket.service";
import { UserService } from "../users/users.service";
import { PaymentTypeEnum, RoleEnum } from "@/interfaces/enums";
import { BasketEntity } from "@/database/entities/basket.entity";
import { PaymentHistoryService } from "../paymentHistory/paymentHistory.service";
import { ProfileEntity } from "@/database/entities/profile.entity";
import { ProfileService } from "../profile/profile.service";
import { UpdateBasketDto } from "../basket/dto/update-basket.dto";
import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { profile } from "console";

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
    private readonly userService: UserService,
    private readonly paymentHistoryService: PaymentHistoryService // private readonly profile: ProfileService
  ) {
    super();
  }
  async myCreate(data: OrderEntity, user: UserEntity): Promise<OrderEntity> {
    console.log(data);
    const owner = await this.userService.findById(Number(data.owner), [
      "deliverymanAsClient",
      "profile",
    ]);
    if (owner.role != RoleEnum.CLIENT) {
      throw Error("Owner is not client");
    }
    const baskets = data.baskets;
    data.remains = data.amount;
    delete data.baskets;
    const order = await this.create(
      { ...data, deliveryman: owner.deliverymanAsClient as UserEntity },
      user
    );
    for (let basket of baskets) {
      await this.basketService.myCreate(
        { ...basket, order } as BasketEntity,
        user
      );
    }

    let profile: any = {};
    // if (!owner.profile) {
    //   profile = await this.profile.create({
    //     debts: 0,
    //     user: { id: owner.id } as UserEntity,
    //   });
    // } else profile = owner.profile;
    profile = owner.profile;

    console.log("profile", profile.id);
    console.log("owner", owner);
    console.log("order", order);

    await this.paymentHistoryService.orderDebt({
      money: order.amount,
      paymentType: PaymentTypeEnum.debt,
      order: Number(order.id),
      profile: Number(profile.id),
    });

    return this.repo.save(order);
  }

  async amountUpdate(
    user: UserEntity,
    id: number,
    data: UpdateOrderDto
  ): Promise<OrderEntity> {
    const order = await this.findById(id, ["owner", "paymentHistories"]);
    // if (order.confirmed) {
    //   throw new HttpException(
    //     "You cannot update the confirmed order",
    //     HttpStatus.FORBIDDEN
    //   );
    // }

    const paymentId = order.paymentHistories.filter(
      (value: PaymentHistoryEntity, index: any) =>
        value.paymentType === PaymentTypeEnum.debt
    )[0].id;
    console.log(paymentId);
    const owner = await this.userService.findById(Number(order.owner.id), [
      "deliverymanAsClient",
      "profile",
    ]);

    let profile: any = {};
    // if (!owner.profile) {
    //   profile = await this.profile.create({
    //     debts: 0,
    //     user: { id: owner.id } as UserEntity,
    //   });
    // } else profile = owner.profile;
    profile = owner.profile;

    // console.log("profile", profile.id);
    // console.log("owner", owner);
    // console.log("order", order);

    const test = await this.paymentHistoryService.updateProfile(
      user,
      paymentId,
      {
        money: data.amount,
        profile: profile.id,
      }
    );

    order.amount = data.amount;
    order.remains = data.amount;
    return this.repo.save(order);
  }

  async myDelete(user: UserEntity, id: number) {
    const candidate = await this.findById(id, [
      "owner.profile",
      "baskets",
      "paymentHistories",
    ]);

    for (let basket of candidate.baskets) {
      await this.basketService.delete(user, basket.id);
    }

    await this.paymentHistoryService.myDelete(
      user,
      candidate.paymentHistories[0].id,
      {
        profile: candidate.owner.profile.id,
      }
    );
    return await this.delete(user, id);
  }
}
