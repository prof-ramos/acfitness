import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@acfitness/contracts"],
  logging: {
    incomingRequests: {
      ignore: [/\/api\/v1\/health/],
    },
  },
};

export default nextConfig;
