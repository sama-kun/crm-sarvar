import { RoleEnum } from "@/interfaces/enums";
import { BaseModel } from "@/common/base/BaseModel";
import { IUser } from "@/interfaces/entities";
import { OrderEntity } from "./order.entity";
export declare class UserEntity extends BaseModel implements IUser {
    username: string;
    password?: string;
    role: RoleEnum;
    name?: string;
    address?: string;
    carNumber?: string;
    deliverymanAsClient?: IUser;
    clientsAsDeliveryman?: IUser[];
    ordersAsClient: OrderEntity[];
    ordersAsDeliveryman: OrderEntity[];
}
