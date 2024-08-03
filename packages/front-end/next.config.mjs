/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'catch-up-dev-s3.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            dimensions: false,
          },
        },
      ],
    });

    return config;
  },
  // output: "export",
  // trailingSlash: true,
  // images: { unoptimized: true },
};

export default nextConfig;
