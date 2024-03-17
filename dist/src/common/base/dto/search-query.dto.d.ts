export declare class SearchQueryDto {
    pagination?: Pagination;
    sort?: any;
    search?: any;
    filter?: any;
    relations?: string[];
}
declare class Pagination {
    page?: number;
    pageSize?: number;
}
export {};
