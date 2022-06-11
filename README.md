# 🎲 Nest.js GraphQL Example

[![MegaLinter](https://github.com/leosuncin/nest-graphql-example/workflows/MegaLinter/badge.svg?branch=master)](https://github.com/leosuncin/nest-graphql-example/actions/workflows/mega-linter.yml)
[![CI](https://github.com/leosuncin/nest-graphql-example/workflows/CI/badge.svg?branch=master)](https://github.com/leosuncin/nest-graphql-example/actions/workflows/ci.yml)
![Prettier](https://img.shields.io/badge/Code%20style-prettier-informational?logo=prettier&logoColor=white)
[![GPL v3 License](https://img.shields.io/badge/License-GPLv3-green.svg)](./LICENSE)
[![HitCount](https://hits.dwyl.com/leosuncin/nest-graphql-example.svg)](https://hits.dwyl.com/leosuncin/nest-graphql-example)

> An example of how to create and test a GraphQL Server with Nest.js and TypeORM

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Features

- GraphQL server with [Apollo](https://www.apollographql.com/)
- [Code first](https://docs.nestjs.com/graphql/quick-start#code-first) approach to build the schema
- [TypeORM](https://typeorm.io/) to connect with MySQL
- Unit tests and E2E tests
- [PNPM](https://pnpm.io/) for a fast and efficient installation
- Check code quality with [MegaLinter](https://megalinter.github.io/latest/)
- Check continuous integration with [github actions](.github/workflows/ci.yml)
- Run the necessary services with [docker compose](https://docs.docker.com/compose/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/leosuncin/nest-graphql-example.git
```

Go to the project directory

```bash
  cd nest-graphql-example
```

Install dependencies

```bash
  pnpm install
```

Create a `.env` from the example one and customize it with your [environment variables](#environment-variables)

```bash
  cp .env.example .env
```

Start the services using Docker Compose

```bash
  docker-compose up -d
```

Run migrations to create the DB schema

```bash
  pnpm typeorm migration:run
```

Start the server

```bash
  pnpm start:dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MYSQL_DATABASE` the name of the database to connect in the MySQL instance **(required)**

`MYSQL_ROOT_PASSWORD` The password of the _root_ user to connect to the MySQL instance **(required)**

`DATABASE_URL` a connection string to the MySQL instance, example _mysql://root@localhost/example-db_ **(required)**

You can copy the example `.env` and edit the values

```bash
  cp .env.example .env
```

## Running Tests

To run unit tests, run the following command:

```bash
  pnpm test
```

To run e2e tests (the MySQL instance must be available), run the following command:

```bash
  pnpm test:e2e
```

## Tech Stack

**Server:** Typescript, MySQL, Nest.js, TypeORM, Apollo

**Test:** Jest, SuperTest

**DevOps:** Docker Compose

## Author

👤 **Jaime Leonardo Suncin Cruz**

- Twitter: [@jl_suncin](https://twitter.com/jl_suncin)
- Github: [@leosuncin](https://github.com/leosuncin)
<!-- markdown-link-check-disable -->
- LinkedIn: [@jaimesuncin](https://linkedin.com/in/jaimesuncin)
<!-- markdown-link-check-enable -->

## Show your support

Give a ⭐️ if this project helped you!

## Related

Here are some more example projects with Nest.js

[![Authentication example](https://github-readme-stats.vercel.app/api/pin/?username=leosuncin&repo=nest-auth-example)](https://github.com/leosuncin/nest-auth-example)

[![API example](https://github-readme-stats.vercel.app/api/pin/?username=leosuncin&repo=nest-api-example)](https://github.com/leosuncin/nest-api-example)

[![TypeORM custom repository](https://github-readme-stats.vercel.app/api/pin/?username=leosuncin&repo=nest-typeorm-custom-repository)](https://github.com/leosuncin/nest-typeorm-custom-repository)

## License

Release under the terms of [GPL v3](./LICENSE)
