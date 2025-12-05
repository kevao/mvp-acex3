import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserCpf1732606000000 implements MigrationInterface {
  name = 'AddUserCpf1732606000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "cpf" varchar(11)`);
    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_users_cpf" ON "users" ("cpf") WHERE cpf IS NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_users_cpf"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "cpf"`);
  }
}
