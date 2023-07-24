import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEntities1690216416949 implements MigrationInterface {
    name = 'AlterEntities1690216416949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "phone" character varying(11) NOT NULL, "nickname" character varying(50), "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9" UNIQUE ("full_name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "userId"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}