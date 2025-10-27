// src/db/helpers/createTestDb.ts
import { Client } from "pg";
import crypto from "crypto";

/**
 * Creates a temporary test database, returns its name and connection string.
 * Also provides a cleanup function to drop it later.
 */
export const createTestDb = async () => {
  const baseUrl = process.env.DATABASE_URL;
  if (!baseUrl) throw new Error("DATABASE_URL is not set");

  // Strip existing DB name — connect to the root
  const url = new URL(baseUrl);
  const baseDb = url.pathname.replace("/", "");

  const adminClient = new Client({ connectionString: url.toString() });
  await adminClient.connect();

  // Generate unique DB name
  const testDbName = `${baseDb}_test_${crypto.randomBytes(4).toString("hex")}`;

  // Create the test DB
  await adminClient.query(`CREATE DATABASE "${testDbName}"`);
  console.log(`✅ Created temporary test DB: ${testDbName}`);

  // Build connection string for test DB
  const testDbUrl = new URL(baseUrl);
  testDbUrl.pathname = `/${testDbName}`;

  // Cleanup function to drop the DB later
  const dropTestDb = async () => {
    await adminClient.query(
      `DROP DATABASE IF EXISTS "${testDbName}" WITH (FORCE)`
    );
    await adminClient.end();
    console.log(`🧹 Dropped temporary test DB: ${testDbName}`);
  };

  return { testDbName, testDbUrl: testDbUrl.toString(), dropTestDb };
};
