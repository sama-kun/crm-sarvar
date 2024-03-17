import { XxxEntity } from '@/database/entities/xxx.entity';
declare const SearchXxxDto_base: import("@nestjs/common").Type<Partial<unknown>>;
export declare class SearchXxxDto extends SearchXxxDto_base {
    sort?: Partial<XxxEntity>;
    filter?: Partial<XxxEntity>;
    search?: Partial<XxxEntity>;
}
export {};
