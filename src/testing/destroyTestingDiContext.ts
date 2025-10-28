import { getContext } from "../context.js";

async function destroyTestingDiContext(): Promise<void> {
  const diContext = getContext();
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
    await diContext.dbClientOriginal.builder.raw(
      `DROP DATABASE "${row.testDbName}";`
    );
  } catch (error) {
    throw error;
  }

  await diContext.dbClientOriginal.close();
}

export default destroyTestingDiContext;
