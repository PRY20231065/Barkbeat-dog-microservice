import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ });
  
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    transform: true
  }));

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación de API del Proyecto Dog Microservice.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(+process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
