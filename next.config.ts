import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Generate static files in /out
  images: {
    unoptimized: true,   // Required for static export
  },
};

export default nextConfig;
