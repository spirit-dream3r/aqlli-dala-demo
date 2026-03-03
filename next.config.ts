import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Для production: 'standalone' создает оптимизированный билд для Docker
  // Для static export: 'export' (используется сейчас)
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : 'export',
  
  // React Compiler для оптимизации рендеринга
  reactCompiler: true,
  
  // Изображения (нужно для standalone режима)
  images: {
    unoptimized: process.env.DOCKER_BUILD !== 'true',
    remotePatterns: process.env.DOCKER_BUILD === 'true' ? [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ] : undefined,
  },
  
  // Оптимизация bundle
  swcMinify: true,
  
  // Source maps только для development
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  
  // Environment variables
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  },
  
  // Headers для безопасности
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
