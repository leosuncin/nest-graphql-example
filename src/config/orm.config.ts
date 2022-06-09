import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { CreateTask1654578859820 } from '../migrations/1654578859820-CreateTask';
import { Task } from '../todo/task.entity';
import TaskFactory from '../todo/task.factory';
import TaskSeeder from '../todo/task.seeder';

const mainOptions: DataSourceOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false,
  migrations: [CreateTask1654578859820],
  entities: [Task],
};

const testOptions: DataSourceOptions & SeederOptions = {
  ...mainOptions,
  migrationsRun: true,
  factories: [TaskFactory],
  seeds: [TaskSeeder],
};

// used by CLI commands
export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test' ? testOptions : mainOptions,
);

export default registerAs('orm', () =>
  process.env.NODE_ENV === 'test' ? testOptions : mainOptions,
);
