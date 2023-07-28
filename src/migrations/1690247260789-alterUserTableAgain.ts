import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTableAgain1690247260789 implements MigrationInterface {
  name = "AlterUserTableAgain1690247260789";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying(18) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying(15) NOT NULL`
    );
  }
}
