import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableContact1690392947461 implements MigrationInterface {
    name = 'AlterTableContact1690392947461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "full_name" character varying(69) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9" UNIQUE ("full_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "full_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9" UNIQUE ("full_name")`);
    }

}
