import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1690221427059 implements MigrationInterface {
    name = 'AlterUserTable1690221427059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "original_email" character varying(120)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "original_email"`);
    }

}
