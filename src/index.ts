import { createApp } from "./common/createApp.js";
import { initContext } from "./context.js";
import shutdown from "./utils/shutDown.js";

const PORT = process.env.PORT || 4000;

let diContext;

async function main() {
  try {
    diContext = await initContext();

    const app = await createApp();

    await diContext.redisClient.set("key", "value");
    const value = await diContext.redisClient.get("key");
    console.log(value, "redis");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

main();

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
