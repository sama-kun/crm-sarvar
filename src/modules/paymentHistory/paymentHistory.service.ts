import { BaseService } from "@/common/base/BaseService";
import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePaymentHistoryDto } from "./dto/create-paymentHistory.dto";
import { UpdatePaymentHistoryDto } from "./dto/update-paymentHistory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { ProfileService } from "../profile/profile.service";
import { PaymentTypeEnum } from "@/interfaces/enums";
import { OrderEntity } from "@/database/entities/order.entity";
import { ProfileEntity } from "@/database/entities/profile.entity";
import { OrderService } from "../order/order.service";
import { Inject, forwardRef } from "@nestjs/common";
// const console = new Logger('UserService');

@Injectable()
export class PaymentHistoryService extends BaseService<
  PaymentHistoryEntity,
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto
> {
  constructor(
    @InjectRepository(PaymentHistoryEntity)
    protected repo: Repository<PaymentHistoryEntity>,
    private readonly profileService: ProfileService, // private readonly orderService: OrderService
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService
  ) {
    super();
  }

  async myCreate(
    data: PaymentHistoryEntity,
    user: UserEntity
  ): Promise<PaymentHistoryEntity> {
    // if (!data.profile) throw new HttpException("Profile dont found", 403);
    console.log(data);
    const payment = await this.create(data, user);
    const history = await this.findById(payment.id, ["order", "profile"]);
    const profile = await this.profileService.findById(history.profile.id, []);
    const order = await this.orderService.findById(history.order.id, [
      "paymentHistories",
    ]);
    let sum = 0;
    // for (let bills of order.paymentHistories) {
    //   sum += bills.money;
    // }
    if (
      data.money === history.order.amount ||
      data.money === history.order.remains
    ) {
      history.paymentType = PaymentTypeEnum.paid;
      await this.orderService.update(user, order.id, {
        paymentType: PaymentTypeEnum.paid,
        remains: 0,
      });
    } else if (data.money < history.order.amount) {
      history.paymentType = PaymentTypeEnum.partly;
      await this.orderService.update(user, order.id, {
        paymentType: PaymentTypeEnum.partly,
        remains: history.order.remains - data.money,
      });
      // await this.orderService.update();
    }
    // if (payment.paymentType === PaymentTypeEnum.paid) {
    await this.profileService.update(user, history.profile.id, {
      debts: profile.debts - history.money,
    });
    // }
    await this.repo.save(history);
    return history;
  }

  async newCreate(data: PaymentHistoryEntity, user: UserEntity): Promise<any> {
    console.log(data);
    const profile = await this.profileService.findById(Number(data.profile), [
      "user",
    ]);
    if (profile.debts == 0) {
      throw new HttpException(
        "this client without debts",
        HttpStatus.FORBIDDEN
      );
    }

    // const payment = await this.create(data, user);
    // const history = await this.findById(payment.id, ["order", "profile"]);

    console.log(profile);

    const orders = await this.orderService.filterForPayment(
      Number(profile.user.id)
    );
    // return orders;
    let money = data.money;
    let i = 0;
    let res = [];
    let payRes = [];
    while (money != 0) {
      const order = orders[i];
      if (order.remains <= money) {
        const updated = await this.orderService.update(user, Number(order.id), {
          paymentType: PaymentTypeEnum.paid,
          remains: 0,
        });
        res.push(updated);
        money -= order.remains;
        const payment = await this.create({
          money: order.remains,
          order: { id: order.id } as OrderEntity,
          paymentType: PaymentTypeEnum.paid,
          profile: { id: profile.id } as ProfileEntity,
        });
        payRes.push(payment);
        console.log(money);
      } else if (order.remains > money) {
        const updated = await this.orderService.update(user, Number(order.id), {
          paymentType: PaymentTypeEnum.partly,
          remains: order.remains - money,
        });
        res.push(updated);
        const payment = await this.create({
          money: money,
          order: { id: order.id } as OrderEntity,
          paymentType: PaymentTypeEnum.partly,
          profile: { id: profile.id } as ProfileEntity,
        });
        money = 0;
        payRes.push(payment);
        console.log(money);
      }
      i++;
    }
    console.log(orders);

    const updatedProfile = await this.profileService.update(user, profile.id, {
      debts: profile.debts - data.money,
    });

    return {
      res,
      payRes,
      updatedProfile,
    };
  }

  async orderDebt(data: any, user?: UserEntity): Promise<PaymentHistoryEntity> {
    if (!data.profile) throw new HttpException("Profile dont found", 403);
    const payment = await this.create(data as PaymentHistoryEntity, user);
    console.log("payment.profile.id", payment);
    const profile = await this.profileService.findById(
      Number(data.profile),
      []
    );
    const newProfile = await this.profileService.update(
      user,
      Number(profile.id),
      {
        debts: profile.debts + payment.money,
      }
    );
    console.log("newProfile", newProfile);
    return payment;
  }

  async updateProfile(user: UserEntity, id: number, data: any): Promise<any> {
    const payment = await this.findById(id, []);
    const newPayment = await this.update(user, id, {
      money: data.money,
    });
    const profile = await this.profileService.findById(
      Number(data.profile),
      []
    );
    await this.profileService.update(user, Number(profile.id), {
      debts:
        Number(profile.debts) -
        Number(payment.money) +
        Number(newPayment.money),
    });
    return newPayment;
  }

  async myDelete(user: UserEntity, id: number, data: any): Promise<any> {
    const payment = await this.findById(id, []);
    await this.delete(user, id);
    const profile = await this.profileService.findById(
      Number(data.profile),
      []
    );
    await this.profileService.update(user, Number(profile.id), {
      debts: Number(profile.debts) - Number(payment.money),
    });
    return payment;
  }
}
