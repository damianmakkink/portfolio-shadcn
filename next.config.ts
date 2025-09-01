import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow Googleusercontent remote images (e.g., lh7-rt.googleusercontent.com)
      { protocol: "https", hostname: "**.googleusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "a.storyblok.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
