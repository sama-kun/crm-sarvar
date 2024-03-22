import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { AuthModule } from "../auth/auth.module";
import { ProfileModule } from "../profile/profile.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    ProfileModule,
  ],
  exports: [UserService],
})
export class UserModule {}
