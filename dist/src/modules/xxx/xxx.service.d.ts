import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import { BaseService } from '@/common/base/BaseService';
import { Repository } from 'typeorm';
import { XxxEntity } from '@/database/entities/xxx.entity';
export declare class XxxService extends BaseService<XxxEntity, CreateXxxDto, UpdateXxxDto> {
    protected repo: Repository<XxxEntity>;
    constructor(repo: Repository<XxxEntity>);
}
