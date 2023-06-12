import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCalendar1686583621330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "calendar",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "stats",
                        type: "varchar",
                        precision: 10,
                        isNullable: true
                    },
                    {
                        name: "user_id",
                        type: "integer",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_calendar_user",
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("calendar");
    }

}
