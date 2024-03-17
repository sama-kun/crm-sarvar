import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { BaseController } from '@/common/base/BaseController';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '@/database/entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { RolesQuard } from '@/common/guards/roles.quard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEnum } from '@/interfaces/enums';
import { Roles } from '@/common/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController extends BaseController<
  UserEntity,
  CreateUserDto,
  UpdateUserDto,
  SearchUserDto,
  UserService
> {
  constructor(private userService: UserService) {
    super();
    this.dataService = userService;
  }

  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({
    status: 201,
    type: UserEntity,
    description: 'User created successfully',
  })
  @ApiBody({ type: UserEntity })
  @Post()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  create(
    @Body() data: UserEntity[] & UserEntity,
    @AuthUser() user: UserEntity,
  ) {
    return this.dataService.create(data, user);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 201,
    type: UserEntity,
    description: 'User updated successfully',
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UserEntity })
  @Patch(':id')
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  update(
    @AuthUser() user: UserEntity,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.dataService.update(user, id, updateUserDto);
  }

  @ApiOperation({ summary: 'Get all Users using query' })
  @ApiQuery({ type: SearchUserDto })
  @Get()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  async findAll(@Query() query: SearchUserDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAll(
      pagination,
      sort,
      relations,
      filter,
      search,
    );
  }

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Get User by id' })
  @ApiResponse({
    status: 201,
    type: UserEntity,
  })
  @ApiQuery({ name: 'relations', required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SearchUserDto,
  ) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }

  @Get('auth/me')
  @ApiBearerAuth()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  me(@AuthUser() user: UserEntity) {
    if (!user)
      throw new HttpException('Токен неверный', HttpStatus.UNAUTHORIZED);
    return this.dataService.findOne({
      where: { id: user.id },
      relations: [],
    });
  }
}
