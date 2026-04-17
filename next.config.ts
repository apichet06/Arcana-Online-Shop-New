import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    optimisticClientCache: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost", port: "5000", pathname: "/api/uploads/**" },
    ],
    dangerouslyAllowLocalIP: true,

  },
};

export default nextConfig;
