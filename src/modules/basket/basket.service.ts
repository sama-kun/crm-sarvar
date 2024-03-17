import { BaseService } from "@/common/base/BaseService";
import { BasketEntity } from "@/database/entities/basket.entity";
import { Injectable } from "@nestjs/common";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// const console = new Logger('UserService');

@Injectable()
export class BasketService extends BaseService<
  BasketEntity,
  CreateBasketDto,
  UpdateBasketDto
> {
  constructor(
    @InjectRepository(BasketEntity) protected repo: Repository<BasketEntity>
  ) {
    super();
  }
}
