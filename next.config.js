/** @type {import('next').NextConfig} */

const nextConfig = {
  /**
   * React strict mode
   * Helps catch potential problems during development
   */
  reactStrictMode: true,

  /**
   * Image optimization
   * Ensures images are optimized for performance
   */
  images: {
    /**
     * Supported image formats
     * WebP is preferred for modern browsers
     */
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * Headers for performance and security
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /**
   * Redirects for URL changes
   */
  async redirects() {
    return [];
  },

  /**
   * Rewrites for internal routing
   */
  async rewrites() {
    return [];
  },

  /**
   * Environment variables
   */
  env: {
    // Add environment-specific variables here if needed
  },

  /**
   * Experimental features (use cautiously)
   */
  experimental: {
    // Optimizations can be enabled here
  },

  /**
   * Webpack configuration
   * Minimal overrides for bundle optimization
   */
  webpack: (config, { isServer }) => {
    return config;
  },

  /**
   * Next.js caching strategy
   */
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  /**
   * TypeScript configuration
   */
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  /**
   * ESLint configuration
   */
  eslint: {
    dirs: ["app", "components", "lib"],
  },
};

module.exports = nextConfig;
