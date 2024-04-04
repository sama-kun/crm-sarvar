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
import { ProfileService } from "./profile.service";
import { BaseController } from "@/common/base/BaseController";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfileEntity } from "@/database/entities/profile.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchProfileDto } from "./dto/search-profile.dto";
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

@ApiTags("Profile")
@Controller("profile")
@ApiBearerAuth()
export class ProfileController extends BaseController<
  ProfileEntity,
  CreateProfileDto,
  UpdateProfileDto,
  SearchProfileDto,
  ProfileService
> {
  constructor(private profileService: ProfileService) {
    super();
    this.dataService = profileService;
  }

  @ApiOperation({ summary: "Create Category" })
  @ApiResponse({
    status: 201,
    type: ProfileEntity,
    description: "Profile created successfully",
  })
  @ApiBody({ type: ProfileEntity })
  @Post()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  // @UseInterceptors(FileInterceptor("file"))
  create(
    @Body() data: ProfileEntity,
    @AuthUser() user: UserEntity
    // @UploadedFile() file: Express.Multer.File
  ) {
    return this.dataService.create(data, user);
  }

  @ApiOperation({ summary: "Update Profile" })
  @ApiResponse({
    status: 201,
    type: ProfileEntity,
    description: "Profile updated successfully",
  })
  @ApiParam({ name: "id", description: "Profile ID" })
  @ApiBody({ type: ProfileEntity })
  @Patch(":id")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  update(
    @AuthUser() user: UserEntity,
    @Param("id") id: number,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.dataService.update(user, id, updateProfileDto);
  }

  @ApiOperation({ summary: "Get all Profiles using query" })
  @ApiQuery({ type: SearchProfileDto })
  @Get()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  async findAll(@Query() query: SearchProfileDto) {
    const { pagination, sort, relations, filter, search, dateFilter } = query;
    return this.dataService.findAll(
      sort,
      relations,
      filter,
      search,
      dateFilter
    );
  }

  @ApiParam({ name: "id", description: "Profile ID" })
  @ApiOperation({ summary: "Get Profile by id" })
  @ApiResponse({
    status: 201,
    type: ProfileEntity,
  })
  @ApiQuery({ name: "relations", required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER, RoleEnum.OPTOMETRIST)
  @Get("/:id")
  async getOne(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: SearchProfileDto
  ) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }
}
