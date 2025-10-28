import { createApp } from "./common/createApp.js";
import shutdown from "./utils/shutDown.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const app = await createApp();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
