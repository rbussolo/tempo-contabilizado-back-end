import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateCalendarAtActivity1686583789558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE activities ADD COLUMN calendar_id INTEGER;

            CREATE INDEX IDX_ACTIVITY_CALENDAR ON activities (calendar_id);

            ALTER TABLE activities ADD CONSTRAINT FK_ACTIVITY_CALENDAR FOREIGN KEY (calendar_id) REFERENCES calendar(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IDX_ACTIVITY_CALENDAR;

            ALTER TABLE activities DROP COLUMN calendar_id;
        `);
    }

}
