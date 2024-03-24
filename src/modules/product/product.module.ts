import { Module, forwardRef } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "@/database/entities/product.entity";
import { AuthModule } from "../auth/auth.module";
import { OrderModule } from "../order/order.module";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    TypeOrmModule.forFeature([ProductEntity]),
    forwardRef(() => AuthModule),
    // OrderModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
