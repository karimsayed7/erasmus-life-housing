import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from "node:path";

const withNextIntl = createNextIntlPlugin();

// const nextConfig = {};


const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
// export default nextConfig;
