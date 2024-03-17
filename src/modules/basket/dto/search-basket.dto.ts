import { IntersectionType, PartialType } from "@nestjs/swagger";
import { BasketEntity } from "@/database/entities/basket.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";

export class SearchBasketDto extends PartialType(
  IntersectionType(BasketEntity, SearchQueryDto)
) {
  sort?: Partial<BasketEntity>;
}
