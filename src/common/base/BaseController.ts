import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { BaseService } from './BaseService';
import { SearchQueryDto } from './dto/search-query.dto';
import { ObjectLiteral } from 'typeorm';
import { BaseModel } from './BaseModel';
import { AuthUser } from '../decorators/auth-user.decorator';
import { UserEntity } from '@/database/entities/user.entity';
@Controller()
export abstract class BaseController<
  Entity extends BaseModel & ObjectLiteral,
  CreateDto extends Partial<Entity>,
  UpdateDto extends Partial<Entity>,
  SearchDto extends Partial<Entity & SearchQueryDto>,
  DataService extends Partial<BaseService<Entity, CreateDto, UpdateDto>>,
> {
  public dataService: DataService;

  @Post()
  create(@Body() data: CreateDto, @AuthUser() user: UserEntity = null) {
    return this.dataService.create(data, user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query() query: SearchDto) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }

  @Patch(':id')
  update(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDto,
  ) {
    return this.dataService.update(user, id, updateDto);
  }

  @Get()
  findAll(@Query() query: SearchDto) {
    const { pagination, sort, relations, filter, search } = query;

    return this.dataService.findAll(
      pagination,
      sort,
      relations,
      filter,
      search,
    );
  }

  @Delete(':id')
  delete(@AuthUser() user: UserEntity, @Param('id') id: number) {
    return this.dataService.delete(user, id);
  }
}
