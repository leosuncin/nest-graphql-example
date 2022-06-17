import { setSeederFactory } from 'typeorm-extension';
import { Task } from './task.entity';

export default setSeederFactory(Task, (faker) =>
  Object.assign(new Task(), {
    title: faker.hacker.phrase(),
    completed: faker.datatype.boolean(),
  }),
);
