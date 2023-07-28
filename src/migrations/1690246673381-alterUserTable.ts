import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1690246673381 implements MigrationInterface {
  name = "AlterUserTable1690246673381";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying(15) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying(11) NOT NULL`
    );
  }
}
