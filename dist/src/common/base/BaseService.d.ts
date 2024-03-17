import { BaseModel } from './BaseModel';
import { ObjectLiteral, Repository } from 'typeorm';
import { UserEntity } from '@/database/entities/user.entity';
export declare abstract class BaseService<Entity extends BaseModel & ObjectLiteral, CreateDto extends Partial<Entity>, UpdateDto extends Partial<Entity>> {
    protected repo: Repository<Entity>;
    create(data: CreateDto, user?: UserEntity): Promise<Entity>;
    findOne(option: any): Promise<Entity>;
    findById(id: number, relations: string[]): Promise<Entity>;
    update(user: UserEntity, id: number, data: UpdateDto): Promise<Entity>;
    findAll(pagination: any, sort: any, relations: string[], filter: any, search: any): Promise<any>;
    private createMeta;
    delete(user: UserEntity, id: number): Promise<any>;
}
