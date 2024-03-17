"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const console = new common_1.Logger('BaseService');
class BaseService {
    async create(data, user = null) {
        try {
            let id = null;
            if (user) {
                id = user.id;
            }
            const record = await this.repo.insert(Object.assign(Object.assign({}, data), { createdBy: { id } }));
            return this.findById(record.raw[0].id, []);
        }
        catch (e) {
            console.error(e);
            throw new typeorm_1.TypeORMError(e);
        }
    }
    async findOne(option) {
        option.relations = [
            ...(option.relations || []),
            'createdBy',
            'updatedBy',
        ];
        const record = this.repo.findOne(option);
        return record;
    }
    async findById(id, relations) {
        try {
            relations = [
                ...(relations || []),
                'createdBy',
                'updatedBy',
            ];
            const option = {
                where: { id },
            };
            const record = await this.findOne(Object.assign(Object.assign({}, option), { relations }));
            if (!record)
                throw new common_1.HttpException('Record not found', common_1.HttpStatus.NOT_FOUND);
            return record;
        }
        catch (e) {
            console.error(e);
            throw new typeorm_1.TypeORMError(e);
        }
    }
    async update(user = null, id, data) {
        const record = await this.findById(id, []);
        let userId = null;
        if (user) {
            userId = user.id;
        }
        Object.assign(record, Object.assign(Object.assign({}, data), { updatedBy: { id: userId }, updatedAt: new Date() }));
        try {
            return await this.repo.save(record);
        }
        catch (e) {
            console.error(e);
            throw new typeorm_1.TypeORMError(e);
        }
    }
    async findAll(pagination, sort, relations, filter, search) {
        let page = 1;
        let pageSize = 10;
        let convertedSearch = null;
        if (search) {
            const key = Object.keys(search)[0];
            const obj = search[key];
            convertedSearch = { [key]: (0, typeorm_1.Like)(`%${obj}%`) };
        }
        if (pagination && typeof pagination === 'object') {
            page = parseInt(pagination.page, 10) || 1;
            pageSize = parseInt(pagination.pageSize, 10) || 10;
        }
        try {
            const records = await this.repo.find({
                order: sort,
                skip: (page - 1) * pageSize,
                take: pageSize,
                relations,
                where: Object.assign(Object.assign({}, filter), convertedSearch),
            });
            const total = await this.repo.find({
                order: sort,
                relations,
                where: Object.assign(Object.assign({}, filter), convertedSearch),
            });
            const meta = this.createMeta(page, pageSize, total.length);
            return {
                records,
                meta,
            };
        }
        catch (error) {
            console.error(error);
            throw new typeorm_1.TypeORMError(error);
        }
    }
    createMeta(page, pageSize, total) {
        const meta = {
            page,
            pageSize,
            pageCount: Math.ceil(total / pageSize),
            total,
        };
        return meta;
    }
    async delete(user, id) {
        const record = await this.findById(Number(id), []);
        return await this.repo.delete(record.id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map