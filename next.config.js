/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Disable strict mode for easier migration
  reactStrictMode: false,
}

module.exports = nextConfig
