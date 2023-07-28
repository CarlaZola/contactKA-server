import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1690219447947 implements MigrationInterface {
  name = "InitialMigration1690219447947";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "phone" character varying(11) NOT NULL, "nickname" character varying(50), "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9" UNIQUE ("full_name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(120) NOT NULL, "phone" character varying(11) NOT NULL, "nickname" character varying(50), "createdAt" date NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9" UNIQUE ("full_name"), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`
    );
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
