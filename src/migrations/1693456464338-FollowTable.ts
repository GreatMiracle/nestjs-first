import {MigrationInterface, QueryRunner} from "typeorm";

export class FollowTable1693456464338 implements MigrationInterface {
    name = 'FollowTable1693456464338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."updateAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "article"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."createdAt" IS NULL`);
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
