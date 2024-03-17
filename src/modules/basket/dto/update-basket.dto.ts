import { CreateBasketDto } from "./create-basket.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateBasketDto extends PartialType(CreateBasketDto) {}
