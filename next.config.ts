import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project sits below another lockfile, so point Turbopack at our own root.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
