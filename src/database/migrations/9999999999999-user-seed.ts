import { MigrationInterface, QueryRunner } from "typeorm";
import { UserEntity } from "@/database/entities/user.entity";
import { users } from "../seeds/users.seed";
import { RoleEnum } from "@/interfaces/enums";
import { ProfileEntity } from "../entities/profile.entity";

export class UsersSeed9999999999999 implements MigrationInterface {
  name = "UsersSeed9999999999999";

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of users) {
      const newUser = await queryRunner.manager.insert(UserEntity, user);
      if (newUser.identifiers[0].role === RoleEnum.CLIENT) {
        await queryRunner.manager.insert(ProfileEntity, {
          debts: 0,
          user: newUser.identifiers[0].id,
        });
      }
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user"`);
  }
}
