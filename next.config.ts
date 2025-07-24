import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
