import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a preview/verification build use its own folder (NEXT_DIST_DIR=.next-preview)
  // without clobbering a running `npm run dev`, which keeps the default `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
