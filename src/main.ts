import * as dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

import { NestFactory } from '@nestjs/core';
import { StoresModule } from './stores/stores.module';

async function bootstrap() {
  const app = await NestFactory.create(StoresModule);
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
