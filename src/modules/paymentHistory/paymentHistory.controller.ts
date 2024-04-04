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
import { PaymentHistoryService } from "./paymentHistory.service";
import { BaseController } from "@/common/base/BaseController";
import { CreatePaymentHistoryDto } from "./dto/create-paymentHistory.dto";
import { UpdatePaymentHistoryDto } from "./dto/update-paymentHistory.dto";
import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchPaymentHistoryDto } from "./dto/search-paymentHistory.dto";
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

@ApiTags("PaymentHistory")
@Controller("payment-history")
@ApiBearerAuth()
export class PaymentHistoryController extends BaseController<
  PaymentHistoryEntity,
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto,
  SearchPaymentHistoryDto,
  PaymentHistoryService
> {
  constructor(private paymentHistoryService: PaymentHistoryService) {
    super();
    this.dataService = paymentHistoryService;
  }

  @ApiOperation({ summary: "Create Category" })
  @ApiResponse({
    status: 201,
    type: PaymentHistoryEntity,
    description: "PaymentHistory created successfully",
  })
  @ApiBody({ type: PaymentHistoryEntity })
  @Post()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  // @UseInterceptors(FileInterceptor("file"))
  create(
    @Body() data: PaymentHistoryEntity,
    @AuthUser() user: UserEntity
    // @UploadedFile() file: Express.Multer.File
  ) {
    return this.dataService.newCreate(data, user);
  }

  @ApiOperation({ summary: "Update PaymentHistory" })
  @ApiResponse({
    status: 201,
    type: PaymentHistoryEntity,
    description: "PaymentHistory updated successfully",
  })
  @ApiParam({ name: "id", description: "PaymentHistory ID" })
  @ApiBody({ type: PaymentHistoryEntity })
  @Patch(":id")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  update(
    @AuthUser() user: UserEntity,
    @Param("id") id: number,
    @Body() updatePaymentHistoryDto: UpdatePaymentHistoryDto
  ) {
    return this.dataService.update(user, id, updatePaymentHistoryDto);
  }

  @ApiOperation({ summary: "Get all PaymentHistorys using query" })
  @ApiQuery({ type: SearchPaymentHistoryDto })
  @Get()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  async findAll(@Query() query: SearchPaymentHistoryDto) {
    const { pagination, sort, relations, filter, search, dateFilter } = query;
    return this.dataService.findAll(
      sort,
      relations,
      filter,
      search,
      dateFilter
    );
  }

  @ApiParam({ name: "id", description: "PaymentHistory ID" })
  @ApiOperation({ summary: "Get PaymentHistory by id" })
  @ApiResponse({
    status: 201,
    type: PaymentHistoryEntity,
  })
  @ApiQuery({ name: "relations", required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  @Get("/:id")
  async getOne(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: SearchPaymentHistoryDto
  ) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }
}
