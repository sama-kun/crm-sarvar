import { Module, forwardRef } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "@/database/entities/order.entity";
import { AuthModule } from "../auth/auth.module";
import { BasketModule } from "../basket/basket.module";
import { UserModule } from "../users/users.module";
import { PaymentHistoryModule } from "../paymentHistory/paymentHistory.module";
import { ProfileModule } from "../profile/profile.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    PaymentHistoryModule,
    forwardRef(() => AuthModule),
    BasketModule,
    UserModule,
    TypeOrmModule.forFeature([OrderEntity]),
    // ProfileModule,
  ],
  exports: [OrderService],
})
export class OrderModule {}
