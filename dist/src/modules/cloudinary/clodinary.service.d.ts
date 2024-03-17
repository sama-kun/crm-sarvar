/// <reference types="multer" />
import { CloudinaryResponse } from "./dto/cloudinary-response.dto";
import { FileEntity } from "@/database/entities/file.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../../database/entities/user.entity";
import { BaseService } from "@/common/base/BaseService";
export declare class CloudinaryService extends BaseService<FileEntity, Partial<FileEntity>, Partial<FileEntity>> {
    protected repo: Repository<FileEntity>;
    constructor(repo: Repository<FileEntity>);
    createMy(user: UserEntity, item: number, result: CloudinaryResponse): Promise<FileEntity>;
    getAllImages(): Promise<any>;
    uploadPdf(user: UserEntity, file: Express.Multer.File): Promise<any>;
    uploadFile(user: UserEntity, file: Express.Multer.File, options: any, item?: number): Promise<CloudinaryResponse>;
    uploadFiles(user: UserEntity, item: number, files: Express.Multer.File[], folder: string): Promise<any[]>;
}
