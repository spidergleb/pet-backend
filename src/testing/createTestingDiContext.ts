import createDiContext from "../common/createDiContext.js";
import createTestingDbClient from "./createTestingDbClient.js";
import migrationsConfig from "../knexfile.js";

import type { Config, DiContext } from "../types/diContext.js";

async function createTestingDiContext(): Promise<DiContext> {
  const diContext = await createDiContext();
  const testingDbClient = await createTestingDbClient(
    diContext.dbClient,
    migrationsConfig.development.migrations,
    diContext.config.DATABASE_URL
  );

  diContext.config = process.env as Config;

  diContext.dbClient = testingDbClient;

  return diContext;
}

export default createTestingDiContext;
