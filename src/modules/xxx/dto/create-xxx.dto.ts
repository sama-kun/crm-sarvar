import { PartialType } from '@nestjs/swagger';
// @ts-ignore
import { XxxEntity } from '@/database/entities/xxx.entity';

export class CreateXxxDto extends PartialType(XxxEntity) {}
