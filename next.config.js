/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/ai-model-index',
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: './',
}

module.exports = nextConfig
