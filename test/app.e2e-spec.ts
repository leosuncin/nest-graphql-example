import { HttpStatus, INestApplication } from '@nestjs/common';
import { request, spec } from 'pactum';

import { bootstrap } from '../src/main';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await bootstrap({ logger: false });

    await app.listen(0);

    const url = await app.getUrl();
    request.setBaseUrl(url.replace('::', 'localhost'));
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await spec()
      .get('/')
      .expectStatus(HttpStatus.OK)
      .expectBody('Hello World!');
  });
});
