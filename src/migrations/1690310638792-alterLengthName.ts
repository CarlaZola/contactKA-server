import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLengthName1690310638792 implements MigrationInterface {
    name = 'AlterLengthName1690310638792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9" UNIQUE ("full_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9" UNIQUE ("full_name")`);
    }

}
