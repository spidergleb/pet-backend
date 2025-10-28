import { getContext } from "../context.js";
import destroyDiContext from "../common/destroyDiContext.js";

let shuttingDown = false;

async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`🛑 ${signal} received — shutting down...`);

  try {
    const ctx = getContext();
    await destroyDiContext(ctx);
    console.log("✅ Resources closed");
  } catch (err) {
    console.error("❌ Shutdown error:", err);
  } finally {
    // Always exit even if cleanup fails
    process.exit(0);
  }
}

export default shutdown;
