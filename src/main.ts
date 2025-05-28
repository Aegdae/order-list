import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kakfaConfig } from 'kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(kakfaConfig)

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
