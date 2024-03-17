import { UserEntity } from '@/database/entities/user.entity';
import { SearchQueryDto } from '@/common/base/dto/search-query.dto';
declare const SearchUserDto_base: import("@nestjs/common").Type<Partial<SearchQueryDto & UserEntity>>;
export declare class SearchUserDto extends SearchUserDto_base {
    sort?: Partial<UserEntity>;
}
export {};
