import { Kafka } from "kafkajs";

// Reuse a single client across module reloads (e.g. in dev with HMR) so we
// don't leak connections by creating a new client on every reload.
const globalForKafka = globalThis as unknown as { kafka?: Kafka };

function createKafka(): Kafka {
  const { KAFKA_BROKER } = process.env;
  if (!KAFKA_BROKER) {
    throw new Error("KAFKA_BROKER must be set");
  }
  return new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID ?? "manky",
    // Comma-separated list of host:port brokers. Local development points at the
    // broker port published by docker-compose; inside the compose network the
    // web service overrides KAFKA_BROKER=kafka:9092.
    brokers: KAFKA_BROKER.split(",").map((broker) => broker.trim()),
  });
}

export const kafka: Kafka = globalForKafka.kafka ?? createKafka();

if (process.env.NODE_ENV !== "production") {
  globalForKafka.kafka = kafka;
}

// Verify the broker cluster is reachable by connecting an admin client and
// describing the cluster. Resolves with the round-trip time in milliseconds;
// rejects if the connection cannot be made.
export async function ping(): Promise<number> {
  const start = performance.now();
  const admin = kafka.admin();
  await admin.connect();
  try {
    await admin.describeCluster();
    return performance.now() - start;
  } finally {
    await admin.disconnect();
  }
}
