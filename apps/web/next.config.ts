import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: [
    "@acfitness/api-client",
    "@acfitness/contracts",
    "@acfitness/domain"
  ],
  logging: {
    incomingRequests: {
      ignore: [/\/api\/v1\/health/],
    },
  },
};

export default nextConfig;
