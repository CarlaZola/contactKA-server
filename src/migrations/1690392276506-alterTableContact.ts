import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableContact1690392276506 implements MigrationInterface {
  name = "AlterTableContact1690392276506";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "phone" character varying(18) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "phone" character varying(11) NOT NULL`
    );
  }
}
