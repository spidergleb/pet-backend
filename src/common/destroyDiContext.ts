import { DiContext } from "../types/diContext.js";

async function destroyDiContext(diContext: DiContext): Promise<void> {
  await diContext.dbClient.close();
  await diContext.redisClient.close();
}

export default destroyDiContext;
