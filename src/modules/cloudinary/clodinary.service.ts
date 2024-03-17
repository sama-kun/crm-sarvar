import { Injectable, Logger } from "@nestjs/common";
import { v2 as cloudinary, v2 } from "cloudinary";
import { CloudinaryResponse } from "./dto/cloudinary-response.dto";
import { Readable } from "stream";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "@/database/entities/file.entity";
import { Repository, TypeORMError } from "typeorm";
import { UserEntity } from "../../database/entities/user.entity";
import { FileTypesEnum } from "@/interfaces/enums";
import { BaseService } from "@/common/base/BaseService";
const console = new Logger("CloudinaryService");

@Injectable()
export class CloudinaryService extends BaseService<
  FileEntity,
  Partial<FileEntity>,
  Partial<FileEntity>
> {
  constructor(
    @InjectRepository(FileEntity) protected repo: Repository<FileEntity>
  ) {
    super();
  }

  async createMy(
    user: UserEntity = null,
    item: number = null,
    result: CloudinaryResponse
  ) {
    try {
      let id: number = null;
      let type = FileTypesEnum.IMAGE;
      let itemId: number = null;
      if (user) {
        id = user.id;
      }
      if (item) {
        itemId = item;
      }
      if (result.format === "pdf") {
        type = FileTypesEnum.PDF;
      }
      const file = await this.repo.save({
        createdBy: { id },
        url: result.url,
        secure_url: result.secure_url,
        asset_id: result.asset_id,
        public_id: result.public_id,
        folder: result.folder,
        type,
      });
      return await this.findById(file.id, []);
    } catch (error) {
      console.error(error);
      throw new TypeORMError(error);
    }
  }

  async getAllImages(): Promise<any> {
    try {
      const { resources } = await cloudinary.api.resources({
        type: "upload", // Specify the type only once here
        max_results: 10,
      });
      return resources;
    } catch (error) {
      console.error("Error fetching images from Cloudinary:", error);
      throw error;
    }
  }

  async uploadPdf(user: UserEntity, file: Express.Multer.File): Promise<any> {
    const options = {
      folder: "pdf_files",
    };
    const buffer = Buffer.from(file.buffer);
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            // this.createMy(user, item, result).then((data) => {
            // result.db = data;
            resolve(result);
            // });
          }
        })
        .end(buffer);
    });
  }

  async uploadFile(
    user: UserEntity = null,
    file: Express.Multer.File,
    options: any,
    item: number = null
  ): Promise<CloudinaryResponse> {
    options = {
      ...options,
      public_id: file.originalname,
    };
    const buffer = Buffer.from(file.buffer);
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            this.createMy(user, item, result).then((data) => {
              result.db = data;
              resolve(result);
            });
          }
        })
        .end(buffer);
    });
  }

  async uploadFiles(
    user: UserEntity,
    item: number = null,
    files: Express.Multer.File[],
    folder: string
  ) {
    const uploads = [];

    for (const file of files) {
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      const options = {
        folder: folder,
        public_id: file.originalname, // Use the original filename as the Cloudinary filename
      };

      const uploadPromise = new Promise((resolve, reject) => {
        const bufferChunks = [];
        stream.on("data", (chunk) => {
          bufferChunks.push(chunk);
        });

        stream.on("end", () => {
          const buffer = Buffer.concat(bufferChunks);
          cloudinary.uploader
            .upload_stream(options, (error, result) => {
              if (error) {
                reject(error);
              } else {
                this.createMy(user, item, result).then((data) => {
                  result.db = data;
                  resolve(result);
                });
              }
            })
            .end(buffer);
        });
      });

      uploads.push(uploadPromise);
    }

    return Promise.all(uploads); // Wait for all uploads to complete
  }
}
