import { UserEntity } from "@/database/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Relation,
} from "typeorm";

@Entity()
export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;

  @ManyToOne("UserEntity")
  @JoinColumn()
  updatedBy?: Relation<UserEntity>;

  @ManyToOne("UserEntity")
  @JoinColumn()
  createdBy?: Relation<UserEntity>;
}
