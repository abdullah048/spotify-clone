/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sfgasjafohibvspeuymv.supabase.co',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
