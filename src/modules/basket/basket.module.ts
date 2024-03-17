import { Module, forwardRef } from "@nestjs/common";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketEntity } from "@/database/entities/basket.entity";
import { AuthModule } from "../auth/auth.module";
import { ProductModule } from "../product/product.module";

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    TypeOrmModule.forFeature([BasketEntity]),
    forwardRef(() => AuthModule),
    ProductModule,
  ],
  exports: [BasketService],
})
export class BasketModule {}
