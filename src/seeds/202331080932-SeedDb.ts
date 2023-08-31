import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1693213226078 implements MigrationInterface {
  name = 'SeedDb1693213226078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tag (name) 
      VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    await queryRunner.query(
      // password is 123
      `INSERT INTO users (username, email, password) 
      VALUES ('abc', 'abc@gmail.com', '$2b$10$sb6FXe8PuK8w6uioXxVgBe5UG1lJj2dGjf4PzWDlGEvhdCss7SVJ2')`,
    );

    await queryRunner.query(
      `INSERT INTO article (slug, title, description, body, "tagList", "authorId")
       VALUES ('first-article', 'First article', 'First article description', 'First article body', 'coffee,dragons', 3)
            ,('second-article', 'Second article', 'Second article description', 'Second article body', 'coffee,dragons', 3)`,
    );
  }

  public async down(): Promise<void> {}
}
