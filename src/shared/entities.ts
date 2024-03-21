import {
  DiscountTypeEnum,
  FileTypesEnum,
  PaymentTypeEnum,
  RoleEnum,
} from "./enums";

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
  phone?: string;
  deliverymanAsClient?: IUser;
  ordersAsClient?: IOrder[]; // owner
  ordersAsDeliveryman?: IOrder[]; // deliveryman
  profileAsClient?: IProfile;
  clientsAsDeliveryman?: IUser[];
}

//

// 15000
// 5000
// 20000

export interface IPaymentHistory extends IBaseModel {
  money: number;
  paymentType: PaymentTypeEnum;
  itog: number;
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
}

export interface IBasket extends IBaseModel {
  product: IProduct;
  discountType: DiscountTypeEnum;
}

export interface IOrder extends IBaseModel {
  amount: number;
  paymentType: PaymentTypeEnum;
  baskets: IBasket[];
  owner: IUser;
  deliveryman: IUser;
  confirmed: boolean;
}

/*
  amount: 20000,
  baskets: [
    {
      product: 1,
      discountType: "standard",
    },
    {
      product: 1,
      discountType: "standard",
    },
  ],
  owner: 2 // clientId
  confirmed: false //avto
*/

/*

*/

export interface IFile extends IBaseModel {
  url: string;
  secure_url: string;
  asset_id: string;
  public_id: string;
  type: FileTypesEnum;
  folder?: string;
}
