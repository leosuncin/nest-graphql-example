import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import type { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

import { AppModule } from '../src/app.module';
import { Task } from '../src/todo/task.entity';
import { TaskService } from '../src/todo/task.service';

const uuidRegex = /[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}/;
const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

describe('TaskResolver (e2e)', () => {
  let app: INestApplication;
  let task: Task;
  const graphqlEndpoint = '/graphql';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get<DataSource>(getDataSourceToken());
    await runSeeders(dataSource);

    await app.init();
    task = await app.get(TaskService).createOne('Learn E2E tests');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add a task', async () => {
    const title = 'Learn GraphQL';
    const addTask = /* gql */ `mutation AddTask($title: String!) {
      addTask(title: $title) {
        completed
        createdAt
        id
        title
        updatedAt
      }
    }`;

    await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: addTask,
        variables: { title },
      })
      .set('accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect('content-type', /application\/json/)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          data: {
            addTask: {
              completed: false,
              createdAt: expect.stringMatching(isoDateRegex),
              id: expect.stringMatching(uuidRegex),
              title,
              updatedAt: expect.stringMatching(isoDateRegex),
            },
          },
        });
      });
  });

  it('should return all tasks', async () => {
    const listAll = /* gql */ `query ListAll {
      tasks {
        completed
        createdAt
        id
        title
        updatedAt
      }
    }`;

    await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: listAll,
      })
      .set('accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect('content-type', /application\/json/)
      .expect(({ body }) => {
        const { tasks } = body.data;

        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks.length).toBeGreaterThanOrEqual(0);
      });
  });

  it('should update a task', async () => {
    const changes = { title: 'Learn Nest.js', completed: true };
    const updateTask = /* gql */ `mutation UpdateTask($id: ID!, $updateTaskInput: UpdateTaskInput!) {
      updateTask(id: $id, updateTaskInput: $updateTaskInput) {
        completed
        createdAt
        id
        title
        updatedAt
      }
    }`;

    await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: updateTask,
        variables: {
          id: task.id,
          updateTaskInput: changes,
        },
      })
      .set('accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect('content-type', /application\/json/)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          data: {
            updateTask: {
              completed: changes.completed,
              createdAt: expect.stringMatching(isoDateRegex),
              id: task.id,
              title: changes.title,
              updatedAt: expect.stringMatching(isoDateRegex),
            },
          },
        });
      });
  });

  it('should delete a task', async () => {
    const deleteTask = /* gql */ `mutation DeleteTask($id: ID!) {
      deleteTask(id: $id) {
        completed
        createdAt
        id
        title
        updatedAt
      }
    }`;

    await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: deleteTask,
        variables: {
          id: task.id,
        },
      })
      .set('accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect('content-type', /application\/json/)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          data: {
            deleteTask: {
              completed: expect.any(Boolean),
              createdAt: expect.stringMatching(isoDateRegex),
              id: task.id,
              title: expect.any(String),
              updatedAt: expect.stringMatching(isoDateRegex),
            },
          },
        });
      });
  });
});
