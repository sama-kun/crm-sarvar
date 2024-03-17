import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchQueryDto {
  pagination?: Pagination;

  @ApiPropertyOptional()
  sort?: any;

  @ApiPropertyOptional()
  search?: any;

  @ApiPropertyOptional()
  filter?: any;

  @ApiPropertyOptional()
  relations?: string[];
}

class Pagination {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @ApiPropertyOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @ApiPropertyOptional()
  pageSize?: number;
}
