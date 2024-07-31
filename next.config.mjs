/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  // open env to client side
  webpack: (config, { webpack, isServer }) => {
    const envs = {};

    Object.keys(process.env).forEach(env => {
      if (env.startsWith('NEXT_PUBLIC_')) {
        envs[env] = process.env[env];
      }
    })

    if (!isServer) {
      config.plugins.push(new webpack.DefinePlugin({
        'process.env': JSON.stringify(envs),
      }))
    }

    // https://dev.to/dinhkhai0201/module-not-found-cant-resolve-pino-pretty-g6
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'encoding');

    return config
  },
};

export default nextConfig;
