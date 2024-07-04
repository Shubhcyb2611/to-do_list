import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720068578666 implements MigrationInterface {
    name = 'Migration1720068578666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "title" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "image" character varying, "dateOfCompletion" TIMESTAMP, "createdById" integer, CONSTRAINT "PK_d454c4b9eac15cc27c2ed8e4138" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD CONSTRAINT "FK_e6547f7e7da4c2ef905f9f2c479" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" DROP CONSTRAINT "FK_e6547f7e7da4c2ef905f9f2c479"`);
        await queryRunner.query(`DROP TABLE "todo_item"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
