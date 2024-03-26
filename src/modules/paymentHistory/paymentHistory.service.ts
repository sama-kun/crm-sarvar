import { BaseService } from "@/common/base/BaseService";
import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { HttpException, Injectable } from "@nestjs/common";
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
      await this.orderService.update(user, history.order.id, {
        paymentType: PaymentTypeEnum.paid,
        remains: 0,
      });
    } else if (data.money < history.order.amount) {
      history.paymentType = PaymentTypeEnum.partly;
      await this.orderService.update(user, history.order.id, {
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
