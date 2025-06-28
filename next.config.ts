import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a6fz3zzs9i.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
