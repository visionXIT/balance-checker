import * as Joi from 'joi';

import { Environment } from './Environment';

export const validationSchema = Joi.object<Environment, true>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  PORT: Joi.number().default(3000),
  SWAGGER_MOUNT: Joi.string().default(null),

  LOG_LEVEL: Joi.string().default('error'),
  LOG_PRETTY: Joi.number().default(0),
  LOG_DB: Joi.string().valid('all', '').default(''),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  BLOCKFROST_PROJECT_ID: Joi.string().required(),
});
