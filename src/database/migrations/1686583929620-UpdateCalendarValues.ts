import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateCalendarValues1686583929620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO calendar(user_id, date, stats)
                SELECT 
                    user_id, 
                    date, 
                    case when exists(select * from activities x where x.date = a.date and x.user_id = a.user_id and x."stopTime" = '') then 'activity_with_problem'::calendar_stats_enum else 'has_activity'::calendar_stats_enum end as stats
                FROM activities a
                GROUP BY user_id, date;

            UPDATE activities a
            SET calendar_id = (SELECT id FROM calendar c WHERE c.date = a.date AND c.user_id = a.user_id)
            WHERE calendar_id is null;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
