import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'reshop.circleit.dev',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/reshop-bucket/**',
      },
    ],
  },
};

export default nextConfig;
