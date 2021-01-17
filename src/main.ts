import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // enable cors
  app.enableCors({ origin: true });
  // setup swagger
  const options = new DocumentBuilder()
    .setTitle('My Nestjs Demo')
    .setDescription('User article management')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  // listen on port
  const port = app.get(ConfigService).get('APP_PORT');
  await app.listen(port || 3000);
}
bootstrap();
