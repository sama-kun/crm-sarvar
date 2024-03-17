import { SearchQueryDto } from '@/common/base/dto/search-query.dto';
// @ts-ignore
import { XxxEntity } from '@/database/entities/xxx.entity';
import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';

export class SearchXxxDto extends PartialType(
  IntersectionType(XxxEntity, SearchQueryDto),
) {
  @ApiPropertyOptional({ type: XxxEntity })
  sort?: Partial<XxxEntity>;

  @ApiPropertyOptional({ type: XxxEntity })
  filter?: Partial<XxxEntity>;

  @ApiPropertyOptional({ type: XxxEntity })
  search?: Partial<XxxEntity>;
}
