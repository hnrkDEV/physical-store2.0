import * as dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import { NestFactory } from '@nestjs/core';
import { StoresModule } from './stores/stores.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(StoresModule);

  const config = new DocumentBuilder()
    .setTitle('Physical Store API')
    .setDescription('API for calculating delivery with Melhor Envio, ORS, ViaCEP')
    .setVersion('1.0')
    .addTag('Stores')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
