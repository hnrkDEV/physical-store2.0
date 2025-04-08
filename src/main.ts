import * as dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

import { NestFactory } from '@nestjs/core';
import { StoresModule } from './stores/stores.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(StoresModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
