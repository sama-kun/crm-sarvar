import { BasketEntity } from "@/database/entities/basket.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";
declare const SearchBasketDto_base: import("@nestjs/common").Type<Partial<SearchQueryDto & BasketEntity>>;
export declare class SearchBasketDto extends SearchBasketDto_base {
    sort?: Partial<BasketEntity>;
}
export {};
