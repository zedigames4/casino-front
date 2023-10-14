/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['localhost', 'zedi.rw', 'zeddi.rw'],
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    DEFAULT_API: process.env.DEFAULT_API,
    REACT_APP_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN,
    TOKEN_DATA: process.env.TOKEN_DATA,
    USER_INFO: process.env.USER_INFO,
  },
};
