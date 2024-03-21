import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  Relation,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "@/common/base/BaseModel";
import { BasketEntity } from "./basket.entity";
import { UserEntity } from "./user.entity";
import { PaymentTypeEnum } from "@/interfaces/enums";
import { IOrder, IPaymentHistory, IProfile } from "@/interfaces/entities";
import { OrderEntity } from "./order.entity";
import { PaymentHistoryEntity } from "./paymentHistory.entity";

@Entity("profile")
export class ProfileEntity extends BaseModel implements IProfile {
  @Column()
  debts: number;

  @OneToMany(
    () => PaymentHistoryEntity,
    (paymentHistory) => paymentHistory.profile
  )
  paymentHistories: PaymentHistoryEntity[];
}
