import { ProductService } from "./product.service";
import { BaseController } from "@/common/base/BaseController";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "@/database/entities/Product.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchProductDto } from "./dto/search-product.dto";
export declare class ProductController extends BaseController<ProductEntity, CreateProductDto, UpdateProductDto, SearchProductDto, ProductService> {
    private ProductService;
    constructor(ProductService: ProductService);
    create(data: ProductEntity, user: UserEntity): Promise<ProductEntity>;
    update(user: UserEntity, id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity>;
    findAll(query: SearchProductDto): Promise<any>;
    getOne(id: number, query: SearchProductDto): Promise<ProductEntity>;
}
