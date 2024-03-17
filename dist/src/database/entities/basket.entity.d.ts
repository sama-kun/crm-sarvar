import { Relation } from "typeorm";
import { BaseModel } from "@/common/base/BaseModel";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";
export declare class BasketEntity extends BaseModel {
    product: ProductEntity;
    quantity: number;
    summa: number;
    order: Relation<OrderEntity>;
}
