import createDiContext from "./common/createDiContext.js";
import createTestingDiContext from "./testing/createTestingDiContext.js";
import type { DiContext } from "./types/diContext.js";

let diContext: DiContext | null = null;

export async function initContext() {
  if (process.env.NODE_ENV === "test") {
    diContext = await createTestingDiContext();
  } else {
    diContext = await createDiContext();
  }

  console.log(`✅ DI Context initialized for ${process.env.NODE_ENV}`);

  let row;
  try {
    [row] = await diContext.dbClient.builder.select(
      diContext.dbClient.builder.raw(`current_database() as "testDbName";`)
    );
  } catch (error) {
    throw error;
  }
  return diContext;
}

export function getContext(): DiContext {
  if (!diContext) {
    throw new Error(
      "❌ DI Context not initialized. Did you forget to call initContext()?"
    );
  }
  return diContext;
}

export async function destroyContext() {
  try {
    await diContext.dbClient.close();
  } catch (error) {
    throw new Error("❌ Failed to destroy DI Context");
  }

  diContext = null;
}
