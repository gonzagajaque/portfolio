/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Only apply basePath in production/build, not in development
  ...(process.env.NODE_ENV !== 'development' && { basePath: '/portfolio' }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

