import { HttpStatus, INestApplication } from '@nestjs/common';
import { request, spec } from 'pactum';

import { bootstrap } from '../src/main';

const uuidRegex = /[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}/;
const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

describe('TaskResolver (e2e)', () => {
  let app: INestApplication;
  const graphqlEndpoint = '/graphql';

  beforeAll(async () => {
    app = await bootstrap({ logger: false });

    await app.listen(0);
    const url = await app.getUrl();

    request.setBaseUrl(url.replace('::', 'localhost'));
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

    await spec()
      .post(graphqlEndpoint)
      .withGraphQLQuery(addTask)
      .withGraphQLVariables({ title })
      .expectStatus(HttpStatus.OK)
      .expectJsonLike({
        data: {
          addTask: {
            completed: false,
            createdAt: isoDateRegex,
            id: uuidRegex,
            title,
            updatedAt: isoDateRegex,
          },
        },
      })
      .stores('task', '.data.addTask')
      .toss();
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

    await spec()
      .post(graphqlEndpoint)
      .withGraphQLQuery(listAll)
      .expectStatus(HttpStatus.OK)
      .expect(({ res: { body } }) => {
        const { tasks } = body.data;

        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks.length).toBeGreaterThanOrEqual(0);
      })
      .toss();
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

    await spec()
      .post(graphqlEndpoint)
      .withGraphQLQuery(updateTask)
      .withGraphQLVariables({
        id: '$S{task.id}',
        updateTaskInput: changes,
      })
      .expectStatus(HttpStatus.OK)
      .expectJsonLike({
        data: {
          updateTask: {
            completed: changes.completed,
            createdAt: isoDateRegex,
            id: '$S{task.id}',
            title: changes.title,
            updatedAt: isoDateRegex,
          },
        },
      })
      .stores('task', '.data.updateTask')
      .toss();
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

    await spec()
      .post(graphqlEndpoint)
      .withGraphQLQuery(deleteTask)
      .withGraphQLVariables({ id: '$S{task.id}' })
      .expectStatus(HttpStatus.OK)
      .expectJsonLike({
        data: {
          deleteTask: {
            completed: '$S{task.completed}',
            createdAt: '$S{task.createdAt}',
            id: '$S{task.id}',
            title: '$S{task.title}',
            updatedAt: '$S{task.updatedAt}',
          },
        },
      })
      .toss();
  });
});
