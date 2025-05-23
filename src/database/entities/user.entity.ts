import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { RoleEnum } from "@/interfaces/enums";
import { BaseModel } from "@/common/base/BaseModel";
import { IProfile, IUser } from "@/interfaces/entities";
import { OrderEntity } from "./order.entity";
import { ProfileEntity } from "./profile.entity";

@Entity("user")
export class UserEntity extends BaseModel implements IUser {
  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ nullable: true })
  password?: string;

  @ApiProperty({ enum: RoleEnum, default: RoleEnum.USER })
  @Column({ type: "enum", enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  name?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  address?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  carNumber?: string;

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.clientsAsDeliveryman, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  deliverymanAsClient?: IUser; // Adjusting the type to IUser

  @OneToMany(() => UserEntity, (user) => user.deliverymanAsClient, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @ApiProperty({ type: UserEntity, isArray: true })
  clientsAsDeliveryman?: IUser[]; // Adjusting the type to IUser[]

  @OneToMany(() => OrderEntity, (order) => order.owner, { onDelete: "CASCADE" })
  @ApiProperty({ type: OrderEntity, isArray: true })
  ordersAsClient: OrderEntity[]; // Adjusting the type to IOrder[]

  @OneToMany(() => OrderEntity, (order) => order.deliveryman, {
    onDelete: "CASCADE",
  })
  @ApiProperty({ type: OrderEntity, isArray: true })
  ordersAsDeliveryman: OrderEntity[];

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  phone?: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  profile?: ProfileEntity;
}
