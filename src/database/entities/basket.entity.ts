import { Entity, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "@/common/base/BaseModel";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";
import { DiscountTypeEnum } from "../../shared/enums";
import { IBasket } from "@/interfaces/entities";

@Entity("basket")
export class BasketEntity extends BaseModel implements IBasket {
  @ManyToOne(() => ProductEntity, { onDelete: "CASCADE" })
  @ApiProperty({ type: ProductEntity })
  product: Relation<ProductEntity>;

  @ManyToOne(() => OrderEntity, (order) => order.baskets, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @ApiProperty({ type: OrderEntity })
  @JoinColumn()
  order?: Relation<OrderEntity>;

  @ApiProperty({ enum: DiscountTypeEnum, default: DiscountTypeEnum.standard })
  @Column({
    type: "enum",
    enum: DiscountTypeEnum,
    default: DiscountTypeEnum.standard,
  })
  discountType: DiscountTypeEnum;

  @Column()
  @ApiProperty()
  quantity: number;

  @Column()
  @ApiProperty()
  summa?: number;
}
