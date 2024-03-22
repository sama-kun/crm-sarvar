import { BaseService } from "@/common/base/BaseService";
import { ProfileEntity } from "@/database/entities/profile.entity";
import { Injectable } from "@nestjs/common";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// const console = new Logger('UserService');

@Injectable()
export class ProfileService extends BaseService<
  ProfileEntity,
  CreateProfileDto,
  UpdateProfileDto
> {
  constructor(
    @InjectRepository(ProfileEntity)
    protected repo: Repository<ProfileEntity>
  ) {
    super();
  }
}
