import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode:false,
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "m.media-amazon.com",
    },
  ],
},
};

export default nextConfig;
