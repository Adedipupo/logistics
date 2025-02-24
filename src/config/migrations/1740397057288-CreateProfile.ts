import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfile1740397057288 implements MigrationInterface {
    name = 'CreateProfile1740397057288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "address" character varying, "photo" character varying, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_ca49e738c1e64b0c839cae30d4e" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_ca49e738c1e64b0c839cae30d4e" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_ca49e738c1e64b0c839cae30d4e"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_ca49e738c1e64b0c839cae30d4e"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "profileId"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
