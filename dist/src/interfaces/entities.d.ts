import { DiscountTypeEnum, FileTypesEnum, PaymentTypeEnum, RoleEnum } from "./enums";
export interface IBaseModel {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: IUser;
    updatedBy?: IUser;
}
export interface IUser extends IBaseModel {
    username: string;
    password?: string;
    role: RoleEnum;
    name?: string;
    address?: string;
    carNumber?: string;
    deliverymanAsClient?: IUser;
    ordersAsClient?: IOrder[];
    ordersAsDeliveryman?: IOrder[];
    profileAsClient?: IProfile;
    clientsAsDeliveryman?: IUser[];
}
export interface IPaymentHistory extends IBaseModel {
    money: number;
    paymentType: PaymentTypeEnum;
}
export interface IProfile extends IBaseModel {
    debts: number;
    paymentHistory: IPaymentHistory;
}
export interface IProduct extends IBaseModel {
    image: IFile;
    name: string;
    standard: number;
    discount1?: number;
    discount2?: number;
    discountType: DiscountTypeEnum;
}
export interface IBasket extends IBaseModel {
    product: IProduct;
    quantity: number;
    summa: number;
}
export interface IOrder extends IBaseModel {
    amount: number;
    paymentType: PaymentTypeEnum;
    baskets: IBasket[];
    owner: IUser;
    deliveryman: IUser;
}
export interface IFile extends IBaseModel {
    url: string;
    secure_url: string;
    asset_id: string;
    public_id: string;
    type: FileTypesEnum;
    folder?: string;
}
