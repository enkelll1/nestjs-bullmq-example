import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  // midlewares
  app.use(helmet({ contentSecurityPolicy: false }));
  //app.use(csurf()); to be decided if token will be used on cookie or headers

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board');

  const aQueue = app.get<Queue>(`BullQueue_my-queue`);
  createBullBoard({
    queues: [new BullAdapter(aQueue)],
    serverAdapter,
  });

  app.use(
    '/bull-board',
    expressBasicAuth({
      users: {
        user: `enkel`,
      },
      challenge: true,
    }),
    serverAdapter.getRouter(),
  );
  await app.listen(85);
}
bootstrap();
