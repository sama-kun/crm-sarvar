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
import { PaymentHistoryEntity } from "./paymentHistory.entity";
import { IOrder } from "@/interfaces/entities";

@Entity("order")
export class OrderEntity extends BaseModel implements IOrder {
  @ApiProperty()
  @Column("float", { nullable: true })
  amount: number;

  @ApiProperty()
  @Column("float", { nullable: true })
  remains: number;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: PaymentTypeEnum,
    default: PaymentTypeEnum.debt,
  })
  paymentType: PaymentTypeEnum;

  @ApiProperty()
  @OneToMany(() => BasketEntity, (basket) => basket.order, {
    nullable: true,
    onDelete: "CASCADE",
  })
  baskets?: BasketEntity[];

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.ordersAsClient, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  owner: Relation<UserEntity>;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.ordersAsDeliveryman, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  deliveryman: Relation<UserEntity>;

  @OneToMany(
    () => PaymentHistoryEntity,
    (paymentHistory) => paymentHistory.order,
    { onDelete: "CASCADE" }
  )
  paymentHistories: PaymentHistoryEntity[];

  @Column({ type: "boolean", default: false })
  confirmed: boolean;
}
