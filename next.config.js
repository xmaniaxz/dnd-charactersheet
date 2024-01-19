/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["node-appwrite"],
  },
};

module.exports = nextConfig;
