import {
  Body,
  Controller,
  Get,
  // Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CloudinaryService } from "./clodinary.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CloudinaryResponse } from "./dto/cloudinary-response.dto";
import { RolesQuard } from "@/common/guards/roles.quard";
import { RoleEnum } from "@/interfaces/enums";
import { Roles } from "@/common/decorators/roles-auth.decorator";
import { AuthUser } from "@/common/decorators/auth-user.decorator";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchFileDto } from "./dto/search-file.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateFileDto } from "./dto/update-file.dto";
import * as multerConfig from "./multer.config";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
// const console = new Logger('CloudinaryController');

@ApiTags("Files")
@Controller("cloud")
@ApiBearerAuth()
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @ApiOperation({ summary: "Upload a file" })
  @ApiConsumes("multipart/form-data") // Specify the content type
  @ApiBody({
    description: "Image to upload", // Define a DTO for the file upload (optional)
  })
  @Post("image")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER)
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any
  ) {
    // console.debug(data.item);
    return this.cloudinaryService.uploadFile(
      user,
      file,
      { folder: data.folder },
      data.item
    );
  }

  // @Get()
  // async getAllImages(): Promise<any> {
  //   return this.cloudinaryService.getAllImages();
  // }

  @ApiOperation({
    summary: "Upload a files (U can send a lot files). Only for items",
  })
  @ApiConsumes("multipart/form-data") // Specify the content type
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        item: {
          type: "number",
          example: 1,
          description: "ID of item",
        },
      },
    },
  })
  @Post("upload-multiply")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER)
  @UseInterceptors(FilesInterceptor("files")) // Up to 10 images can be uploaded
  async uploadImages(
    @AuthUser() user: UserEntity,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: any
  ): Promise<CloudinaryResponse[]> {
    return await this.cloudinaryService.uploadFiles(
      user,
      data.item,
      files,
      "item"
    );
  }

  @ApiOperation({ summary: "Upload a file format PDF" })
  @ApiConsumes("multipart/form-data") // Specify the content type
  @ApiBody({
    description: "PDF to upload", // Define a DTO for the file upload (optional)
  })
  @Post("pdf")
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER)
  @UseInterceptors(FileInterceptor("file", multerConfig as MulterOptions))
  uploadPdf(
    @AuthUser() user: UserEntity,
    @UploadedFile() File: Express.Multer.File
  ) {
    return this.cloudinaryService.uploadPdf(user, File);
  }

  @ApiOperation({ summary: "Get all file" })
  @ApiConsumes("multipart/form-data") // Specify the content type
  @ApiBody({
    description: "Image to upload", // Define a DTO for the file upload (optional)
  })
  @ApiResponse({
    status: 201,
    type: Array,
  })
  @ApiQuery({ type: SearchFileDto })
  @Get()
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER)
  findAll(query: SearchFileDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.cloudinaryService.findAll(
      pagination,
      sort,
      relations,
      filter,
      search
    );
  }

  @ApiParam({ name: "id", description: "File ID" })
  @ApiOperation({ summary: "Get Cart by id" })
  @ApiResponse({
    status: 201,
    type: UpdateFileDto,
    description: "Cart created successfully",
  })
  @ApiQuery({ name: "relations", required: false, type: Array })
  @UseGuards(RolesQuard)
  @Roles(RoleEnum.USER)
  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id: number, @Query() query: SearchFileDto) {
    const { relations } = query;
    return this.cloudinaryService.findById(id, relations);
  }
}
