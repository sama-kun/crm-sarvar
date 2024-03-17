import { PartialType } from "@nestjs/swagger";
import { FileEntity } from "@/database/entities/file.entity";

export class UpdateFileDto extends PartialType(FileEntity) {}
