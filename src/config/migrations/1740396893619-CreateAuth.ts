import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuth1740396893619 implements MigrationInterface {
    name = 'CreateAuth1740396893619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email"), CONSTRAINT "UQ_366ebf23d8f3781bb7bb37abbd1" UNIQUE ("username"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
