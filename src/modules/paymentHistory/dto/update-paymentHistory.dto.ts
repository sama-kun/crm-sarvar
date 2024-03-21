import { CreatePaymentHistoryDto } from "./create-paymentHistory.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdatePaymentHistoryDto extends PartialType(
  CreatePaymentHistoryDto
) {}
