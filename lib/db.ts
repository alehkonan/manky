import { Pool } from "pg";

// Reuse a single pool across module reloads (e.g. in dev with HMR) so we don't
// leak connections by creating a new pool on every reload.
const globalForDb = globalThis as unknown as { pool?: Pool };

function createPool(): Pool {
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;
  if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
    throw new Error("POSTGRES_USER, POSTGRES_PASSWORD and POSTGRES_DB must be set");
  }
  return new Pool({
    // Host/port default to a local Postgres; inside docker-compose the web
    // service overrides POSTGRES_HOST=db (and the default 5432 port).
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  });
}

export const pool: Pool = globalForDb.pool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

// Verify the database is reachable by running a trivial query. Resolves with the
// round-trip time in milliseconds; rejects if the connection cannot be made.
export async function ping(): Promise<number> {
  const start = performance.now();
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    return performance.now() - start;
  } finally {
    client.release();
  }
}
