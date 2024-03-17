import { BaseService } from "@/common/base/BaseService";
import { BasketEntity } from "@/database/entities/basket.entity";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { Repository } from "typeorm";
export declare class BasketService extends BaseService<BasketEntity, CreateBasketDto, UpdateBasketDto> {
    protected repo: Repository<BasketEntity>;
    constructor(repo: Repository<BasketEntity>);
}
