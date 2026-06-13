import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// const nextConfig = {};


const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "picsum.photos",
      "example.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default withNextIntl(nextConfig);
// export default nextConfig;
