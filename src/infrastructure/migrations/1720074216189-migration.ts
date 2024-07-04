import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720074216189 implements MigrationInterface {
    name = 'Migration1720074216189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" DROP CONSTRAINT "FK_e6547f7e7da4c2ef905f9f2c479"`);
        await queryRunner.query(`ALTER TABLE "todo_item" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "todo_item" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD "createdBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD "createdBy" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD CONSTRAINT "FK_e6547f7e7da4c2ef905f9f2c479" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
