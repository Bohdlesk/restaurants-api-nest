import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.on('unhandledRejection', (reason, p) => {
    console.error(JSON.stringify({ p, reason }));
  });

  process.on('uncaughtException', (error) =>
    console.error(JSON.stringify(error)),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(cors());

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
