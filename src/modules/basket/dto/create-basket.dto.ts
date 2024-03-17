import { BasketEntity } from "@/database/entities/basket.entity";
import { PartialType } from "@nestjs/swagger";

export class CreateBasketDto extends PartialType(BasketEntity) {}
