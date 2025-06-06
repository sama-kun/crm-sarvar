import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BaseModel } from "./BaseModel";
import {
  Like,
  ObjectLiteral,
  Repository,
  TypeORMError,
  Between,
} from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
const console = new Logger("BaseService");
export abstract class BaseService<
  Entity extends BaseModel & ObjectLiteral,
  CreateDto extends Partial<Entity>,
  UpdateDto extends Partial<Entity>
> {
  protected repo: Repository<Entity>;

  async create(data: CreateDto, user: UserEntity = null) {
    try {
      let id: number = null;
      if (user) {
        id = user.id;
      }
      const record = await this.repo.insert({
        ...data,
        createdBy: { id },
      } as QueryDeepPartialEntity<Entity>);
      return this.findById(record.raw[0].id, []);
    } catch (e) {
      console.error(e);
      throw new TypeORMError(e);
    }
  }

  async findOne(option: any): Promise<Entity> {
    option.relations = [
      ...((option.relations as Array<string>) || []),
      "createdBy",
      "updatedBy",
    ];
    const record = this.repo.findOne(option);
    return record;
  }

  async findById(id: number, relations: string[]): Promise<Entity> {
    try {
      relations = [
        ...((relations as Array<string>) || []),
        "createdBy",
        "updatedBy",
      ];

      const option: any = {
        where: { id },
      };
      const record = await this.findOne({ ...option, relations });
      if (!record)
        throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
      return record;
    } catch (e) {
      console.error(e);
      throw new TypeORMError(e);
    }
  }

  async update(
    user: UserEntity = null,
    id: number,
    data: UpdateDto
  ): Promise<Entity> {
    const record = await this.findById(id, []);
    let userId: number = null;
    if (user) {
      userId = user.id;
    }
    Object.assign(record, {
      ...data,
      updatedBy: { id: userId },
      updatedAt: new Date(),
    });
    try {
      return await this.repo.save(record);
    } catch (e) {
      console.error(e);
      throw new TypeORMError(e);
    }
  }

  async findAll(
    sort: any,
    relations: string[],
    filter: any,
    search: any,
    dateFilter?: { startDate: Date; endDate: Date } // Добавленный параметр для фильтрации по дате
  ): Promise<any> {
    let convertedSearch = null;
    if (search) {
      const key = Object.keys(search)[0];
      const obj = search[key];
      convertedSearch = { [key]: Like(`%${obj}%`) };
    }

    // Создание условия для фильтрации по дате
    let dateConditions = {};
    if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
      const endDate = new Date(dateFilter.endDate);
      endDate.setDate(endDate.getDate() + 1);
      dateConditions = {
        createdAt: Between(new Date(dateFilter.startDate), endDate), // Или updatedAt, в зависимости от того, что вам нужно
      };
    }

    console.log(dateConditions);

    try {
      const records = await this.repo.find({
        order: sort,
        relations,
        where: {
          ...filter,
          ...convertedSearch,
          ...dateConditions, // Добавление условий фильтрации по дате к остальным условиям
        },
      });

      return {
        records,
      };
    } catch (error) {
      console.error(error);
      throw new TypeORMError(error);
    }
  }

  private createMeta(page: number, pageSize: number, total: number) {
    const meta = {
      page,
      pageSize,
      pageCount: Math.ceil(total / pageSize),
      total,
    };
    return meta;
  }

  async delete(user: UserEntity, id: number): Promise<any> {
    const record = await this.findById(Number(id), []);
    // console.warn(
    //   `Record id: ${id} was deleted by: id: ${user.id}
    //                              email: ${user.email}`,
    // );
    return await this.repo.delete(id);
    // return record;
  }
}
