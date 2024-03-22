import { IntersectionType, PartialType } from "@nestjs/swagger";
import { ProfileEntity } from "@/database/entities/profile.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";

export class SearchProfileDto extends PartialType(
  IntersectionType(ProfileEntity, SearchQueryDto)
) {
  sort?: Partial<ProfileEntity>;
}
