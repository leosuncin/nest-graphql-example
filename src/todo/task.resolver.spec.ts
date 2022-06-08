import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';

import { Task } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

describe('TaskResolver', () => {
  let resolver: TaskResolver;
  let serviceMock: jest.Mocked<TaskService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver],
    })
      .useMocker((token) => {
        if (Object.is(token, TaskService)) {
          return createMockInstance(TaskService);
        }
      })
      .compile();

    resolver = module.get<TaskResolver>(TaskResolver);
    serviceMock = module.get<TaskService, jest.Mocked<TaskService>>(
      TaskService,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should add a task and return it', async () => {
    const title = 'Learn GraphQL';
    serviceMock.createOne.mockResolvedValueOnce(
      Object.assign(new Task(), { title }),
    );

    const task = await resolver.addTask(title);

    expect(task).toBeInstanceOf(Task);
    expect(task).toHaveProperty('title', title);
    expect(task).toHaveProperty('completed', false);
  });

  it('should return all tasks', async () => {
    serviceMock.listAll.mockResolvedValueOnce(
      Array.from({ length: 5 }, () => new Task()),
    );

    const tasks = await resolver.tasks();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks).toHaveLength(5);
  });

  it('should update a task and return it', async () => {
    const id = '548443d7-20fd-4b06-8932-a134fdec798e';
    const changes = { title: 'Learn Nest.js', completed: true };
    serviceMock.updateOne.mockResolvedValueOnce(
      Object.assign(new Task(), { id }, changes),
    );

    const task = await resolver.updateTask(id, changes);

    expect(task).toBeInstanceOf(Task);
    expect(task).toHaveProperty('title', changes.title);
    expect(task).toHaveProperty('completed', changes.completed);
  });

  it('should delete a task and return it', async () => {
    const id = '548443d7-20fd-4b06-8932-a134fdec798e';
    serviceMock.removeOne.mockResolvedValueOnce(
      Object.assign(new Task(), { id }),
    );

    const task = await resolver.deleteTask(id);

    expect(task).toBeInstanceOf(Task);
  });
});
