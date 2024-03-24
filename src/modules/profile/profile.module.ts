import { Module, forwardRef } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "@/database/entities/profile.entity";
import { AuthModule } from "../auth/auth.module";
import { OrderModule } from "../order/order.module";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    TypeOrmModule.forFeature([ProfileEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
