import { ProductEntity } from "@/database/entities/product.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";
declare const SearchProductDto_base: import("@nestjs/common").Type<Partial<SearchQueryDto & ProductEntity>>;
export declare class SearchProductDto extends SearchProductDto_base {
    sort?: Partial<ProductEntity>;
}
export {};
