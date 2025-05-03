import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { ApiModule } from './apps/api/api.module';
import { AppConfig } from './core/config/AppConfig';
import { configureSwagger } from './core/swagger/configureSwagger';

export async function bootstrapApi() {
  const app = await NestFactory.create(ApiModule, {
    bufferLogs: false,
  });

  const configService = app.get(ConfigService<AppConfig>);
  const logger = app.get(Logger);
  const port = configService.get('port');

  app.useLogger(logger);

  configureSwagger(app, configService.get('swagger', { infer: true }));

  await app.listen(port);

  logger.log(`Server has been started at ${port}`, bootstrapApi.name);
}

bootstrapApi().catch((e) => {
  console.log(e);
  process.exit(1);
});
