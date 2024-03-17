import { UserEntity } from "@/database/entities/user.entity";
import { Relation } from "typeorm";
export declare class BaseModel {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: Relation<UserEntity>;
    createdBy?: Relation<UserEntity>;
}
