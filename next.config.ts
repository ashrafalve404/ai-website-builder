import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/ai-website-builder" : "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Note: Dynamic routes like /editor/[id] require pre-defined IDs in generateStaticParams
  // For full dynamic editor functionality, consider deploying to Vercel instead
};

export default nextConfig;
