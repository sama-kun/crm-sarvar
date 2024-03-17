import { BasketService } from "./basket.service";
import { BaseController } from "@/common/base/BaseController";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { BasketEntity } from "@/database/entities/basket.entity";
import { UserEntity } from "@/database/entities/user.entity";
import { SearchBasketDto } from "./dto/search-basket.dto";
import { ProductService } from "../product/product.service";
export declare class BasketController extends BaseController<BasketEntity, CreateBasketDto, UpdateBasketDto, SearchBasketDto, BasketService> {
    private BasketService;
    private readonly productService;
    constructor(BasketService: BasketService, productService: ProductService);
    create(data: BasketEntity, user: UserEntity): Promise<BasketEntity>;
    update(user: UserEntity, id: number, updateBasketDto: UpdateBasketDto): Promise<BasketEntity>;
    findAll(query: SearchBasketDto): Promise<any>;
    getOne(id: number, query: SearchBasketDto): Promise<BasketEntity>;
}
