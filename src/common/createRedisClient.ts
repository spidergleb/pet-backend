import { createClient, RedisClientType } from "redis";
import { DiContext } from "../types/diContext";

async function createRedisClient(
  redisUrl: string
): Promise<DiContext["redisClient"]> {
  const client: RedisClientType = createClient({
    url: redisUrl,
  });

  await client.set("key", "value");
  const value = await client.get("key");
  console.log(value, "redis");

  console.log("🔧 Redis URL:", process.env.REDIS_URL);
  client.on("error", (err) => console.error("❌ Redis Client Error", err));

  await client.connect();
  console.log("✅ Redis connected");
  return client;
}

export default createRedisClient;
