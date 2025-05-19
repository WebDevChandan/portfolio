/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/img/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dnwf21zlv/image/**'
            },
        ],
    },
};

module.exports = nextConfig;
