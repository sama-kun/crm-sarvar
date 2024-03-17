import { BaseModel } from "@/common/base/BaseModel";
import { FileTypesEnum } from "@/interfaces/enums";
export declare class FileEntity extends BaseModel {
    url: string;
    secure_url: string;
    asset_id: string;
    public_id: string;
    type: FileTypesEnum;
    folder?: string;
}
