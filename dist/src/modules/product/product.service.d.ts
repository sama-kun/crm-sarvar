import { BaseService } from "@/common/base/BaseService";
import { ProductEntity } from "@/database/entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Repository } from "typeorm";
export declare class ProductService extends BaseService<ProductEntity, CreateProductDto, UpdateProductDto> {
    protected repo: Repository<ProductEntity>;
    constructor(repo: Repository<ProductEntity>);
}
