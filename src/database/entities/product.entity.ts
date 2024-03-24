import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "@/common/base/BaseModel";
import { FileEntity } from "./file.entity"; // Assuming you have this entity
import { DiscountTypeEnum } from "@/interfaces/enums";

@Entity("product")
export class ProductEntity extends BaseModel {
  @ApiProperty({ type: FileEntity })
  @ManyToOne(() => FileEntity, { onDelete: "CASCADE" })
  @JoinColumn()
  image: FileEntity;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column("float")
  standard: number;

  @ApiProperty({ required: false })
  @Column("float", { nullable: true })
  discount1?: number;

  @ApiProperty({ required: false })
  @Column("float", { nullable: true })
  discount2?: number;
}
