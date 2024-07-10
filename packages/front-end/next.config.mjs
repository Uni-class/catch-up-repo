/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  // output: "export",
  // trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
