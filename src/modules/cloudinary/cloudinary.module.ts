import { Module } from "@nestjs/common";
import { CloudinaryProvider } from "./cloudinary.provider";
import { CloudinaryService } from "./clodinary.service";
import { CloudinaryController } from "./cloudinary.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "@/database/entities/file.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController],
  imports: [TypeOrmModule.forFeature([FileEntity]), JwtModule],
})
export class CloudinaryModule {}
