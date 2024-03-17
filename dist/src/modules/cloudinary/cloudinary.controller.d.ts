/// <reference types="multer" />
import { CloudinaryService } from "./clodinary.service";
import { CloudinaryResponse } from "./dto/cloudinary-response.dto";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchFileDto } from "./dto/search-file.dto";
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImage(user: UserEntity, file: Express.Multer.File, data: any): Promise<CloudinaryResponse>;
    uploadImages(user: UserEntity, files: Express.Multer.File[], data: any): Promise<CloudinaryResponse[]>;
    uploadPdf(user: UserEntity, File: Express.Multer.File): Promise<any>;
    findAll(query: SearchFileDto): Promise<any>;
    getOne(id: number, query: SearchFileDto): Promise<import("../../database/entities/file.entity").FileEntity>;
}
