import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.devtool = 'source-map'; // Добавляем полный source map для клиентской части
    }
    return config;
  },
  productionBrowserSourceMaps: true // Включаем source maps для продакшн-сборки
};

export default nextConfig;
