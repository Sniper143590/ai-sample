/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "pbs.twimg.com", "firebasestorage.googleapis.com"],
  },
    async headers() {
      return [
        {
          source: "/login",
          headers: [
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "same-origin-allow-popups",
            },
          ],
        },
      ];
    },
    productionBrowserSourceMaps: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false }
        
        return config
      },
      reactStrictMode: false,
};

export default nextConfig;
