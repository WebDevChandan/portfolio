/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
        remotePatterns: [
            // https://res.cloudinary.com/dnwf21zlv/image/upload/v1724085970/myImages/Chandan_Kumar.webp
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/img/**'
            },{
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dnwf21zlv/image/**'
            },
        ]
    }
}
module.exports = nextConfig