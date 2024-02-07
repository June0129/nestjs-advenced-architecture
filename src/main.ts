import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({ driver: 'orm' }),
    {
      logger: ['log', 'debug', 'error', 'verbose', 'warn']
    }
  );

  morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  

  app.use(morgan(':method :url :body'))
  await app.listen(3000);
}
bootstrap();
