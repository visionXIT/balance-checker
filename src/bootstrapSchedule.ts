import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppScheduleModule } from './apps/schedule/schedule.module';

async function bootstrapSchedule() {
  const app = await NestFactory.createMicroservice(AppScheduleModule, {
    bufferLogs: true,
  });

  const logger = app.get(Logger);

  app.useLogger(logger);

  await app.listen();

  logger.log(`Schedule has been started`, 'bootstrap');
}

bootstrapSchedule().catch((e) => {
  console.log(e);
  process.exit(1);
});
