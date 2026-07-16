export async function register() {
  // Only the Node.js runtime can talk to Postgres/Kafka; skip on the Edge runtime.
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  await Promise.all([
    (async () => {
      const { ping: pingDb } = await import("~/lib/db");
      try {
        const ms = await pingDb();
        console.log(`[db] connected (ping ${ms.toFixed(1)}ms)`);
      } catch (err) {
        console.error("[db] failed to connect on startup:", err);
      }
    })(),
    (async () => {
      const { ping: pingKafka } = await import("~/lib/kafka");
      try {
        const ms = await pingKafka();
        console.log(`[kafka] connected (ping ${ms.toFixed(1)}ms)`);
      } catch (err) {
        console.error("[kafka] failed to connect on startup:", err);
      }
    })(),
  ]);
}
