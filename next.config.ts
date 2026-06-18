import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`, // Proxy to Backend with /api/ prefix
      },
      {
        source: "/auth/:path*",
        destination: `${backendUrl}/auth/:path*`, // Proxy to Backend for auth endpoints
      },
    ];
  },
};

export default nextConfig;
