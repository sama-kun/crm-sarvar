import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { PartialType } from "@nestjs/swagger";

export class CreatePaymentHistoryDto extends PartialType(
  PaymentHistoryEntity
) {}
