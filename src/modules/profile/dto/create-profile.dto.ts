import { ProfileEntity } from "@/database/entities/profile.entity";
import { PartialType } from "@nestjs/swagger";

export class CreateProfileDto extends PartialType(ProfileEntity) {}
