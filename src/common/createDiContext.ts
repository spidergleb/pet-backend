import { Config, DiContext } from "../types/diContext.js";
import createDbClient from "./createDbClient.js";

async function createDiContext(): Promise<DiContext> {
  const config = process.env as Config;
  const dbClient = createDbClient(config.DATABASE_URL);

  return {
    // logger,
    dbClientOriginal: dbClient,
    dbClient,
    config,
  };
}

export default createDiContext;
