import { IntersectionType, PartialType } from "@nestjs/swagger";
import { ProductEntity } from "@/database/entities/product.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";

export class SearchProductDto extends PartialType(
  IntersectionType(ProductEntity, SearchQueryDto)
) {
  sort?: Partial<ProductEntity>;
}
