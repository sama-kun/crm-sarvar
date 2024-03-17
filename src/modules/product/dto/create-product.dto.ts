import { ProductEntity } from "@/database/entities/product.entity";
import { PartialType } from "@nestjs/swagger";

export class CreateProductDto extends PartialType(ProductEntity) {}
