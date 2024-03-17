import { Entity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "@/common/base/BaseModel";
import { FileTypesEnum } from "@/interfaces/enums";

@Entity("file")
export class FileEntity extends BaseModel {
  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column()
  secure_url: string;

  @ApiProperty()
  @Column()
  asset_id: string;

  @ApiProperty()
  @Column()
  public_id: string;

  @ApiProperty({
    type: "enum",
    enum: FileTypesEnum,
    default: FileTypesEnum.IMAGE,
  })
  @Column({ type: "enum", enum: FileTypesEnum, default: FileTypesEnum.IMAGE })
  type: FileTypesEnum;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  folder?: string;
}
