"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSeed9999999999999 = void 0;
const user_entity_1 = require("../entities/user.entity");
const users_seed_1 = require("../seeds/users.seed");
class UsersSeed9999999999999 {
    constructor() {
        this.name = 'UsersSeed9999999999999';
    }
    async up(queryRunner) {
        if (queryRunner.isTransactionActive)
            await queryRunner.commitTransaction();
        for (const user of users_seed_1.users) {
            await queryRunner.manager.insert(user_entity_1.UserEntity, user);
        }
        await queryRunner.startTransaction();
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "user"`);
    }
}
exports.UsersSeed9999999999999 = UsersSeed9999999999999;
//# sourceMappingURL=9999999999999-user-seed.js.map