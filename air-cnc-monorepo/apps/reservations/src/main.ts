import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger as NestLogger } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const logger = new NestLogger('Bootstrap', { timestamp: true });
  const app = await NestFactory.create(ReservationsModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));

  const port = process.env.port ?? 3000;
  await app.listen(port, () =>
    logger.log(`Reservations running on port:${port}`),
  );
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
