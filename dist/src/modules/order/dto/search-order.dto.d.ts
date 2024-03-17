import { OrderEntity } from "@/database/entities/order.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";
declare const SearchOrderDto_base: import("@nestjs/common").Type<Partial<SearchQueryDto & OrderEntity>>;
export declare class SearchOrderDto extends SearchOrderDto_base {
    sort?: Partial<OrderEntity>;
}
export {};
