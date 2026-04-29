import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rzgkrctocxqbmpusilxl.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
