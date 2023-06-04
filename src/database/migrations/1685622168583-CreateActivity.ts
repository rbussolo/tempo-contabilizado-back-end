import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateActivity1685622168583 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "activities",
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
                        name: "date",
                        type: "timestamp",
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
                        name: "tags",
                        type: "varchar",
                        precision: 10,
                        isArray: true,
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("activities");
    }

}
