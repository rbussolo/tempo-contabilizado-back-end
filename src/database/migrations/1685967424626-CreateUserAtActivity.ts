import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserAtActivity1685967424626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE activities ADD COLUMN user_id INTEGER;

            CREATE INDEX IDX_ACTIVITY_USER ON activities (user_id);

            ALTER TABLE activities ADD CONSTRAINT FK_ACTIVITY_USER FOREIGN KEY (user_id) REFERENCES users(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IDX_ACTIVITY_USER;

            ALTER TABLE activities DROP COLUMN user_id;
        `);
    }
}
