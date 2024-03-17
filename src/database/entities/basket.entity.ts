import { Entity, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "@/common/base/BaseModel";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";

@Entity("basket")
export class BasketEntity extends BaseModel {
  @ManyToOne(() => ProductEntity)
  @ApiProperty({ type: ProductEntity })
  product: ProductEntity;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column("float", { nullable: true })
  summa: number;

  @ManyToOne(() => OrderEntity, (order) => order.baskets, { nullable: true })
  @ApiProperty({ type: OrderEntity })
  @JoinColumn()
  order: Relation<OrderEntity>;
}
