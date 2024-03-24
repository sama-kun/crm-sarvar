import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1711250034134 implements MigrationInterface {
  name = "Initial1711250034134";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."file_type_enum" AS ENUM('pdf', 'image')`
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "secure_url" character varying NOT NULL, "asset_id" character varying NOT NULL, "public_id" character varying NOT NULL, "type" "public"."file_type_enum" NOT NULL DEFAULT 'image', "folder" character varying, "updatedById" integer, "createdById" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "standard" double precision NOT NULL, "discount1" double precision, "discount2" double precision, "updatedById" integer, "createdById" integer, "imageId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."basket_discounttype_enum" AS ENUM('standard', 'discount1', 'discount2')`
    );
    await queryRunner.query(
      `CREATE TABLE "basket" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "discountType" "public"."basket_discounttype_enum" NOT NULL DEFAULT 'standard', "updatedById" integer, "createdById" integer, "productId" integer, "orderId" integer, CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "debts" integer NOT NULL, "updatedById" integer, "createdById" integer, "userId" integer, CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."paymentHistory_paymenttype_enum" AS ENUM('paid', 'debt', 'partly')`
    );
    await queryRunner.query(
      `CREATE TABLE "paymentHistory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "money" integer NOT NULL, "paymentType" "public"."paymentHistory_paymenttype_enum" NOT NULL DEFAULT 'debt', "updatedById" integer, "createdById" integer, "orderId" integer, "profileId" integer, CONSTRAINT "PK_7275b553c86a64939a699be5ce3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_paymenttype_enum" AS ENUM('paid', 'debt', 'partly')`
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" double precision, "remains" double precision, "paymentType" "public"."order_paymenttype_enum" NOT NULL DEFAULT 'debt', "updatedById" integer, "createdById" integer, "ownerId" integer, "deliverymanId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'deliveryman', 'client', 'root')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "name" character varying, "address" character varying, "carNumber" character varying, "phone" character varying, "updatedById" integer, "createdById" integer, "deliverymanAsClientId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_e1b1af341c80fafd98f699c50b6" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_d7187ebff85831dd00deaa3e0cc" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_9c29670ff9dd3fd43cf20733c19" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_806302f2d4da2a0c27eedbf34fe" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b1b332c0f436897f21a960f26c7" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_e781b3d7fac08e0adb515bf10df" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_dfd2a15cd5479e6fc4a0e7f603f" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_9d24569bde430378e920f27083b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" ADD CONSTRAINT "FK_e4dff54ff666a3011403949f73d" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_27f5b981e7e0375bad667ff1d5d" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_0d22e689d83d39325f7758d39d5" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" ADD CONSTRAINT "FK_2ca931eaea2c460f85061ac7f53" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" ADD CONSTRAINT "FK_c129f0421bc10e0373a792f13fc" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" ADD CONSTRAINT "FK_b29b7051df2cfb18a0a21a3861b" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" ADD CONSTRAINT "FK_ad9fa7a03c15570078c98829987" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_8289699b21674ff4897a9406af0" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_de6fa8b07fd7e0a8bf9edb5eb38" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_36eff870cbb426cbaa8f79de886" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_636e9801600f4b04cc77922a487" FOREIGN KEY ("deliverymanId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_db5173f7d27aa8a98a9fe6113df" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e368f8695610aab6da0d4cfc4ed" FOREIGN KEY ("deliverymanAsClientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e368f8695610aab6da0d4cfc4ed"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_db5173f7d27aa8a98a9fe6113df"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_636e9801600f4b04cc77922a487"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_36eff870cbb426cbaa8f79de886"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_de6fa8b07fd7e0a8bf9edb5eb38"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_8289699b21674ff4897a9406af0"`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" DROP CONSTRAINT "FK_ad9fa7a03c15570078c98829987"`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" DROP CONSTRAINT "FK_b29b7051df2cfb18a0a21a3861b"`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" DROP CONSTRAINT "FK_c129f0421bc10e0373a792f13fc"`
    );
    await queryRunner.query(
      `ALTER TABLE "paymentHistory" DROP CONSTRAINT "FK_2ca931eaea2c460f85061ac7f53"`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_0d22e689d83d39325f7758d39d5"`
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_27f5b981e7e0375bad667ff1d5d"`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_e4dff54ff666a3011403949f73d"`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_9d24569bde430378e920f27083b"`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_dfd2a15cd5479e6fc4a0e7f603f"`
    );
    await queryRunner.query(
      `ALTER TABLE "basket" DROP CONSTRAINT "FK_e781b3d7fac08e0adb515bf10df"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b1b332c0f436897f21a960f26c7"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_806302f2d4da2a0c27eedbf34fe"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_9c29670ff9dd3fd43cf20733c19"`
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_d7187ebff85831dd00deaa3e0cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_e1b1af341c80fafd98f699c50b6"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "public"."order_paymenttype_enum"`);
    await queryRunner.query(`DROP TABLE "paymentHistory"`);
    await queryRunner.query(
      `DROP TYPE "public"."paymentHistory_paymenttype_enum"`
    );
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "basket"`);
    await queryRunner.query(`DROP TYPE "public"."basket_discounttype_enum"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TYPE "public"."file_type_enum"`);
  }
}
