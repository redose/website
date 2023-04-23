'use strict';

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: isProduction,
  swcMinify: isProduction,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
