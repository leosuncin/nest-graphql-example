import type { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export async function bootstrap(options?: NestApplicationOptions) {
  return NestFactory.create(AppModule, options);
}

if (require.main === module) {
  void bootstrap().then((app) => app.listen(process.env.PORT ?? 3000));
}
