import { BaseService } from "@/common/base/BaseService";
import { BasketEntity } from "@/database/entities/basket.entity";
import { Injectable } from "@nestjs/common";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { ProductService } from "../product/product.service";
// const console = new Logger('UserService');

@Injectable()
export class BasketService extends BaseService<
  BasketEntity,
  CreateBasketDto,
  UpdateBasketDto
> {
  constructor(
    @InjectRepository(BasketEntity) protected repo: Repository<BasketEntity>,
    private readonly productService: ProductService
  ) {
    super();
  }
  async myCreate(data: BasketEntity, user: UserEntity) {
    const product = await this.productService.findById(
      Number(data.product),
      []
    );
    data.summa = Number(product[data.discountType]) * Number(data.quantity);
    console.log(product[data.discountType]);
    return await this.create(data, user);
  }
}
