import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArticleAddTitleColumn1693338855089 implements MigrationInterface {
  name = 'ArticleAddTitleColumn1693338855089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "article"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "article"."updateAt" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "article"."updateAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "article"."createdAt" IS NULL`);
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "title"`);
  }
}
