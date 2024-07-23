/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "pbs.twimg.com", "firebasestorage.googleapis.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "firebasestorage.googleapis.com", // Your image domain
        port: '',
        pathname: '/images/**' 
      }
    ]
  },
  compiler: {
    styledComponents: true, // Add this for styled-components
  },
    async headers() {
      return [
        {
          source: "/",
          headers: [
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "same-origin-allow-popups",
            },
          ],
        },
      ];
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false }
        return config
      },
      reactStrictMode: false,
};

export default nextConfig;
