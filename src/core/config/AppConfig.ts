export interface AppConfig {
  port: number;

  swagger: {
    mount: string;
    description: string;
  };

  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };

  log: {
    level: string;
    pretty: boolean;
    db: boolean;
  };

  blockfrost: {
    projectId: string;
  };
}
