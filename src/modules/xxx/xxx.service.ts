import { Injectable } from '@nestjs/common';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import { BaseService } from '@/common/base/BaseService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// @ts-ignore
import { XxxEntity } from '@/database/entities/xxx.entity';

@Injectable()
export class XxxService extends BaseService<
  XxxEntity,
  CreateXxxDto,
  UpdateXxxDto
> {
  constructor(
    @InjectRepository(XxxEntity) protected repo: Repository<XxxEntity>,
  ) {
    super();
  }
}
