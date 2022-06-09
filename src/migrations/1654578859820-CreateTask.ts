import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTask1654578859820 implements MigrationInterface {
  name = 'CreateTask1654578859820';
  #tableName = 'task';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const todoTable = new Table({
      name: this.#tableName,
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'completed',
          type: 'boolean',
          isNullable: false,
          default: false,
        },
        {
          name: 'createdAt',
          type: 'datetime',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updatedAt',
          type: 'datetime',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    });

    await queryRunner.createTable(todoTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.#tableName);
  }
}
