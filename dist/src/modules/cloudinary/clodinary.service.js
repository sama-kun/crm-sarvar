"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("../../database/entities/file.entity");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../interfaces/enums");
const BaseService_1 = require("../../common/base/BaseService");
const console = new common_1.Logger("CloudinaryService");
let CloudinaryService = class CloudinaryService extends BaseService_1.BaseService {
    constructor(repo) {
        super();
        this.repo = repo;
    }
    async createMy(user = null, item = null, result) {
        try {
            let id = null;
            let type = enums_1.FileTypesEnum.IMAGE;
            let itemId = null;
            if (user) {
                id = user.id;
            }
            if (item) {
                itemId = item;
            }
            if (result.format === "pdf") {
                type = enums_1.FileTypesEnum.PDF;
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
        }
        catch (error) {
            console.error(error);
            throw new typeorm_2.TypeORMError(error);
        }
    }
    async getAllImages() {
        try {
            const { resources } = await cloudinary_1.v2.api.resources({
                type: "upload",
                max_results: 10,
            });
            return resources;
        }
        catch (error) {
            console.error("Error fetching images from Cloudinary:", error);
            throw error;
        }
    }
    async uploadPdf(user, file) {
        const options = {
            folder: "pdf_files",
        };
        const buffer = Buffer.from(file.buffer);
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream(options, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            })
                .end(buffer);
        });
    }
    async uploadFile(user = null, file, options, item = null) {
        options = Object.assign(Object.assign({}, options), { public_id: file.originalname });
        const buffer = Buffer.from(file.buffer);
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream(options, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    this.createMy(user, item, result).then((data) => {
                        result.db = data;
                        resolve(result);
                    });
                }
            })
                .end(buffer);
        });
    }
    async uploadFiles(user, item = null, files, folder) {
        const uploads = [];
        for (const file of files) {
            const stream = new stream_1.Readable();
            stream.push(file.buffer);
            stream.push(null);
            const options = {
                folder: folder,
                public_id: file.originalname,
            };
            const uploadPromise = new Promise((resolve, reject) => {
                const bufferChunks = [];
                stream.on("data", (chunk) => {
                    bufferChunks.push(chunk);
                });
                stream.on("end", () => {
                    const buffer = Buffer.concat(bufferChunks);
                    cloudinary_1.v2.uploader
                        .upload_stream(options, (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
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
        return Promise.all(uploads);
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=clodinary.service.js.map