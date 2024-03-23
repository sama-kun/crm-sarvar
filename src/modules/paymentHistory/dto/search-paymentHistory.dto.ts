import { IntersectionType, PartialType } from "@nestjs/swagger";
import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { SearchQueryDto } from "@/common/base/dto/search-query.dto";

export class SearchPaymentHistoryDto extends PartialType(
  IntersectionType(PaymentHistoryEntity, SearchQueryDto)
) {
  sort?: Partial<PaymentHistoryEntity>;
  dateFilter?: { startDate: any; endDate: any };
}
