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
    private readonly profileService: ProfileService
  ) {
    super();
  }

  async myCreate(
    data: PaymentHistoryEntity,
    user: UserEntity
  ): Promise<PaymentHistoryEntity> {
    if (!data.profile) throw new HttpException("Profile dont found", 403);

    const payment = await this.create(data, user);
    const history = await this.findById(payment.id, ["order"]);
    const profile = await this.profileService.findById(payment.profile.id, []);
    if (data.money === history.order.amount) {
      payment.paymentType = PaymentTypeEnum.paid;
    } else if (data.money < history.order.amount) {
      payment.paymentType = PaymentTypeEnum.partly;
    }
    // if (payment.paymentType === PaymentTypeEnum.paid) {
    await this.profileService.update(user, payment.profile.id, {
      debts: profile.debts - history.money,
    });
    // }
    return history;
  }

  async orderDebt(
    data: {
      money: number;
      paymentType: PaymentTypeEnum;
      orderId: number;
      profileId: number;
    },
    user: UserEntity
  ): Promise<PaymentHistoryEntity> {
    if (!data.profileId) throw new HttpException("Profile dont found", 403);

    const payment = await this.create(data, user);
    const profile = await this.profileService.findById(payment.profile.id, []);
    await this.profileService.update(user, payment.profile.id, {
      debts: profile.debts + payment.money,
    });
    return payment;
  }
}
