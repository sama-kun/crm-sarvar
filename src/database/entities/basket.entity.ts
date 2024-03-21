import { Entity, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "@/common/base/BaseModel";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";
import { DiscountTypeEnum } from "../../shared/enums";

@Entity("basket")
export class BasketEntity extends BaseModel {
  @ManyToOne(() => ProductEntity)
  @ApiProperty({ type: ProductEntity })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.baskets, { nullable: true })
  @ApiProperty({ type: OrderEntity })
  @JoinColumn()
  order: Relation<OrderEntity>;

  @ApiProperty({ enum: DiscountTypeEnum, default: DiscountTypeEnum.standard })
  @Column({
    type: "enum",
    enum: DiscountTypeEnum,
    default: DiscountTypeEnum.standard,
  })
  discountType: DiscountTypeEnum;
}
