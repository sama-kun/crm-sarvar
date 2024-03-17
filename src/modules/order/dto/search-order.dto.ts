import { IntersectionType, PartialType } from "@nestjs/swagger";
import { OrderEntity } from "@/database/entities/order.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";

export class SearchOrderDto extends PartialType(
  IntersectionType(OrderEntity, SearchQueryDto)
) {
  sort?: Partial<OrderEntity>;
}
