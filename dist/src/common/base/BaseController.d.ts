import { BaseService } from './BaseService';
import { SearchQueryDto } from './dto/search-query.dto';
import { ObjectLiteral } from 'typeorm';
import { BaseModel } from './BaseModel';
import { UserEntity } from '@/database/entities/user.entity';
export declare abstract class BaseController<Entity extends BaseModel & ObjectLiteral, CreateDto extends Partial<Entity>, UpdateDto extends Partial<Entity>, SearchDto extends Partial<Entity & SearchQueryDto>, DataService extends Partial<BaseService<Entity, CreateDto, UpdateDto>>> {
    dataService: DataService;
    create(data: CreateDto, user?: UserEntity): Promise<Entity>;
    findOne(id: number, query: SearchDto): Promise<Entity>;
    update(user: UserEntity, id: number, updateDto: UpdateDto): Promise<Entity>;
    findAll(query: SearchDto): Promise<any>;
    delete(user: UserEntity, id: number): Promise<any>;
}
