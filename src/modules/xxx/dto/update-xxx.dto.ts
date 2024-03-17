import { CreateXxxDto } from './create-xxx.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateXxxDto extends PartialType(CreateXxxDto) {}
