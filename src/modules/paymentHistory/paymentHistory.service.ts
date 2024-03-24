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
    private readonly profileService: ProfileService // private readonly orderService: OrderService
  ) {
    super();
  }

  async myCreate(
    data: PaymentHistoryEntity,
    user: UserEntity
  ): Promise<PaymentHistoryEntity> {
    if (!data.profile) throw new HttpException("Profile dont found", 403);

    const payment = await this.create(data, user);
    const history = await this.findById(payment.id, ["order", "profile"]);
    const profile = await this.profileService.findById(history.profile.id, []);
    if (data.money === history.order.amount) {
      history.paymentType = PaymentTypeEnum.paid;
    } else if (data.money < history.order.amount) {
      history.paymentType = PaymentTypeEnum.partly;
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
}
