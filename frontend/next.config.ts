import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
         protocol: "https",
        hostname: "dummyjson.com",
      },
      {
         protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        hostname: "localhost:9005",
      },
    ],
    unoptimized:true,
  },
};

export default nextConfig;
