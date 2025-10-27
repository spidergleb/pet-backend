import { Config, DiContext } from "../types/diContext.js";
import createDbClient from "./createDbClient.js";

async function createDiContext(): Promise<DiContext> {
  const config = process.env as Config;
  console.log("🚀 ~ createDiContext ~ config:", config);
  const dbClient = createDbClient(config.DATABASE_URL);

  return {
    // logger,
    dbClient,
    // dbClientOriginal: dbClient,
    config,
  };
}

export default createDiContext;
