import { MigrationInterface, QueryRunner } from "typeorm";

export class Phone1710784044382 implements MigrationInterface {
    name = 'Phone1710784044382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
