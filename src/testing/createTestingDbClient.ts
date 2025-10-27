import { Knex } from "knex";
import createDbClient from "../common/createDbClient.js";
import { DiContext } from "../types/diContext.js";
import { v4 as generateId } from "uuid";

async function createTestingDbClient(
  // logger: DiContext['logger'],
  dbClient: DiContext["dbClient"],
  migrationsConfig: Knex.MigratorConfig,
  dbUrl: string
): Promise<DiContext["dbClient"]> {
  let url;
  try {
    url = new URL(dbUrl);
  } catch (error) {
    // logger.error("createTestingDbClient: invalid db url", { error });
    throw error;
  }

  const dbName = url.pathname.slice(1);
  const newDbName = dbName + "_test_" + generateId();

  try {
    await dbClient.builder.raw(`CREATE DATABASE "${newDbName}";`);
  } catch (error) {
    // logger.error('createTestingDbClient: failed to create database', { error, newDbName })
    throw error;
  }

  try {
    await dbClient.builder.raw(
      `ALTER DATABASE "${newDbName}" SET TIMEZONE TO 'UTC'; `
    );
  } catch (error) {
    // logger.error('createTestingDbClient: failed to alter timezone', { error })
    throw error;
  }

  url.pathname = newDbName;
  const newDbUrl = url.toString();
  const testingDbClient = createDbClient(newDbUrl);

  try {
    await testingDbClient.builder.migrate.latest(migrationsConfig);
  } catch (error) {
    // logger.error('createTestingDbClient: failed to migrate database', { error })
    throw error;
  }

  return testingDbClient;
}

export default createTestingDbClient;
