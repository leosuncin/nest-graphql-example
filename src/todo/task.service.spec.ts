import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMockInstance } from 'jest-create-mock-instance';

import { Task } from './task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let repositoryMock: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Task)) {
          const mock = createMockInstance(Repository);

          mock.save.mockImplementation((entity) => Promise.resolve(entity));
          mock.findOneBy.mockImplementation((where) =>
            Promise.resolve(Object.assign(new Task(), where)),
          );

          return mock;
        }
      })
      .compile();

    service = module.get<TaskService>(TaskService);
    repositoryMock = module.get<
      Repository<Task>,
      jest.Mocked<Repository<Task>>
    >(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create one task', async () => {
    repositoryMock.create.mockImplementation((dto) =>
      Object.assign(new Task(), dto),
    );

    await expect(service.createOne('Learn GraphQL')).resolves.toBeInstanceOf(
      Task,
    );
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should get one task by id', async () => {
    await expect(
      service.getOne('548443d7-20fd-4b06-8932-a134fdec798e'),
    ).resolves.toBeInstanceOf(Task);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
      id: '548443d7-20fd-4b06-8932-a134fdec798e',
    });
  });

  it('should fail to get one task when not exist', async () => {
    repositoryMock.findOneBy.mockResolvedValueOnce(undefined);

    await expect(
      service.getOne('548443d7-20fd-4b06-8932-a134fdec798e'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should list all tasks', async () => {
    repositoryMock.find.mockResolvedValueOnce(
      Array.from({ length: 5 }, () => new Task()),
    );

    await expect(service.listAll()).resolves.toMatchObject(
      expect.arrayContaining([expect.any(Task)]),
    );
    expect(repositoryMock.find).toHaveBeenCalled();
  });

  it('should update one existing task', async () => {
    repositoryMock.merge.mockImplementation(Object.assign);

    await expect(
      service.updateOne('548443d7-20fd-4b06-8932-a134fdec798e', {
        title: 'Learn Nest.js',
      }),
    ).resolves.toHaveProperty('title', 'Learn Nest.js');
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should remove one task', async () => {
    repositoryMock.remove.mockImplementation((entity) =>
      Promise.resolve(entity),
    );

    await expect(
      service.removeOne('548443d7-20fd-4b06-8932-a134fdec798e'),
    ).resolves.toBeInstanceOf(Task);
    expect(repositoryMock.delete).toHaveBeenCalled();
  });
});
