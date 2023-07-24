import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1690212759545 implements MigrationInterface {
    name = 'InitialMigration1690212759545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(120) NOT NULL, "phone" character varying(11) NOT NULL, "nickname" character varying(50), "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9" UNIQUE ("full_name"), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "phone" character varying(11) NOT NULL, "nickname" character varying(50), "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_862add8c9d8b0dfb58f3ca16ba7" UNIQUE ("full_name"), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
