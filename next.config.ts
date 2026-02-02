import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // ← ADD THIS LINE for static Firebase Hosting
  reactStrictMode: true,
  
  // Optional: Add other configs from our previous plan
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
