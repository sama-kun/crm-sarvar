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
import { IOrder, IPaymentHistory } from "@/interfaces/entities";
import { OrderEntity } from "./order.entity";
import { ProfileEntity } from "./profile.entity";

@Entity("paymentHistory")
export class PaymentHistoryEntity extends BaseModel implements IPaymentHistory {
  @Column()
  money: number;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: PaymentTypeEnum,
    default: PaymentTypeEnum.debt,
  })
  paymentType: PaymentTypeEnum;

  @ManyToOne(() => OrderEntity, (order) => order.paymentHistories, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order: Relation<OrderEntity>;

  @ManyToOne(() => ProfileEntity, (profile) => profile.paymentHistories, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  profile: Relation<ProfileEntity>;
}
