import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import type { DataSource } from 'typeorm';

import { Task } from './task.entity';

class TaskSeeder implements Seeder {
  async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const taskFactory = factoryManager.get(Task);
    await taskFactory.saveMany(5);
  }
}

export default TaskSeeder;
