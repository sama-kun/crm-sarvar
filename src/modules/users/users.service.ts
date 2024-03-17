import { BaseService } from "@/common/base/BaseService";
import { UserEntity } from "@/database/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// const console = new Logger('UserService');

@Injectable()
export class UserService extends BaseService<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(UserEntity) protected repo: Repository<UserEntity>
  ) {
    super();
  }

  async findByUsername(username: string): Promise<CreateUserDto> {
    const candidate = await super.findOne({
      where: { username },
    });
    return candidate;
  }
}
