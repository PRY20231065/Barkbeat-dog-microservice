import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resourceToModel } from './utils/mapping/resourceToModel.mapping';
import { modelToResource } from './utils/mapping/modelToResource.mapping';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  modelToResource();
  resourceToModel();

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
