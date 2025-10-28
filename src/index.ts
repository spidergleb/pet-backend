import { createApp } from "./common/createApp.js";
import createRedisClient from "./common/createRedisClient.js";
import { getContext } from "./context.js";
import shutdown from "./utils/shutDown.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const app = await createApp();

  const { redisClient } = getContext();

  await redisClient.set("key", "value");
  const value = await redisClient.get("key");
  console.log(value, "redis");

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
