import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@/database/entities/user.entity';
import { users } from '../seeds/users.seed';

export class UsersSeed9999999999999 implements MigrationInterface {
  name = 'UsersSeed9999999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of users) {
      await queryRunner.manager.insert(UserEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user"`);
  }
}
