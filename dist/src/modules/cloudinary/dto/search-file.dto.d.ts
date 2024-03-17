import { SearchQueryDto } from "@/common/base/dto/search-query.dto";
import { FileEntity } from "@/database/entities/file.entity";
declare const SearchFileDto_base: import("@nestjs/common").Type<Partial<FileEntity & SearchQueryDto>>;
export declare class SearchFileDto extends SearchFileDto_base {
    sort?: Partial<FileEntity>;
    filter?: Partial<FileEntity>;
    search?: Partial<FileEntity>;
}
export {};
