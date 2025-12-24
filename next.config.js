import { withPayload } from '@payloadcms/next/withPayload'
import bundleAnalyzer from '@next/bundle-analyzer'

import redirects from './redirects.js'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
  // Optimize bundle size
  experimental: {
    // Explicitly disable the React Compiler
    reactCompiler: false,
    optimizeCss: true,
    optimizePackageImports: [
      'react',
      'react-dom',
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      'framer-motion',
      'embla-carousel-react',
      'embla-carousel-autoplay',
      'date-fns',
      'react-hook-form',
      'react-day-picker',
    ],
   
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  compress: true,
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    // Extract JSON files as separate assets instead of inlining into JS bundles
    // Exclude node_modules to allow packages to import JSON as modules when needed
    config.module.rules.push({
      test: /\.json$/,
      exclude: /node_modules/,
      type: 'asset/resource',
      generator: {
        filename: 'static/json/[name].[hash][ext]',
      },
    })

    // Optimize client-side bundles
    if (!isServer) {
      // Mark Node.js built-ins as externals for client bundles
      // This prevents webpack from trying to bundle fs, path, etc. when client components
      // import from files that use these modules (even if conditionally)
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        net: false,
        tls: false,
        crypto: false,
      }

      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        minimize: true,
      }
    }
    return config
  },
}

export default withPayload(withBundleAnalyzer(nextConfig), { devBundleServerPackages: false })
