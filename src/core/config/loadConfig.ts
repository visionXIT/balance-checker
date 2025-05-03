import { AppConfig } from './AppConfig';
import { Environment } from './Environment';

export function loadConfig(): AppConfig {
  const env = process.env as unknown as Environment;

  return {
    port: parseInt(env.PORT, 10),

    swagger: {
      mount: env.SWAGGER_MOUNT,
      description: '',
    },

    db: {
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME,
    },

    log: {
      level: env.LOG_LEVEL,
      pretty: env.LOG_PRETTY === '1',
      db: env.LOG_DB,
    },

    blockfrost: {
      projectId: env.BLOCKFROST_PROJECT_ID,
    },
  };
}
