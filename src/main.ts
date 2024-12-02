import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Convierte los datos entrantes al tipo correspondiente en el DTO
      whitelist: true, // Elimina las propiedades no especificadas en el DTO
      forbidNonWhitelisted: true, // Lanza una excepción si hay propiedades no permitidas
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200',
  });

  await app.listen(3000);
}
bootstrap();
