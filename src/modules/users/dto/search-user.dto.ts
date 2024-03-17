import { IntersectionType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '@/database/entities/user.entity';
import { SearchQueryDto } from '@/common/base/dto/search-query.dto';

export class SearchUserDto extends PartialType(
  IntersectionType(UserEntity, SearchQueryDto),
) {
  sort?: Partial<UserEntity>;
}
