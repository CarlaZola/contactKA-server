import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserColumn1690301939787 implements MigrationInterface {
  name = "AlterUserColumn1690301939787";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "original_email"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "original_email" character varying(120)`
    );
  }
}
