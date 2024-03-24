import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  Relation,
  OneToOne,
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
    (paymentHistory) => paymentHistory.profile,
    { onDelete: "CASCADE" }
  )
  paymentHistories: PaymentHistoryEntity[];

  @OneToOne(() => UserEntity, (user) => user.profile, {
    nullable: true,
    onDelete: "CASCADE",
  }) // Specify inverse side as a second parameter
  @JoinColumn()
  user?: Relation<UserEntity>;
}
