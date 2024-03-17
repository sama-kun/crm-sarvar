import { Relation } from "typeorm";
import { BaseModel } from "@/common/base/BaseModel";
import { BasketEntity } from "./basket.entity";
import { UserEntity } from "./user.entity";
import { PaymentTypeEnum } from "@/interfaces/enums";
export declare class OrderEntity extends BaseModel {
    amount: number;
    paymentType: PaymentTypeEnum;
    baskets: BasketEntity[];
    owner: Relation<UserEntity>;
    deliveryman: Relation<UserEntity>;
}
