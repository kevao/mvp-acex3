import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPhoneAndAddress1732605000000 implements MigrationInterface {
  name = 'AddUserPhoneAndAddress1732605000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" varchar(20)`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "addresses" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" uuid UNIQUE NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "street" varchar(255) NOT NULL,
        "number" varchar(50) NOT NULL,
        "complement" varchar(255),
        "district" varchar(255) NOT NULL,
        "city" varchar(255) NOT NULL,
        "state" varchar(2) NOT NULL,
        "zip_code" varchar(20) NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT now(),
        "updated_at" TIMESTAMPTZ DEFAULT now()
      )
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'update_addresses_updated_at' AND tgrelid = 'addresses'::regclass
        ) THEN
          CREATE TRIGGER update_addresses_updated_at
          BEFORE UPDATE ON "addresses"
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        END IF;
      END
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS update_addresses_updated_at ON "addresses"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "addresses"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "phone"`);
  }
}
