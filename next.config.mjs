/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        JWT_KEY: 'babai12babai',
        HOST: process.env.HOST
      },
};

export default nextConfig;
