'use strict';

const path = require('node:path');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: isProduction,
  swcMinify: isProduction,

  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
    ],
  },

  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
