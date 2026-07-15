import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a minimal, self-contained server bundle (.next/standalone) for Docker.
  // Gated on BUILD_STANDALONE (set in the Dockerfile builder stage) so local
  // `next start` still works — it's incompatible with output: "standalone".
  output: process.env.BUILD_STANDALONE ? "standalone" : undefined,
};

export default nextConfig;
