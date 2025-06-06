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
  profile?: IProfile;
}

// 15000
// 5000
// 20000

export interface IPaymentHistory extends IBaseModel {
  money: number;
  paymentType: PaymentTypeEnum;
  order: IOrder;
  profile: IProfile;
}

export interface IProfile extends IBaseModel {
  debts: number;
  paymentHistories: IPaymentHistory[];
  user?: IUser;
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
  order?: IOrder;
  quantity: number;
  summa?: number;
}

export interface IOrder extends IBaseModel {
  amount: number;
  paymentType: PaymentTypeEnum;
  baskets?: IBasket[];
  owner: IUser;
  deliveryman: IUser;
  paymentHistories: IPaymentHistory[];
  remains: number;
  confirmed: boolean;
}

export interface IFile extends IBaseModel {
  url: string;
  secure_url: string;
  asset_id: string;
  public_id: string;
  type: FileTypesEnum;
  folder?: string;
}
