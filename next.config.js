/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: { nftTracing: true }
  env:{
    PRIVATE_KEY : process.env.NEXT_PUBLIC_PRIVATE_KEY
  }
}

module.exports = nextConfig
