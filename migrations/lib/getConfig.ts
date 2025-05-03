import * as dotenv from 'dotenv';
import { merge } from 'lodash';

import { AppConfig } from '../../src/core/config/AppConfig';
import { loadConfig } from '../../src/core/config/loadConfig';
import { validationSchema } from '../../src/core/config/validationSchema';

let appConfig: AppConfig;

export function getConfig() {
  if (appConfig) {
    return appConfig;
  }

  dotenv.config();

  const { error, value } = validationSchema.validate(process.env, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  process.env = merge(process.env, value);

  appConfig = loadConfig();

  return appConfig;
}
