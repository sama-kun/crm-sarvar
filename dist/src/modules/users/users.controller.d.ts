import { UserService } from './users.service';
import { BaseController } from '@/common/base/BaseController';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '@/database/entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';
export declare class UserController extends BaseController<UserEntity, CreateUserDto, UpdateUserDto, SearchUserDto, UserService> {
    private userService;
    constructor(userService: UserService);
    create(data: UserEntity[] & UserEntity, user: UserEntity): Promise<UserEntity>;
    update(user: UserEntity, id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    findAll(query: SearchUserDto): Promise<any>;
    getOne(id: number, query: SearchUserDto): Promise<UserEntity>;
    me(user: UserEntity): Promise<UserEntity>;
}
