import { XxxService } from "./xxx.service";
import { BaseController } from "@/common/base/BaseController";
import { UserEntity } from "@/database/entities/user.entity";
import { XxxEntity } from "@/database/entities/xxx.entity";
import { SearchXxxDto } from "@/modules/xxx/dto/search-xxx.dto";
import { CreateXxxDto } from "./dto/create-xxx.dto";
import { UpdateXxxDto } from "./dto/update-xxx.dto";
export declare class XxxController extends BaseController<XxxEntity, CreateXxxDto, UpdateXxxDto, SearchXxxDto, XxxService> {
    constructor(dataService: XxxService);
    create(data: XxxEntity[] & XxxEntity, user: UserEntity): Promise<XxxEntity>;
    update(user: UserEntity, id: number, data: XxxEntity): Promise<XxxEntity>;
    remove(user: UserEntity, id: number): Promise<any>;
}
