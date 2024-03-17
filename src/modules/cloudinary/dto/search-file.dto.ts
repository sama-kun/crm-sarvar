import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
} from "@nestjs/swagger";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";
import { FileEntity } from "@/database/entities/file.entity";

export class SearchFileDto extends PartialType(
  IntersectionType(FileEntity, SearchQueryDto)
) {
  @ApiPropertyOptional({ type: FileEntity })
  sort?: Partial<FileEntity>;

  @ApiPropertyOptional({ type: FileEntity })
  filter?: Partial<FileEntity>;

  @ApiPropertyOptional({ type: FileEntity })
  search?: Partial<FileEntity>;
}
