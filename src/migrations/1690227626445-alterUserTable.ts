import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1690227626445 implements MigrationInterface {
  name = "AlterUserTable1690227626445";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
  }
}
