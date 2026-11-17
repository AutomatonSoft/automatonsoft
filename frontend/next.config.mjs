import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

/** @type {(phase: string) => import('next').NextConfig} */
export default function nextConfig(phase) {
  const config = { output: 'export', experimental: { globalNotFound: true } };
  if (phase !== PHASE_DEVELOPMENT_SERVER) return config;
  // Locally Nginx is absent, so the dev server proxies API and media requests to Django.
  return {
    ...config,
    output: undefined,
    skipTrailingSlashRedirect: true, // Django API routes end with a slash
    async rewrites() {
      return [
        { source: '/api/:path*/', destination: `${backendUrl}/api/:path*/` },
        { source: '/media/:path*', destination: `${backendUrl}/media/:path*` },
      ];
    },
  };
}
