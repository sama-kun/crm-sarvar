// import { Entity, Column, OneToMany, JoinColumn } from "typeorm";
// import { ApiProperty } from "@nestjs/swagger";
// import { BaseModel } from "@/common/base/BaseModel";
// import { UserEntity } from "./user.entity";

// @Entity("deliveryman")
// export class DeliverymanEntity extends BaseModel {
//   @OneToMany(() => UserEntity, (user) => user.deliveryman)
//   clients: UserEntity[];

//   @ApiProperty()
//   @Column()
//   debts: number;

//   @ApiProperty()
//   @Column("json")
//   paymentHistory: JSON;
// }
