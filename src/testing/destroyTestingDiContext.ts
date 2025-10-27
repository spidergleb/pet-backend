import type { DiContext } from "../types/diContext.js";

async function destroyTestingDiContext(diContext: DiContext): Promise<void> {
  let row: { testDbName: string };
  try {
    [row] = await diContext.dbClient.builder.select(
      diContext.dbClient.builder.raw(`current_database() as "testDbName";`)
    );
  } catch (error) {
    throw error;
  }

  await diContext.dbClient.close();

  try {
    await diContext.dbClient.builder.raw(`DROP DATABASE "${row.testDbName}";`);
  } catch (error) {
    throw error;
  }

  await diContext.dbClient.close();
}

export default destroyTestingDiContext;
