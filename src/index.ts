import { createApp } from "./common/createApp.js";
import createRedisClient from "./common/createRedisClient.js";
import shutdown from "./utils/shutDown.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const app = await createApp();

  const client = await createRedisClient(process.env.REDIS_URL);
  await client.set("key", "value");
  const value = await client.get("key");
  console.log(value);

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
