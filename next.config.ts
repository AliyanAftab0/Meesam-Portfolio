import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.w3schools.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 475, 651],
    minimumCacheTTL: 60,
    unoptimized: false,
  },
};

export default nextConfig;
