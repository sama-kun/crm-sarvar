import { BaseModel } from "@/common/base/BaseModel";
import { FileEntity } from "./file.entity";
import { DiscountTypeEnum } from "@/interfaces/enums";
export declare class ProductEntity extends BaseModel {
    image: FileEntity;
    name: string;
    standard: number;
    discount1?: number;
    discount2?: number;
    discountType: DiscountTypeEnum;
}
