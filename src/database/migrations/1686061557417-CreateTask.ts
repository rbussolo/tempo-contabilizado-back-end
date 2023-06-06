import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTask1686061557417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "description",
                        type: "varchar",
                        precision: 100,
                        isNullable: true
                    },
                    {
                        name: "startTime",
                        type: "varchar",
                        precision: 5,
                        isNullable: true
                    },
                    {
                        name: "stopTime",
                        type: "varchar",
                        precision: 5,
                        isNullable: true
                    },
                    {
                        name: "duration",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "stats",
                        type: "varchar",
                        precision: 10,
                        isNullable: true
                    },
                    {
                        name: "activity_id",
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
                        name: "fk_task_activity",
                        columnNames: ["activity_id"],
                        referencedTableName: "activities",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks");
    }

}
