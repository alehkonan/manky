// Runs once when a new server instance starts (before it accepts requests).
export async function register() {
  // Only the Node.js runtime can talk to Postgres; skip on the Edge runtime.
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  // Importing the module instantiates the connection pool. Ping to open a
  // connection and verify the database is reachable at startup.
  const { ping } = await import("~/lib/db");
  try {
    const ms = await ping();
    console.log(`[db] connected (ping ${ms.toFixed(1)}ms)`);
  } catch (err) {
    console.error("[db] failed to connect on startup:", err);
  }
}
