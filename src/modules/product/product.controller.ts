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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { BaseController } from "@/common/base/BaseController";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "@/database/entities/Product.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchProductDto } from "./dto/search-product.dto";
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
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@ApiTags("Product")
@Controller("product")
@ApiBearerAuth()
export class ProductController extends BaseController<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto,
  SearchProductDto,
  ProductService
> {
  constructor(private ProductService: ProductService) {
    super();
    this.dataService = ProductService;
  }

  @ApiOperation({ summary: "Create Category" })
  @ApiResponse({
    status: 201,
    type: ProductEntity,
    description: "Product created successfully",
  })
  @ApiBody({ type: ProductEntity })
  @Post()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  // @UseInterceptors(FileInterceptor("file"))
  create(
    @Body() data: ProductEntity,
    @AuthUser() user: UserEntity
    // @UploadedFile() file: Express.Multer.File
  ) {
    return this.dataService.create(data, user);
  }

  @ApiOperation({ summary: "Update Product" })
  @ApiResponse({
    status: 201,
    type: ProductEntity,
    description: "Product updated successfully",
  })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiBody({ type: ProductEntity })
  @Patch(":id")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  update(
    @AuthUser() user: UserEntity,
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.dataService.update(user, id, updateProductDto);
  }

  @ApiOperation({ summary: "Get all Products using query" })
  @ApiQuery({ type: SearchProductDto })
  @Get()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  async findAll(@Query() query: SearchProductDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAll(
      pagination,
      sort,
      relations,
      filter,
      search
    );
  }

  @ApiParam({ name: "id", description: "Product ID" })
  @ApiOperation({ summary: "Get Product by id" })
  @ApiResponse({
    status: 201,
    type: ProductEntity,
  })
  @ApiQuery({ name: "relations", required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.ROOT)
  @Get("/:id")
  async getOne(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: SearchProductDto
  ) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }
}
