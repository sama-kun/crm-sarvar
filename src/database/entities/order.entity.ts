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

@Entity("order")
export class OrderEntity extends BaseModel {
  @ApiProperty()
  @Column("float", { nullable: true })
  amount: number;

  @ApiProperty()
  @Column({ type: "enum", enum: PaymentTypeEnum })
  paymentType: PaymentTypeEnum;

  @ApiProperty()
  @OneToMany(() => BasketEntity, (basket) => basket.order)
  baskets: BasketEntity[];

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.ordersAsClient)
  @JoinColumn()
  owner: Relation<UserEntity>;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.ordersAsDeliveryman)
  @JoinColumn()
  deliveryman: Relation<UserEntity>;
}
