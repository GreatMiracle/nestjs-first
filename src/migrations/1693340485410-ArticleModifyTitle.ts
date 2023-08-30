import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleModifyTitle1693340485410 implements MigrationInterface {
    name = 'ArticleModifyTitle1693340485410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."title" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."updateAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "article"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "article"."title" IS NULL`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "title" SET NOT NULL`);
    }

}
