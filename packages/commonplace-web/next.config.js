const withPlugins = require("next-compose-plugins");

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = {
  i18n,
  ...nextConfig,
};

// module.exports = withPlugins([withBundleAnalyzer({})], nextConfig);
