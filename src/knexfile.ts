import dotenv from "dotenv";

dotenv.config();

const knexConfig = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "src/db/migrations",
      extension: "js",
      esm: true,
    },
    seeds: {
      directory: "src/db/seeds",
    },
  },
};

export default knexConfig;
