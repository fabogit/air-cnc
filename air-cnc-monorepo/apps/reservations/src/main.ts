import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useLogger(app.get(Logger));
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
