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
} from "@nestjs/common";
import { BasketService } from "./basket.service";
import { BaseController } from "@/common/base/BaseController";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { BasketEntity } from "@/database/entities/basket.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchBasketDto } from "./dto/search-basket.dto";
import { AuthUser } from "@/common/decorators/auth-user.decorator";
import { RolesQuard } from "@/common/guards/roles.quard";
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
import { Roles } from "@/common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { ProductService } from "../product/product.service";

@ApiTags("Basket")
@Controller("Basket")
@ApiBearerAuth()
export class BasketController extends BaseController<
  BasketEntity,
  CreateBasketDto,
  UpdateBasketDto,
  SearchBasketDto,
  BasketService
> {
  constructor(
    private BasketService: BasketService,
    private readonly productService: ProductService
  ) {
    super();
    this.dataService = BasketService;
  }

  @ApiOperation({ summary: "Create Category" })
  @ApiResponse({
    status: 201,
    type: BasketEntity,
    description: "Basket created successfully",
  })
  @ApiBody({ type: BasketEntity })
  @Post()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  async create(@Body() data: BasketEntity, @AuthUser() user: UserEntity) {
    const product = await this.productService.findById(
      Number(data.product),
      []
    );
    data.summa = product[product.discountType] * data.quantity;
    return this.dataService.create(data, user);
  }

  @ApiOperation({ summary: "Update Basket" })
  @ApiResponse({
    status: 201,
    type: BasketEntity,
    description: "Basket updated successfully",
  })
  @ApiParam({ name: "id", description: "Basket ID" })
  @ApiBody({ type: BasketEntity })
  @Patch(":id")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  update(
    @AuthUser() user: UserEntity,
    @Param("id") id: number,
    @Body() updateBasketDto: UpdateBasketDto
  ) {
    return this.dataService.update(user, id, updateBasketDto);
  }

  @ApiOperation({ summary: "Get all Baskets using query" })
  @ApiQuery({ type: SearchBasketDto })
  @Get()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  async findAll(@Query() query: SearchBasketDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAll(
      pagination,
      sort,
      relations,
      filter,
      search
    );
  }

  @ApiParam({ name: "id", description: "Basket ID" })
  @ApiOperation({ summary: "Get Basket by id" })
  @ApiResponse({
    status: 201,
    type: BasketEntity,
  })
  @ApiQuery({ name: "relations", required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  @Get("/:id")
  async getOne(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: SearchBasketDto
  ) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }
}
