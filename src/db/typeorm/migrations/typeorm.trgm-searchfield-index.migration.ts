import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTrgmIndexOnPersonSearchField1704031883551
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS search_field_trgm_idx ON person USING GIN (search_field gin_trgm_ops);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS search_field_trgm_idx;`);
  }
}
