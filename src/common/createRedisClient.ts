import { createClient, RedisClientType } from "redis";
import { DiContext } from "../types/diContext";

async function createRedisClient(
  redisUrl: string
): Promise<DiContext["redisClient"]> {
  const client: RedisClientType = createClient({
    url: redisUrl,
  });

  client.on("error", (err) => console.error("❌ Redis Client Error", err));

  await client.connect();
  console.log("✅ Redis connected");
  return client;
}

export default createRedisClient;
