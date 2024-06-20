/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        formats:["image/webp"],
        remotePatterns:[
            {
                protocol: 'http',
                hostname:'localhost',
                port: '3000',
                pathname:'/img/**'
            }
        ]
    }
}
module.exports = nextConfig