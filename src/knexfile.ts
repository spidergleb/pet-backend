import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const knexConfig = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src/db/migrations"),
      extension: "js",
      esm: true,
    },
    seeds: {
      directory: path.join(__dirname, "src/db/seeds"),
    },
  },
};

export default knexConfig;
