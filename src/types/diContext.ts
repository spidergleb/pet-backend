import { Knex } from "knex";

export type Config = {
  PORT: string;
  DATABASE_URL_PROD: string;
  DATABASE_URL: string;
  ALLOWED_ORIGINS: string;
};

export type DiContext = {
  dbClient: DBClient;
  dbClientOriginal: DBClient;
  config: Config;
};

export type DBClient = {
  builder: Knex;
  close(): Promise<void>;
};
