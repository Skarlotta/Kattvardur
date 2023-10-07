/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  trailingSlash: true,  
  images: {
    loader: 'akamai',
    path: '',
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:8080/api/v1/:path*/' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
