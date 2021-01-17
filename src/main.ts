import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors({ origin: true });

  const port = app.get(ConfigService).get('APP_PORT');
  await app.listen(port || 3000);
}
bootstrap();
