import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { XxxService } from "./xxx.service";
import { BaseController } from "@/common/base/BaseController";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RoleEnum } from "@/interfaces/enums";
import { AuthUser } from "@/common/decorators/auth-user.decorator";
import { UserEntity } from "@/database/entities/user.entity";

// @ts-ignore
import { XxxEntity } from "@/database/entities/xxx.entity";
import { SearchXxxDto } from "@/modules/xxx/dto/search-xxx.dto";
import { CreateXxxDto } from "./dto/create-xxx.dto";
import { UpdateXxxDto } from "./dto/update-xxx.dto";
import { RolesQuard } from "@/common/guards/roles.quard";
import { Roles } from "@/common/decorators/roles-auth.decorator";
@ApiTags("Xxx")
@Controller("xxx")
export class XxxController extends BaseController<
  XxxEntity,
  CreateXxxDto,
  UpdateXxxDto,
  SearchXxxDto,
  XxxService
> {
  constructor(dataService: XxxService) {
    super();
    this.dataService = dataService;
  }

  //
  // @ApiParam({ name: 'id', description: 'Xxx ID' })
  // @ApiOperation({ summary: 'Get Xxx by id' })
  // @ApiResponse({
  //   status: 201,
  //   type: XxxEntity,
  // })
  // @ApiQuery({ name: 'relations', required: false, type: Array })
  // @UseGuards(RolesQuard)
  // @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  // @Get(':id')
  // getOne(@Param('id', ParseIntPipe) id: number, @Query() query: SearchXxxDto) {
  //   const { relations } = query;
  //   return this.dataService.findById(id, relations);
  // }

  @ApiOperation({ summary: "Create Xxx" })
  @ApiResponse({
    status: 201,
    type: XxxEntity,
    description: "Xxx created successfully",
  })
  @ApiBody({ type: XxxEntity })
  @Post()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.USER)
  create(@Body() data: XxxEntity[] & XxxEntity, @AuthUser() user: UserEntity) {
    return this.dataService.create(data, user);
  }

  @ApiOperation({ summary: "Update Xxx" })
  @ApiResponse({
    status: 201,
    type: XxxEntity,
    description: "Xxx updated successfully",
  })
  @ApiParam({ name: "id", description: "Xxx ID" })
  @ApiBody({ type: XxxEntity })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.USER)
  @Patch(":id")
  update(
    @AuthUser() user: UserEntity,
    @Param("id", ParseIntPipe) id: number,
    @Body() data: XxxEntity
  ) {
    return this.dataService.update(user, id, data);
  }

  // @ApiOperation({ summary: 'Get all Xxxs using query' })
  //
  // @ApiQuery({ type: SearchXxxDto })
  // @Get()
  // @UseGuards(RolesQuard)
  // @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  // findAll(@Query() query: SearchXxxDto) {
  //   const { pagination, sort, relations, filter, search } = query;
  //   return this.dataService.findAll(
  //     pagination,
  //     sort,
  //     relations,
  //     filter,
  //     search,
  //   );
  // }

  @ApiOperation({ summary: "Delete by ID" })
  @ApiParam({ name: "id", description: "Xxx ID" })
  @Delete(":id")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.USER)
  async remove(@AuthUser() user: UserEntity, @Param("id") id: number) {
    console.log(user);
    return this.dataService.delete(user, id);
  }
}
