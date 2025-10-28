import { createApp } from "./common/createApp.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();
