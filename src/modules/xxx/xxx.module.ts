import { Module } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// @ts-ignore
import { XxxEntity } from '@/database/entities/xxx.entity';
import { XxxController } from './xxx.controller';

@Module({
  imports: [TypeOrmModule.forFeature([XxxEntity])],
  providers: [XxxService],
  controllers: [XxxController],
})
export class XxxModule {}
