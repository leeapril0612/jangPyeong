import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: "/jangPyeong",
  assetPrefix: "/jangPyeong/",
};

export default nextConfig;
