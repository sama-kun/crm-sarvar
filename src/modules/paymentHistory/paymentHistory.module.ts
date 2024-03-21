import { Module, forwardRef } from "@nestjs/common";
import { PaymentHistoryController } from "./paymentHistory.controller";
import { PaymentHistoryService } from "./paymentHistory.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentHistoryEntity } from "@/database/entities/paymentHistory.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [PaymentHistoryController],
  providers: [PaymentHistoryService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    TypeOrmModule.forFeature([PaymentHistoryEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [PaymentHistoryService],
})
export class PaymentHistoryModule {}
