/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appwrite.lostcausenetwork.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
