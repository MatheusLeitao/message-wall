import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1614179910771 implements MigrationInterface {

    private table = new Table({
        name:'users',
        columns:[
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'email',
                type: 'varchar',
                length: '255',
                isNullable: false,
                isUnique: true
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            }
        ]

    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table)
    }

}
