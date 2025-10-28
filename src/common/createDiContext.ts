import { Config, DiContext } from "../types/diContext.js";
import createDbClient from "./createDbClient.js";
import createRedisClient from "./createRedisClient.js";

async function createDiContext(): Promise<DiContext> {
  const config = process.env as Config;
  const dbClient = createDbClient(config.DATABASE_URL);
  const redisClient = await createRedisClient(config.REDIS_URL);

  return {
    // logger,
    redisClient,
    dbClientOriginal: dbClient,
    dbClient,
    config,
  };
}

export default createDiContext;
