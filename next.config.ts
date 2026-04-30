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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },

  async rewrites() {
    return [
      {
        source: "/arcana/product/:id",
        destination: "/arcana/product?id=:id",
      },
      {
        source: "/arcana/store/:id",
        destination: "/arcana/store?id=:id",
      },
      // {
      //   source: "/arcana/lp/:id",
      //   destination: "/arcana/lp?id=:id",
      // }
    ];
  },
};

export default nextConfig;