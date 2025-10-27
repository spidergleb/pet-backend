import knex, { Knex } from "knex";
import { DBClient } from "../types/diContext.js";

const heathCheckQuerySqlPart = '"information_schema"';

function createDbClient(dbUrl: string): DBClient {
  const dbClientLib = knex({
    client: "pg",
    connection: dbUrl,
    pool: {
      min: 2,
      max: 10,
    },
    debug: false,
  });

  dbClientLib.on("query", (query: Knex.Sql) => {
    const { sql, bindings } = query;
    if (sql.includes(heathCheckQuerySqlPart)) {
      return;
    }
    // logger.trace("dbClient: query", { sql, bindings });
  });

  const dbClient: DBClient = {
    builder: dbClientLib,
    close: async () => {
      //   logger.trace("dbClient#close: destroying connection");
      return dbClientLib.destroy();
    },
  };

  return dbClient;
}

export default createDbClient;
