import { BaseService } from "@/common/base/BaseService";
import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { Injectable } from "@nestjs/common";
import { CreatePaymentHistoryDto } from "./dto/create-paymentHistory.dto";
import { UpdatePaymentHistoryDto } from "./dto/update-paymentHistory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// const console = new Logger('UserService');

@Injectable()
export class PaymentHistoryService extends BaseService<
  PaymentHistoryEntity,
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto
> {
  constructor(
    @InjectRepository(PaymentHistoryEntity)
    protected repo: Repository<PaymentHistoryEntity>
  ) {
    super();
  }
}
