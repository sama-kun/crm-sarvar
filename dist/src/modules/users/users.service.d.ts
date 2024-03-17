import { BaseService } from "@/common/base/BaseService";
import { UserEntity } from "@/database/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
export declare class UserService extends BaseService<UserEntity, CreateUserDto, UpdateUserDto> {
    protected repo: Repository<UserEntity>;
    constructor(repo: Repository<UserEntity>);
    findByUsername(username: string): Promise<CreateUserDto>;
}
