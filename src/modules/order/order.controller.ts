import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { BaseController } from "@/common/base/BaseController";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderEntity } from "@/database/entities/order.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchOrderDto } from "./dto/search-order.dto";
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
import { BasketService } from "../basket/basket.service";
import { BasketEntity } from "@/database/entities/basket.entity";

@ApiTags("Order")
@Controller("order")
@ApiBearerAuth()
export class OrderController extends BaseController<
  OrderEntity,
  CreateOrderDto,
  UpdateOrderDto,
  SearchOrderDto,
  OrderService
> {
  constructor(
    private OrderService: OrderService,
    private readonly basketService: BasketService
  ) {
    super();
    this.dataService = OrderService;
  }

  @ApiOperation({ summary: "Create Category" })
  @ApiResponse({
    status: 201,
    type: OrderEntity,
    description: "Order created successfully",
  })
  @ApiBody({ type: OrderEntity })
  @Post()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  async create(@Body() data: OrderEntity, @AuthUser() user: UserEntity) {
    return this.dataService.myCreate(data, user);
  }

  @ApiOperation({ summary: "Update Order" })
  @ApiResponse({
    status: 201,
    type: OrderEntity,
    description: "Order updated successfully",
  })
  @ApiParam({ name: "id", description: "Order ID" })
  @ApiBody({ type: OrderEntity })
  @Patch(":id")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  update(
    @AuthUser() user: UserEntity,
    @Param("id") id: number,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    console.log(updateOrderDto);
    if (updateOrderDto.amount) {
      console.log("sldjfs");
      return this.dataService.amountUpdate(user, id, updateOrderDto);
    }
    return this.dataService.update(user, id, updateOrderDto);
  }

  @ApiOperation({ summary: "Get all Orders using query" })
  @ApiQuery({ type: SearchOrderDto })
  @Get()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  async findAll(@Query() query: SearchOrderDto) {
    const { pagination, sort, relations, filter, search, dateFilter } = query;
    return this.dataService.findAll(
      sort,
      relations,
      filter,
      search,
      dateFilter
    );
  }

  @ApiParam({ name: "id", description: "Order ID" })
  @ApiOperation({ summary: "Get Order by id" })
  @ApiResponse({
    status: 201,
    type: OrderEntity,
  })
  @ApiQuery({ name: "relations", required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  @Get("/:id")
  async getOne(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: SearchOrderDto
  ) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }

  @ApiParam({ name: "id", description: "Order ID" })
  @ApiOperation({ summary: "Get Order by id" })
  @ApiResponse({
    status: 201,
    type: OrderEntity,
  })
  @ApiQuery({ name: "relations", required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  @Delete("/:id")
  delete(@AuthUser() user: UserEntity, @Param("id") id: number) {
    return this.dataService.myDelete(user, id);
  }
}
