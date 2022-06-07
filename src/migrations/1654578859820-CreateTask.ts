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
    // await queryRunner.query(/* sql */ `
    //   CREATE TABLE \`task\` (
    //     \`id\` varchar(36) NOT NULL,
    //     \`title\` varchar(255) NOT NULL,
    //     \`completed\` tinyint NOT NULL DEFAULT 0,
    //     \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    //     \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    //     PRIMARY KEY (\`id\`)
    //   ) ENGINE = InnoDB
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.#tableName);
    // await queryRunner.query(/* sql */ `
    //   DROP TABLE \`task\`
    // `);
  }
}
